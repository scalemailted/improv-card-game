
## Standing campaign driver (shared execution allowance)

`tools/local-audit-campaign.cjs` is a thin continuation wrapper around the existing runner. The five-batch maximum remains a per-queue size; it is not a human approval boundary for the standing campaign. Subsequent queues discover actual pending single-card keys and exclude all completed or exception keys already reserved by prior queues. They export exact instructions and both alternatives with blank ratings before invoking the normal runner. An unfinished queue is resumed, never skipped.

The campaign inherits the first queue's 240-minute ceiling, including its already consumed time. All queue elapsed times and campaign orchestration overhead are deducted from that single ceiling. A new queue receives only the remainder. Budgets are never renewed automatically. Exhaustion saves and stops; repeating resume does not reset it. Operator-supplied future execution allowances must be explicitly recorded separately, without a new editorial brief or changes to correction gates.

Resume command:

    node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex 'C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe' --exclusive-editor

`status` reports the same campaign without model calls. A private coordinator lock prevents competing coordinators; the existing repository lock still permits only one integration writer. `recover-lock --campaign ...` applies the existing dead-owner checks to the coordinator lock; the repository runner's own recovery remains separate.

Actual Codex usage/authentication/permission errors stop the runner as non-isolatable limits before another technical retry or later batch. No credentials, authentication or global permissions are changed.

The existing integration adapter handles singles only. Exact pairs remain a subsequent pending phase; no pair execution or review is claimed by this wrapper. If all singles are processed before the allowance ends, it reports the missing exact-pair integration adapter explicitly rather than treating rebuilt pairs as reviewed.
