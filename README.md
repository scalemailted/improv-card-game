# Two Secrets — Improv Card Game

A mobile-first, client-side prototype for two-person improv scenes. Each player opens the app on their own phone and privately draws:

- **1 Stance** — how the character sees themself, the other person, or the situation.
- **1 Drive** — what the character wants, hides, or repeatedly does.

The prototype contains all **24 Stance cards** and **24 Drive cards** from deck version 0.1.

## What the prototype does

- Gives every browser its own independently shuffled decks.
- Draws one unused Stance and one unused Drive per hand.
- Keeps cards face-down until individually tapped.
- Automatically hides revealed cards whenever the page is sent to the background.
- Supports a no-penalty **Veto & redraw** action.
- Avoids repeats until the 24-card decks are exhausted, then reshuffles automatically.
- Stores progress locally in the browser—there is no account, room, shared state, tracking, or backend.
- Works offline after the first successful visit through its service worker.
- Can be installed to a phone's home screen when the browser supports web-app installation.

## Run locally

Because the service worker and manifest require HTTP rather than `file://`, serve the folder with a small local web server.

### Python

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

### VS Code

Open the folder and use any static-server extension, such as Live Server.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Put the files from this folder at the repository root. `index.html` must remain at the root.
3. Commit and push the files to the `main` branch.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and the root (`/`) folder, then save.
7. Open the Pages URL GitHub displays after deployment completes.

All asset links are relative, so the app works both at a user site such as `username.github.io` and at a project path such as `username.github.io/two-secrets/`.

## Independent deck behavior

The URL receives a local fragment such as:

```text
#deck=7QF4K9TA
```

The fragment identifies a saved shuffle **inside that browser only**. It is not a multiplayer room code and sends nothing across the network. The browser also remembers the active deck so reopening the base site—or launching an installed copy—returns to the same local progress. Selecting **New independent deck** replaces it with a new fragment and shuffle.

Different phones have separate browser storage, so they naturally draw from independent decks.

## File structure

```text
.
├── index.html
├── styles.css
├── cards.js
├── deck-engine.js
├── app.js
├── manifest.webmanifest
├── sw.js
├── .nojekyll
├── icons/
│   ├── icon.svg
│   ├── icon-192.png
│   └── icon-512.png
└── tests/
    └── deck-engine.test.js
```

## Editing cards

All card copy is in `cards.js`. Keep each ID unique and preserve the `stances` and `drives` arrays. If card IDs or deck sizes change after publishing, increment the state version in `deck-engine.js` and the cache name in `sw.js`.

## Test the deck engine

```bash
node tests/deck-engine.test.js
```

The test checks card counts, unique IDs, no repeated draws during a cycle, reshuffling, completion, veto behavior, and state validation.
