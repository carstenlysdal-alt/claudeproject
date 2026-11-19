# Business Pro × DI-mock: links og filer

Opdateret 19. november 2026.

Den seneste Business/Pro/DI-demo er beskrevet i [ybusiness-demo-guide.md](ybusiness-demo-guide.md). Git-versionen er videreudviklet med Y-designtokens, demo-adgang, Pro-landingsside og dynamisk branchekuratering. Onlineadresserne nedenfor er de eksisterende publiceringsadresser; et Git-push opdaterer ikke Firebase-kopierne.

## Online

| Hvad | Link | Må deles med |
|---|---|---|
| DI-mockup: Business, Business Pro med branchevalg og syv DI-artikler | https://sndeepdive.web.app/mockups/ybusiness-di-artikler.html | DI og eksterne. Uden login, markeret noindex. |
| Masterkonceptet med fanen DI-mockup | https://ybusiness-dashboard-production.up.railway.app/#dimock | Kun internt. Indeholder fanen Intern med priser og pakker. Uden login; et videresendt masterlink giver adgang. |

## Som filer

- `Y-Business-Pro-DI-demo.zip`: den seneste Business/Pro/DI-demo med alle nødvendige filer. Pak hele arkivet ud, og åbn `ybusiness-di-artikler.html`.
- `ybusiness-di-artikler.html`: hovedfilen. `ydk-tokens.css`, `ybusiness-platform.css` og `ybusiness-platform.js` skal ligge ved siden af den. Internet bruges til skrifttyper og enkelte billeder.
- `DI-mock-hele-siden.zip`: det tidligere dashboard og artikelsite samlet. Dette ældre arkiv er ikke opdateret med redesignet fra 19. november.

## Husk

- Fotografnavne og licens på Unsplash-fotos er læst af et værktøj og skal kontrolleres, før mockuppen deles bredt.
- Mærkningen "Uafhængig journalistik fra Business Pro, vist i samarbejde med DI" er en arbejdsformulering. Y har ikke vedtaget en mærkningspolitik.
- Masterkonceptets iframe bruger den tilhørende `ybusiness-di-artikler.html`. Opdater hovedfilen og de tre tilhørende CSS/JavaScript-filer i både `SN-DeepDive/public/mockups/` og `SN-DeepDive/public/75836d729e295551/` samt deres `dist/`-kopier før publicering. Delingsknappen bruger den særskilte offentlige mockup-adresse.

## Railway-master

Masterkonceptet kører på Railway fra GitHub-repoet `carstenlysdal-alt/claudeproject`, branch `main`. En opdatering af Firebase ændrer ikke Railway-masteren. Publicér de opdaterede `projects/ydkbusiness/output/ybusiness-master.html` og `ybusiness-di-artikler.html` til denne branch, og kontrollér derefter både Railway-roden og mockupfilen. Bevar de seneste ændringer på remote `main`.
