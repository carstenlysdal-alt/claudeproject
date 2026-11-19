/* Interaktivt demolag. Genbruger den eksisterende mocks artikler, billeder og artikelrenderer.
   Adgangstilstande er kun en lokal præsentationssimulation, ikke en sikkerhedsgrænse. */
(() => {
  'use strict';
  const SERVICE_URL = 'https://ybuisness-commercial-production.up.railway.app/';
  const ACCESS_KEY = 'y-business-demo-access-v2';
  const ACCESS = { free: 'Ikke-abonnent', pro: 'Business Pro', di: 'DI-medlem' };
  const SECTORS = { byggeri: { label: 'Byggeri', lead: 'p0', related: ['p1', 'p4'], finance: ['p1', 'b7', 'b11'], analysis: ['p2', 'p3', 'p4'] } };
  const PREMIUM_B = new Set(['3', '6', '11']);
  let access = 'free', selectedTool = 'brief', dialogTrigger = null, toastTimer;
  try { const saved = localStorage.getItem(ACCESS_KEY); if (Object.hasOwn(ACCESS, saved)) access = saved; } catch (_) {}
  const isPro = () => access !== 'free';
  const mono = text => el('span', { class: 'eyebrow-label', text });
  const btn = (text, action, primary = false) => el('button', { type: 'button', class: primary ? 'cta-primary' : 'cta-secondary', text, onclick: action });
  const link = (text, href, primary = false) => el('a', { class: primary ? 'cta-primary' : 'cta-secondary', href, text });
  const chevron = () => iconSvg('<path d="m6 9 6 6 6-6"/>');
  function lock(open = false) {
    const svg = iconSvg(`<rect x="5" y="10" width="14" height="11" rx="2"/><path d="${open ? 'M8 10V6a4 4 0 0 1 7-2' : 'M8 10V6a4 4 0 0 1 8 0v4'}"/>`);
    svg.classList.add('lock-icon'); return svg;
  }
  function badge(kind = 'pro') {
    const allowed = kind === 'di' ? access === 'di' : isPro();
    return el('span', { class: 'access-label' }, lock(allowed), kind === 'di' ? (allowed ? 'DI · Adgang aktiv' : 'DI-medlem') : (allowed ? 'Pro · Adgang aktiv' : 'Business Pro'));
  }
  function route() {
    const [raw, query] = location.hash.slice(1).split('?');
    const name = raw || 'business';
    return { name, filter: new URLSearchParams(query).get('f') || 'alle', sector: name === 'byggeri' ? 'byggeri' : null };
  }
  function go(hash) {
    if (location.hash === hash) render(); else location.hash = hash;
  }
  function story(key) {
    if (/^b\d+$/.test(key) && BARTICLES[key.slice(1)]) {
      const id = key.slice(1), a = BARTICLES[id], p = BPHOTO[id];
      return { key, title: a.front || a.headline, fullTitle: a.headline, dek: a.manchet, label: a.kicker, img: PHOTO_DATA[p.photo] || `https://images.unsplash.com/${p.photo}?auto=format&fit=crop&w=1200&q=80`, alt: p.alt, premium: PREMIUM_B.has(id), minutes: readMinutes(a), credit: bCaption(id) };
    }
    if (/^p[0-4]$/.test(key)) {
      const n = Number(key.slice(1));
      const a = n === 0 ? { h: PRO.headline, p: PRO.dek, k: PRO.kicker, img: 'hero', body: PRO.body } : PRO.cards[n - 1];
      return { key, title: a.h, fullTitle: a.h, dek: a.p, label: a.k, img: PRO_IMG[a.img], alt: n === 0 ? 'Byggeplads med kran og fundamenter set fra oven.' : 'Illustrationsfoto til historien om ' + a.k.toLowerCase(), premium: true, minutes: Math.max(1, Math.round((a.body || '').split(/\s+/).length / 190)), credit: 'Illustrationsfoto · Arkiv / Unsplash' };
    }
    if (/^a[1-7]$/.test(key)) {
      const id = key.slice(1), a = ARTICLES[id];
      return { key, title: a.headline, fullTitle: a.headline, dek: a.manchet, label: a.kicker, img: IMAGES[id].src, alt: IMAGES[id].alt, premium: true, di: true, minutes: readMinutes(a), credit: IMAGES[id].caption };
    }
    return null;
  }
  function locked(key) { const a = story(key); return a && (a.di ? access !== 'di' : a.premium && !isPro()); }
  function photo(a, eager = false) {
    const img = el('img', { class: 'story-photo', src: a.img, alt: a.alt, loading: eager ? 'eager' : 'lazy', decoding: 'async' });
    img.addEventListener('error', () => {
      if (img.dataset.fallback) return;
      img.dataset.fallback = 'true';
      img.src = PRO_IMG.hero;
    });
    return img;
  }
  function card(key, { lead = false, description = true } = {}) {
    const a = story(key);
    return el('a', { class: 'story-card' + (lead ? ' curation-lead' : ''), href: '#' + key },
      photo(a, lead), mono(a.label), el(lead ? 'h2' : 'h3', { text: a.title }),
      description ? el('p', { text: a.dek }) : null,
      el('div', { class: 'story-meta' }, a.premium ? badge(a.di ? 'di' : 'pro') : el('span', { text: 'Fri adgang' }), el('span', { text: `· ${a.minutes} min.` })));
  }
  function intro(title, subtitle, pro = false) {
    return el('header', { class: 'section-intro' },
      el('div', {}, el('h1', {}, title, pro ? [' ', el('span', { class: 'pro-word', text: 'PRO' })] : null), el('p', { text: subtitle })),
      el('div', { class: 'edition-date' }, 'Torsdag 19. november 2026', el('br'), 'Redaktionel demo'));
  }
  function moduleHeader(title, subtitle, action = null) {
    return el('div', { class: 'module-header' }, el('div', {}, el('h2', { text: title }), subtitle ? el('p', { text: subtitle }) : null), action);
  }
  function promo() {
    return el('section', { class: 'pro-promo', 'aria-label': 'Business Pro' },
      el('div', {}, mono('Business Pro · Viden, du kan arbejde med'),
        el('h2', { text: isPro() ? 'Dit næste træk begynder med overblik.' : 'Bruger du Y i dit arbejde?' }),
        el('p', { text: 'Gå fra dagens nyheder til morgenbrief, analyser og signaler om din virksomhed og dit marked.' })),
      el('div', { class: 'cta-row' }, link(isPro() ? 'Åbn Mit Business Pro →' : 'Oplev Business Pro →', isPro() ? '#mit-pro' : '#pro', true)));
  }
  function markets(construction = false) {
    const datasets = construction ? {
      dag: [['Byggeomkostninger', '118,4', '+0,6 %'], ['Renoveringsindeks', '104,2', '+1,2 %'], ['Stålindeks', '112,8', '−0,3 %'], ['Udbud i byggeri', '24', 'Nye denne uge']],
      uge: [['Byggeomkostninger', '117,7', '+0,2 %'], ['Renoveringsindeks', '103,0', '+0,8 %'], ['Stålindeks', '113,1', '+0,1 %'], ['Udbud i byggeri', '18', 'Forrige uge']]
    } : {
      dag: [['OMX C25', '1.842,56', '+0,84 %'], ['S&P 500', '6.124,30', '+0,32 %'], ['EUR / DKK', '7,4603', '−0,01 %'], ['Brent · USD', '74,28', '−0,46 %']],
      uge: [['OMX C25', '1.827,21', '+1,24 %'], ['S&P 500', '6.104,77', '+0,91 %'], ['EUR / DKK', '7,4610', '+0,02 %'], ['Brent · USD', '74,62', '−1,12 %']]
    };
    const grid = el('div', { class: 'market-grid', 'aria-live': 'polite' });
    const controls = el('div', { class: 'market-periods', role: 'group', 'aria-label': 'Vælg datapunkt' });
    const update = period => {
      grid.replaceChildren(...datasets[period].map(([name, value, change]) => el('div', { class: 'market-item' }, mono(name), el('strong', { text: value }), el('small', { class: change.startsWith('−') ? 'market-down' : 'market-up', text: change }))));
      controls.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.period === period)));
    };
    for (const [period, label] of [['dag', 'I dag'], ['uge', 'Sidste uge']]) controls.append(el('button', { type: 'button', 'data-period': period, text: label, onclick: () => update(period) }));
    update('dag');
    return el('section', { class: 'market-strip', 'aria-label': construction ? 'Byggeriets nøgletal' : 'Markeder' },
      moduleHeader(construction ? 'Byggeriet i tal' : 'Markederne kort', 'Illustrative demodata · Ingen livekurser', controls), grid);
  }
  function diTeaser(compact = false) {
    return el('section', { class: 'di-teaser', 'aria-label': 'Dansk Industri' },
      el('div', { class: 'di-teaser-head' }, el('div', {}, mono('Dansk Industri · Medlemsindsigt'),
        el('h2', { text: 'Industriens næste træk' }),
        el('p', { text: 'Danske virksomhedscases, analyser og internationale perspektiver. Den eksisterende DI-afdeling samlet i dit Business-univers.' })),
        el('span', { class: 'di-logo' }, el('img', { src: DI_LOGO, alt: 'Dansk Industri', loading: 'lazy' }))),
      !compact ? el('div', { class: 'di-peeks' }, ['a1', 'a4', 'a5'].map(key => el('a', { class: 'di-peek', href: '#' + key }, mono(story(key).label), el('h3', { text: story(key).title }), badge('di')))) : null,
      el('div', { class: 'cta-row' },
        access === 'di' ? link('Åbn dit DI-univers →', '#forside', true) : btn('Er du DI-medlem? Få adgang til endnu flere fordele.', () => openLogin({ di: true, target: '#forside' }), true),
        access !== 'di' ? btn('Se, hvad medlemsadgangen giver', () => openDiInfo()) : null));
  }
  function reportModule(sector) {
    const construction = sector === 'byggeri';
    return el('section', { class: 'content-section', id: 'rapporter' },
      moduleHeader('Brancherapporter', construction ? 'Perspektiv på byggeriets næste beslutninger' : 'Dybde på tværs af dansk erhvervsliv'),
      el('div', { class: 'report-card' },
        el('div', { class: 'report-cover', 'aria-hidden': 'true' }, el('small', { text: 'Y Business Pro' }), el('strong', { text: construction ? 'BYG\nGERI' : 'UDSYN' }), el('small', { text: 'Rapport · Demo' })),
        el('div', {}, mono('Eksempelrapport · Demoindhold'), el('h3', { text: construction ? 'Robotter på byggepladsen. Skal vi med nu?' : 'AI, kapital og konkurrence: Hvad flytter erhvervslivet?' }),
          el('p', { text: construction ? 'Et interaktivt rapportuddrag med spørgsmål til din næste teknologiinvestering.' : 'Et rapportuddrag med perspektiver på investeringer, teknologi og de næste beslutninger.' }),
          btn(isPro() ? 'Åbn rapportuddrag →' : 'Se rapporten ' + '· Business Pro', () => isPro() ? openReport(construction) : openPaywall({ title: 'Brancherapporter', sector, report: true }), true))));
  }
  const TOOL_INFO = {
    brief: { tab: 'Morgenbrief', title: 'Dagens vigtigste. Før dit første møde.', text: 'Et redaktionelt overblik over historierne, der har betydning for din virksomhed og din branche.', label: 'Morgenbrief · 06.00' },
    media: { tab: 'MedieMonitor', title: 'Se, hvad andre skriver om jer.', text: 'Saml omtaler af jeres virksomhed, brands og nøglepersoner i ét overblik.', label: 'MedieMonitor · Omtaler' },
    market: { tab: 'MarkedsMonitor', title: 'Fang signalerne fra dit marked.', text: 'Følg ledelsesskift, regnskaber og bevægelser hos de virksomheder, der er vigtige for jer.', label: 'MarkedsMonitor · Virksomheder' },
    tender: { tab: 'UdbudsMatch', title: 'Find de opgaver, der passer til jer.', text: 'Se relevante udbud sorteret efter jeres branche og virksomhedsprofil.', label: 'UdbudsMatch · Byggeri' }
  };
  function toolLines(kind, construction) {
    if (kind === 'media') return [['Fagmedie · Eksempel', 'Bedre data er nøglen til byggeriets AI-kvantespring'], ['Virksomhed', 'Enemærke & Petersen A/S'], ['Omtaler', '3 nye eksempler']];
    if (kind === 'market') return [['Ledelse', 'Ny direktør hos en fulgt virksomhed'], ['Regnskab', 'Årsrapport klar til gennemgang'], ['Din overvågning', '5 virksomheder']];
    if (kind === 'tender') return [['Renovering', '480 almene boliger · Rødovre'], ['Match', '94 % · Demo'], ['Område', 'Hovedstaden']];
    return construction ? [['Dagens vigtigste', 'AI flytter ind i tilbudsafdelingen'], ['Analyse', 'Nye materialer og færre byggefejl'], ['Hold øje med', 'Investeringer i renovering']] : [['Dagens vigtigste', 'AI-boomet møder elnettets grænser'], ['Kapital', 'Teknologiinvesteringer i fokus'], ['Virksomheder', 'Ørsted jagter nye byggeprojekter']];
  }
  function toolsModule(sector) {
    const tabs = el('div', { class: 'tools-tabs', role: 'tablist', 'aria-label': 'Digitale værktøjer' });
    const panel = el('div', { id: 'tools-panel', role: 'tabpanel', tabindex: '0' });
    const update = (kind, focusTab = false) => {
      selectedTool = kind;
      tabs.querySelectorAll('button').forEach(b => {
        const on = b.dataset.tool === kind; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1;
        if (on && focusTab) b.focus();
      });
      panel.setAttribute('aria-labelledby', 'tool-tab-' + kind);
      const info = TOOL_INFO[kind];
      panel.replaceChildren(el('div', { class: 'tool-preview' },
        el('div', { class: 'tool-copy' }, mono(info.label), el('h3', { text: info.title }), el('p', { text: info.text }),
          btn(isPro() ? 'Åbn ' + info.tab + ' →' : 'Prøv værktøjet · Business Pro', () => isPro() ? openTool(kind, sector) : openPaywall({ title: info.tab, tool: kind, sector }), true)),
        el('div', { class: 'tool-screen' + (isPro() ? '' : ' is-locked') },
          el('div', { class: 'tool-screen-content', inert: !isPro(), 'aria-hidden': !isPro() ? 'true' : null },
            mono('Din virksomhed · Demoindhold'), ...toolLines(kind, sector === 'byggeri').map(([label, text]) => el('div', { class: 'tool-preview-line' }, el('span', { text: label }), el('strong', { text })))),
          !isPro() ? el('div', { class: 'tool-lock' }, lock(), el('span', { class: 'access-label', text: 'Lås op med Business Pro' })) : null)));
    };
    Object.entries(TOOL_INFO).forEach(([kind, info]) => tabs.append(el('button', { type: 'button', role: 'tab', id: 'tool-tab-' + kind, 'data-tool': kind, 'aria-controls': 'tools-panel', text: info.tab, onclick: () => update(kind) })));
    tabs.addEventListener('keydown', e => {
      const keys = Object.keys(TOOL_INFO), current = keys.indexOf(selectedTool);
      const next = e.key === 'ArrowRight' ? (current + 1) % keys.length : e.key === 'ArrowLeft' ? (current + keys.length - 1) % keys.length : e.key === 'Home' ? 0 : e.key === 'End' ? keys.length - 1 : null;
      if (next !== null) { e.preventDefault(); update(keys[next], true); }
    });
    update(selectedTool);
    return el('section', { id: 'vaerktoejer', class: 'content-section' }, moduleHeader('Dit arbejde. Med bedre overblik.', 'Digitale værktøjer fra Business Pro · Alle viste virksomhedsdata er demoindhold'), el('div', { class: 'tools-shell' }, tabs, panel));
  }
  function businessFront() {
    const original = renderBusinessFront();
    const topics = original.querySelector('.bf-topics');
    topics.querySelectorAll('.bf-pill').forEach((pill, i) => {
      const b = el('button', { type: 'button', class: 'bf-pill', 'aria-label': 'Åbn ' + ['Business AI', 'Reuters', 'Ritzau'][i] + '-overblik', onclick: () => openLive(i) });
      b.append(...pill.childNodes); pill.replaceWith(b);
    });
    const hero = original.querySelector('.bf-hero');
    original.querySelector('.bf-mint-top').append(badge());
    const oldHeading = hero.querySelector('h1'), newHeading = el('h2', { text: oldHeading.textContent });
    newHeading.className = 'business-hero-title'; oldHeading.replaceWith(newHeading);
    original.querySelector('.bf-more').remove();
    const people = original.querySelector('.bf-people'); people.remove();
    const peopleLinks = people.querySelector('.bf-people-links');
    peopleLinks.replaceChildren(btn('Mød redaktionen →', openEditorial), btn('Sådan bruger vi AI →', openEditorial));
    // Bevar originalens hovedhistorie, analyseboks, nyheder, Porsche-bånd og dagens tal.
    const businessRows = el('section', { class: 'bf', 'aria-label': 'Dagens historier' }, ...original.childNodes);
    const moreKeys = ['b6', 'b7', 'b8', 'b9', 'b10', 'b11'];
    return el('div', { class: 'platform-page' }, intro('Business', 'Nyhederne. Perspektivet. Dit næste træk.'), topics,
      businessRows, promo(), markets(),
      el('section', { class: 'content-section' }, moduleHeader('Virksomheder & verden', 'Nyheder, analyser og eksklusive historier', el('a', { class: 'text-link', href: '#international', text: 'Internationalt →' })), el('div', { class: 'card-grid' }, moreKeys.map(key => card(key)))),
      diTeaser(), toolsModule(null),
      el('section', { class: 'branch-feature' }, photo(story('p0')), el('div', {}, mono('Brancher · Byggeri'), el('h2', { text: 'Tættere på det, der bygger Danmark.' }), el('p', { text: 'Følg de vigtigste byggerihistorier, investeringer og teknologier. Samme Business Pro. Kurateret til din branche.' }), link('Udforsk Byggeri →', '#byggeri', true))),
      reportModule(null), people);
  }
  function curatedFront(r) {
    const sector = r.sector, spec = SECTORS[sector];
    const lead = spec ? spec.lead : 'b11', related = spec ? spec.related : ['b6', 'b7'];
    const validFilters = ['alle', 'finans', 'analyse', 'rapporter', 'vaerktoejer'];
    const filter = validFilters.includes(r.filter) ? r.filter : 'alle';
    const base = sector ? '#byggeri' : '#pro-overblik';
    const curation = el('div', { class: 'curation-bar', 'aria-label': 'Redaktionel kuratering' }, mono('Din kuratering'),
      el('a', { class: 'ydk-pill', href: '#pro-overblik', 'aria-current': !sector ? 'page' : null, 'aria-label': 'Bred Business Pro-kuratering' }, 'Alle brancher'),
      el('a', { class: 'ydk-pill', href: '#byggeri', 'aria-current': sector ? 'page' : null }, 'Byggeri'),
      el('span', { class: 'curation-note', text: sector ? 'Indholdet er prioriteret til Byggeri' : 'Det vigtigste på tværs af erhvervslivet' }));
    curation.querySelectorAll('a').forEach(a => a.classList.toggle('ydk-pill--active', a.hasAttribute('aria-current')));
    const categories = el('nav', { class: 'curation-bar', 'aria-label': 'Indholdsformater' },
      [['alle', 'Overblik'], ['finans', 'Finans'], ['analyse', 'Analyse'], ['rapporter', 'Brancherapporter'], ['vaerktoejer', 'Værktøjer']].map(([key, text]) => el('a', { class: 'ydk-pill' + (filter === key ? ' ydk-pill--active' : ''), href: base + (key === 'alle' ? '' : '?f=' + key), 'aria-current': filter === key ? 'page' : null, text })));
    const finance = spec ? spec.finance : ['b6', 'b8', 'b9'];
    const analysis = spec ? spec.analysis : ['b3', 'b1', 'b2'];
    const sections = [];
    if (filter === 'alle') sections.push(el('section', { class: 'curation-grid', 'aria-label': sector ? 'Byggeriets vigtigste historier' : 'Business Pro · Redaktionens udvalgte' }, card(lead, { lead: true, description: false }), el('div', { class: 'curation-side' }, related.map(key => card(key, { description: false })))));
    if (filter === 'alle') sections.push(markets(!!sector));
    if (filter === 'alle' || filter === 'finans') sections.push(el('section', { class: 'content-section' }, moduleHeader('Finans', sector ? 'Kapital, investeringer og opgaver i byggeriet' : 'Pengene og de virksomheder, der flytter dem'), el('div', { class: 'card-grid' }, finance.map(key => card(key)))));
    if (filter === 'alle' || filter === 'analyse') sections.push(el('section', { class: 'content-section' }, moduleHeader('Analyse', sector ? 'Teknologi og metoder under faglig lup' : 'Forstå konsekvenserne bag overskrifterne'), el('div', { class: 'card-grid' }, analysis.map(key => card(key)))));
    if (filter === 'alle' || filter === 'rapporter') sections.push(reportModule(sector));
    if (filter === 'alle' || filter === 'vaerktoejer') sections.push(toolsModule(sector));
    sections.push(diTeaser(filter !== 'alle'));
    return el('div', { class: 'platform-page curated-page' }, intro(sector ? 'Byggeri' : 'Business', sector ? 'Business Pro · Redaktionens vigtigste historier til din branche.' : 'Redaktionens vigtigste historier. På tværs af erhvervslivet.', true), curation, categories, ...sections);
  }
  function proLanding() {
    const values = [
      ['Morgenbrief · 06.00', 'Mød dagen med et forspring.', 'Det vigtigste fra din branche, kurateret og forklaret af redaktionen.'],
      ['MedieMonitor & MarkedsMonitor', 'Se mere end overskrifterne.', 'Følg omtaler af jer og signaler fra de virksomheder, der former jeres marked.'],
      ['UdbudsMatch & Brancherapporter', 'Fra indsigt til næste mulighed.', 'Find relevante udbud, og gå i dybden med analyser og rapporter. Inkluderet i Pro+.']
    ];
    return el('div', { class: 'platform-page' },
      el('section', { class: 'landing-hero' },
        el('div', {}, mono('Y Business Pro · Samme konto. Mere udsyn.'), el('h1', { text: 'Det vigtigste for din branche. Og din næste beslutning.' }),
          el('p', { text: 'Eksklusiv journalistik, morgenbrief og værktøjer, der samler din virksomhed og dit marked. AI overvåger og sorterer. Redaktionen vurderer og forklarer.' }),
          el('div', { class: 'cta-row' }, btn(isPro() ? 'Åbn dit Business Pro →' : 'Prøv Business Pro i demoen →', () => isPro() ? go('#pro-overblik') : openSubscribe(), true), link('Udforsk den redaktionelle forside', '#pro-overblik')),
          el('small', { text: 'Interaktiv produktdemo · Ingen betaling eller oprettelse af et rigtigt abonnement.' })),
        el('div', { class: 'landing-cockpit' }, mono('Mit Business Pro · Eksempel'), el('h2', { text: 'Godmorgen, Enemærke & Petersen.' }),
          ...toolLines('brief', true).map(([label, text]) => el('div', { class: 'tool-preview-line' }, el('span', { text: label }), el('strong', { text }))),
          el('div', { class: 'cta-row' }, btn('Se værktøjerne →', () => isPro() ? go('#mit-pro') : openPaywall({ title: 'Mit Business Pro', target: '#mit-pro' }))),
          el('p', { class: 'plan-note', text: 'Illustrativ virksomhed og eksempeldata' }))),
      el('section', { class: 'value-grid', 'aria-label': 'Værdien af Business Pro' }, values.map(([label, title, text]) => el('div', { class: 'value-card' }, mono(label), el('h3', { text: title }), el('p', { text })))),
      el('section', { class: 'content-section', id: 'priser' }, moduleHeader('Ét abonnement. Jeres branche.', 'Eksempelpriser og pakker fra servicedemoen · Ét CVR, én branche og fem brugere'),
        el('div', { class: 'plans' },
          el('article', { class: 'plan' }, mono('For virksomheden'), el('h3', { text: 'Business Pro' }), el('p', { class: 'plan-price' }, '5.000 kr. ', el('small', { text: '/ år ekskl. moms' })),
            el('ul', {}, ['Branchenyheder og morgenbrief', 'MedieMonitor og MarkedsMonitor', 'Business AI med kilder', 'Én branche og fem brugere'].map(text => el('li', { text }))), btn('Vælg Pro i demoen →', () => openSubscribe('Pro'), true)),
          el('article', { class: 'plan' }, mono('For virksomheden · Udvidet'), el('h3', { text: 'Business Pro+' }), el('p', { class: 'plan-price' }, '12.500 kr. ', el('small', { text: '/ år ekskl. moms' })),
            el('ul', {}, ['Alt fra Business Pro', 'UdbudsMatch', 'Fire brancherapporter om året', 'Gratis prøveperiode i servicedemoen'].map(text => el('li', { text }))), btn('Prøv Pro+ i demoen →', () => openSubscribe('Pro+'), true))),
        el('p', { class: 'plan-note', text: 'Demo-toggle viser samlet Pro-adgang til rapporter og værktøjer. Servicedemoen skelner mellem Pro og Pro+.' }),
        el('a', { class: 'text-link', href: SERVICE_URL + '#pro', target: '_blank', rel: 'noopener', text: 'Se den fulde servicedemo og pakkelogik ↗' })),
      toolsModule('byggeri'), diTeaser(true),
      el('section', { class: 'content-section' }, moduleHeader('Spørgsmål om adgang'),
        [['Er Business Pro et andet website?', 'Nej. Business Pro er et lag på Y med samme konto, flere rettigheder og et redaktionelt overblik, som kan kurateres til din branche.'], ['Hvad får DI-medlemmer adgang til?', 'Det særlige DI-univers kræver login og verificeret medlemskab. I denne demo kan du gennemgå et simuleret medlemsflow eller vælge DI-medlem i demo-toggle øverst.'], ['Er der betaling i denne mockup?', 'Nej. Login, abonnement og medlemsverifikation er lokale demonstrationer. Ingen oplysninger sendes til en login- eller betalingsudbyder.']].map(([q, a]) => el('details', { class: 'value-card' }, el('summary', { text: q }), el('p', { class: 'plan-note', text: a })))));
  }
  function teaserPage(key) {
    const a = story(key);
    return el('div', { class: 'platform-page' }, el('article', { class: 'article-tease' },
      el('a', { class: 'text-link', href: a.di ? '#forside' : key[0] === 'p' ? '#byggeri' : '#business', text: '← Tilbage til overblikket' }),
      el('div', { class: 'cta-row' }, mono(a.label), badge(a.di ? 'di' : 'pro')), el('h1', { text: a.fullTitle }), el('p', { text: a.dek }), photo(a, true)),
      el('section', { class: 'paywall-inline' }, mono(a.di ? 'Dansk Industri · Medlemsadgang' : 'Business Pro'),
        el('h2', { text: a.di ? 'Mere indsigt til DI’s medlemmer.' : 'Få hele historien. Og perspektivet.' }),
        el('p', { text: a.di ? 'Log ind, og bekræft dit DI-medlemskab for at læse historien og åbne medlemsuniverset.' : 'Denne historie er en del af Business Pro. Få adgang til analyser, rapporter og værktøjer.' }),
        el('div', { class: 'cta-row' }, btn(a.di ? 'Log ind og verificér medlemskab' : 'Se dine adgangsmuligheder', () => a.di ? openLogin({ di: true, target: '#' + key }) : openPaywall({ title: a.fullTitle, target: '#' + key }), true), !a.di ? link('Se Business Pro →', '#pro') : null)));
  }
  function headerState(r) {
    document.querySelectorAll('[data-access]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.access === access)));
    const navB = document.getElementById('nav-business'), navP = document.getElementById('nav-pro');
    const proPage = ['pro', 'pro-overblik', 'byggeri', 'mit-pro', 'forside'].includes(r.name) || /^[pa]\d/.test(r.name);
    navB.toggleAttribute('aria-current', !proPage); navP.toggleAttribute('aria-current', proPage);
    if (!proPage) navB.setAttribute('aria-current', 'page'); else navP.setAttribute('aria-current', 'page');
    navP.replaceChildren(lock(isPro()), 'Pro');
    const login = document.getElementById('platform-login'); login.textContent = access === 'free' ? 'Log ind' : 'Min konto';
    const cta = document.getElementById('platform-cta'); cta.textContent = isPro() ? 'Mit Business Pro →' : 'Oplev Business Pro'; cta.href = isPro() ? '#mit-pro' : '#pro';
    const branchDetails = el('details', { class: 'sn-branches' },
      el('summary', { class: 'sn-i' }, 'Brancher', chevron()),
      el('div', { class: 'sn-branch-menu' }, el('p', { text: 'Business Pro · Vælg din branche' }),
        Object.entries(SECTORS).map(([key, value]) => el('a', { href: '#' + key, 'aria-current': r.sector === key ? 'page' : null, text: value.label })),
        el('a', { href: '#pro-overblik', text: 'Alle brancher →' })));
    document.getElementById('sn').replaceChildren(el('nav', { class: 'sn-in', 'aria-label': 'Business-navigation' },
      el('a', { class: 'sn-l', href: '#business', text: 'BUSINESS' }),
      el('a', { class: 'sn-i', href: '#business', 'aria-current': r.name === 'business' ? 'page' : null, text: 'Overblik' }), branchDetails,
      el('a', { class: 'sn-i', href: '#pro-overblik', 'aria-current': ['pro-overblik', 'byggeri'].includes(r.name) ? 'page' : null, text: 'Business Pro' }),
      el('a', { class: 'sn-i', href: '#forside', 'aria-current': r.name === 'forside' ? 'page' : null }, 'DI-medlem', lock(access === 'di')),
      el('span', { class: 'sn-state', text: access === 'di' ? 'DEMO · DI-MEDLEMSKAB VERIFICERET' : isPro() ? 'DEMO · PRO-ADGANG AKTIV' : 'UAFHÆNGIG ERHVERVSJOURNALISTIK' })));
  }
  function footer() {
    return el('footer', { class: 'platform-footer' }, el('strong', { text: 'y business' }),
      el('span', { text: 'Interaktiv mockup · Eksisterende eksempelartikler og markeret demoindhold · 19. november 2026' }),
      el('a', { href: SERVICE_URL, target: '_blank', rel: 'noopener', text: 'Business Pro-servicedemo ↗' }));
  }
  function render({ scroll = false } = {}) {
    const r = route(); headerState(r);
    const main = document.getElementById('view'); main.className = 'wrap wide';
    let content, title = 'Business';
    if (r.name === 'business') content = businessFront();
    else if (r.name === 'pro') { content = proLanding(); title = 'Business Pro · Produkt og adgang'; }
    else if (r.name === 'pro-overblik' || r.sector) { content = curatedFront(r); title = r.sector ? 'Business Pro · Byggeri' : 'Business Pro · Overblik'; }
    else if (r.name === 'forside') {
      content = access === 'di' ? renderFront() : el('div', { class: 'platform-page' }, intro('Dansk Industri', 'Et særligt univers for dig, der er DI-medlem.'), diTeaser(), el('section', { class: 'paywall-inline' }, mono('Login og verificeret medlemskab'), el('h2', { text: 'Dit medlemskab åbner døren.' }), el('p', { text: 'Business Pro alene giver ikke adgang til DI-universet. Log ind, og gennemgå den simulerede DI-verifikation.' }), btn('Log ind som DI-medlem →', () => openLogin({ di: true, target: '#forside' }), true)));
      title = 'Dansk Industri · Medlemsindsigt';
    } else if (r.name === 'mit-pro') {
      content = isPro() ? el('div', { class: 'platform-page' }, intro('Mit Business', 'Demo · Din virksomhed: Enemærke & Petersen A/S · Byggeri', true), promo(), toolsModule('byggeri'), reportModule('byggeri'), diTeaser(true)) : el('div', { class: 'platform-page' }, intro('Mit Business', 'Morgenbrief, overvågning og signaler til dit arbejde.', true), toolsModule('byggeri'), promo()); title = 'Mit Business Pro';
    } else if (Object.hasOwn(BCAT, r.name)) {
      content = el('div', { class: 'platform-page' }, intro('Business · ' + BCAT[r.name].label, 'Udvalgte historier fra den eksisterende mockup.'), el('section', { class: 'card-grid' }, BCAT[r.name].ids.map(id => card('b' + id))), promo()); title = 'Business · ' + BCAT[r.name].label;
    } else if (story(r.name)) {
      const a = story(r.name); title = a.fullTitle;
      if (locked(r.name)) content = teaserPage(r.name);
      else {
        const rendered = r.name[0] === 'p' ? renderProStub(Number(r.name.slice(1))) : renderArticle(r.name.slice(1), r.name[0]);
        // Bevar de eksisterende artikeltekster; ret kun produktmærkning i læseroplevelsen.
        rendered.querySelectorAll('.article-label').forEach(label => {
          if (r.name[0] === 'b') label.textContent = a.premium ? 'Business Pro · Adgang aktiv' : 'Business · Fri adgang';
        });
        rendered.querySelectorAll('h1').forEach(h => h.setAttribute('id', 'page-heading'));
        content = rendered;
      }
    } else {
      content = el('div', { class: 'platform-page' }, intro('Siden findes ikke i demoen', 'Vælg Business, Business Pro eller din branche for at fortsætte.'), link('Til Business →', '#business', true)); title = 'Siden findes ikke';
    }
    main.replaceChildren(content, footer());
    main.querySelector('h1')?.setAttribute('id', 'page-heading');
    main.setAttribute('aria-labelledby', 'page-heading');
    document.title = title + ' | Y';
    document.getElementById('route-announcement').textContent = title;
    if (scroll) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
  }
  function setAccess(value, { target = null, announce = true } = {}) {
    if (!Object.hasOwn(ACCESS, value)) return;
    access = value;
    try { localStorage.setItem(ACCESS_KEY, value); } catch (_) {}
    render();
    if (target) go(target);
    if (announce) toast('Demo: ' + ACCESS[value] + (value === 'free' ? ' · Premiumindhold er låst' : ' · Din adgang er aktiv'));
  }
  const dialog = document.getElementById('platform-dialog'), dialogBody = document.getElementById('platform-dialog-body');
  function openDialog(title, content) {
    if (!dialog.open) dialogTrigger = document.activeElement;
    document.getElementById('platform-dialog-label').textContent = title;
    dialogBody.replaceChildren(content);
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('.dialog-close').focus();
  }
  function closeDialog() { dialog.close(); }
  dialog.addEventListener('close', () => { if (dialogTrigger?.isConnected) dialogTrigger.focus(); else document.getElementById('view').focus({ preventScroll: true }); });
  document.getElementById('platform-dialog-close').addEventListener('click', closeDialog);
  dialog.addEventListener('click', e => { if (e.target === dialog) { const rect = dialog.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) closeDialog(); } });
  function disclosure() { return el('p', { class: 'demo-disclosure', text: 'Demo · Login, betaling og medlemskontrol er simuleret lokalt. Der sendes ingen formularoplysninger.' }); }
  function toast(text) {
    const node = document.getElementById('platform-toast'); clearTimeout(toastTimer); node.textContent = text; node.hidden = false;
    toastTimer = setTimeout(() => { node.hidden = true; }, 4500);
  }
  function openPaywall({ title = 'Business Pro', target = null, tool = null, sector = null, report = false } = {}) {
    const complete = () => { closeDialog(); if (tool) openTool(tool, sector); else if (report) openReport(sector === 'byggeri'); else if (target) go(target); };
    openDialog('Business Pro · Adgang', el('div', {}, mono('Eksklusiv indsigt. Samme Y.'),
      el('h2', { text: title === 'Business Pro' ? 'Få hele perspektivet med Business Pro.' : title }),
      el('p', { text: 'Dette indhold kræver Business Pro. Få adgang til journalistik i dybden og værktøjer, der gør din arbejdsdag mere oplyst.' }),
      el('ul', { class: 'dialog-benefits' }, ['Eksklusive historier og analyser', 'Morgenbrief og branchekuratering', 'Rapportuddrag og digitale værktøjer i demoen'].map(text => el('li', { text: '✓ ' + text }))),
      el('div', { class: 'cta-row' }, btn('Prøv Business Pro i demoen', () => openSubscribe('Pro', complete), true), btn('Allerede abonnent? Log ind', () => openLogin({ target, onComplete: complete }))),
      el('div', { class: 'cta-row' }, el('a', { class: 'text-link', href: '#pro', text: 'Se produktet og adgangsmuligheder →', onclick: closeDialog })), disclosure()));
  }
  function openSubscribe(plan = 'Pro', onComplete = null) {
    const companyInput = el('input', { name: 'company', placeholder: 'Eksempelvirksomhed A/S', value: 'Eksempelvirksomhed A/S', required: true, autocomplete: 'off' });
    const sectorSelect = el('select', { name: 'sector' }, el('option', { value: 'alle', text: 'Alle brancher · Redaktionelt overblik' }), el('option', { value: 'byggeri', text: 'Byggeri' }));
    const form = el('form', { class: 'demo-form', onsubmit: e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      setAccess(access === 'di' ? 'di' : 'pro', { announce: false });
      if (onComplete) onComplete(); else { closeDialog(); go(sectorSelect.value === 'byggeri' ? '#byggeri' : '#pro-overblik'); }
      toast('Demo: Business ' + plan + ' er aktiveret. Ingen betaling er foretaget.');
    } },
      el('label', {}, 'Virksomhed i demoen', companyInput), el('label', {}, 'Din redaktionelle kuratering', sectorSelect),
      el('button', { class: 'cta-primary', type: 'submit', text: 'Aktivér Business ' + plan + ' i demoen →' }));
    openDialog('Business Pro · Prøv adgang', el('div', {}, el('h2', { text: 'Klar til mere overblik?' }), el('p', { text: 'Prøv rejsen som abonnent. I denne præsentation får du adgang til alle Pro-værktøjer, rapportuddrag og historier.' }), form, disclosure()));
  }
  function openLogin({ di = false, target = null, onComplete = null } = {}) {
    if (di && isPro()) { openVerification(target); return; }
    const email = el('input', { type: 'email', name: 'email', value: 'demo@virksomhed.dk', required: true, autocomplete: 'off' });
    const form = el('form', { class: 'demo-form', onsubmit: e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      if (di) { openVerification(target); return; }
      setAccess(access === 'di' ? 'di' : 'pro', { announce: false });
      if (onComplete) onComplete(); else { closeDialog(); if (target) go(target); }
      toast('Du er logget ind som Business Pro i demoen.');
    } }, el('label', {}, 'E-mail · brug gerne demoadressen', email), el('button', { class: 'cta-primary', type: 'submit', text: di ? 'Log ind og fortsæt til DI-verifikation →' : 'Log ind i demoen →' }));
    openDialog(di ? 'DI-medlem · Trin 1 af 2' : 'Y · Login', el('div', {}, el('h2', { text: 'Én konto til hele Y.' }), el('p', { text: di ? 'Først logger du ind. Derefter bekræfter du medlemskabet til det særlige DI-univers.' : 'Fortsæt som eksisterende Business Pro-abonnent i demoen.' }), form, disclosure()));
  }
  function openVerification(target) {
    const cvr = el('input', { name: 'cvr', inputmode: 'numeric', pattern: '[0-9]{8}', maxlength: '8', value: '12345678', required: true, title: 'Indtast otte cifre', autocomplete: 'off' });
    const consent = el('input', { type: 'checkbox', required: true, style: 'width:20px;height:20px;flex:0 0 20px', 'aria-label': 'Bekræft simuleret DI-medlemskab' });
    const form = el('form', { class: 'demo-form', onsubmit: e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      closeDialog(); setAccess('di', { target: target || '#forside', announce: false }); toast('Demo: Login og DI-medlemskab er verificeret.');
    } }, el('label', {}, 'Virksomhedens CVR-nummer · eksempel', cvr),
      el('label', { style: 'display:flex;align-items:start;gap:12px' }, consent, 'Simulér, at virksomheden har et aktivt DI-medlemskab.'),
      el('button', { class: 'cta-primary', type: 'submit', text: 'Verificér medlemskab og åbn DI-universet →' }));
    openDialog('DI-medlem · Trin 2 af 2', el('div', {}, mono('Login gennemført i demoen'), el('h2', { text: 'Bekræft din medlemsadgang.' }), el('p', { text: 'DI-universet kræver både en Y-konto og et aktivt DI-medlemskab. Her simulerer vi kontrollen med eksempelnummeret nedenfor.' }), form, disclosure()));
  }
  function openDiInfo() {
    openDialog('Dansk Industri · Medlemsfordele', el('div', {}, el('h2', { text: 'Mere viden som DI-medlem.' }),
      el('p', { text: 'DI-afdelingen samler de eksisterende analyser og virksomhedscases fra mockuppen: blandt andre Arla, Ringsted Forsyning og Per Aarsleff.' }),
      el('ul', { class: 'dialog-benefits' }, ['Danske virksomhedscases med konkrete erfaringer', 'Perspektiver på AI, produktivitet og investeringer', 'Et medlemsunivers med login og verificeret DI-adgang'].map(text => el('li', { text }))),
      el('div', { class: 'cta-row' }, access === 'di' ? btn('Åbn DI-universet →', () => { closeDialog(); go('#forside'); }, true) : btn('Log ind og verificér DI-medlemskab →', () => openLogin({ di: true, target: '#forside' }), true)), disclosure()));
  }
  function openReport(construction) {
    const title = construction ? 'Robotter på byggepladsen. Skal vi med nu?' : 'AI, kapital og konkurrence';
    const questions = construction ? ['Hvor er de gentagne opgaver på jeres byggepladser?', 'Hvilke data kræver en afprøvning?', 'Hvordan måler I kvalitet, tid og økonomi?'] : ['Hvilke investeringer ændrer jeres marked?', 'Hvor kan AI understøtte eksisterende arbejdsgange?', 'Hvilke risici bør ledelsen følge?'];
    const download = () => {
      const blob = new Blob(['Y Business Pro · Demoindhold\n\n' + title + '\n\nDette er et illustrativt rapportuddrag, ikke en offentliggjort brancherapport.\n\n' + questions.map((q, i) => (i + 1) + '. ' + q).join('\n')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob), a = el('a', { href: url, download: 'y-business-pro-rapportuddrag-DEMO.txt' }); a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); toast('Rapportuddraget er hentet som tekstfil.');
    };
    openDialog('Brancherapporter · Demoindhold', el('div', {}, mono('Rapportuddrag · Eksempel'), el('h2', { text: title }), el('p', { text: 'Et eksempel på et redaktionelt beslutningsgrundlag. Brug spørgsmålene til at demonstrere, hvordan en rapport kan omsættes til handling.' }),
      el('ol', { class: 'dialog-benefits', style: 'list-style:decimal;padding-left:40px' }, questions.map(text => el('li', { text }))),
      el('div', { class: 'cta-row' }, btn('Hent demo-uddrag som tekstfil ↓', download, true)), disclosure()));
  }
  function openTool(kind, sector) {
    if (!isPro()) { openPaywall({ title: TOOL_INFO[kind].tab, tool: kind, sector }); return; }
    const info = TOOL_INFO[kind], construction = sector === 'byggeri';
    let body;
    if (kind === 'brief') {
      const ids = construction ? ['p0', 'p1', 'p2'] : ['b11', 'b6', 'b7'];
      body = el('div', {}, mono('Morgenbrief · 06.00 · Demo'), el('h2', { text: construction ? 'Tre ting om byggeriet i dag.' : 'Tre ting, der former erhvervslivet.' }), el('p', { text: 'Et eksempelbrief baseret på historierne i den eksisterende mockup.' }),
        el('div', { class: 'tool-list' }, ids.map(key => el('article', {}, mono(story(key).label), el('h3', { text: story(key).title }), el('p', { text: story(key).dek }), el('a', { class: 'text-link', href: '#' + key, text: 'Læs historien →', onclick: closeDialog })))),
        el('div', { class: 'cta-row' }, btn('Gem brief i demoen', () => toast('Morgenbriefet er gemt i denne demonstration.'))));
    } else if (kind === 'media' || kind === 'market') {
      const items = kind === 'media' ? [
        ['Fagmedie · Eksempel', 'Bedre data er nøglen til byggeriets AI-kvantespring', 'Enemærke & Petersen omtales i forbindelse med AI i byggeriet.'],
        ['Branchemedie · Eksempel', 'Renovering rykker op på dagsordenen', 'Et eksempel på en omtale af virksomhedens marked.'],
        ['Virksomhedsnyhed · Eksempel', 'Nyt samarbejde om digital kvalitetssikring', 'En fiktiv omtale til demonstration af overvågning.']
      ] : [
        ['Ledelse · Demo', 'Ny direktør hos B. Nygaard Sørensen A/S', 'Et illustrativt signal om ændringer hos en fulgt virksomhed.'],
        ['Regnskab · Demo', 'Årsrapport hos en fulgt virksomhed', 'Et eksempel på en ny regnskabshændelse i overvågningen.'],
        ['Marked · Demo', 'Nyt projekt i Hovedstaden', 'Et eksempel på en begivenhed med relevans for branchen.']
      ];
      const list = el('div', { class: 'tool-list', 'aria-live': 'polite' }), search = el('input', { type: 'search', placeholder: 'Filtrér omtaler og signaler…', 'aria-label': 'Filtrér demoresultater' });
      const draw = () => {
        const filtered = items.filter(row => row.join(' ').toLocaleLowerCase('da').includes(search.value.toLocaleLowerCase('da')));
        list.replaceChildren(...(filtered.length ? filtered.map(([label, title, text]) => el('article', {}, mono(label), el('h3', { text: title }), el('p', { text }))) : [el('p', { text: 'Ingen demoresultater matcher din søgning.' })]));
      };
      search.addEventListener('input', draw); draw();
      body = el('div', {}, mono('Din virksomhed · Demoindhold'), el('h2', { text: info.tab }), el('p', { text: 'Interaktivt eksempel for Enemærke & Petersen A/S. Virksomhedshændelserne nedenfor er illustrative.' }), search, list);
    } else {
      const area = el('select', { 'aria-label': 'Filtrér udbud efter område' }, [['alle', 'Alle områder'], ['hovedstaden', 'Hovedstaden'], ['jylland', 'Jylland']].map(([value, text]) => el('option', { value, text })));
      const items = [['hovedstaden', 'Renovering af 480 almene boliger · Rødovre', '94 %'], ['hovedstaden', 'Energirenovering af kommunale bygninger', '87 %'], ['jylland', 'Modernisering af skolebyggeri · Aarhus', '81 %']];
      const list = el('div', { class: 'tool-list', 'aria-live': 'polite' });
      const draw = () => list.replaceChildren(...items.filter(([region]) => area.value === 'alle' || area.value === region).map(([, title, match]) => {
        const saved = btn('Gem udbud', () => { saved.textContent = 'Gemt ✓'; saved.disabled = true; toast('Demoudbuddet er gemt.'); });
        return el('article', {}, mono('Illustrativt udbud · Demo'), el('h3', { text: title }), el('p', { text: 'Match med virksomhedsprofil: ' + match + ' · Ingen reel udbudsfrist' }), saved);
      }));
      area.addEventListener('change', draw); draw();
      body = el('div', {}, mono('UdbudsMatch · Byggeri'), el('h2', { text: 'Opgaver, der passer til jer.' }), el('p', { text: 'Filtrér de illustrative udbud efter geografi, og prøv at gemme en mulighed.' }), el('label', {}, 'Område', area), list);
    }
    body.append(disclosure()); openDialog(info.tab + ' · Demoindhold', body);
  }
  function openLive(index) {
    const label = ['Business AI', 'Reuters', 'Ritzau'][index];
    const ids = index === 0 ? ['b1', 'b2', 'b6'] : index === 1 ? ['b5', 'b4', 'b8'] : ['b7', 'b10', 'b3'];
    openDialog(label + ' · Nyhedsoverblik', el('div', {}, mono('Demo · Eksisterende historier'), el('h2', { text: label }), el('p', { text: 'Et klikbart nyhedsoverblik fra mockuppen. Det er ikke en liveforbindelse til nyhedsbureauerne.' }),
      el('div', { class: 'tool-list' }, ids.map(key => el('article', {}, mono(story(key).label), el('h3', { text: story(key).title }), el('a', { class: 'text-link', href: '#' + key, text: 'Åbn historien →', onclick: closeDialog }))))));
  }
  function openEditorial() {
    openDialog('Y · Redaktionelt ansvar', el('div', {}, el('h2', { text: 'Menneskerne bag perspektivet.' }), el('p', { text: 'Hos Y er det redaktører, der vælger historierne, vurderer kilderne og redigerer indholdet før udgivelse. Vi bruger AI i arbejdet. Det journalistiske ansvar er vores.' }), mono('Michael Dyrby · Chefredaktør · Fra den eksisterende mockup')));
  }
  function openMenu() {
    const links = [['Business', '#business'], ['Business Pro · Produkt og adgang', '#pro'], ['Business Pro · Redaktionelt overblik', '#pro-overblik'], ['Byggeri', '#byggeri'], ['DI-medlem', '#forside'], ['Mit Business Pro', '#mit-pro']];
    openDialog('Y · Navigation', el('nav', { class: 'mobile-menu-links', 'aria-label': 'Alle demoens sider' }, links.map(([text, href]) => el('a', { href, text, onclick: closeDialog }))));
  }
  document.querySelectorAll('[data-access]').forEach(b => b.addEventListener('click', () => { closeDialog(); setAccess(b.dataset.access); }));
  document.getElementById('platform-login').addEventListener('click', () => {
    if (!isPro()) { openLogin(); return; }
    openDialog('Min konto · Demo', el('div', {}, el('h2', { text: ACCESS[access] }), el('p', { text: access === 'di' ? 'Du er logget ind med Pro-adgang og simuleret verificeret DI-medlemskab.' : 'Din Pro-adgang er aktiv i demoen. DI-universet kræver separat verificeret medlemskab.' }),
      el('div', { class: 'cta-row' }, btn('Åbn Mit Business Pro', () => { closeDialog(); go('#mit-pro'); }, true), btn('Log ud af demoen', () => { closeDialog(); setAccess('free'); })), disclosure()));
  });
  document.getElementById('platform-menu').addEventListener('click', openMenu);
  document.querySelectorAll('[data-global]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); openDialog('Y · ' + a.dataset.global, el('div', {}, el('h2', { text: a.dataset.global }), el('p', { text: 'Dette hovedmenupunkt er bevaret fra Y. Præsentationen her fokuserer på Business, Business Pro og Dansk Industri.' }), el('a', { class: 'cta-primary', href: SERVICE_URL, target: '_blank', rel: 'noopener', text: 'Åbn den eksisterende Y-servicedemo ↗' })));
  }));
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
      const target = anchor.getAttribute('href'), key = target.slice(1);
      if (target === '#view') { e.preventDefault(); document.getElementById('view').focus(); document.getElementById('view').scrollIntoView(); return; }
      if (locked(key)) {
        e.preventDefault(); const a = story(key);
        if (a.di) openLogin({ di: true, target }); else openPaywall({ title: a.fullTitle, target });
      } else if (target === '#forside' && access !== 'di') { e.preventDefault(); openLogin({ di: true, target }); }
      else if (target === '#mit-pro' && !isPro()) { e.preventDefault(); openPaywall({ title: 'Mit Business Pro', target }); }
    }
    const branches = document.querySelector('.sn-branches[open]');
    if (branches && !branches.contains(e.target)) branches.open = false;
  });
  document.addEventListener('keydown', e => {
    const branches = document.querySelector('.sn-branches[open]');
    if (e.key === 'Escape' && branches) { branches.open = false; branches.querySelector('summary').focus(); }
  });
  window.addEventListener('hashchange', () => { if (dialog.open) closeDialog(); render({ scroll: true }); });
  render();
  // Read-only state for regression checks and presentation diagnostics.
  window.YBusinessDemo = Object.freeze({ getState: () => ({ access, ...route() }) });
})();
