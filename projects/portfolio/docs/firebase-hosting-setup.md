# Referat — Firebase Hosting-opsætning for carstenlysdal.dk

Formål: hoste portfolio-siden (`projects/portfolio/site/`) via Firebase Hosting på eget domæne `carstenlysdal.dk`.

## Status

**Live.** `https://carstenlysdal.dk` svarer 200 OK med gyldigt SSL-certifikat udstedt til `CN=carstenlysdal.dk` (Google Trust Services). Verifikationen gik igennem via Advanced/DNS-01-metoden efter at `_acme-challenge`-TXT-recorden var korrekt propageret.

## Proces, trin for trin

**1. Deploy til Firebase Hosting**
Firebase-projekt `portfolio-36137` fandtes allerede. Oprettede `.firebaserc` og `firebase.json` i `projects/portfolio/`, med `site/` som public dir og en rewrite-regel der server `lysdal-portfolio.html` for alle stier (siden har ingen `index.html`). Deploy kørt og bekræftet live på `https://portfolio-36137.web.app`.

**2. Domæne-research**
Brugeren ville have `carstenlysdal.dk` til at pege på Firebase-sitet. Domænet er registreret hos Dandomain.

**3. Dandomain viste sig at være domæne-kun**
Kontrolpanelet hos Dandomain havde ingen DNS-zone-editor — kun en side til at sætte navneservere. Det betyder Dandomain ikke kan holde de A- og TXT-records Firebase kræver. Løsning: flytte DNS-styringen til en ekstern udbyder.

**4. Cloudflare valgt som DNS-host**
Gratis Cloudflare-konto oprettet, domænet tilføjet, Cloudflare scannede og importerede eksisterende DNS-records. Cloudflare tildelte to nameservere:
- `dom.ns.cloudflare.com`
- `teagan.ns.cloudflare.com`

**5. Nameserver-skift hos Dandomain**
Brugeren skiftede navneservere under "Sæt navneservere" hos Dandomain fra `ns.dandomain.dk` / `ns2.dandomain.dk` til Cloudflares to nameservere.

**6. DNSSEC-komplikation opdaget**
Ved kontrol af `.dk`-registreringen viste det sig at der lå en aktiv DNSSEC DS-record for domænet. Da Cloudflare-siden ikke havde DNSSEC slået til, ville det mismatch have knækket DNS-validering for domænet, når nameserver-skiftet slog igennem (SERVFAIL for resolvers der validerer DNSSEC). Brugeren kunne ikke finde en DNSSEC-indstilling i Dandomains kontrolpanel og kontaktede i stedet Dandomain support for at få DS-recorden fjernet. Ved efterfølgende kontrol var DS-recorden væk fra registreringen.

**7. DNS-propagering**
Nameserver-skiftet blev fulgt løbende med `dig` mod flere offentlige resolvers (1.1.1.1, 8.8.8.8, 9.9.9.9, 208.67.222.222). Propageringen skete ujævnt — nogle resolvers viste Cloudflares nameservere flere timer før andre, herunder ironisk nok Cloudflares egen resolver 1.1.1.1, som var blandt de sidste til at opdatere. Cloudflare-dashboardet bekræftede til sidst "Your domain is now protected by Cloudflare".

**8. Custom domain tilføjet i Firebase**
Brugeren tilføjede `carstenlysdal.dk` som custom domain i Firebase Console (Hosting → portfolio-36137). Firebase krævede:
- A-record: `carstenlysdal.dk` → `199.36.158.100`
- TXT-record: `carstenlysdal.dk` → `hosting-site=portfolio-36137`
- Fjernelse af en gammel A-record der pegede på `212.237.249.17` (Dandomains parkeringsserver, importeret af Cloudflares scanning)

**9. Records lagt ind i Cloudflare**
A-recorden blev sat til **DNS only** (ikke proxied) — nødvendigt for at Firebase kan verificere og udstede SSL-certifikat korrekt. TXT-recorden blev tilføjet. Den gamle duplikerede A-record (`212.237.249.17`) på roddomænet blev slettet. En wildcard-record (`*.carstenlysdal.dk` → `212.237.249.17`) blev bevidst efterladt urørt, da den ikke påvirker roddomænet.

