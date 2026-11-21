# Business Pro × DI-mock: links og filer

Opdateret 21. november 2026.

Alt ligger samlet på Railway og bygges fra GitHub-repoet `carstenlysdal-alt/claudeproject`, branch `main`. Et push til `main` opdaterer både masteren og mockuppen. Firebase-kopien på `sndeepdive.web.app` bruges ikke længere og opdateres ikke. Den seneste demo er beskrevet i [ybusiness-demo-guide.md](ybusiness-demo-guide.md).

## Online (Railway)

| Hvad | Link | Må deles med |
|---|---|---|
| Masterkonceptet med fanen DI-mockup | https://ybusiness-dashboard-production.up.railway.app/#dimock | Kun internt. Indeholder fanen Intern med priser og pakker. Uden login; et videresendt masterlink giver adgang. |
| Mockuppen alene: Y-forside, Business, Business Pro og DI | https://ybusiness-dashboard-production.up.railway.app/ybusiness-di-artikler.html | Kan sendes til DI. Uden login, markeret noindex. Viser ikke masterens priser og interne faner. |

Delingsknappen i masteren ("Kopiér link", "Åbn i nyt vindue") peger på mockuppen alene på samme Railway-adresse.

## Som filer

- `ybusiness-di-artikler.html`: hovedfilen. `ydk-tokens.css`, `ybusiness-platform.css`, `ybusiness-platform.js` og mappen `business-pro/` skal ligge ved siden af den. Internet bruges til skrifttyper og enkelte billeder.
- `Y-Business-Pro-DI-demo.zip` og `DI-mock-hele-siden.zip` er ældre arkiver og er ikke opdateret med redesignet fra 19.-21. november.

## Husk

- Fotografnavne og licens på Unsplash-fotos er læst af et værktøj og skal kontrolleres, før mockuppen deles bredt.
- Mærkningen "Uafhængig journalistik fra Business Pro, vist i samarbejde med DI" er en arbejdsformulering. Y har ikke vedtaget en mærkningspolitik.
- Railway-serveren (`server.js`) bruger kun sti-delen af adressen. Adresser som `ybusiness-platform.css?v=…` til cache-opdatering virker, og manglende filer med filendelse giver 404 og ikke masterens side.
