# Pocket Drummer — Product Context

## Product Purpose
Abonnementsbaseret trommelæringsplatform for det danske marked. Kombinerer struktureret øvelsesbibliotek med AI-coaching (Claude API) for at gøre trommeøvelse mere engagerende og effektiv.

## Register
product

## Users
- Primær: danske trommespillere på alle niveauer (begynder til øvet)
- Alder: 15-45 år
- Device: primært mobil og tablet, sekundært desktop
- Kontekst: øvesession derhjemme, ofte i stille omgivelser med trommesættet foran sig

## Brand
- Navn: Pocket Drummer (app-intern: tidl. "DRUMM.")
- Tone: direkte, motiverende, præcis — ikke akademisk
- Anti-references: generisk SaaS-design, overdrevet gamification, neon-on-black

## Core Flows
1. Onboarding (4 trin): mål-tags → niveau → praksis-commitment → AI-plan generering
2. Dashboard / Home: daglig anbefaling, ugentlig tracker, kategori-kort
3. Øvelsesbibliotek: søgbar grid, sværhedsgrad-filtrering
4. Studio Kit: virtuelle trommer (3x3), keyboard-shortcuts, Web Audio API
5. AI Coach: premium-gated, personaliseret feedback

## Business Model
Freemium: 10 gratis begynder-lektioner → 4 ugers trial → 50 kr/mnd

## Tech Stack
Next.js 16 (App Router), TypeScript, Tone.js, OSMD/VexFlow, Cloud Firestore, Claude API

## Strategic Principles
- Mobilresponsivitet er ikke nice-to-have — det er krav
- AI-plan skal føles personlig, ikke generisk
- Onboarding skal konvertere til trial-aktivering
