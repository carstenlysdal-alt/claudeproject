---
name: redaktion-indhold
description: "Aktivér dette bundle ved redaktionelt arbejde, artikler, SoMe-opslag, e-mails, pitches, pressemeddelelser, content-produktion og redaktionelle produktkoncepter på dansk. Trigger: 'skriv en artikel', 'klumme', 'leder', 'SoMe-opslag', 'pressemeddelelse', 'nyhedsbrev', 'pitch', 'redaktionel tekst', 'redaktionelt koncept', 'indholdsstrategi for platform'."
metadata:
  version: 1.0.0
  type: bundle
---

# Redaktion & Indhold Bundle

Samler alle skills til professionel tekstproduktion og indholdsstrategi på dansk.

## Skills i dette bundle

### Redaktionel strategi og produktkoncept
| Skill | Aktivér når |
|---|---|
| `redaktionelt-koncept` | Redaktionelt produktkoncept til AI-drevet nyhedsplatform — pillars, kildestruktur, verificeringsmodel, KPI'er |
| `content-strategy` | Content pillars, topic clusters, redaktionel kalender |
| `research-brief` | Specificér manglende ekstern viden inden konceptet færdiggøres |

### Redaktionel tekstproduktion
| Skill | Aktivér når |
|---|---|
| `redaktionel-tekst` | Artikler, klummer, ledere, pitches, pressemeddelelser på dansk |
| `edit-article` | Redigér og løft en eksisterende artikel — struktur, tempo, præcision |
| `copywriting` | Konverteringstekst: headlines, CTAs, landing pages (primært engelsk) |
| `copy-editing` | Korrektur og sprogrensning af eksisterende tekst |
| `doc-coauthoring` | Fælles redigering og iterativ dokumentudvikling |

### Narrativ struktur og skriveteknik
| Skill | Aktivér når |
|---|---|
| `writing-shape` | Definer tekstens overordnede form og dramaturgi inden skriveprocessen |
| `writing-beats` | Nedbryd teksten i beats — de afgørende øjeblikke der driver læseren frem |
| `writing-fragments` | Skriv og iterér på fragmenter — sætninger og afsnit — inden de samles |

### Distribution og produktion
| Skill | Aktivér når |
|---|---|
| `social` | SoMe-opslag til LinkedIn, Twitter/X, Instagram |
| `emails` | Nyhedsbreve, drip-kampagner, redaktionelle e-mails |

### Prompts og AI-assisteret produktion
| Skill | Aktivér når |
|---|---|
| `prompt-creator` | Lav en skarp prompt til Claude, GPT eller Gemini |
| `design-prompt` | Designprompt til Gamma, Midjourney, Canva AI |

## Teksttyper og hvilken skill der bruges

| Teksttype | Primær skill | Supplement |
|---|---|---|
| Artikel / klumme / leder | `redaktionel-tekst` | `copy-editing` til revision |
| SoMe-opslag (LinkedIn, X) | `social` | `redaktionel-tekst` til langt format |
| Nyhedsbrev / e-mail | `emails` | `redaktionel-tekst` til editorial tone |
| Pressemeddelelse | `redaktionel-tekst` | `product-manager-skills:press-release` |
| Landing page copy | `copywriting` | `cro` til konverteringsoptimering |
| Pitch til CEO/investor | `sales-enablement` | `redaktionel-tekst` til narrativ |
| Redaktionelt produktkoncept | `redaktionelt-koncept` | `document-quality` til C-suite-løft |

## Brugsanvisning

1. Brug `redaktionelt-koncept` når opgaven er at definere en platforms redaktionelle model — ikke en enkelttekst.
2. Brug altid `redaktionel-tekst` til dansk redaktionelt indhold — ikke den generiske `copywriting`.
3. Kør `copy-editing` som afslutningstrin på vigtige dokumenter.
4. Kobl med `content-strategy` når enkeltteksten er del af en større plan.
