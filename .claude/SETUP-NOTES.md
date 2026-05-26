# Setup-noter

## Maskiner og arbejdsstier

Fortæl hvilken maskine du er på ved sessionstart — så bruger Claude automatisk den rigtige sti.

| Maskine | Arbejdssti | Git-kommando ved start |
|---|---|---|
| iMac (SSD) | `/Volumes/SSD Data/Gits/claudeproject/` | `cd "/Volumes/SSD Data/Gits/claudeproject" && git pull origin main` |
| MacBook Pro / MacBook Air | `~/Documents/pm-platform/` | `cd ~/Documents/pm-platform && git pull origin main` |

GitHub er den primære synkronisering mellem maskiner — altid `git pull` ved sessionstart og `git push` ved sessionslut.

---

## SlideSpeak API-nøgle — AFVENTER

~/.zshrc er oprettet med placeholder. Hent din nøgle på slidespeak.co/slidespeak-api og kør:

```
# Rediger ~/.zshrc og erstat 'din-nøgle-her' med din faktiske nøgle
nano ~/.zshrc
source ~/.zshrc
```

---

## Google Drive-struktur

Drive-rodmappe (Projekter): `~/Library/CloudStorage/GoogleDrive-carstenlysdal@gmail.com/Mit drev/Projekter/`

Projektmapper:
| Lokalt: projects/  | Drive-mappe | Link |
|--------------------|-------------|------|
| ydkbusiness/       | YDK/        | https://drive.google.com/open?id=1ATVkes-f-nCr6eLfc9QkGIL7ZF6_gtq- |
| pocket-drummer/           | Pocket Drummer/    | https://drive.google.com/drive/folders/1qIxAHMHfSOVWj9MaYsyx1AqXC5uZU9v0 |

---

## Google Drive-synkronisering

**iMac:** Manuel kørsel efter behov.
Script: `~/Library/Scripts/ydkbusiness-drive-sync.sh`
Log: `~/Library/Logs/ydkbusiness-sync.log`

Scriptet springer over hvis Drive ikke er mountet. Synkroniserer `docs/`, `output/` og `research/`.

```
~/Library/Scripts/ydkbusiness-drive-sync.sh
```

---

## Faktisk mappestruktur

```
claudeproject/
├── CLAUDE.md                          ← global platform-kontekst og persona
├── PM-Platform-Installationsguide.docx
├── skills-lock.json                   ← låst skills-version
│
├── .claude/
│   ├── SETUP-NOTES.md                 ← denne fil
│   └── skills/
│       ├── deanpeters/                ← 46 PM-frameworks (roadmap, PRD, JTBD m.fl.)
│       ├── content-strategy/
│       ├── executing-plans/
│       ├── frontend-slides/
│       ├── grill-me/
│       ├── grill-with-docs/
│       ├── impeccable/
│       ├── launch/
│       ├── revops/
│       ├── sales-enablement/
│       ├── slidespeak/
│       ├── web-design-guidelines/
│       ├── zoom-out/
│       └── custom/
│           ├── design-prompt/
│           ├── document-quality/
│           ├── prompt-creator/
│           └── research-brief/
│
├── .agents/
│   └── skills/                        ← spejling af .claude/skills/ til Agent SDK
│       └── [samme skills som ovenfor]
│
└── projects/
    ├── ydkbusiness/                   ← Y.dk Business-sektion
    │   ├── CLAUDE.md                  ← projektkontekst
    │   ├── docs/
    │   │   ├── feature-overblik.md
    │   │   ├── features-spec.md
    │   │   ├── koncept-ydkbusiness.md
    │   │   ├── positioning-statement.md
    │   │   ├── projekt-y-kontekst.md
    │   │   └── roadmap.md
    │   ├── output/
    │   │   ├── PRE-READ_ledelsesmoede-juni-2026.md
    │   │   └── opgaver-commercial-tech-lead.md
    │   └── research/
    │       ├── markedsanalyse-indsigter.md
    │       ├── markedsvalidering-indsigter.md
    │       ├── platformsundersoegelse-indsigter.md
    │       └── prompt-platformsundersoegelse.md
    └── pocket-drummer/                       ← Pocket Drummer læringsplatform
        ├── CLAUDE.md                  ← projektkontekst
        ├── docs/
        ├── output/
        └── research/
```

**Forskel på .claude/skills/ og .agents/skills/:** `.claude/skills/` aktiveres af Claude Code CLI. `.agents/skills/` aktiveres af Agent SDK. Indholdet er identisk — begge skal opdateres ved tilføjelse af nye skills.

---

## Tilføj nyt projekt — tjekliste

1. Lokalt: `mkdir -p projects/[navn]/{docs,output,research}`
2. Lokalt: opret `projects/[navn]/CLAUDE.md` med projektkontekst
3. Drive: opret mappe under Projekter/ med projektets navn
4. Drive: opret undermapper docs/, output/, research/ inde i projektmappen
5. Tilføj rsync-kommandoer til Drive-synkronisering-sektionen ovenfor
6. Opdatér projekttabellen i Google Drive-struktur-sektionen ovenfor
7. Opdatér projekttabellen i CLAUDE.md
8. Opdatér mappestrukturen i denne fil
9. Git: commit og push
