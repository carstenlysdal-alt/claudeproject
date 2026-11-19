# Y Business, Business Pro og DI · interaktiv demo

Opdateret 19. november 2026. Videreudvikling af `ybusiness-di-artikler.html` med de vedlagte Y-designtokens. Eksisterende historier, billeder og DI-artikler er bevaret.

## Åbn demoen

Åbn `ybusiness-di-artikler.html` i en browser. Behold disse filer i samme mappe:

- `ybusiness-di-artikler.html` · indhold, billeder og eksisterende artikelrenderer
- `ydk-tokens.css` · den vedlagte Y-CSS, uændret
- `ybusiness-platform.css` · layout og komponenter til Business-platformen
- `ybusiness-platform.js` · navigation, kuratering, demo-adgang og værktøjer

`Y-Business-Pro-DI-demo.zip` indeholder filerne, denne guide og `ydk-design-system.md`. Pak hele arkivet ud før åbning. Der er ingen buildproces. Internet bruges til Google Fonts og enkelte eksisterende billeder; de øvrige fotos ligger indlejret i HTML-filen.

Til lokal server i outputmappen:

```sh
PORT=3108 SERVE_FILE=ybusiness-di-artikler.html node server.js
```

Åbn derefter <http://localhost:3108/>. `server.js` er repositoryets eksisterende server; den er ikke nødvendig for at åbne den udpakkede fil lokalt.

## Et kort præsentationsforløb

1. Start på **Business** som **Ikke-abonnent**. Vis de eksisterende nyheder, analysen, Pro-banneret, markedstal, DI-indgangen og værktøjspreviews.
2. Vælg **Pro** i hovedmenuen. Landingssiden forklarer produktet og viser eksempelpakkerne fra den eksisterende servicedemo.
3. Vælg **Business Pro** i undermenuen. Forsiden viser en bred redaktionel kuratering, som også kan opdages uden abonnement.
4. Vælg **Brancher → Byggeri**. Aarsleff-historien og øvrige byggerisager prioriteres i det samme layout. Finans, Analyse, Brancherapporter og Værktøjer følger branchen. **Alle brancher** vender tilbage til den brede forside.
5. Klik en låst historie eller et værktøj. Gennemgå betalingsmuren og det simulerede abonnementsflow. Adgang fører tilbage til den valgte historie, rapport eller det valgte værktøj.
6. Åbn **DI-medlem**. Almindelig Pro-adgang giver ikke DI-adgang. Login og simuleret medlemsverifikation åbner den eksisterende DI-afdeling.
7. Prøv demo-toggle øverst: **Ikke-abonnent**, **Business Pro**, **DI-medlem**. Skift tilbage til ikke-abonnent for at vise, at indholdet låses igen.

De fire værktøjer demonstrerer morgenbrief, søgbare medieomtaler, markedssignaler og geografisk filtrering af udbud. Rapportuddrag kan hentes som en tekstfil. Kurser, udbud, virksomhedshændelser og nye rapportuddrag er tydeligt mærket som demoindhold.

## Direkte visninger

| Visning | Hash efter filnavnet |
|---|---|
| Business | `#business` |
| Pro-produkt og adgang | `#pro` |
| Bred Pro-kuratering | `#pro-overblik` |
| Byggeri | `#byggeri` |
| Byggeri · Analyse | `#byggeri?f=analyse` |
| Byggeri · Brancherapporter | `#byggeri?f=rapporter` |
| Byggeri · Værktøjer | `#byggeri?f=vaerktoejer` |
| Personligt værktøjsoverblik | `#mit-pro` |
| DI-univers | `#forside` |

## Afgrænsning

Adgangsstatus gemmes lokalt i browseren. Login, betaling og DI-verifikation er præsentationsflows uden eksterne kald eller virkelige abonnementer. Demo-toggle giver samlet adgang til Pro-værktøjer; [servicedemoen](https://ybuisness-commercial-production.up.railway.app/) skelner mellem Pro og Pro+. Pakkepriserne er eksempler hentet fra denne servicedemo.

Eksisterende eksempelartikler er bevaret og er ikke aktualitetskontrolleret som led i redesignet. Designfilerne er det leverede CSS-udtræk fra Y, ikke Y's originale applikationskode.

## Kontrol og vedligehold

Regressionstestene bruger Node og jsdom i en særskilt testmappe; demoen kræver ingen npm-pakker:

```sh
cd tests
npm ci
npm test
```

Testene dækker adgangsskift, betalingsmur, login, DI-verifikation, branchekuratering, filtre, værktøjer, genoptagelse af valgt indhold og alle visninger i de tre adgangstilstande. Desktop og mobil kontrolleres desuden visuelt i browseren.

Ved publicering skal alle fire runtimefiler ovenfor lægges i samme mappe. De ældre dashboard-ZIP-filer og kopier i andre mapper opdateres ikke automatisk ved et Git-push.
