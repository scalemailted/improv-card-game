"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.resolve(__dirname, "../vendor/qrcode-core.js"), "utf8");
const context = { window: {}, globalThis: {} };
context.globalThis = context.window;
vm.createContext(context);
vm.runInContext(source, context);
const core = context.window.IMPROMPT_QR_CORE;
assert.ok(core && core.QRCode && core.ErrorCorrectLevel);

for (const text of [
  "https://scalemailted.github.io/improv-card-game/?xv=1&x=status-clash",
  "https://scalemailted.github.io/improv-card-game/?xv=1&x=custom&n=Calm+Versus+Chaos&m=p&l=1&v=h&s=Complementary+private+assignments&f=Practice+contrast&an=Calm&as=emotional-assumptions&ad=secrets-avoidance&bn=Chaos&bs=worldview-absurdity&bd=repeatable-behaviors"
]) {
  const qr = new core.QRCode(0, core.ErrorCorrectLevel.M);
  qr.addData(text);
  qr.make();
  assert.ok(qr.getModuleCount() >= 21);
  let dark = 0;
  for (let row = 0; row < qr.getModuleCount(); row += 1) {
    for (let column = 0; column < qr.getModuleCount(); column += 1) {
      dark += Number(qr.isDark(row, column));
    }
  }
  assert.ok(dark > 100);
}

console.log("✓ Bundled offline QR core creates preset and custom exercise matrices");
