# Imprompt v0.19.0 — Scene Craft Guide

v0.19.0 adds an in-app learning system for the central collaboration question raised during playtesting: how two performers with separate private Drives create one shared scene.

## Core teaching model

The guide now distinguishes:

- **Stance:** the performer’s private point of view
- **Drive:** the performer’s initial pressure
- **Shared pattern:** the repeatable cause-and-effect behavior discovered between both players, sometimes called the game of the scene

Its north-star language is:

> **Use the card to enter the scene. Use your partner to discover the scene.**

## Learn to Play refactor

The previous single rules list has become an accessible, mobile-first Scene Craft Guide with eight expandable sections:

1. Quick Start
2. Stance, Drive & Shared Pattern
3. How Two Drives Become One Scene
4. The Convergence Rule and five-step method
5. Secret Does Not Mean Cryptic
6. A Drive Is Not a Win Condition
7. Postmortem Questions
8. Coach Guidance

The two-Drive section describes three valid convergence patterns:

- Drives align
- Drives oppose
- One Drive becomes dominant while the other supports, resists, or supplies subtext

## Contextual access

- Active play now includes a compact **How two Drives become one scene** control.
- It opens the exact relevant guide section and returns to the current scene afterward.
- The Scene Log now shows a postmortem callout after at least one completed scene.
- The callout opens the guide’s reflection section and returns to the Scene Log afterward.
- The top Learn button still opens the Quick Start section from the main menu.

## Concealed-card language

The generic Stance panel now describes **your private point of view**.

The generic Drive panel now describes **your initial pressure**:

> What you pursue, protect, avoid, discover, or repeat. Let it bend when the scene finds a shared pattern.

This reduces the risk that players interpret a Drive as a mission that must be completed or a separate personal game of the scene.

## Data and library stability

This release changes no playable card content:

- 240 Stances remain active
- 240 Drives remain active
- all 480 stable IDs are unchanged
- no title, instruction, category, subtheme, pack status, or card `contentVersion` changed
- immutable Scene Log snapshots remain backward-compatible
- v0.18 editorial-readiness evidence remains authoritative

## Offline and release contract

- Asset query version: `0.19.0`
- Service-worker cache: `imprompt-v0.19.0`
- The guide uses native HTML disclosure controls and requires no external framework or network service.
- The app remains fully client-side and offline-capable.

## Validation

The release adds automated coverage for:

- all eight guide sections
- the three two-Drive convergence patterns
- core teaching language
- contextual play and Scene Log links
- context-aware Learn navigation
- concealed Stance and Drive wording
- preservation of all 480 card records without v0.19 card-content mutations
- versioned asset and service-worker contracts
- mobile disclosure interaction and narrow-screen overflow
