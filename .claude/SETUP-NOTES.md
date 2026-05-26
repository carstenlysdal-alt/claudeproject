# Setup-noter

## SlideSpeak API-nøgle — AFVENTER

Macens interne disk er fuld (232 MB ledigt). ~/.zshrc kunne ikke oprettes.
Når du har frigivet diskplads, kør:

```
echo 'export SLIDESPEAK_API_KEY=din-nøgle-her' >> ~/.zshrc
source ~/.zshrc
```

Hent API-nøgle på: slidespeak.co/slidespeak-api

---

## Google Drive-struktur

Rodmappe: https://drive.google.com/open?id=1v2Jy6hN6eCjRaS4rzBxUa4YysEL6EVqZ

Projektmapper under rod:
| Lokalt: projects/       | Drive-mappe | Link |
|------------------------|-------------|------|
| ydkbusiness/           | YDK/        | https://drive.google.com/open?id=1ATVkes-f-nCr6eLfc9QkGIL7ZF6_gtq- |

Hvert nyt projekt tilføjes som en ny linje i tabellen ovenfor.

Mapper pr. projekt: docs/ · output/ · research/

---

## Cron job — automatisk sync kl. 09 og 18

Afventer diskplads på intern disk. Når plads er frigjort:

```
crontab -e
```

Indsæt disse linjer (én pr. projekt):

```
# YDK — Y.dk Business-sektion
0 9,18 * * * rsync -a /Volumes/USB/APPS/claudeproject/projects/ydkbusiness/docs/ \
  ~/Google\ Drive/My\ Drive/PM\ Platform/YDK/docs/ 2>/dev/null
0 9,18 * * * rsync -a /Volumes/USB/APPS/claudeproject/projects/ydkbusiness/output/ \
  ~/Google\ Drive/My\ Drive/PM\ Platform/YDK/output/ 2>/dev/null
```

Når nyt projekt tilføjes: kopiér blokken, ret projektmappe og Drive-sti.

---

## Tilføj nyt projekt — tjekliste

1. Lokalt: `mkdir -p projects/[projektnavn]/{docs,output,research}`
2. Lokalt: opret `projects/[projektnavn]/CLAUDE.md` med projektkontekst
3. Drive: opret mappe under PM Platform-roden med projektets navn
4. Drive: opret undermapper docs/, output/, research/ inde i projektmappen
5. Cron: tilføj ny rsync-blok i crontab
6. SETUP-NOTES.md: tilføj ny linje i projekttabellen ovenfor
7. Git: commit og push
