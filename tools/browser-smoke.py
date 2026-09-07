#!/usr/bin/env python3
"""Offline DOM smoke tests. Injects a fake inference adapter; no model is run.
Requires Python Playwright and Chromium. Set CHROMIUM_PATH when necessary.
HTTP hosting, service-worker lifecycle, downloads and real inference are separate
manual checks; this fixture deliberately uses set_content, not network routing.
"""
import base64
import os
from pathlib import Path
import re
import shutil
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
SCRIPTS = re.findall(r'<script src="\./([^"?]+)[^"]*"></script>', HTML)
HTML = re.sub(r'<script src="[^"]+"></script>', '', HTML)
HTML = re.sub(r'<link [^>]+>', '', HTML)
HTML = HTML.replace('</head>', '<style>' + (ROOT / 'styles.css').read_text(encoding='utf-8') + '</style></head>')
HTML = HTML.replace('./assets/improv-card-game-qr.png?v=0.22.1', 'data:image/png;base64,' + base64.b64encode((ROOT / 'assets/improv-card-game-qr.png').read_bytes()).decode())
SINGLE = '[I count the coins beside the broken machine.] “Whose budget is covering the replacement parts?”'
PAIR = '[I cover the signature on the order form with my calculator.] “Before we discuss who authorized this, what is the delivery charge?”'
OTHER = '[I pull a measuring tape across the damaged door.] “Who did it is less urgent than whether a new one will fit.”'


def fixture(browser, policy='full', width=390):
    page = browser.new_page(viewport={'width': width, 'height': 844})
    page.set_default_timeout(4000)
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.set_content(HTML)
    page.evaluate('''() => {
      const m = new Map();
      Object.defineProperty(window, 'localStorage', { configurable:true, value: {
        getItem:k => m.get(k) || null, setItem:(k,v) => m.set(k,String(v)), removeItem:k => m.delete(k)
      }});
      window.fixtureCalls = []; window.fixtureMode = 'normal'; window.fixtureText = '';
      window.fixtureRuntimeFactory = async () => {
        fixtureCalls.push(['factory']);
        return {
          load: async (model, options) => { fixtureCalls.push(['load', model.id, options.allowDownload]); options.onProgress({message:'Fixture loaded.'}); },
          unload: async () => { fixtureCalls.push(['unload']); },
          clearDownloads: async () => { fixtureCalls.push(['clear']); },
          generate: async (messages, options) => {
            fixtureCalls.push(['generate', JSON.parse(JSON.stringify(messages)), options.kind]);
            if (fixtureMode === 'pending') return new Promise(resolve => { window.fixtureResolve = resolve; });
            if (fixtureMode === 'runtime-error') throw new Error('WASM allocation failure (browser fixture)');
            return {text: fixtureText, finishReason:'stop'};
          }
        };
      };
    }''')
    for name in SCRIPTS:
        content = (ROOT / name).read_text(encoding='utf-8')
        if name == 'app.js':
            page.evaluate('''policy => {
              const state = ImpromptEngine.createState(IMPROMPT_CARDS);
              for (const [key,id] of [['stanceQueue','S22'],['driveQueue','D14']]) {
                state[key] = [id, ...state[key].filter(value => value !== id)];
              }
              ImpromptEngine.startSession(state, IMPROMPT_CARDS, {name:'Smoke test', mode:'open', source:'open', hintPolicy:policy});
              localStorage.setItem('imprompt:deck-state:v1', JSON.stringify(state));
            }''', policy)
            content = content.replace('  registerServiceWorker();', '  /* Offline DOM fixture only. */')
            target = 'runtimeFactory: async () => (await import("./hints/wllama-adapter.mjs?v=0.22.1")).createRuntime(),'
            assert target in content, 'Update fixture injection for the production adapter boundary.'
            content = content.replace(target, 'runtimeFactory: window.fixtureRuntimeFactory,')
        page.add_script_tag(content=content)
    assert page.evaluate('fixtureCalls.length') == 0, 'No startup model load'
    page.locator('#enterButton').click()
    page.locator('#startSessionButton').click()
    return page, errors


def example(page):
    return page.locator('.primary-hint-block p').inner_text()