**10. Første verifikationsforsøg fejlede**
Firebases "Quick setup" bruger en HTTP GET-baseret ACME-udfordring. Verifikation fejlede gentagne gange med:
```
One or more of Hosting's HTTP GET request for the ACME challenge failed: 212.237.249.17: 404 Not Found
```
Diagnose: certifikatudstedere validerer domæne-ejerskab fra flere netværkslokationer globalt ("multi-perspective validation") for at forhindre DNS/BGP-hijacking af certifikater. Selvom fire store resolvers viste korrekt DNS, kunne enkelte andre lokationer stadig have den gamle nameserver-delegering i cache (NS-delegeringer hos `.dk`-registreringen kan have TTL på op til 24-48 timer) og dermed ramme den gamle Dandomain-server.

**11. Skift til Advanced/DNS-01-verifikation**
For at omgå HTTP-baseret propageringsfølsomhed skiftede vi til Firebases "Advanced setup mode", som bruger DNS TXT-validering (DNS-01) i stedet. Denne kræver en ekstra record:
- TXT: `_acme-challenge` → unik værdi vist i Firebase Console

**12. `_acme-challenge`-recorden propagerede til sidst**
Brugeren tilføjede recorden i Cloudflare; den var i en periode ikke synlig i `dig`-opslag mod 1.1.1.1, 8.8.8.8 og 9.9.9.9, og et Verify-forsøg fejlede stadig med den gamle 404-fejl. Efter yderligere propageringstid slog recorden igennem, og et efterfølgende Verify-forsøg lykkedes. Firebase udstedte SSL-certifikatet, og `https://carstenlysdal.dk` blev bekræftet live med certifikat udstedt til `CN=carstenlysdal.dk`.

## Kendte faldgruber at være opmærksom på fremover

- **Cloudflare Name-felt:** skriv kun `_acme-challenge`, ikke `_acme-challenge.carstenlysdal.dk` — Cloudflare tilføjer selv roddomænet bagved. Skriver man det fulde navn, lander recorden fejlagtigt på `_acme-challenge.carstenlysdal.dk.carstenlysdal.dk`.
- **Proxy-status:** A-recorden for roddomænet skal stå til **DNS only**, aldrig Proxied, så længe sitet er hostet på Firebase.
- **Firebases `_acme-challenge`-værdi regenereres** ved nye forsøg — brug altid den værdi der står i dialogen lige nu, ikke en tidligere kopieret værdi.

## Eventuel oprydning (valgfrit, ikke hastende)

- Den efterladte wildcard-record (`*.carstenlysdal.dk` → `212.237.249.17`) peger stadig på Dandomains gamle parkeringsserver. Den forstyrrer ikke roddomænet, men bør ryddes op hvis subdomæner ikke skal bruges.
- `www.carstenlysdal.dk` er ikke sat op til at pege på Firebase — kan tilføjes som ekstra custom domain i Firebase Console hvis ønsket.

## Reference — opsætning og kommandoer

- **Firebase-projekt:** `portfolio-36137`
- **Config-filer:** `projects/portfolio/.firebaserc`, `projects/portfolio/firebase.json`
- **DNS-host:** Cloudflare (gratis plan)
- **Nameservere:** `dom.ns.cloudflare.com`, `teagan.ns.cloudflare.com`

```bash
# Deploy
cd "projects/portfolio" && firebase deploy --only hosting --project portfolio-36137

# DNS-status
dig +short A carstenlysdal.dk @8.8.8.8
dig +short TXT carstenlysdal.dk @8.8.8.8
dig +short TXT _acme-challenge.carstenlysdal.dk @8.8.8.8
dig +short NS carstenlysdal.dk @8.8.8.8

# Tjek hvilket SSL-certifikat der reelt serveres
echo | openssl s_client -connect carstenlysdal.dk:443 -servername carstenlysdal.dk 2>/dev/null | openssl x509 -noout -subject -issuer -dates
```
