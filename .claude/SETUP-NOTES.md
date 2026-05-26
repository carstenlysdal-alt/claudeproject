# Setup-noter

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

## Cron job — aktivt

Kørende. Synkroniserer automatisk kl. 09 og 18.

Verificér med: `crontab -l`

Nuværende indhold:
```
0 9,18 * * * rsync -a "/Volumes/USB/APPS/claudeproject/projects/ydkbusiness/docs/" \
  "~/Library/CloudStorage/GoogleDrive-carstenlysdal@gmail.com/Mit drev/Projekter/YDK/docs/" 2>/dev/null
0 9,18 * * * rsync -a "/Volumes/USB/APPS/claudeproject/projects/ydkbusiness/output/" \
  "~/Library/CloudStorage/GoogleDrive-carstenlysdal@gmail.com/Mit drev/Projekter/YDK/output/" 2>/dev/null
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
