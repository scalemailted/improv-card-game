#!/usr/bin/env python3
"""Real localhost/PWA smoke test. No inference mocks; no model is downloaded/run.
Requires Playwright and Chromium. Starts/stops its own development server.
"""
import os
from pathlib import Path
import shutil
import socket
import subprocess
import time
import urllib.request
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
with socket.socket() as sock:
    sock.bind(('127.0.0.1', 0))
    PORT = sock.getsockname()[1]
BASE = f'http://localhost:{PORT}'
server = subprocess.Popen(['node', 'tools/serve-local.cjs'], cwd=ROOT, env={**os.environ, 'PORT': str(PORT)}, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
try:
    for attempt in range(50):
        try:
            with urllib.request.urlopen(BASE, timeout=1) as response:
                assert response.headers['Cross-Origin-Opener-Policy'] == 'same-origin'
                assert response.headers['Cross-Origin-Embedder-Policy'] == 'require-corp'
            break
        except OSError:
            if server.poll() is not None:
                raise RuntimeError(server.stderr.read().decode())
            time.sleep(.1)
    else:
        raise RuntimeError('Local server did not start.')
    with sync_playwright() as pw:
        exe = os.environ.get('CHROMIUM_PATH') or shutil.which('chromium') or shutil.which('google-chrome')
        browser = pw.chromium.launch(**({'executable_path': exe} if exe else {}))
        context = browser.new_context(viewport={'width':390,'height':844})
        page = context.new_page()
        errors, external = [], []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.on('request', lambda request: external.append(request.url) if request.url.startswith('http') and not request.url.startswith(BASE) else None)
        page.goto(BASE, wait_until='networkidle')
        page.evaluate('navigator.serviceWorker.ready')
        page.wait_for_function('navigator.serviceWorker.controller !== null')
        assert page.evaluate('crossOriginIsolated'), 'Default server did not enable threading support'
        assert page.evaluate('IMPROMPT_LOCAL_HINT_CORE.PROMPT_VERSION') == '2.0.0-performance'
        assert 'imprompt-v0.22.1' in page.evaluate('caches.keys()')
        page.locator('#enterButton').click(); page.locator('#startSessionButton').click()
        page.locator('#stanceCard').click(); page.locator('#stanceNudgeButton').click()
        expect(page.locator('#hintSource')).to_have_text('Built-in example')
        assert not external, f'Unrequested runtime/model network traffic: {external}'
        page.locator('#hintLocalSettingsButton').click()
        page.locator('#loadSavedLocalModelButton').click()
        expect(page.locator('#localModelStatus')).to_contain_text('No complete saved copy')
        page.locator('#localModelDiagnostics summary').click()
        expect(page.locator('#localModelDiagnosticsText')).to_contain_text('No complete saved copy')
        assert not external, 'Saved-only missing-model lookup contacted a CDN'
        page.locator('#closeLocalModelButton').click(); page.locator('#doneHintButton').click()
        saved = page.evaluate('localStorage.getItem("imprompt:deck-state:v1")')
        context.set_offline(True)
        page.reload(wait_until='load')
        page.locator('#enterButton').click(); page.locator('#startSessionButton').click()
        page.locator('#stanceCard').click(); page.locator('#stanceNudgeButton').click()
        expect(page.locator('#hintSource')).to_have_text('Built-in example')
        assert page.evaluate('localStorage.getItem("imprompt:deck-state:v1")') == saved
        assert not errors, errors
        browser.close()
    print('PASS: HTTP hosting; default isolation headers; real service-worker install; v0.22.1 app cache; offline reload and hints; preserved deck; saved-only failure diagnostics; no unsolicited CDN/model request.')
    print('No model inference was run in this deployment test.')
finally:
    server.terminate()
    try:
        server.wait(timeout=5)
    except subprocess.TimeoutExpired:
        server.kill(); server.wait()
