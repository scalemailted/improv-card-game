# Canonical scene authoring sources

Edit these JSON files, not `examples/data/`. Run `npm run build:examples` and `npm run audit:all` afterward.

- `single-scenes.json`: two actual A–B–A exchanges for all 480 cards, exact instruction snapshots and fingerprints. Drive examples additionally record a concrete transferable object.
- `stance-transfers.json`: one individually authored transfer method per Stance, deriving behavior from its individual scenes. Reviewed seed hashes guard against unacknowledged changes.
- `pair-scenes.json`: complete replacement scenes keyed by `StanceID+DriveID`, with source scene references and reviewed card fingerprints. Use for combinations where composition is awkward.

These files are authoring data, never loaded by the player app. All compiled pair records identify their source single scenes. The browser displays complete stored records. See `docs/OFFLINE-ACT-IT-OUT-LIBRARY.md` for provenance and review boundaries.
