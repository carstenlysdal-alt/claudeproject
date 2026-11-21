/* Interaktivt demolag. Genbruger den eksisterende mocks artikler, billeder og artikelrenderer.
   Adgangstilstande er kun en lokal præsentationssimulation, ikke en sikkerhedsgrænse. */
(() => {
  'use strict';
  const ACCESS_KEY = 'y-business-demo-access-v2';
  const ACCESS = { free: 'Ikke-abonnent', pro: 'Business Pro', di: 'DI-medlem' };
  const SECTORS = { byggeri: { label: 'Byggeri', lead: 'p0', related: ['p1', 'p4'], finance: ['p1', 'b7', 'b11'], analysis: ['p2', 'p3', 'p4'] } };
  // Alle Business-artikler er bag paywall for ikke-medlemmer. Pro- og DI-adgang åbner dem.
  const PREMIUM_B = new Set(Object.keys(BARTICLES));
  const LIVE_BLOGS = {
    'liveblog/reuters': { name: 'Reuters', description: 'Internationalt nyhedsoverblik med fokus på verden, virksomheder og markeder.', stories: ['b5', 'b4', 'b8'] },
    'liveblog/ritzau': { name: 'Ritzau', description: 'Et nyhedsoverblik med historier fra Danmark og resten af verden.', stories: ['b7', 'b10', 'b3'] }
  };
  let access = 'free', selectedTool = 'brief', dialogTrigger = null, toastTimer;
  let workspaceFrame = null, workspaceTab = 'idag';
  try { const saved = localStorage.getItem(ACCESS_KEY); if (Object.hasOwn(ACCESS, saved)) access = saved; } catch (_) {}
  const isPro = () => access !== 'free';
  // Som lokal fil (file://) er beskedens origin 'null' eller 'file://', mens location.origin kan være 'file://'. Kilden tjekkes stadig.
  const trustedOrigin = origin => origin === location.origin || (location.protocol === 'file:' && (origin === 'null' || origin === 'file://'));
  const mono = text => el('span', { class: 'eyebrow-label', text });
  const btn = (text, action, primary = false) => el('button', { type: 'button', class: primary ? 'cta-primary' : 'cta-secondary', text, onclick: action });
  const link = (text, href, primary = false) => el('a', { class: primary ? 'cta-primary' : 'cta-secondary', href, text });
  const chevron = () => iconSvg('<path d="m6 9 6 6 6-6"/>');
  const ARTICLE_GROUPS = [
    { label: 'Business (alle læsere)', views: ['business', ...Object.keys(BCAT), ...Object.keys(BARTICLES).map(id => 'b' + id)] },
    { label: 'Business Pro · Byggeri', views: ['pro-overblik', 'byggeri', ...['p0', ...PRO.cards.map((_, i) => 'p' + (i + 1))]] },
    { label: 'Business Pro · Kun DI', views: ['forside', ...Object.keys(ARTICLES).map(id => 'a' + id)] }
  ];
  function articlePickerLabel(view) {
    if (view === 'business' || view === 'forside') return 'Forside';
    if (view === 'pro-overblik') return 'Alle brancher';
    if (view === 'byggeri') return 'Byggeri · Forside';
    if (BCAT[view]) return BCAT[view].label;
    if (view[0] === 'b') return `${view.slice(1)} · ${BARTICLES[view.slice(1)].tab}`;
    if (view[0] === 'a') return `${view.slice(1)} · ${ARTICLES[view.slice(1)].tab}`;
    const n = Number(view.slice(1));
    return n === 0 ? 'Aarsleff' : PRO.cards[n - 1].short;
  }
  function initArticlePicker() {
    const panel = document.getElementById('mockPanel'), toggle = document.getElementById('mockBtn');
    const set = open => { toggle.setAttribute('aria-expanded', String(open)); panel.hidden = !open; panel.inert = !open; };
    document.getElementById('tabs').replaceChildren(...ARTICLE_GROUPS.map(group => el('div', { class: 'tab-grp' },
      el('span', { class: 'mono tab-grp-l', text: group.label }),
      group.views.map(view => el('a', { class: 'tab', 'data-view': view, href: '#' + view, text: articlePickerLabel(view) })))));
    toggle.addEventListener('click', () => set(panel.hidden));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { set(false); toggle.focus(); } });
    document.getElementById('tabs').addEventListener('click', e => { if (e.target.closest('a')) set(false); });
    set(false);
  }
  function initTheme() {
    const button = document.getElementById('themeBtn');
    let theme = 'dark';
    try { if (localStorage.getItem('y-business-theme') === 'light') theme = 'light'; } catch (_) {}
    const apply = () => {
      document.documentElement.setAttribute('data-y-theme', theme);
      sendWorkspace('theme', { theme });
      button.setAttribute('aria-label', theme === 'dark' ? 'Skift til lys visning' : 'Skift til mørk visning');
      button.replaceChildren(iconSvg(theme === 'dark'
        ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>'
        : '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'));
    };
    button.addEventListener('click', () => { theme = theme === 'dark' ? 'light' : 'dark'; apply(); try { localStorage.setItem('y-business-theme', theme); } catch (_) {} });
    apply();
  }
  function lock(open = false) {
    const svg = iconSvg(`<rect x="5" y="10" width="14" height="11" rx="2"/><path d="${open ? 'M8 10V6a4 4 0 0 1 7-2' : 'M8 10V6a4 4 0 0 1 8 0v4'}"/>`);
    svg.classList.add('lock-icon'); return svg;
  }
  function badge(kind = 'pro') {
    const allowed = kind === 'di' ? access === 'di' : isPro();
    return el('span', { class: 'access-label' + (kind === 'di' ? ' di-member-mark' : '') }, allowed ? null : lock(), kind === 'di' ? 'For DI-medlemmer' : (allowed ? 'Pro · Adgang aktiv' : 'Business Pro'));
  }
  function route() {
    const [raw, query] = location.hash.slice(1).split('?');
    const name = raw || 'y';
    return { name, filter: new URLSearchParams(query).get('f') || 'alle', sector: name === 'byggeri' ? 'byggeri' : null };
  }
  function go(hash) {
    if (location.hash === hash) render(); else location.hash = hash;
  }
  const SHORT_TITLES = {
    b1: "Agenter brød ud af testmiljø",
    b2: "EU udskyder store AI-krav",
    b3: "Tilmeldt ved tavshed",
    b4: "McDonald's AI-priser i retten",
    b5: "Porsche skærer 9.000 stillinger",
    b6: "Nvidia tjener 91 kr. per 100 kr.",
    b7: "Ørsted mangler byggeprojekter",
    b8: "Webull udgør sikkerhedsrisiko",
    b9: "SpaceX låner milliarder til AI",
    b10: "Terma fordobler rumomsætning",
    b11: "Datacentre rammer elnettets loft",
    p0: "Aarsleff satser på generativ AI",
    p1: "EU dumper renoveringsregning",
    p2: "AI overser de dyre byggefejl",
    p3: "Mindre cement i ny beton",
    p4: "Millioner i materialer fundet",
    a1: "Arla halverer produktionsudsving med AI",
    a2: "DTU: Varmepumper sparede ingen energi",
    a3: "Forsyning varsler isdannelse 14 timer før",
    a4: "Aarsleff sætter AI på tilbuddene",
    a5: "Mobil-scan finder værdier i bygninger",
    a6: "DI: Hurtigere AI-godkendelser nødvendige",
    a7: "EU-krav presser SMV'er"
  };
  window.SHORT_TITLES = SHORT_TITLES;
  function story(key) {
    if (/^b\d+$/.test(key) && BARTICLES[key.slice(1)]) {
      const id = key.slice(1), a = BARTICLES[id], p = BPHOTO[id];
      return { key, title: SHORT_TITLES[key] || a.headline, fullTitle: a.headline, dek: a.manchet, label: a.kicker, img: PHOTO_DATA[p.photo] || `https://images.unsplash.com/${p.photo}?auto=format&fit=crop&w=1200&q=80`, alt: p.alt, premium: PREMIUM_B.has(id), minutes: readMinutes(a), credit: bCaption(id) };
    }
    if (/^p[0-4]$/.test(key)) {
      const n = Number(key.slice(1));
      const a = n === 0 ? { h: PRO.headline, p: PRO.dek, k: PRO.kicker, img: 'hero', body: PRO.body } : PRO.cards[n - 1];
      return { key, title: SHORT_TITLES[key] || a.h, fullTitle: a.h, dek: a.p, label: a.k, img: PRO_IMG[a.img], alt: n === 0 ? 'Byggeplads med kran og fundamenter set fra oven.' : 'Illustrationsfoto til historien om ' + a.k.toLowerCase(), premium: true, minutes: Math.max(1, Math.round((a.body || '').split(/\s+/).length / 190)), credit: 'Illustrationsfoto · Arkiv / Unsplash' };
    }
    if (/^a[1-7]$/.test(key)) {
      const id = key.slice(1), a = ARTICLES[id];
      return { key, title: SHORT_TITLES[key] || a.headline, fullTitle: a.headline, dek: a.manchet, label: a.kicker, img: IMAGES[id].src, alt: IMAGES[id].alt, premium: true, di: true, minutes: readMinutes(a), credit: IMAGES[id].caption, illustration: IMAGES[id].fallbackSvg };
    }
    return null;
  }
  function lockOverlay() { return el('span', { class: 'premium-lock-overlay' }, lock(), el('span', { text: 'Lås op med Pro' })); }
  function locked(key) { const a = story(key); return a && (a.di ? access !== 'di' : a.premium && !isPro()); }
  function photo(a, eager = false) {
    const img = el('img', { class: 'story-photo', src: a.img, alt: a.alt, loading: eager ? 'eager' : 'lazy', decoding: 'async' });
    img.addEventListener('error', () => {
      if (a.di) {
        const caption = img.parentElement?.querySelector('figcaption');
        if (caption) caption.hidden = true;
        if (a.illustration) {
          const illustration = svgFrom(a.illustration, a.alt);
          illustration.classList.add('story-photo');
          img.replaceWith(illustration);
        } else {
          img.hidden = true;
          if (img.parentElement?.matches('.story-media')) img.parentElement.hidden = true;
        }
        return;
      }
      if (img.dataset.fallback) return;
      img.dataset.fallback = 'true';
      img.src = PRO_IMG.hero;
    });
    return img;
  }
  function card(key, { lead = false, description = true, headline = lead ? 'h2' : 'h3', preview = false } = {}) {
    const a = story(key);
    const isLocked = !preview && locked(key);
    const image = photo(a, lead || (a.di && !preview && headline === 'h2'));
    return el('a', { class: 'story-card' + (lead ? ' curation-lead' : '') + (isLocked ? ' is-premium-lock' : ''), href: '#' + key },
      a.di ? el('figure', { class: 'story-media' }, image, el('figcaption', { text: a.credit })) : image,
      isLocked ? lockOverlay() : null,
      mono(a.label), el(headline, { text: a.title }),
      description ? el('p', { text: typeof description === 'string' ? description : a.dek }) : null,
      el('div', { class: 'story-meta' }, a.premium ? badge(a.di ? 'di' : 'pro') : el('span', { text: 'Fri adgang' }), el('span', { text: `· ${a.minutes} min.` })));
  }
  // Ingen sidetitler i indholdet: sektionsnavnet står i menuen. Siden får sit navn via aria-label på main.
  function intro() { return null; }
  function moduleHeader(title, subtitle, action = null) {
    return el('div', { class: 'module-header' }, el('div', {}, el('h2', { text: title }), subtitle ? el('p', { text: subtitle }) : null), action);
  }
  function promo() {
    if (isPro()) return null;
    return el('section', { class: 'pro-promo pro-access-intro', 'aria-label': 'Business Pro' },
      mono('Business Pro · Dit arbejdsredskab'),
      el('h2', { text: 'Dit marked. Dine værktøjer. Ét samlet overblik.' }),
      el('p', { text: 'Log ind med din Business Pro-adgang for at åbne morgenbrief, overvågning, udbud og Business AI.' }),
      el('ul', { class: 'pro-access-features' },
        ['Til jer i dag og morgenbrief', 'MedieMonitor og MarkedsMonitor', 'UdbudsMatch, Business AI og brancherapporter'].map(text => el('li', { text }))),
      el('div', { class: 'cta-row' }, link('Se produkt og abonnementer →', '#pro-produkt')));
  }
  const C25_DEMO_SERIES = {
    dag: [1834.86, 1835.70, 1832.44, 1836.05, 1835.54, 1839.47, 1838.35, 1841.92, 1840.73, 1842.56],
    uge: [1804.83, 1809.12, 1807.05, 1814.94, 1812.46, 1821.13, 1818.91, 1824.36, 1823.52, 1827.21]
  };
  function c25Chart(period) {
    const width = 720, height = 240, inset = 6;
    const values = C25_DEMO_SERIES[period];
    const interval = period === 'dag' ? 5 : 10;
    const min = Math.floor(Math.min(...values) / interval) * interval;
    const max = Math.ceil(Math.max(...values) / interval) * interval;
    const levels = Array.from({ length: (max - min) / interval + 1 }, (_, i) => max - i * interval);
    const format = new Intl.NumberFormat('da-DK');
    const canvas = el('canvas', { class: 'market-chart-canvas', width, height, role: 'img',
      'aria-label': `Illustrativ C25-kurve ${period === 'dag' ? 'i dag' : 'i sidste uge'}, fra ${format.format(values[0])} til ${format.format(values.at(-1))} point` });
    const chart = el('figure', { class: 'market-chart' },
      el('div', { class: 'market-chart-y', 'aria-hidden': 'true' }, levels.map(level => el('span', { text: format.format(level) }))),
      el('div', { class: 'market-chart-plot' },
        el('div', { class: 'market-chart-guides', 'aria-hidden': 'true' }, levels.map(() => el('span'))), canvas),
      el('figcaption', { class: 'market-chart-x', 'aria-hidden': 'true' },
        el('span', { text: period === 'dag' ? 'Forrige luk' : 'Ugens start' }),
        el('span', { text: period === 'dag' ? 'Senest' : 'Ugens slut' })));
    const context = window.CanvasRenderingContext2D ? canvas.getContext('2d') : null;
    if (!context) return chart;
    const points = values.map((value, i) => [inset + (width - 2 * inset) * i / (values.length - 1),
      height - (height * (value - min)) / (max - min)]);
    const last = points.at(-1);
    context.beginPath();
    context.moveTo(points[0][0], height);
    points.forEach(point => context.lineTo(...point));
    context.lineTo(last[0], height);
    context.closePath();
    context.fillStyle = 'rgba(131, 123, 129, 0.17)';
    context.fill();
    context.beginPath();
    context.moveTo(...points[0]);
    points.slice(1).forEach(point => context.lineTo(...point));
    context.lineWidth = 3.5;
    context.lineJoin = 'round';
    context.strokeStyle = '#837b81';
    context.stroke();
    context.fillStyle = context.strokeStyle;
    context.beginPath();
    context.arc(...last, 5.5, 0, 2 * Math.PI);
    context.fill();
    return chart;
  }
  function marketChange(change, withArrow) {
    const direction = change.startsWith('−') ? 'down' : change.startsWith('+') ? 'up' : '';
    return el('span', { class: 'market-change' + (direction ? ' market-' + direction : '') },
      withArrow && direction ? el('span', { 'aria-hidden': 'true', text: direction === 'down' ? '↓' : '↑' }) : null,
      el('span', { text: change }));
  }
  function marketItem([name, value, change], withArrow) {
    return el('div', { class: 'market-item' },
      el('dt', { class: 'eyebrow-label', text: name }),
      el('dd', { class: 'market-quote' }, el('strong', { text: value })),
      el('dd', {}, marketChange(change, withArrow)));
  }
  function markets(construction = false, showFinanceLink = true) {
    const datasets = construction ? {
      dag: [['Byggeomkostninger', '118,4', '+0,6 %'], ['Renoveringsindeks', '104,2', '+1,2 %'], ['Stålindeks', '112,8', '−0,3 %'], ['Udbud i byggeri', '24', 'Nye denne uge']],
      uge: [['Byggeomkostninger', '117,7', '+0,2 %'], ['Renoveringsindeks', '103,0', '+0,8 %'], ['Stålindeks', '113,1', '+0,1 %'], ['Udbud i byggeri', '18', 'Forrige uge']]
    } : {
      dag: [['OMX C25', '1.842,56', '+0,42 %'], ['STOXX Europe 600', '548,12', '−0,18 %'], ['S&P 500', '6.124,30', '+0,64 %'], ['USD/DKK', '6,48', '−0,22 %'], ['Brent (USD)', '74,28', '+0,71 %'], ['Dansk 10-årig rente', '2,53 %', '+3 bp']],
      uge: [['OMX C25', '1.827,21', '+1,24 %'], ['STOXX Europe 600', '549,11', '+0,32 %'], ['S&P 500', '6.085,35', '+0,91 %'], ['USD/DKK', '6,49', '+0,16 %'], ['Brent (USD)', '73,76', '−1,12 %'], ['Dansk 10-årig rente', '2,50 %', '−2 bp']]
    };
    const grid = el(construction ? 'dl' : 'div', { class: 'market-grid' + (construction ? '' : ' market-grid--graphic'), 'aria-live': 'polite' });
    const controls = el('div', { class: 'market-periods', role: 'group', 'aria-label': 'Vælg periode' });
    const update = period => {
      if (construction) {
        grid.replaceChildren(...datasets[period].map(quote => marketItem(quote, false)));
      } else {
        const [[name, value, change], ...related] = datasets[period];
        grid.replaceChildren(
          el('dl', { class: 'market-feature' },
            el('dt', { text: name }),
            el('dd', { class: 'market-feature-quote' }, el('strong', { text: value }), marketChange(change, true)),
            el('dd', {}, c25Chart(period))),
          el('dl', { class: 'market-ledger' }, related.map(quote => marketItem(quote, true))));
      }
      controls.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.period === period)));
    };
    for (const [period, label] of [['dag', 'I dag'], ['uge', 'Sidste uge']]) controls.append(el('button', { type: 'button', 'data-period': period, text: label, onclick: () => update(period) }));
    update('dag');
    const actions = el('div', { class: 'market-actions' }, controls,
      !construction && showFinanceLink ? el('a', { class: 'text-link', href: '#pro-overblik?f=finans', text: 'Mere finans →' }) : null);
    const gated = !isPro();
    if (gated) { grid.setAttribute('inert', ''); grid.setAttribute('aria-hidden', 'true'); actions.setAttribute('inert', ''); }
    const body = gated
      ? el('div', { class: 'market-locked' }, grid,
        el('button', { type: 'button', class: 'market-lock-cta', onclick: () => openPaywall({ title: construction ? 'Byggeriet i tal' : 'Markederne kort' }) }, lock(), el('span', { text: 'Se markederne med Business Pro' })))
      : grid;
    return el('section', { class: (construction ? 'market-strip' : 'market-graphic') + (gated ? ' is-gated' : '') },
      moduleHeader(construction ? 'Byggeriet i tal' : 'Markederne kort', 'Illustrative demotal', actions), body);
  }
  function diBanner(heading = 'h2', action = null, pitch = false) {
    // .di-slot er en container: banneret tilpasser sig sin egen bredde og kan stå i smalle bokse
    // pitch: salgsvarianten til ikke-medlemmer, som lander fra "Se alle fordelene"
    return el('div', { class: 'di-slot' }, el('header', { class: 'di-partner-banner' },
      el('div', {}, el(heading, { text: pitch
          ? (access === 'di'
            ? 'Du er medlem af Dansk Industri – se dine ekstra fordele med Business Pro.'
            : 'Er du medlem af Dansk Industri? Så kan du få ekstra fordele med Business Pro.')
          : 'Industriens næste træk' }),
        mono(pitch ? 'Dansk Industri · Medlemsfordel' : 'Dansk Industri · Medlemsindsigt'),
        el('p', { text: pitch
          ? access === 'di'
            ? 'Brug dit DI-medlemskab til at se Business Pros ekstra muligheder, DI-indhold og relevante værktøjer.'
            : 'Som DI-medlem kan du få ekstra fordele gennem Business Pro: mere indsigt, analyser og særtilbud. Business Pro er et separat abonnement.'
          : 'Egne analyser. Danske virksomhedscases. Internationale perspektiver på de beslutninger, der former din forretning.' }),
        action),
      el('span', { class: 'di-logo' }, el('img', { src: DI_LOGO, alt: 'Dansk Industri' }))));
  }
  function diLeads(headline, preview = false) {
    return el('div', { class: 'di-news-leads' }, [FRONT.hero, FRONT.band].map(id => card('a' + id, { headline, preview })));
  }
  const DI_CASE_DEKS = {
    1: 'I Arlas forsøg faldt standardafvigelsen i produktkvaliteten fra 6 til 3 procent. Mere ensartet kvalitet kan give højere produktion eller lavere energiforbrug.',
    2: 'Fire måneders afprøvning gav ingen energibesparelse. En DTU-afhandling viser, hvorfor teknologien ikke leverede som forventet.',
    3: 'Ringsted Forsynings model varslede isdannelse op til 14 timer tidligere i test. Forsyningen investerer nu i at videreudvikle modellen.',
    4: 'Tre prototyper skal finde fejl i tilbud, genbruge erfaringer og gøre store dokumentmængder lettere at arbejde med.',
    5: 'Et dansk projekt har udviklet en AI-understøttet metode til at kortlægge materialer. Næste skridt er data, som hele branchen kan bruge.'
  };
  function diCases(preview = false) {
    return el('div', { class: 'di-news-cases' }, FRONT.box.map(id => card('a' + id, { description: DI_CASE_DEKS[id], preview })));
  }
  function diPreview(heading) {
    const stories = el('div', { class: 'di-preview-content' }, diLeads('h3', true),
      el('details', { class: 'di-case-disclosure' },
        el('summary', {}, 'Virksomhederne i praksis', chevron()), diCases(true)));
    stories.hidden = true;
    const toggle = el('button', { type: 'button', class: 'cta-primary', 'aria-expanded': 'false', 'aria-controls': 'di-preview-content',
      text: 'Se et udpluk af DI-universet', onclick: () => {
        stories.hidden = !stories.hidden;
        toggle.setAttribute('aria-expanded', String(!stories.hidden));
        toggle.textContent = stories.hidden ? 'Se et udpluk af DI-universet' : 'Skjul udplukket';
      } });
    stories.id = 'di-preview-content';
    return el('section', { class: 'preserved-di', 'aria-label': 'Dansk Industri' }, diBanner(heading, toggle, access !== 'di'), stories,
      el('div', { class: 'di-access-row' },
        el('p', { text: 'DI-universet kræver et verificeret DI-medlemskab.' }),
        access === 'di' ? link('Åbn dit DI-univers →', '#forside', true) : btn('Log ind og verificér dit DI-medlemskab →', () => openLogin({ di: true, target: '#forside' }), true)));
  }
  function diTeaser(compact = false) {
    if (access === 'free') {
      const action = link('Se dine DI-fordele med Business Pro →', '#pro-produkt', true);
      return el('section', { class: 'preserved-di', 'aria-label': 'Dansk Industri' }, diBanner('h2', action, true));
    }
    return diPreview('h2');
  }
  function diFront() {
    return el('div', { class: 'platform-page di-news-page' }, diBanner('h1'), diLeads('h2'),
      el('section', { class: 'content-section', 'aria-labelledby': 'di-cases-title' },
        el('h2', { class: 'di-cases-title', id: 'di-cases-title', text: 'Virksomhederne i praksis' }), diCases()),
      reportModule(null));
  }
  function reportModule(sector) {
    const construction = sector === 'byggeri';
    return el('section', { class: 'content-section', id: 'rapporter' },
      moduleHeader('Brancherapporter', (construction ? 'Perspektiv på byggeriets næste beslutninger' : 'Dybde på tværs af dansk erhvervsliv') + ' · Powered by Supertrends'),
      el('div', { class: 'report-card' },
        el('div', { class: 'report-cover', 'aria-hidden': 'true' }, el('small', { text: 'Business Pro' }), el('strong', { text: construction ? 'BYG\nGERI' : 'UDSYN' }), el('small', { text: 'Powered by Supertrends' })),
        el('div', {}, mono('Brancherapport · Powered by Supertrends'), el('h3', { text: construction ? 'Robotter på byggepladsen. Skal vi med nu?' : 'AI, kapital og konkurrence: Hvad flytter erhvervslivet?' }),
          el('p', { text: construction ? 'Et interaktivt rapportuddrag med spørgsmål til din næste teknologiinvestering.' : 'Et rapportuddrag med perspektiver på investeringer, teknologi og de næste beslutninger.' }),
          btn(isPro() ? 'Åbn rapportuddrag →' : 'Se rapporten · Business Pro', () => isPro() ? openReport(construction) : openPaywall({ title: 'Brancherapporter · Powered by Supertrends', sector, report: true }), true))));
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
  function liveBlogLinks() {
    return el('nav', { class: 'liveblog-links', 'aria-labelledby': 'liveblog-label' },
      el('span', { class: 'ydk-label', id: 'liveblog-label', text: 'Live blogs' }),
      el('div', { class: 'liveblog-sources' }, Object.entries(LIVE_BLOGS).map(([path, { name }]) => {
        const logo = document.getElementById('liveblog-logo-' + name.toLowerCase()).content.firstElementChild.cloneNode(true);
        return el('a', { href: '#' + path, class: 'liveblog-pill', 'aria-label': name }, logo);
      })));
  }
  function liveBlogMark() {
    return iconSvg('<path d="M13 2 3 14h8l-1 8 11-12h-8z" fill="currentColor" stroke="none"/>');
  }
  function liveBlogPost(key, time) {
    const article = BARTICLES[key.slice(1)];
    const paragraphs = locked(key) ? [] : parseBody(article.body).filter(block => block.type === 'p').slice(0, 2);
    const sourceIcon = '<path d="M10 13a4 4 0 0 0 6 .4l3-3a4 4 0 0 0-5.7-5.7l-1.7 1.7m.4 4.6a4 4 0 0 0-6-.4l-3 3a4 4 0 0 0 5.7 5.7l1.7-1.7"/>';
    return el('li', { class: 'liveblog-post' },
      el('span', { class: 'liveblog-marker', 'aria-hidden': 'true' }, liveBlogMark()),
      el('article', {},
        el('time', { class: 'liveblog-time ydk-label', datetime: time }, 'Kl. ' + time.replace(':', '.')),
        el('h2', { text: article.headline }),
        el('p', { class: 'liveblog-post-intro', text: article.manchet }),
        el('details', { class: 'liveblog-more' },
          el('summary', {}, el('span', { class: 'liveblog-more-pill' }, chevron(),
            el('span', { class: 'liveblog-more-show', text: 'Se mere' }),
            el('span', { class: 'liveblog-more-hide', text: 'Vis mindre' }))),
          el('div', { class: 'liveblog-more-body' }, paragraphs.map(block => el('p', {}, inlineText(block.text))),
            el('a', { class: 'text-link', href: '#' + key, text: 'Læs hele artiklen →' }))),
        article.kilder ? el('details', { class: 'liveblog-sources-detail' },
          el('summary', { class: 'ydk-label' }, iconSvg(sourceIcon), el('span', { text: 'Kilder' })),
          el('p', { text: article.kilder })) : null));
  }
  function liveBlogPage(path) {
    const blog = LIVE_BLOGS[path];
    const times = ['14:32', '14:08', '13:46'];
    return el('div', { class: 'liveblog-page' },
      el('header', { class: 'liveblog-header' },
        el('span', { class: 'liveblog-badge' }, liveBlogMark(), 'Liveblog'),
        el('h1', { text: blog.name }),
        el('p', { text: blog.description }),
        el('div', { class: 'liveblog-context' }, mono('Demoindlæg'),
          el('a', { class: 'text-link', href: '#business', text: 'Tilbage til Business →' }))),
      el('ol', { class: 'liveblog-timeline', 'aria-label': 'Indlæg, nyeste først' },
        blog.stories.map((key, index) => liveBlogPost(key, times[index]))));
  }
  function businessFront() {
    const original = renderBusinessFront();
    const hero = original.querySelector('.bf-hero');
    const mintTop = original.querySelector('.bf-mint-top');
    mintTop?.firstElementChild?.remove();
    mintTop?.append(badge());
    original.querySelectorAll('.bf-kick, .bf-li-t > .bf-mono, .bc-t > .bf-mono').forEach(node => node.remove());
    const oldHeading = hero.querySelector('h1'), newHeading = el('h2', { text: oldHeading.textContent });
    newHeading.className = 'business-hero-title'; oldHeading.replaceWith(newHeading);
    const more = original.querySelector('.bf-more'); more.remove();
    more.querySelectorAll('a').forEach(a => {
      const key = a.getAttribute('href').slice(1);
      if (story(key)?.premium) a.querySelector('.bc-t').append(badge());
    });
    const people = original.querySelector('.bf-people'); people.remove();
    const peopleLinks = people.querySelector('.bf-people-links');
    peopleLinks.replaceChildren(btn('Mød redaktionen →', openEditorial), btn('Sådan bruger vi AI →', openEditorial));
    original.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href') || '';
      const key = href.slice(1);
      if (/^(b|p|a)\d+$/.test(key) && locked(key)) {
        a.classList.add('is-premium-lock');
        if (!a.querySelector('.premium-lock-overlay')) {
          a.append(lockOverlay());
        }
      }
    });
    const proRail = el('aside', { class: 'open-pro-rail', 'aria-label': 'Business Pro' },
      el('div', {}, mono('Business Pro'), el('strong', { text: 'Mere end dagens overskrifter.' })),
      el('p', { text: 'Morgenbrief, medieovervågning, markedsindsigt og brancherapporter.' }),
      el('div', { class: 'cta-row' },
        btn(isPro() ? 'Åbn Mit Business Pro →' : 'Prøv Pro+ i 30 dage', () => isPro() ? go('#mit-pro') : openSubscribe('Pro+'), true),
        link('Se alle fordelene', '#pro-produkt'),
        el('button', { type: 'button', class: 'text-link', text: 'Business AI', onclick: openBusinessAiOverview })));
    // Bevar originalens hovedhistorie, analyseboks, nyheder, Porsche-bånd og dagens tal.
    original.querySelector('.bf-row1').after(markets());
    const businessRows = el('section', { class: 'bf', 'aria-label': 'Dagens historier' }, ...original.childNodes);
    return el('div', { class: 'platform-page' }, intro('Business', 'Nyhederne. Perspektivet. Dit næste træk.'), liveBlogLinks(), proRail,
      businessRows, promo(), more,
      diTeaser(), toolsModule(null),
      el('section', { class: 'branch-feature' }, photo(story('p0')), el('div', {}, mono('Brancher · Byggeri'), el('h2', { text: 'Tættere på det, der bygger Danmark.' }), el('p', { text: 'Følg de vigtigste byggerihistorier, investeringer og teknologier. Samme Business Pro. Kurateret til din branche.' }), link('Udforsk Byggeri →', '#byggeri', true))),
      reportModule(null), people);
  }
  function midSectionCommercialTeaser() {
    if (isPro()) return null;
    return el('section', { class: 'content-teaser-banner', 'aria-label': 'Business Pro' },
      mono('Business Pro'),
      el('h3', { text: 'Mere indsigt. Flere muligheder.' }),
      el('p', { text: 'Gå bag om erhvervsnyhederne med analyser og Business Pro-værktøjer.' }),
      link('Se, hvad du får med Business Pro →', '#pro-produkt', true));
  }
  function proTopToolsBar(sector) {
    if (!isPro()) return null;
    return el('section', { class: 'pro-top-tools-bar', 'aria-label': 'Dine Business Pro-værktøjer' },
      el('div', { class: 'pro-top-tools-header' },
        mono('Arbejdsredskaber'),
        el('h2', { text: 'Dine Business Pro-værktøjer' })),
      el('div', { class: 'pro-top-tools-grid' },
        el('div', { class: 'pro-top-tool-card' },
          el('div', { class: 'pro-top-tool-info' },
            el('h3', { text: 'Markedsmonitor' }),
            el('p', { text: 'Følg ledelsesskift, regnskaber og bevægelser hos virksomhederne i dit marked.' })),
          btn('Åbn Markedsmonitor →', () => openTool('market', sector), true)),
        el('div', { class: 'pro-top-tool-card' },
          el('div', { class: 'pro-top-tool-info' },
            el('h3', { text: 'Udbudsmonitor' }),
            el('p', { text: 'Få overblik over relevante udbud og opgaver for jeres branche.' })),
          btn('Åbn Udbudsmonitor →', () => openTool('tender', sector), true)),
      el('a', { class: 'cta-primary pro-top-tools-compact', href: '#mit-pro', text: 'Åbn mit værktøj →' })));
  }
  function contextMarketTool(sector) {
    if (!isPro()) return null;
    return el('aside', { class: 'context-tool-card', 'aria-label': 'Markedsmonitor' },
      mono('Markedsmonitor · Værktøj'),
      el('h3', { text: 'Følg udviklingen i markedet' }),
      el('p', { text: 'Få overblik over aktuelle bevægelser og tendenser med Markedsmonitor.' }),
      btn('Åbn Markedsmonitor →', () => openTool('market', sector), true));
  }
  function contextTenderTool(sector) {
    if (!isPro()) return null;
    return el('aside', { class: 'context-tool-card', 'aria-label': 'Udbudsmonitor' },
      mono('Udbudsmonitor · Værktøj'),
      el('h3', { text: 'Hold øje med nye muligheder' }),
      el('p', { text: 'Brug Udbudsmonitor til at orientere dig om relevante udbud.' }),
      btn('Åbn Udbudsmonitor →', () => openTool('tender', sector), true));
  }
  function contextMoreThanNews() {
    if (!isPro()) return null;
    return el('aside', { class: 'context-tool-card', 'aria-label': 'Dine værktøjer' },
      mono('Business Pro · Arbejdsredskab'),
      el('h3', { text: 'Mere end nyheder' }),
      el('p', { text: 'Med Business Pro har du også adgang til værktøjer, der hjælper dig med at omsætte indsigt til overblik.' }),
      link('Udforsk dine værktøjer →', '#mit-pro', true));
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
      [['alle', 'Overblik'], ['finans', 'Finans'], ['analyse', 'Analyse'], ['rapporter', 'Brancherapporter'], ['vaerktoejer', 'Værktøjer']].map(([key, text]) => {
      const isToolLink = key === 'vaerktoejer' && isPro();
      const href = isToolLink ? '#mit-pro' : base + (key === 'alle' ? '' : '?f=' + key);
      return el('a', { class: 'ydk-pill' + (filter === key && !isToolLink ? ' ydk-pill--active' : ''), href, 'aria-current': filter === key && !isToolLink ? 'page' : null, text });
    }));
    const finance = spec ? spec.finance : ['b6', 'b8', 'b9'];
    const analysis = spec ? spec.analysis : ['b3', 'b1', 'b2'];
    const sections = [];
    if (filter === 'alle') {
      sections.push(el('section', { class: 'curation-grid', 'aria-label': sector ? 'Byggeriets vigtigste historier' : 'Business Pro · Redaktionens udvalgte' }, card(lead, { lead: true, description: false }), el('div', { class: 'curation-side' }, related.map(key => card(key, { description: false })))));
      if (access === 'di') {
        sections.push(el('section', { class: 'curation-di-member-banner', 'aria-label': 'Dansk Industri · Medlemsfordel' },
          el('div', { class: 'di-slot' },
            el('header', { class: 'di-partner-banner' },
              el('div', {},
                mono('Dansk Industri · Dit medlemskab'),
                el('h2', { text: 'Som DI-medlem får du mere end bare Business Pro' }),
                el('p', { text: 'Dit medlemskab af Dansk Industri giver dig fuld adgang til Business Pro – plus en særlig sektion med dybdegående analyser, indsigt og opinion forbeholdt medlemmer.' }),
                link('Gå til særlig indsigt, analyse og opinion →', '#forside', true)),
              el('span', { class: 'di-logo' }, el('img', { src: DI_LOGO, alt: 'Dansk Industri' }))))));
      }
    }
    if (filter === 'alle' || filter === 'finans') {
      sections.push(markets(!!sector, filter === 'alle'));
      sections.push(el('section', { class: 'content-section' }, moduleHeader('Finans', sector ? 'Kapital, investeringer og opgaver i byggeriet' : 'Pengene og de virksomheder, der flytter dem'), el('div', { class: 'card-grid' }, finance.map(key => card(key)))));
      if (isPro()) sections.push(contextMarketTool(sector));
    }
    if (!isPro() && (filter === 'alle' || filter === 'finans')) {
      sections.push(midSectionCommercialTeaser());
    }
    if (filter === 'alle' || filter === 'analyse') {
      sections.push(el('section', { class: 'content-section' }, moduleHeader('Analyse', sector ? 'Teknologi og metoder under faglig lup' : 'Forstå konsekvenserne bag overskrifterne'), el('div', { class: 'card-grid' }, analysis.map(key => card(key)))));
      if (isPro()) sections.push(contextTenderTool(sector));
    }
    if (filter === 'alle' || filter === 'rapporter') {
      if (isPro()) sections.push(contextMoreThanNews());
      sections.push(reportModule(sector));
    }
    if (filter === 'vaerktoejer') {
      sections.push(featureOverview());
      if (isPro()) sections.push(companyCase());
    }
    if (filter === 'alle' || filter === 'vaerktoejer') sections.push(toolsModule(sector));
    if (filter === 'vaerktoejer' && isPro()) sections.push(el('section', { class: 'content-section' },
      moduleHeader('Dit værktøjsunivers', 'Samlet overblik over alle dine arbejdsredskaber'),
      el('div', { class: 'cta-row' }, link('Åbn Mit Business Pro →', '#mit-pro', true))));
    if (access !== 'di') sections.push(diTeaser(filter !== 'alle'));
    const content = el('div', { class: 'curation-content', 'data-filter': filter }, ...sections);
    return el('div', { class: 'platform-page curated-page' },
      proTopToolsBar(sector),
      categories,
      curation,
      intro(sector ? 'Byggeri' : 'Business', sector ? 'Business Pro · Redaktionens vigtigste historier til din branche.' : 'Redaktionens vigtigste historier. På tværs af erhvervslivet.', true),
      content);
  }
  const DEMO_COMPANY_KEY = 'y-business-demo-company';
  const DEFAULT_COMPANY = 'Eksempelvirksomhed A/S';
  function demoCompany() { try { return localStorage.getItem(DEMO_COMPANY_KEY) || DEFAULT_COMPANY; } catch (_) { return DEFAULT_COMPANY; } }
  function storeCompany(value) { const name = String(value || '').trim(); if (!name) return; try { localStorage.setItem(DEMO_COMPANY_KEY, name); } catch (_) {} }
  function featureOverview() {
    const features = [
      ['Morgenbrief', 'Pro', 'Morgenbrief kl. 06.00 med de historier, der rammer jeres branche og virksomhed.'],
      ['MedieMonitor', 'Pro', 'Omtaler af jeres virksomhed, brands og nøglepersoner samlet ét sted.'],
      ['MarkedsMonitor', 'Pro', 'Ledelsesskift, regnskaber og bevægelser hos de virksomheder, I følger.'],
      ['Business AI', 'Pro', 'Svar med kilder fra egne data og offentlige registre.'],
      ['UdbudsMatch', 'Pro+', 'Udbud sorteret efter jeres branche og virksomhedsprofil.'],
      ['Brancherapporter', 'Pro+', 'Beslutningsgrundlag for jeres branche, fire rapporter om året. Powered by Supertrends.']
    ];
    return el('section', { class: 'content-section pro-features', 'aria-labelledby': 'pro-features-title' },
      el('h2', { id: 'pro-features-title', class: 'visually-hidden', text: 'Alt i Business Pro' }),
      moduleHeader('Alt det, Business Pro kan.', 'Alle værktøjer i ét abonnement. Pro+ udvider med udbud og brancherapporter.'),
      el('div', { class: 'pro-feature-grid' }, features.map(([title, tier, text]) => el('article', { class: 'pro-feature' },
        el('span', { class: 'eyebrow-label', text: tier }),
        el('h3', { text: title }),
        el('p', { text: text })))));
  }
  function companyCase() {
    const company = demoCompany();
    const rows = [
      ['market', 'Ledelse', 'Ny adm. direktør hos en fulgt virksomhed', 'MarkedsMonitor'],
      ['tender', 'Udbud', '480 almene boliger i Rødovre · 94 % match', 'UdbudsMatch'],
      ['media', 'Omtale', `Tre nye omtaler af ${company}`, 'MedieMonitor']
    ];
    return el('section', { class: 'company-case', 'aria-labelledby': 'company-case-title' },
      mono('Jeres case · Demo'),
      el('h2', { id: 'company-case-title', text: `${company}: sådan ser jeres marked ud i dag` }),
      el('p', { class: 'plan-note', text: 'Eksempelcase. Erstattes af jeres egne CVR-, regnskabs- og omtaledata, når I er koblet på.' }),
      el('div', { class: 'company-case-rows' }, rows.map(([kind, label, text, source]) => el('button', {
        type: 'button', class: 'company-case-row', onclick: () => openTool(kind, kind === 'tender' ? 'byggeri' : null)
      }, mono(label), el('strong', { text }), el('small', { text: source + ' →' })))));
  }
  function proLanding() {
    const cockpit = [
      ['Det vigtigste fra jeres marked', 'Jeres konkurrenter gør det, der flytter markedet', '4 nye'],
      ['Renovering · Hovedstaden', 'Renovering af 480 almene boliger i Rødovre', '3 nye'],
      ['Markedsmonitor', 'Ny adm. direktør hos en fulgt virksomhed', 'I dag']
    ];
    const hero = el('section', { class: 'landing-hero' },
      el('div', { class: 'landing-copy' },
        el('span', { class: 'landing-kicker', text: 'BUSINESS PRO' }),
        el('h1', { text: 'Det vigtigste om jeres branche, jeres konkurrenter og jer selv. Hver morgen kl. 06.30.' }),
        el('p', { text: 'Få et overblik, du kan bruge, uden selv at skulle i ti forskellige systemer. AI overvåger og sorterer. Redaktionen vurderer og forklarer.' }),
        el('div', { class: 'cta-row' }, btn(isPro() ? 'Åbn Mit Business Pro →' : 'Prøv Pro+ gratis i 30 dage', () => isPro() ? go('#mit-pro') : openSubscribe('Pro+'), true)),
        el('small', { text: 'Intet betalingskort. Ingen automatiske fornyelser.' })),
      el('div', { class: 'landing-cockpit' },
        el('div', { class: 'cockpit-search' },
          el('span', { text: 'SÅDAN SER DET UD FOR JER' }),
          el('span', { class: 'cockpit-cta', text: 'Mit Business Pro  →' })),
        ...cockpit.map(([label, text, meta]) => el('div', { class: 'cockpit-row' },
          el('span', { class: 'cockpit-label', text: label }),
          el('strong', { text }),
          el('small', { text: meta })))));
    const trust = el('section', { class: 'landing-trust', 'aria-label': 'Eksempel på kilder' },
      el('span', { class: 'trust-label', text: 'BYGGET PÅ OFFENTLIGE OG BETALTE KILDER' }),
      ...['CVR', 'Årsregnskaber', 'TED', 'udbud.dk', 'Statistikbanken', 'Medier', 'Projekt Y'].map(name =>
        el('div', { class: 'trust-item' }, el('strong', { text: name }), el('small', { text: 'Demoindhold' }))));
    return el('div', { class: 'platform-page pro-landing-page' },
      hero,
      featureOverview(),
      trust,
      el('section', { class: 'content-section', id: 'priser' }, moduleHeader('Ét abonnement. Jeres branche.', 'Eksempelpriser og pakker · Ét CVR, én branche og fem brugere'),
        el('div', { class: 'plans' },
          el('article', { class: 'plan' }, mono('For virksomheden'), el('h3', { text: 'Business Pro' }), el('p', { class: 'plan-price' }, '5.000 kr. ', el('small', { text: '/ år ekskl. moms' })),
            el('ul', {}, ['Branchenyheder og morgenbrief', 'MedieMonitor og MarkedsMonitor', 'Business AI med kilder', 'Én branche og fem brugere'].map(text => el('li', { text }))), btn('Vælg Pro i demoen →', () => openSubscribe('Pro'), true)),
          el('article', { class: 'plan' }, mono('For virksomheden · Udvidet'), el('h3', { text: 'Business Pro+' }), el('p', { class: 'plan-price' }, '12.500 kr. ', el('small', { text: '/ år ekskl. moms' })),
            el('ul', {}, ['Alt fra Business Pro', 'UdbudsMatch', 'Fire brancherapporter om året', 'Gratis prøveperiode i demoen'].map(text => el('li', { text }))), btn('Prøv Pro+ i demoen →', () => openSubscribe('Pro+'), true))),
        el('p', { class: 'plan-note', text: 'Demo-toggle viser samlet Pro-adgang til rapporter og værktøjer. Pro+ udvider med udbud og brancherapporter.' })),
      toolsModule('byggeri'),
      el('section', { class: 'content-section' }, moduleHeader('Spørgsmål om adgang'),
        [['Er Business Pro et andet website?', 'Nej. Business Pro er et lag på Y med samme konto, flere rettigheder og et redaktionelt overblik, som kan kurateres til din branche.'], ['Hvad får DI-medlemmer adgang til?', 'Det særlige DI-univers kræver login og verificeret medlemskab. I denne demo kan du gennemgå et simuleret medlemsflow eller vælge DI-medlem i demo-toggle øverst.'], ['Er der betaling i denne mockup?', 'Nej. Login, abonnement og medlemsverifikation er lokale demonstrationer. Ingen oplysninger sendes til en login- eller betalingsudbyder.']].map(([q, a]) => el('details', { class: 'value-card' }, el('summary', { text: q }), el('p', { class: 'plan-note', text: a })))));
  }
  function sendWorkspace(type, payload = {}) {
    if (!workspaceFrame?.contentWindow || !isPro()) return;
    workspaceFrame.contentWindow.postMessage({ channel: 'y-business-workspace', type, ...payload }, location.protocol === 'file:' ? '*' : location.origin);
  }
  function stickWorkspaceTabs() {
    if (!workspaceFrame || !workspaceFrame.isConnected) return;
    const header = document.getElementById('ysite');
    const offset = Math.max(0, Math.round((header ? header.getBoundingClientRect().bottom : 0) - workspaceFrame.getBoundingClientRect().top));
    sendWorkspace('stick', { offset });
  }
  let stickFrame = 0;
  window.addEventListener('scroll', () => { cancelAnimationFrame(stickFrame); stickFrame = requestAnimationFrame(stickWorkspaceTabs); }, { passive: true });
  function initWorkspace() {
    sendWorkspace('init', {
      access, company: demoCompany(), theme: document.documentElement.getAttribute('data-y-theme') === 'light' ? 'light' : 'dark', tab: workspaceTab,
      articles: ['p0', 'p1', 'p2', 'p3', 'p4', 'b6', 'b11'].map(key => {
        const article = story(key);
        return { key: article.key, title: article.fullTitle, dek: article.dek, label: article.label };
      })
    });
  }
  function workspacePage() {
    workspaceFrame = el('iframe', {
      class: 'pro-tools-frame', title: 'Business Pro · Dine værktøjer', src: 'business-pro/index.html',
      sandbox: 'allow-scripts allow-same-origin allow-downloads', scrolling: 'no', onload: initWorkspace
    });
    return el('div', { class: 'platform-page pro-workspace-page' }, el('h1', { class: 'visually-hidden', text: 'Mit Business Pro · Værktøjer' }), access === 'di' ? el('nav', { class: 'workspace-bar', 'aria-label': 'DI-medlem' }, el('span', { text: 'Du er logget ind som DI-medlem' }), link('Åbn DI-universet →', '#forside')) : null,
      companyCase(), el('div', { class: 'pro-workspace-grid' }, workspaceFrame, access === 'di' ? diBenefits() : null));
  }
  function diBenefits() {
    const items = [
      ['Virksomhedscases', 'Danske cases med konkret erfaring og læring'],
      ['Analyser', 'Ekstra dybdegående analyser for DI-medlemmer'],
      ['Opinion', 'Indsigt og perspektiver fra industriens folk']
    ];
    return el('aside', { class: 'pro-di-benefits', 'aria-labelledby': 'pro-di-title' },
      el('h2', { id: 'pro-di-title', text: 'Eksklusivt til dig' }),
      el('p', { class: 'plan-note', text: 'Som DI-medlem får du adgang til særligt indhold ud over Business Pro.' }),
      el('ul', {}, items.map(([title, text]) => el('li', {}, el('strong', { text: title }), el('span', { text })))),
      link('Åbn DI-universet →', '#forside', true));
  }
  function proAccessPage() {
    return el('div', { class: 'platform-page pro-access-page' },
      el('section', { class: 'pro-access-layout' },
        el('div', { class: 'pro-access-intro' }, mono('Business Pro · Dit arbejdsredskab'),
          el('h1', { text: 'Dit marked. Dine værktøjer. Ét samlet overblik.' }),
          el('p', { text: 'Log ind med din Business Pro-adgang for at åbne morgenbrief, overvågning, udbud og Business AI.' }),
          el('ul', { class: 'pro-access-features' }, ['Til jer i dag og morgenbrief', 'MedieMonitor og MarkedsMonitor', 'UdbudsMatch, Business AI og brancherapporter'].map(text => el('li', { text }))),
          link('Se produkt og abonnementer →', '#pro-produkt')),
        el('div', { class: 'pro-login-card' }, badge(), el('h2', { text: 'Log ind på Business Pro' }),
          el('p', { text: 'Har du allerede adgang? Log ind, og gå direkte til dine værktøjer.' }),
          btn('Log ind og åbn mine værktøjer →', () => openLogin({ target: '#pro' }), true),
          el('div', { class: 'pro-login-divider' }, 'Har du ikke et abonnement?'),
          el('h3', { text: 'Få adgang til Business Pro' }),
          el('p', { text: 'Prøv hele værktøjsuniverset med virksomhedsoverblik, analyser og de næste skridt samlet ét sted.' }),
          btn('Prøv Business Pro i demoen →', () => openSubscribe('Pro', () => { closeDialog(); go('#pro'); }), true),
          el('p', { class: 'plan-note', text: 'Demologin og abonnement er simuleret. Ingen betaling eller oplysninger sendes.' }))));
  }
  function teaserPage(key) {
    const a = story(key);
    return el('div', { class: 'platform-page' }, el('article', { class: 'article-tease' },
      el('a', { class: 'text-link', href: a.di ? '#forside' : key[0] === 'p' ? '#byggeri' : '#business', text: '← Tilbage til overblikket' }),
      el('div', { class: 'cta-row' }, mono(a.label), badge(a.di ? 'di' : 'pro')), el('h1', { text: a.fullTitle }), el('p', { text: a.dek }), photo(a, true)),
      el('section', { class: 'paywall-inline' }, mono(a.di ? 'Dansk Industri · Medlemsadgang' : 'Business Pro'),
        el('h2', { text: a.di ? 'Mere indsigt til DI’s medlemmer.' : 'Vil du læse hele analysen?' }),
        el('p', { text: a.di ? 'Log ind, og bekræft dit DI-medlemskab for at læse historien og åbne medlemsuniverset.' : 'Få adgang til denne og flere erhvervsanalyser med Business Pro.' }),
        el('div', { class: 'cta-row' },
          a.di ? btn('Log ind og verificér medlemskab', () => openLogin({ di: true, target: '#' + key }), true) : link('Få adgang med Business Pro →', '#pro-produkt', true),
          !a.di ? btn('Allerede abonnent? Log ind', () => openLogin({ target: '#' + key }), false) : null)));
  }
  // ── Pro-blomsten: lukket som standard. Folder Brancher og DI-medlem ud under PRO ──
  const bloom = { toggle: null, panel: null, open: false, timer: 0 };
  function placeBloom() {
    const header = document.getElementById('ysite'), pro = document.getElementById('nav-pro');
    if (!header || !pro || !bloom.panel) return;
    const h = header.getBoundingClientRect(), a = pro.getBoundingClientRect();
    const width = Math.min(560, window.innerWidth - 32), center = a.left + a.width / 2 - h.left;
    const left = Math.max(16, Math.min(center - width / 2, h.width - width - 16));
    bloom.panel.style.width = width + 'px';
    bloom.panel.style.left = left + 'px';
    bloom.panel.style.setProperty('--bloom-origin', Math.round(center - left) + 'px 0');
  }
  function setBloom(open) {
    if (!bloom.panel || open === bloom.open) return;
    clearTimeout(bloom.timer); bloom.open = open;
    bloom.toggle.setAttribute('aria-expanded', String(open));
    if (open) { bloom.panel.hidden = false; placeBloom(); void bloom.panel.offsetWidth; bloom.panel.dataset.state = 'open'; }
    else { bloom.panel.dataset.state = 'closing'; bloom.timer = setTimeout(() => { bloom.panel.hidden = true; bloom.panel.dataset.state = ''; }, 160); }
  }
  function renderBloom(r) {
    if (!bloom.toggle) {
      const wrap = document.querySelector('.ysite-business-links');
      if (!wrap) return;
      bloom.toggle = el('button', { type: 'button', class: 'pro-bloom-toggle', id: 'pro-bloom-toggle', 'aria-expanded': 'false', 'aria-controls': 'pro-bloom', 'aria-haspopup': 'true',
        'aria-label': 'Pro-menu: Brancher og DI-medlem', onclick: () => setBloom(!bloom.open) }, chevron());
      bloom.panel = el('div', { class: 'pro-bloom', id: 'pro-bloom', role: 'group', 'aria-label': 'Business Pro' });
      bloom.panel.hidden = true;
      wrap.append(bloom.toggle, bloom.panel);
    }
    const member = access === 'di';
    bloom.panel.replaceChildren(
      el('section', { class: 'petal petal-branches', style: '--i:0' }, mono('Brancher'),
        el('p', { text: 'Business Pro · Vælg din branche' }),
        el('ul', {}, ...Object.entries(SECTORS).map(([key, value]) => el('li', {}, el('a', { href: '#' + key, 'aria-current': r.sector === key ? 'page' : null, text: value.label }))),
          el('li', {}, el('a', { href: '#pro-overblik', text: 'Alle brancher →' })))),
      el('section', { class: 'petal petal-di', style: '--i:1' }, mono('DI-medlem'),
        el('p', {}, lock(member), member ? ' Medlemskab verificeret.' : ' Kræver login og verificeret medlemskab.'),
        el('ul', {}, el('li', {}, el('a', { class: 'bloom-di', href: '#forside', text: member ? 'Åbn DI-universet →' : 'Log ind som DI-medlem →' })))));
  }
  function headerState(r) {
    document.querySelectorAll('[data-access]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.access === access)));
    const businessPage = r.name === 'business' || r.name === 'danmark' || r.name === 'ai' || /^b\d+$/.test(r.name);
    const proPage = ['pro-produkt', 'pro', 'mit-pro', 'byggeri', 'pro-overblik'].includes(r.name) || /^[pa]\d+$/.test(r.name) || r.name === 'forside';
    const isBusinessOrPro = businessPage || proPage;
    for (const [link, current] of [
      ['#nav-business', businessPage], ['#nav-pro', proPage], ['.ysite-nav [href="#politik"]', r.name === 'politik'],
      ['.ysite-nav [href="#international"]', r.name === 'international']
    ]) {
      const item = document.querySelector(link);
      if (current) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    }
    const login = document.getElementById('platform-login'); login.textContent = access === 'free' ? 'Log ind' : 'Min konto';
    const cta = document.getElementById('platform-cta'); cta.textContent = isPro() ? 'Mit Business Pro →' : 'Prøv Pro+ | 0 kr. første måned'; cta.href = isPro() ? '#mit-pro' : '#pro-produkt';
    cta.hidden = !isBusinessOrPro || r.name === 'mit-pro';
    document.querySelectorAll('#tabs [data-view]').forEach(a => { if (a.dataset.view === r.name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    document.getElementById('nav-pro').setAttribute('href', '#pro-overblik');
    renderBloom(r);
    const subnav = document.getElementById('sn');
    subnav.hidden = Object.hasOwn(LIVE_BLOGS, r.name) || r.name === 'y' || r.name === 'politik' || r.name === 'international';
    if (subnav.hidden) return;
    subnav.replaceChildren(el('nav', { class: 'sn-in', 'aria-label': 'Business-navigation' },
      el('a', { class: 'sn-i', href: '#business', 'aria-current': r.name === 'business' || /^b\d+$/.test(r.name) ? 'page' : null, text: 'Overblik' }),
      el('div', { class: 'sn-categories', role: 'group', 'aria-label': 'Business-kategorier' }, Object.entries(BCAT).map(([key, category]) => el('a', { class: 'sn-i', href: '#' + key, 'aria-current': r.name === key ? 'page' : null, text: category.label }))),));
  }
  // ── Y-forsiden: samme app, header og tema som Business. Skift mellem Y og Business er en rute, ikke en sideindlæsning ──
  function yFront() {
    const B = BARTICLES, A_ = ARTICLES;
    const frontH = id => SHORT_TITLES['b' + id] || B[id].headline;
    const prefixed = headline => { const m = headline.match(/^(.{4,60}?):\s+(.+)$/); return m ? [el('strong', { text: m[1] + ':' }), ' ' + m[2]] : [headline]; };
    const thumb = (id, span) => el('a', { class: 'yf-c' + span + ' yf-thumb', href: '#b' + id },
      el('span', { class: 'yf-ph' }, bPhoto(id, 800)), el('span', { class: 'ydk-label yf-kick', text: B[id].kicker }), el('h3', { text: frontH(id) }));
    const overlay = (id, span) => el('a', { class: 'yf-c' + span + ' yf-overlay', href: '#b' + id },
      bPhoto(id, 1000), el('span', { class: 'yf-overlay-t' }, el('h3', {}, ...prefixed(frontH(id)))));
    const wide = (id, span) => el('a', { class: 'yf-c' + span + ' yf-overlay yf-wide', href: '#b' + id },
      bPhoto(id, 1200), el('span', { class: 'yf-overlay-t' }, el('span', { class: 'ydk-label yf-kick', text: B[id].kicker }), el('h3', { text: frontH(id) })));
    const text = (id, span) => { const a = A_[id], kat = a.info && a.info.kategori ? a.info.kategori.split(' · ')[0] : 'Business Pro';
      return el('a', { class: 'yf-c' + span + ' yf-text', href: '#a' + id }, el('span', { class: 'ydk-label yf-kick', text: kat }), el('h3', { text: SHORT_TITLES['a' + id] || a.headline }), el('p', { text: a.manchet })); };
    const tal = BFRONT.tal;
    return el('div', { class: 'yf' },
      liveBlogLinks(),
      el('div', { class: 'yf-grid' },
        el('a', { class: 'yf-c12 yf-hero', href: '#b' + BFRONT.hero },
          el('span', { class: 'yf-ph' }, bPhoto(BFRONT.hero, 1400)), el('span', { class: 'yf-credit', text: bCaption(BFRONT.hero) }),
          el('h1', { class: 'ydk-hero-title', text: frontH(BFRONT.hero) })),
        overlay(2, 6), overlay(3, 6),
        thumb(4, 4), thumb(5, 4), thumb(6, 4),
        wide(7, 8),
        el('aside', { class: 'yf-tal', 'aria-label': 'Dagens tal' }, el('span', { class: 'ydk-label', text: 'Dagens tal' }), el('strong', { text: tal.value }), el('p', { text: tal.text })),
        thumb(8, 3), thumb(9, 3), thumb(10, 3), thumb(11, 3)),
      access === 'free' ? el('section', { class: 'yf-di', 'aria-label': 'Dansk Industri' },
        el('div', { class: 'di-slot' },
          el('header', { class: 'di-partner-banner' },
            el('div', {},
              mono('Dansk Industri · Medlemsfordel'),
              el('h2', { text: 'Er din virksomhed medlem af Dansk Industri?' }),
              el('p', { text: 'Så kan du have særlige fordele med Business Pro. Se, hvilke muligheder dit DI-medlemskab giver dig.' }),
              link('Se dine muligheder med Business Pro →', '#pro-produkt', true)),
            el('span', { class: 'di-logo' }, el('img', { src: DI_LOGO, alt: 'Dansk Industri' }))))) : null);
  }
  /* ── Generiske frontsider: global nav ──
     Politik og International under den globale menu — ingen Business Pro-teasere her.
     Fotos hentes eksternt fra Unsplash CDN. ── */
  function globalCard(s, headingTag, span) {
    const img = el('img', { src: s.photo, alt: s.photoAlt, loading: 'lazy', decoding: 'async' });
    return el('a', { class: 'gf-card yf-c' + span, href: '#' + s.id, 'aria-label': s.headline },
      el('span', { class: 'yf-ph' }, img),
      el('span', { class: 'ydk-label yf-kick', text: s.kicker }),
      el(headingTag, { text: s.headline }),
      el('p', { text: s.manchet }));
  }
  function globalFront(stories) {
    const S = stories;
    return el('div', { class: 'platform-page gf-page' },
      liveBlogLinks(),
      el('div', { class: 'yf-grid' },
        // Hero — hele bredden. h2 bruges så render-logikken sætter aria-label på main.
        el('a', { class: 'yf-c12 gf-hero', href: '#' + S[0].id, 'aria-label': S[0].headline },
          el('span', { class: 'yf-ph' }, el('img', { src: S[0].photo, alt: S[0].photoAlt, loading: 'eager', decoding: 'async' })),
          el('span', { class: 'ydk-label yf-kick', text: S[0].kicker }),
          el('h2', { class: 'gf-hero-title', text: S[0].headline }),
          el('p', { class: 'gf-hero-manchet', text: S[0].manchet })),
        // 2-søjler
        globalCard(S[1], 'h3', 6),
        globalCard(S[2], 'h3', 6),
        // 3-søjler
        globalCard(S[3], 'h3', 4),
        globalCard(S[4], 'h3', 4),
        globalCard(S[5], 'h3', 4)));
  }
  function politikFront()    { return globalFront(GLOBAL_POLITIK_STORIES); }
  function globalIntlFront() { return globalFront(GLOBAL_INTL_STORIES); }
  function footer() {
    return el('footer', { class: 'platform-footer' }, el('strong', { text: 'Business Pro' }),
      el('span', { text: 'Interaktiv mockup · Eksisterende eksempelartikler og markeret demoindhold · 21. november 2026' }),
      el('a', { href: '#pro-produkt', text: 'Produkt og pakker →' }));
  }
  function render({ scroll = false } = {}) {
    workspaceFrame = null;
    const r = route(); headerState(r);
    const main = document.getElementById('view');
    let content, title = 'Business';
    if (r.name === 'y') { content = yFront(); title = 'Forside'; }
    else if (r.name === 'business') content = businessFront();
    else if (Object.hasOwn(LIVE_BLOGS, r.name)) { content = liveBlogPage(r.name); title = 'Live: ' + LIVE_BLOGS[r.name].name; }
    else if (r.name === 'mit-pro') { content = isPro() ? workspacePage() : proAccessPage(); title = !isPro() ? 'Business Pro · Login og adgang' : access === 'di' ? 'Til jer i dag · Business Pro × DI' : 'Mit Business Pro · Værktøjer'; }
    else if (r.name === 'pro') { content = curatedFront(r); title = 'Business Pro · Overblik'; }
    else if (r.name === 'pro-produkt') { content = proLanding(); title = 'Business Pro · Produkt og abonnement'; }
    else if (r.name === 'pro-overblik' || r.sector) { content = curatedFront(r); title = r.sector ? 'Business Pro · Byggeri' : 'Business Pro · Overblik'; }
    else if (r.name === 'forside') {
      content = access === 'di' ? diFront() : el('div', { class: 'platform-page di-news-page' }, diPreview('h1'));
      title = 'Dansk Industri · Medlemsindsigt';
    } else if (r.name === 'international') {
      content = globalIntlFront();
      title = 'International';
    } else if (r.name === 'politik') {
      content = politikFront();
      title = 'Politik';
    } else if (Object.hasOwn(BCAT, r.name)) {
      content = el('div', { class: 'platform-page' }, renderCategory(r.name), promo());
      title = 'Business · ' + BCAT[r.name].label;
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
    const heading = main.querySelector('h1');
    if (heading) { heading.setAttribute('id', 'page-heading'); main.setAttribute('aria-labelledby', 'page-heading'); main.removeAttribute('aria-label'); }
    else { main.removeAttribute('aria-labelledby'); main.setAttribute('aria-label', title); }
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
  function openDialog(title, content, tone = '') {
    if (!dialog.open) dialogTrigger = document.activeElement;
    document.getElementById('platform-dialog-label').textContent = title;
    dialog.dataset.tone = tone;
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
      el('div', { class: 'cta-row' }, el('a', { class: 'text-link', href: '#pro-produkt', text: 'Se produktet og adgangsmuligheder →', onclick: closeDialog })), disclosure()));
  }
  function openSubscribe(plan = 'Pro', onComplete = null) {
    const companyInput = el('input', { name: 'company', placeholder: 'Eksempelvirksomhed A/S', value: 'Eksempelvirksomhed A/S', required: true, autocomplete: 'off' });
    const sectorSelect = el('select', { name: 'sector' }, el('option', { value: 'alle', text: 'Alle brancher · Redaktionelt overblik' }), el('option', { value: 'byggeri', text: 'Byggeri' }));
    const form = el('form', { class: 'demo-form', onsubmit: e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      storeCompany(companyInput.value);
      setAccess(access === 'di' ? 'di' : 'pro', { announce: false });
      if (onComplete) onComplete(); else { closeDialog(); go('#pro-overblik'); }
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
    openDialog(di ? 'DI-medlem · Trin 1 af 2' : 'Y · Login', el('div', {}, el('h2', { text: 'Én konto til hele Y.' }), el('p', { text: di ? 'Først logger du ind. Derefter bekræfter du medlemskabet til det særlige DI-univers.' : 'Fortsæt som eksisterende Business Pro-abonnent i demoen.' }), form, disclosure()), di ? 'di' : '');
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
    openDialog('DI-medlem · Trin 2 af 2', el('div', {}, mono('Login gennemført i demoen'), el('h2', { text: 'Bekræft din medlemsadgang.' }), el('p', { text: 'DI-universet kræver både en Y-konto og et aktivt DI-medlemskab. Her simulerer vi kontrollen med eksempelnummeret nedenfor.' }), form, disclosure()), 'di');
  }
  function openDiInfo() {
    openDialog('Dansk Industri · Medlemsfordele', el('div', {}, el('h2', { text: 'Det får du som DI-medlem.' }),
      el('p', { text: 'Medlemskabet giver ekstra indhold: analyser, rapporter og indsigter, blandt andet virksomhedscases som Arla, Ringsted Forsyning og Per Aarsleff. Business Pro er et separat abonnement.' }),
      el('ul', { class: 'dialog-benefits' }, ['Danske virksomhedscases med konkrete erfaringer', 'Perspektiver på AI, produktivitet og investeringer', 'Et medlemsunivers med login og verificeret DI-adgang'].map(text => el('li', { text }))),
      el('div', { class: 'cta-row' }, access === 'di' ? btn('Åbn DI-universet →', () => { closeDialog(); go('#forside'); }, true) : btn('Log ind og verificér DI-medlemskab →', () => openLogin({ di: true, target: '#forside' }), true)), disclosure()), 'di');
  }
  function openReport(construction) {
    const title = construction ? 'Robotter på byggepladsen. Skal vi med nu?' : 'AI, kapital og konkurrence';
    const questions = construction ? ['Hvor er de gentagne opgaver på jeres byggepladser?', 'Hvilke data kræver en afprøvning?', 'Hvordan måler I kvalitet, tid og økonomi?'] : ['Hvilke investeringer ændrer jeres marked?', 'Hvor kan AI understøtte eksisterende arbejdsgange?', 'Hvilke risici bør ledelsen følge?'];
    const download = () => {
      const blob = new Blob(['Business Pro · Powered by Supertrends\n\n' + title + '\n\nDette er et illustrativt rapportuddrag udarbejdet i samarbejde med Supertrends.\n\n' + questions.map((q, i) => (i + 1) + '. ' + q).join('\n')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob), a = el('a', { href: url, download: 'business-pro-rapportuddrag-DEMO.txt' }); a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); toast('Rapportuddraget er hentet som tekstfil.');
    };
    openDialog('Brancherapporter · Powered by Supertrends', el('div', {}, mono('Rapportuddrag · Powered by Supertrends'), el('h2', { text: title }), el('p', { text: 'Et eksempel på et redaktionelt beslutningsgrundlag udarbejdet i samarbejde med Supertrends. Brug spørgsmålene til at demonstrere, hvordan en rapport kan omsættes til handling.' }),
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
  function openBusinessAiOverview() {
    const ids = ['b1', 'b2', 'b6'];
    openDialog('Business AI · Nyhedsoverblik', el('div', {}, el('h2', { text: 'Business AI' }),
      el('p', { text: 'Et klikbart nyhedsoverblik fra mocken.' }),
      el('div', { class: 'tool-list' }, ids.map(key => el('article', {}, mono(story(key).label), el('h3', { text: story(key).title }), el('a', { class: 'text-link', href: '#' + key, text: 'Åbn historien →', onclick: closeDialog }))))));
  }
  function openEditorial() {
    openDialog('Y · Redaktionelt ansvar', el('div', {}, el('h2', { text: 'Menneskerne bag perspektivet.' }), el('p', { text: 'Hos Y er det redaktører, der vælger historierne, vurderer kilderne og redigerer indholdet før udgivelse. Vi bruger AI i arbejdet. Det journalistiske ansvar er vores.' }), mono('Michael Dyrby · Chefredaktør · Fra den eksisterende mockup')));
  }
  function openMenu() {
    const links = [['Politik', '#politik'], ['Business', '#business'], ['International', '#international'], ['Danmark', '#danmark'], ['AI', '#ai'], ...Object.entries(LIVE_BLOGS).map(([path, blog]) => ['Liveblog · ' + blog.name, '#' + path]), ['Business Pro · Værktøjer', '#pro'], ['Business Pro · Produkt og abonnement', '#pro-produkt'], ['Business Pro · Redaktionelt overblik', '#pro-overblik'], ['Byggeri', '#byggeri'], ['DI-medlem', '#forside'], ['Mit Business Pro', '#mit-pro']];
    openDialog('Y · Navigation', el('div', {}, el('nav', { class: 'mobile-menu-links', 'aria-label': 'Alle demoens sider' },
      links.map(([text, href]) => el('a', { href, text, onclick: closeDialog }))),
      el('div', { class: 'cta-row' }, btn(isPro() ? 'Min konto' : 'Log ind', () => document.getElementById('platform-login').click()))));
  }
  document.querySelectorAll('[data-access]').forEach(button => button.addEventListener('click', () => {
    closeDialog();
    const nextAccess = button.dataset.access;
    setAccess(nextAccess);
  }));
  document.getElementById('platform-login').addEventListener('click', () => {
    if (!isPro()) { openLogin(); return; }
    openDialog('Min konto · Demo', el('div', {}, el('h2', { text: ACCESS[access] }), el('p', { text: access === 'di' ? 'Du er logget ind med Pro-adgang og simuleret verificeret DI-medlemskab.' : 'Din Pro-adgang er aktiv i demoen. DI-universet kræver separat verificeret medlemskab.' }),
      el('div', { class: 'cta-row' }, btn('Åbn Mit Business Pro', () => { closeDialog(); go('#mit-pro'); }, true), btn('Log ud af demoen', () => { closeDialog(); setAccess('free'); })), disclosure()));
  });
  document.getElementById('platform-menu').addEventListener('click', openMenu);
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
      const target = anchor.getAttribute('href'), key = target.slice(1);
      if (target === '#view') { e.preventDefault(); document.getElementById('view').focus(); document.getElementById('view').scrollIntoView(); return; }
      if (locked(key)) {
        e.preventDefault(); const a = story(key);
        if (a.di) openLogin({ di: true, target }); else openPaywall({ title: a.fullTitle, target });
      } else if (target === '#forside' && access !== 'di') { e.preventDefault(); openLogin({ di: true, target }); }
      else if (target === '#mit-pro' && !isPro()) { e.preventDefault(); go('#pro-overblik'); }
    }
    if (bloom.open && !bloom.panel.contains(e.target) && !bloom.toggle.contains(e.target)) setBloom(false);
    else if (bloom.open && e.target.closest?.('#pro-bloom a')) setBloom(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && bloom.open) { setBloom(false); bloom.toggle.focus(); }
  });
  window.addEventListener('resize', () => { if (bloom.open) placeBloom(); });
  window.addEventListener('hashchange', () => { setBloom(false); if (dialog.open) closeDialog(); render({ scroll: true }); });
  window.addEventListener('message', e => {
    if (!isPro() || !workspaceFrame || e.source !== workspaceFrame.contentWindow || !trustedOrigin(e.origin) || e.data?.channel !== 'y-business-workspace') return;
    const data = e.data;
    if (data.type === 'ready') initWorkspace();
    else if (data.type === 'height' && Number.isFinite(data.height)) workspaceFrame.style.height = Math.max(600, Math.min(14000, data.height)) + 'px';
    else if (data.type === 'tab' && ['idag', 'brief', 'medier', 'markeds', 'udbud', 'ai', 'rapporter', 'opgaver', 'konto'].includes(data.tab)) {
      workspaceTab = data.tab; workspaceFrame.scrollIntoView({ block: 'start' });
    } else if (data.type === 'focus') workspaceFrame.scrollIntoView({ block: 'start' });
    else if (data.type === 'navigate' && /^#(business|pro-overblik|pro-produkt|forside|byggeri|[bpa]\d+)$/.test(data.route)) go(data.route);
    else if (data.type === 'logout') { closeDialog(); setAccess('free', { target: '#pro' }); }
  });
  initArticlePicker();
  initTheme();
  render();
  // Read-only state for regression checks and presentation diagnostics.
  window.YBusinessDemo = Object.freeze({ getState: () => ({ access, ...route() }) });
})();
