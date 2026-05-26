# Setup-noter

## SlideSpeak API-nøgle — AFVENTER

Macens interne disk er fuld (232 MB ledigt). ~/.zshrc kunne ikke oprettes.
Når du har frigivet diskplads, kør:

```
echo 'export SLIDESPEAK_API_KEY=din-nøgle-her' >> ~/.zshrc
source ~/.zshrc
```

Hent API-nøgle på: slidespeak.co/slidespeak-api

## Google Drive-backup

Backup-mappe: https://drive.google.com/open?id=1ATVkes-f-nCr6eLfc9QkGIL7ZF6_gtq-

Cron job til automatisk eksport kl. 09 og 18 — afventer at der er diskplads:
```
crontab -e
# Indsæt:
0 9,18 * * * cp /Volumes/USB/APPS/claudeproject/projects/ydkbusiness/docs/*.md \
  ~/Google\ Drive/My\ Drive/YDK\ Business/ 2>/dev/null
```
