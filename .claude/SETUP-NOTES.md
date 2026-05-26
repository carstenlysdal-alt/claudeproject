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

---

## Google Drive-synkronisering

**iMac:** Ingen cron. Claude synkroniserer manuelt til Drive i løbet af sessionen, efterhånden som der produceres output.

Rsync-kommandoer til manuel kørsel:
```
rsync -a "/Volumes/SSD Data/Gits/claudeproject/projects/ydkbusiness/docs/" \
  "$HOME/Library/CloudStorage/GoogleDrive-carstenlysdal@gmail.com/Mit drev/Projekter/YDK/docs/"
rsync -a "/Volumes/SSD Data/Gits/claudeproject/projects/ydkbusiness/output/" \
  "$HOME/Library/CloudStorage/GoogleDrive-carstenlysdal@gmail.com/Mit drev/Projekter/YDK/output/"
```

---

## Tilføj nyt projekt — tjekliste

1. Lokalt: `mkdir -p projects/[navn]/{docs,output,research}`
2. Lokalt: opret `projects/[navn]/CLAUDE.md` med projektkontekst
3. Drive: opret mappe under Projekter/ med projektets navn
4. Drive: opret undermapper docs/, output/, research/ inde i projektmappen
5. Cron: tilføj to nye rsync-linjer i crontab (`crontab -e`)
6. Opdatér projekttabellen ovenfor
7. Opdatér projekttabellen i CLAUDE.md
8. Git: commit og push