def state(page):
    return page.evaluate("JSON.parse(localStorage.getItem('imprompt:deck-state:v1'))")


def load(page):
    page.locator('#hintLocalSettingsButton').click()
    page.locator('#loadLocalModelButton').click()
    expect(page.locator('#localModelStatus')).to_contain_text('Ready.')
    page.locator('#closeLocalModelButton').click()


def no_overflow(page):
    assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), 'Horizontal page overflow'
    assert page.evaluate('''() => [...document.querySelectorAll('dialog[open]')].every(d => d.scrollWidth <= d.clientWidth + 1)'''), 'Dialog overflow'


with sync_playwright() as pw:
    executable = os.environ.get('CHROMIUM_PATH') or shutil.which('chromium') or shutil.which('google-chrome')
    browser = pw.chromium.launch(**({'executable_path': executable} if executable else {}))
    page, errors = fixture(browser)
    expect(page.locator('#combinationHintButton')).to_be_hidden()
    expect(page.locator('#stanceNudgeButton')).to_be_hidden()
    page.locator('#stanceCard').click()
    expect(page.locator('#stanceTitle')).to_have_text('Practical Realist')
    expect(page.locator('#stanceAction')).to_be_hidden()
    expect(page.locator('#stanceVetoButton')).to_be_visible()
    expect(page.locator('#combinationHintButton')).to_be_hidden()
    page.locator('#stanceNudgeButton').click()
    original = example(page)
    assert 'kept for this scene' not in page.locator('#playScreen').inner_text().lower()
    assert page.locator('#hintDialogIntro').count() == 0
    assert page.locator('.hint-extra-coaching').get_attribute('open') is None
    page.locator('#anotherHintAngleButton').click()
    assert example(page) != original
    assert page.evaluate('fixtureCalls.length') == 0
    before_load = example(page)
    load(page)
    assert example(page) == before_load, 'Load completion must not overwrite a hint'
    page.evaluate('(text) => fixtureText = text', SINGLE)
    before_state = state(page)
    page.locator('#generateLocalHintButton').click()
    expect(page.locator('#hintSource')).to_have_text('Generated on this device')
    assert example(page) == SINGLE and state(page) == before_state
    calls = page.evaluate("fixtureCalls.filter(c => c[0] === 'generate')")
    payload = str(calls[-1][1])
    assert 'Practical Realist' in payload and 'Not That Subject' not in payload
    assert 'D14' not in payload, 'Single request leaked another card'
    no_overflow(page)
    page.locator('#doneHintButton').click()
    # The first result was generated at angle 1 after cycling a built-in hint.
    # Opening at angle 0 makes a real new request, then the next reopen is cached.
    page.locator('#stanceNudgeButton').click()
    expect(page.locator('#hintSource')).to_have_text('Generated on this device')
    page.locator('#doneHintButton').click()
    prior_generations = len(page.evaluate("fixtureCalls.filter(c => c[0] === 'generate')"))
    page.locator('#stanceNudgeButton').click()
    expect(page.locator('#hintSource')).to_have_text('Saved generated example')
    assert len(page.evaluate("fixtureCalls.filter(c => c[0] === 'generate')")) == prior_generations
    page.locator('#doneHintButton').click()
    page.locator('#driveCard').click()
    expect(page.locator('#driveTitle')).to_have_text('Not That Subject')
    page.evaluate('(text) => fixtureText = text', PAIR)
    before_state = state(page)
    page.locator('#combinationHintButton').click() # Ready model starts automatically on opening.
    expect(page.locator('#hintSource')).to_have_text('Generated on this device')
    assert example(page) == PAIR and state(page) == before_state
    payload = str(page.evaluate("fixtureCalls.filter(c => c[0] === 'generate').at(-1)[1]"))
    assert 'Practical Realist' in payload and 'Not That Subject' in payload
    page.evaluate('(text) => fixtureText = text', OTHER)
    page.locator('#anotherHintAngleButton').click()
    expect(page.locator('.primary-hint-block p')).to_have_text(OTHER)
    page.evaluate("fixtureText = 'Here is a hint: Be confident.'")
    page.locator('#anotherHintAngleButton').click()
    expect(page.locator('#hintFeedback')).to_contain_text('unsupported format')
    expect(page.locator('#hintDiagnostics')).to_be_visible()
    page.locator('#hintDiagnostics summary').click()
    expect(page.locator('#hintDiagnosticsText')).to_contain_text('rejected')
    expect(page.locator('#hintDiagnosticsText')).to_contain_text('Here is a hint')
    no_overflow(page)
    assert example(page) == OTHER, 'Invalid output overwrote the current example'
    page.evaluate("fixtureMode = 'pending'")
    page.locator('#anotherHintAngleButton').click()
    expect(page.locator('#anotherHintAngleButton')).to_be_disabled()
    expect(page.locator('#cancelHintGenerationButton')).to_be_visible()
    page.locator('#doneHintButton').click()
    page.evaluate('(text) => fixtureResolve({text,finishReason:"stop"})', PAIR)
    page.wait_for_timeout(80)
    page.locator('#stanceNudgeButton').click()
    assert example(page) != PAIR, 'Late pair result overwrote another hint'
    expect(page.locator('#generateLocalHintButton')).to_be_hidden()
    page.locator('#doneHintButton').click()
    previous = state(page)['current']['stanceId']
    page.locator('#stanceVetoButton').click()
    expect(page.locator('#stanceNudgeButton')).to_be_hidden()
    expect(page.locator('#combinationHintButton')).to_be_hidden()
    assert state(page)['current']['stanceId'] != previous
    page.locator('#stanceCard').click()
    page.locator('#completeButton').click()
    assert state(page)['scenesCompleted'] == 1
    assert not errors, errors
    print('PASS: opt-in load; concrete fallbacks; single/pair privacy; explicit/automatic generation; cache reuse; invalid/canceled output; deck integrity; Veto; Scene Log.')
    page.close()
    for policy in ['off', 'nudges', 'after-attempt']:
        page, errors = fixture(browser, policy, width=320)
        page.locator('#stanceCard').click(); page.locator('#driveCard').click()
        if policy == 'off':
            expect(page.locator('#stanceNudgeButton')).to_be_hidden()
            expect(page.locator('#combinationHintButton')).to_be_hidden()
        else:
            if policy == 'after-attempt':
                expect(page.locator('#stanceNudgeButton')).to_be_hidden()
                page.locator('#unlockHintsButton').click()
            page.locator('#stanceNudgeButton').click()
            assert bool(page.locator('.hint-extra-coaching').count()) == (policy != 'nudges')
            no_overflow(page)
        assert not errors, errors
        page.close()
    print('PASS: Off, Nudges and After-first-attempt policies; 320 px mobile layout; no JavaScript page errors.')
    page, errors = fixture(browser)
    page.locator('#stanceCard').click(); page.locator('#stanceNudgeButton').click()
    original = example(page)
    load(page)
    page.evaluate("fixtureMode = 'runtime-error'")
    page.locator('#generateLocalHintButton').click()
    expect(page.locator('#hintFeedback')).to_contain_text('AI generation failed')
    expect(page.locator('#hintSource')).to_have_text('Built-in example')
    assert example(page) == original
    page.locator('#hintDiagnostics summary').click()
    expect(page.locator('#hintDiagnosticsText')).to_contain_text('WASM allocation failure')
    no_overflow(page)
    assert not errors, errors
    if os.environ.get('SCREENSHOT_DIR'):
        dest = Path(os.environ['SCREENSHOT_DIR']); dest.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(dest / 'mobile-diagnostics.png'), full_page=True)
    page.close()
    print('PASS: runtime failure exposes the actual error without relabeling or replacing the built-in example.')
    page, errors = fixture(browser, width=1280)
    page.locator('#stanceCard').click(); page.locator('#stanceNudgeButton').click()
    no_overflow(page)
    page.locator('#hintLocalSettingsButton').click(); no_overflow(page)
    assert not errors, errors
    page.close(); browser.close()
    print('PASS: desktop hint/settings layout. These are offline DOM and mocked-runtime checks, NOT real-model or service-worker deployment tests.')
