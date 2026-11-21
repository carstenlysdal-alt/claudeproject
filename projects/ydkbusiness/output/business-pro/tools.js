/* Lokal værktøjsdemo i det leverede Business Pro-design. Y-fonts og tokens sættes i y-theme.css.
   Ingen login-, betalings-, CVR-, nyheds- eller AI-tjenester kontaktes. */
(() => {
  'use strict';
  const root = document.getElementById('workspace');
  const STORE_KEY = 'y-business-workspace-demo-v1';
  const TABS = [
    ['idag', 'Til jer i dag'], ['brief', 'Morgenbrief'], ['medier', 'MedieMonitor'],
    ['markeds', 'MarkedsMonitor'], ['udbud', 'UdbudsMatch'], ['ai', 'Business AI'],
    ['rapporter', 'Brancherapporter'], ['opgaver', 'Mine opgaver'], ['konto', 'Konto']
  ];
  const DEFAULTS = {
    tasks: [], saved: [], profiles: ['Enemærke & Petersen'],
    companies: ['Per Aarsleff A/S', 'B. Nygaard Sørensen A/S', 'LINK Arkitektur'],
    preferences: { brief: true, mentions: true, tenders: false }
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  let saved = clone(DEFAULTS);
  try {
    const data = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (data && Array.isArray(data.tasks) && Array.isArray(data.saved) && Array.isArray(data.profiles) && Array.isArray(data.companies)) saved = { ...saved, ...data };
  } catch (_) {}
  const DEFAULT_COMPANY_NAME = 'Enemærke & Petersen A/S';
  // Som lokal fil (file://) er beskedens origin 'null' eller 'file://', mens location.origin kan være 'file://'. Kilden tjekkes stadig.
  const trustedOrigin = origin => origin === location.origin || (location.protocol === 'file:' && (origin === 'null' || origin === 'file://'));
  let state = { access: 'free', theme: 'dark', tab: 'idag', articles: [], company: DEFAULT_COMPANY_NAME };
  let statusTimer, activeTrigger = null, lastHeight = 0;
  const dialog = document.getElementById('tool-dialog');
  function h(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value == null || value === false) return;
      if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
      else if (key === 'text') node.textContent = value;
      else if (key === 'class') node.className = value;
      else node.setAttribute(key, value === true ? '' : String(value));
    });
    children.flat(Infinity).forEach(child => { if (child != null) node.append(child.nodeType ? child : document.createTextNode(String(child))); });
    return node;
  }
  const mono = text => h('p', { class: 'mono', text });
  const note = text => h('p', { class: 'note', text });
  const button = (text, action, primary = false) => h('button', { type: 'button', class: primary ? 'primary' : 'ghost', text, onclick: action });
  const actionLink = (text, action) => h('button', { type: 'button', class: 'workspace-link', text, onclick: action });
  const tabLink = (label, tab) => h('a', { href: '#' + tab, 'data-tab': tab, text: label });
  function send(type, payload = {}) {
    if (window.parent === window) return;
    parent.postMessage({ channel: 'y-business-workspace', type, ...payload }, location.protocol === 'file:' ? '*' : location.origin);
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(saved)); } catch (_) {}
  }
  function announce(text) {
    const status = document.getElementById('tool-status');
    status.textContent = text; status.hidden = false; clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { status.hidden = true; }, 4000);
  }
  function resize() {
    const height = Math.ceil(root.offsetHeight + 24);
    if (height > 0 && height !== lastHeight) { lastHeight = height; send('height', { height }); }
  }
  function persistRender(message) { save(); render(); if (message) announce(message); }
  function findArticle(key) { return state.articles.find(a => a.key === key) || state.articles[0]; }
  function articleLink(key, label = 'Læs historien →') {
    const a = findArticle(key);
    return h('a', { class: 'workspace-link', href: '../ybusiness-di-artikler.html#' + (a?.key || 'pro-overblik'), 'data-parent-route': '#' + (a?.key || 'pro-overblik'), text: label });
  }
  function parentLink(label, route) { return h('a', { class: 'btn btn-line', href: '../ybusiness-di-artikler.html' + route, 'data-parent-route': route, text: label }); }
  function head(title, description, extra = null) {
    return h('div', { class: 'panel-top' }, h('div', {}, h('h2', { class: 'panel-h', tabindex: '-1', text: title }), description ? note(description) : null), extra);
  }
  function card(label, ...content) { return h('section', { class: 'card' }, mono(label), content); }
  function diCard(label, ...content) { return h('section', { class: 'card card-di' }, mono(label), content); }
  function addTask(text) {
    if (saved.tasks.some(task => task.text === text && !task.done)) { announce('Opgaven findes allerede på din liste.'); return; }
    saved.tasks.push({ id: Date.now() + '-' + Math.random().toString(36).slice(2, 6), text, due: '', done: false });
    save(); announce('Opgaven er gemt under Mine opgaver.');
  }
  function showDialog(title, body) {
    activeTrigger = document.activeElement;
    document.getElementById('tool-dialog-title').textContent = title;
    document.getElementById('tool-dialog-content').replaceChildren(body);
    dialog.showModal(); document.getElementById('tool-dialog-close').focus();
    send('focus');
  }
  document.getElementById('tool-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { if (activeTrigger?.isConnected) activeTrigger.focus(); });
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  });
  function download(name, text) {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const anchor = h('a', { href: url, download: name }); document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    announce('Demofilen er hentet som tekstfil.');
  }
  function downloadBrief() {
    const content = ['Business Pro · Morgenbrief · Demoindhold', '20. november 2026', ...['p0', 'p1', 'p2'].map(key => { const a = findArticle(key); return a ? a.title + '\n' + a.dek : ''; })];
    download('Business-Pro-morgenbrief-DEMO.txt', content.join('\n\n'));
  }
  function briefCard() {
    return h('section', { class: 'brief-paper cockpit-brief with-concl', id: 't-brief' },
      h('div', { class: 'bp-head' }, h('div', {}, h('span', { class: 'bp-brand', text: 'Dit morgenbrief' }), h('span', { class: 'bp-date', text: '20. november 2026 · Eksempelbrief' })), h('span', { class: 'bp-sector', text: 'Byggeri' })),
      h('div', { class: 'tb-concl' }, h('p', { class: 'tb-text', text: 'AI flytter ind i tilbudsafdelingen. Spørgsmålet er, hvor teknologien giver jer et bedre beslutningsgrundlag.' }),
        h('div', { class: 'workspace-card-actions' }, button('Læs hele briefet', () => selectTab('brief'), true), button('Hent brief ↓', downloadBrief))),
      h('ol', { class: 'bp-items' }, ['p0', 'p1', 'p2'].map((key, index) => {
        const a = findArticle(key);
        return a ? h('li', {}, h('span', { class: 'n', text: String(index + 1).padStart(2, '0') }), h('div', {}, h('h3', {}, articleLink(key, a.title)))) : null;
      })));
  }
  function overview() {
    const tasks = saved.tasks.filter(task => !task.done);
    return h('section', { class: 'workspace-panel', id: 'p-idag', 'aria-label': 'Til jer i dag' },
      h('div', { class: 'ov-layout' },
        h('div', { class: 'ov-main' }, briefCard(),
          card('Tre ting at tage med videre', h('ul', { class: 'feedlist' }, [
            ['Tilbud & AI', 'Afprøv teknologien på én afgrænset tilbudsproces.'], ['Investeringer', 'Følg renovering og nye krav til eksisterende bygninger.'], ['Kvalitet', 'Bevar faglig kontrol, når AI indgår på byggepladsen.']
          ].map(([title, text]) => h('li', {}, h('b', { text: title }), note(text), actionLink('Gem som opgave →', () => addTask(text)))))),
          h('div', { class: 'workspace-mini-grid' },
            card('Muligheder i markedet', h('h3', { text: 'Find den næste relevante opgave.' }), note('Illustrative projekter og udbud til din virksomhedsprofil.'), tabLink('Åbn UdbudsMatch →', 'udbud')),
            card('Omtaler af jer', h('h3', { text: '3 nye omtaler i demoen' }), note('Følg virksomheden, jeres brands og de emner, der betyder noget.'), tabLink('Åbn MedieMonitor →', 'medier')))),
        h('aside', { class: 'ov-side' },
          card('Dit overblik', h('div', { class: 'workspace-metrics' }, [
            [String(saved.companies.length), 'Fulgte virksomheder'], [String(saved.saved.length), 'Gemte muligheder'], ['3', 'Omtaler i demoen'], [String(tasks.length), 'Åbne opgaver']
          ].map(([number, text]) => h('div', {}, h('strong', { text: number }), h('span', { text }))))),
          card('Ugens nøgletal · Demo', h('ul', { class: 'feedlist' }, [['Byggeomkostninger', 'Indeks 118,4'], ['Renovering', 'Indeks 104,2'], ['Materialer', 'Stålindeks 112,8']].map(([name, value]) => h('li', {}, h('b', { text: value }), note(name)))), note('Illustrative indeks. Ingen liveforbindelse.')),
          card('Dine genveje', h('div', { class: 'workspace-quick-links' }, tabLink('Business AI →', 'ai'), tabLink('Brancherapporter →', 'rapporter'), tabLink('Mine opgaver →', 'opgaver'), parentLink('Redaktionelt Business Pro →', '#pro-overblik'))),
          card('Nyt i dine værktøjer', h('details', {}, h('summary', { text: 'Markedssignaler · 2 eksempler' }), note('Et ledelsesskift og en ny årsrapport hos fulgte virksomheder.'), tabLink('Se signalerne →', 'markeds'))))));
  }
  function brief() {
    return h('section', { class: 'workspace-panel', id: 'p-brief' }, head('Dit morgenbrief', 'Redaktionelt overblik til byggeriet, baseret på de eksisterende historier i mockuppen.', button('Hent brief ↓', downloadBrief)),
      h('div', { class: 'workspace-list' }, ['p0', 'p1', 'p2'].map((key, index) => {
        const a = findArticle(key);
        return a ? card('0' + (index + 1) + ' · ' + a.label, h('h3', { class: 'workspace-heading', text: a.title }), note(a.dek),
          h('div', { class: 'workspace-card-actions' }, articleLink(key), button('Gem som opgave', () => addTask('Læs: ' + a.title)))) : null;
      })));
  }
  function media() {
    const search = h('input', { class: 'workspace-search', type: 'search', placeholder: 'Søg i omtalerne…', 'aria-label': 'Søg i demo-omtaler' });
    const results = h('ul', { class: 'mentions', 'aria-live': 'polite' });
    const mentions = [
      ['Fagmedie · Demo', 'Bedre data er nøglen til byggeriets AI-kvantespring', 'Enemærke & Petersen omtales i en illustrativ branchehistorie.', 'p0'],
      ['Branchemedie · Demo', 'Renovering rykker op på dagsordenen', 'Et eksempel på en omtale af virksomhedens marked.', 'p1'],
      ['Virksomhedsnyhed · Demo', 'Nyt samarbejde om digital kvalitetssikring', 'En fiktiv omtale til demonstration af overvågning.', 'p2']
    ];
    const draw = () => {
      const rows = mentions.filter(row => row.join(' ').toLocaleLowerCase('da').includes(search.value.toLocaleLowerCase('da')));
      results.replaceChildren(...(rows.length ? rows.map(([label, title, text, key]) => h('li', { class: 'mention' }, mono(label), h('h3', { class: 'workspace-heading', text: title }), h('p', { class: 'm-snip', text }), articleLink(key, 'Læs den relevante baggrund →'))) : [h('li', { class: 'workspace-empty', text: 'Ingen demo-omtaler matcher din søgning.' })]));
      resize();
    };
    search.addEventListener('input', draw); draw();
    const profile = h('input', { name: 'profile', required: true, maxlength: '80', placeholder: 'Fx virksomhedsnavn eller brand' });
    const form = h('form', { class: 'workspace-form', onsubmit: e => {
      e.preventDefault(); const value = profile.value.trim();
      if (!value) { profile.setCustomValidity('Skriv et navn eller emne.'); profile.reportValidity(); return; }
      if (saved.profiles.length >= 5) { announce('Demoen har plads til fem søgeprofiler.'); return; }
      if (saved.profiles.some(p => p.toLocaleLowerCase('da') === value.toLocaleLowerCase('da'))) { announce('Søgeprofilen findes allerede.'); return; }
      saved.profiles.push(value); persistRender('Søgeprofilen er gemt lokalt i demoen.');
    } }, h('label', {}, 'Ny søgeprofil', profile), h('button', { type: 'submit', class: 'primary', text: 'Tilføj søgeprofil' }));
    profile.addEventListener('input', () => profile.setCustomValidity(''));
    return h('section', { class: 'workspace-panel', id: 'p-medier' }, head('MedieMonitor', 'Omtaler, emner og søgeprofiler til din virksomhed.'),
      card('Dine søgeprofiler · ' + saved.profiles.length + '/5', h('div', { class: 'workspace-controls' }, saved.profiles.map(text => h('span', { class: 'chip', text }))), form),
      h('div', { class: 'workspace-list' }, search, results));
  }
  function companyDetails(name) {
    showDialog(name, h('div', {}, mono('Virksomhedsprofil · Demoindhold'), h('p', { text: 'Denne virksomhedsprofil demonstrerer et samlet overblik over regnskab, ledelse og markedshændelser. Der er ingen liveforbindelse til CVR.' }),
      h('ul', { class: 'feedlist' }, h('li', {}, h('b', { text: 'Regnskab' }), note('En illustrativ årsrapport er klar til gennemgang.')), h('li', {}, h('b', { text: 'Ledelse' }), note('Et eksempel på et ledelsessignal vises i overvågningen.'))),
      h('div', { class: 'workspace-card-actions' }, articleLink('p0', 'Læs branchebaggrund →'), button('Opret opgave', () => { addTask('Gennemgå virksomheden: ' + name); dialog.close(); }))));
  }
  function market() {
    const input = h('input', { name: 'company', required: true, maxlength: '80', placeholder: 'Virksomhedsnavn' });
    const form = h('form', { class: 'workspace-form', onsubmit: e => {
      e.preventDefault(); const value = input.value.trim();
      if (!value) return;
      if (saved.companies.length >= 5) { announce('Du følger allerede fem virksomheder i demoen. Fjern en for at tilføje en ny.'); return; }
      if (saved.companies.some(name => name.toLocaleLowerCase('da') === value.toLocaleLowerCase('da'))) { announce('Du følger allerede virksomheden.'); return; }
      saved.companies.push(value); persistRender('Virksomheden er tilføjet til demo-overvågningen.');
    } }, h('label', {}, 'Følg en virksomhed i demoen', input), h('button', { class: 'primary', type: 'submit', text: 'Følg virksomhed' }));
    return h('section', { class: 'workspace-panel', id: 'p-markeds' }, head('MarkedsMonitor', 'Følg de virksomheder, der har betydning for jeres marked. Alle hændelser er illustrative.'),
      h('div', { class: 'co-grid' }, saved.companies.map((name, index) => card('Fulgt virksomhed · Demo',
        h('div', { class: 'co-head' }, h('span', { class: 'co-av', 'aria-hidden': 'true', text: name.split(' ').slice(0, 2).map(part => part[0]).join('') }), h('h3', { text: name })),
        h('dl', { class: 'co-facts' }, h('dt', { text: 'Branche' }), h('dd', { text: 'Byggeri og rådgivning · Demo' }), h('dt', { text: 'Nyt signal' }), h('dd', { text: index % 2 ? 'Ledelseshændelse til gennemgang' : 'Årsrapport til gennemgang' })),
        h('div', { class: 'workspace-card-actions' }, button('Se virksomheden', () => companyDetails(name), true), actionLink('Stop med at følge', () => { saved.companies = saved.companies.filter(item => item !== name); persistRender('Virksomheden er fjernet fra din demo-overvågning.'); }))))),
      h('section', { class: 'card workspace-follow' }, mono('Din overvågning · ' + saved.companies.length + '/5 virksomheder'), form, note('Tilføjelse opretter et lokalt demoeksempel og foretager ikke et CVR-opslag.')));
  }
  const TENDERS = [
    { id: 'r1', stage: 'signaler', area: 'hovedstaden', title: 'Renovering af 480 almene boliger · Rødovre', detail: 'Tidligt projektsignal til demonstration af relevante renoveringsopgaver.', tags: ['Renovering', 'Almene boliger'], article: 'p1' },
    { id: 'r2', stage: 'aabne', area: 'hovedstaden', title: 'Energirenovering af kommunale bygninger', detail: 'Illustrativt åbent udbud. Der er ingen reel tilbudsfrist i denne demo.', tags: ['Energirenovering', 'Offentlig bygherre'], article: 'p1' },
    { id: 'r3', stage: 'aabne', area: 'jylland', title: 'Modernisering af skolebyggeri · Aarhus', detail: 'Illustrativt udbud, der viser geografisk filtrering og gemte muligheder.', tags: ['Modernisering', 'Skolebyggeri'], article: 'p2' },
    { id: 'r4', stage: 'tildelte', area: 'hovedstaden', title: 'Almen renovering · Høje-Taastrup', detail: 'Eksempel på en tildelt opgave og et signal, der kan følges i markedet.', tags: ['Renovering', 'Tildelt · Demo'], article: 'p0' }
  ];
  function tenders() {
    let stage = 'signaler';
    const select = h('select', { 'aria-label': 'Filtrér udbud efter område' }, [['alle', 'Alle områder'], ['hovedstaden', 'Hovedstaden'], ['jylland', 'Jylland']].map(([value, text]) => h('option', { value, text })));
    const tabs = h('div', { class: 'workspace-controls', role: 'group', 'aria-label': 'Udbudstype' });
    const list = h('div', { class: 'workspace-list', 'aria-live': 'polite' });
    const draw = () => {
      tabs.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.stage === stage)));
      const rows = TENDERS.filter(item => (stage === 'gemte' ? saved.saved.includes(item.id) : item.stage === stage) && (select.value === 'alle' || item.area === select.value));
      list.replaceChildren(...(rows.length ? rows.map(item => {
        const isSaved = saved.saved.includes(item.id);
        return card('UdbudsMatch · Demoindhold', h('div', { class: 't-chips' }, item.tags.map(text => h('span', { class: 'chip', text }))),
          h('h3', { class: 'workspace-heading', text: item.title }), note(item.detail),
          h('p', { class: 'hy-why' }, h('b', { text: 'Derfor relevant for jer' }), 'Opgaven ligger inden for byggeri og renovering i den valgte geografi.'),
          h('div', { class: 'workspace-card-actions' }, button(isSaved ? 'Gemt ✓ · Fjern' : 'Gem mulighed', () => {
            saved.saved = isSaved ? saved.saved.filter(id => id !== item.id) : [...saved.saved, item.id]; save(); draw(); announce(isSaved ? 'Muligheden er fjernet fra gemte.' : 'Muligheden er gemt.');
          }, true), button('Opret opgave', () => addTask('Vurdér mulighed: ' + item.title)), articleLink(item.article, 'Læs branchebaggrund →')));
      }) : [h('p', { class: 'workspace-empty', text: stage === 'gemte' ? 'Du har ingen gemte muligheder i det valgte område. Gem en mulighed fra en af de øvrige faner.' : 'Ingen demoresultater i dette område. Vælg Alle områder eller en anden udbudstype.' })]));
      resize();
    };
    [['signaler', 'Projektsignaler'], ['aabne', 'Åbne udbud'], ['tildelte', 'Tildelte opgaver'], ['gemte', 'Gemte']].forEach(([key, text]) => tabs.append(h('button', { type: 'button', class: 'ghost', 'data-stage': key, text, onclick: () => { stage = key; draw(); } })));
    select.addEventListener('change', draw); draw();
    return h('section', { class: 'workspace-panel', id: 'p-udbud' }, head('UdbudsMatch', 'Fra tidligt signal til tildelt opgave. Prøv at filtrere, gemme og oprette en opgave.'), tabs, h('div', { class: 'workspace-controls' }, h('label', {}, 'Område ', select)), list);
  }
  function ai() {
    const input = h('textarea', { id: 'workspace-question', name: 'question', required: true, maxlength: '1200', placeholder: 'Fx: Hvordan kan vi bruge AI i tilbudsarbejdet?' });
    const output = h('div', { class: 'workspace-ai-answer', 'aria-live': 'polite' });
    const answer = question => {
      input.value = question;
      const q = question.toLocaleLowerCase('da');
      let keys, conclusion, unknown;
      if (/renover|kapital|invest|opgav/.test(q)) {
        keys = ['p1', 'p4']; conclusion = 'Se på renovering som både et investeringsspor og en mulighed for at genbruge materialer. Historierne peger på behov og metoder, men dokumenterer ikke jeres konkrete markedspotentiale.'; unknown = 'Demoen har ikke adgang til jeres ordrebog, lokale projektpipeline eller omkostninger.';
      } else if (/ai|tilbud|kvalitet|teknologi|material/.test(q)) {
        keys = ['p0', 'p2', 'p3']; conclusion = 'Start med en afgrænset proces, og mål effekten, før I skalerer. Aarsleff-casen viser prototyper til tilbudsarbejdet; historien om byggefejl viser samtidig behovet for faglig kontrol.'; unknown = 'Artiklerne dokumenterer ikke en generel økonomisk gevinst for jeres virksomhed. Demoen kender ikke jeres interne data.';
      } else {
        output.replaceChildren(card('Business AI · Demosvar', h('h3', { text: 'Det kan demoens kilder ikke besvare.' }), note('Prøv et spørgsmål om AI, tilbudsarbejde, kvalitet eller renovering. Her bruges kun de udvalgte artikler fra mockuppen; der foretages ingen AI- eller internetsøgning.'))); resize(); return;
      }
      output.replaceChildren(card('Business AI · Demosvar med kilder', h('h3', { text: question }),
        h('section', { class: 'ai-sec ai-sec-concl' }, mono('Vurdering'), h('p', { text: conclusion })),
        h('section', { class: 'ai-sec ai-sec-unknown' }, mono('Det ved vi ikke'), h('p', { text: unknown })),
        h('section', { class: 'ai-sec' }, mono('Kilder i denne demo'), h('ol', {}, keys.map(key => { const a = findArticle(key); return h('li', {}, articleLink(key, a?.title || 'Læs historien')); }))),
        h('div', { class: 'workspace-card-actions' }, button('Gem næste skridt som opgave', () => addTask('Undersøg: ' + question)))));
      resize();
    };
    const form = h('form', { class: 'workspace-ai-form', onsubmit: e => { e.preventDefault(); if (input.value.trim()) answer(input.value.trim()); } },
      h('label', { for: 'workspace-question', text: 'Dit spørgsmål til indholdet' }), input, h('button', { type: 'submit', class: 'primary', text: 'Vis demosvar med kilder →' }));
    return h('section', { class: 'workspace-panel', id: 'p-ai' }, head('Business AI', 'Spørg ind til det indhold, I har adgang til. Her demonstreres kildehenvisninger med faste eksempelbesvarelser.'),
      card('Spørg ind til jeres branche', form, h('div', { class: 'workspace-card-actions' }, ['Hvordan kan vi bruge AI i tilbudsarbejdet?', 'Hvad skal vi holde øje med i renovering?'].map(text => button(text, () => answer(text))))), output);
  }
  const REPORTS = [
    { title: 'Robotter på byggepladsen. Skal vi med nu?', code: 'BYG', text: 'Et illustrativt beslutningsgrundlag om opgaver, data og evaluering af nye teknologier.', questions: ['Find én gentagen opgave, som kan afprøves i lille skala.', 'Aftal, hvordan kvalitet, tid og økonomi skal måles.', 'Bevar faglig kontrol og dokumentér erfaringerne.'] },
    { title: 'Materialer i kredsløb', code: 'GEN', text: 'Et demo-uddrag om ressourcekortlægning og genbrug af byggematerialer.', questions: ['Undersøg, hvilke materialer der kan kortlægges tidligt.', 'Afklar dokumentation og ansvar før genbrug.', 'Sammenhold potentiale, kvalitet og logistik.'] }
  ];
  function showReport(report) {
    showDialog(report.title, h('div', {}, mono('Brancherapport · Eksempeluddrag · Demo'), h('p', { text: report.text }),
      h('ul', { class: 'feedlist' }, report.questions.map(text => h('li', { text }))),
      h('div', { class: 'workspace-card-actions' }, button('Hent demo-uddrag ↓', () => download('Business-Pro-rapport-DEMO.txt', 'Business Pro · Demoindhold\n\n' + report.title + '\n\n' + report.text + '\n\n' + report.questions.join('\n')), true), button('Gem som opgave', () => addTask('Læs rapportuddrag: ' + report.title))), note('Dette er et kort, illustrativt rapportuddrag. Det er ikke en offentliggjort brancherapport.')));
  }
  function reports() {
    return h('section', { class: 'workspace-panel', id: 'p-rapporter' }, head('Brancherapporter', 'Gå i dybden med de spørgsmål, der former branchens næste beslutninger. Begge uddrag er demoindhold.'),
      h('div', { class: 'workspace-list' }, REPORTS.map(report => card('Byggeri · Rapportuddrag · Demo',
        h('div', { class: 'workspace-report' }, h('div', { class: 'workspace-report-cover', 'aria-hidden': 'true' }, h('small', { text: 'Business Pro' }), h('b', { text: report.code }), h('small', { text: 'Demo' })),
          h('div', {}, h('h3', { class: 'workspace-heading', text: report.title }), note(report.text), h('div', { class: 'workspace-card-actions' }, button('Åbn rapportuddrag →', () => showReport(report), true))))))));
  }
  function tasks() {
    const input = h('input', { name: 'task', required: true, maxlength: '240', placeholder: 'Hvad skal du følge op på?' });
    const due = h('input', { type: 'date', name: 'due', 'aria-label': 'Dato for opgaven' });
    const form = h('form', { class: 'workspace-form workspace-task-form', onsubmit: e => {
      e.preventDefault(); if (!input.value.trim()) return;
      saved.tasks.push({ id: Date.now() + '-' + Math.random().toString(36).slice(2, 6), text: input.value.trim(), due: due.value, done: false }); persistRender('Opgaven er tilføjet.');
    } }, h('label', {}, 'Ny opgave', input), h('label', {}, 'Dato · Valgfrit', due), h('button', { type: 'submit', class: 'primary', text: 'Tilføj opgave' }));
    return h('section', { class: 'workspace-panel', id: 'p-opgaver' }, head('Mine opgaver', 'Saml dine næste skridt fra brief, artikler og markedsovervågning. Opgaverne gemmes lokalt i demoen.'),
      card('Dine næste skridt', form, saved.tasks.length ? h('ul', { class: 'tasks' }, saved.tasks.map(task => {
        const check = h('input', { type: 'checkbox', checked: task.done, 'aria-label': 'Markér opgaven som afsluttet: ' + task.text, onchange: e => { task.done = e.target.checked; persistRender(task.done ? 'Opgaven er afsluttet.' : 'Opgaven er genåbnet.'); } });
        return h('li', { class: 'workspace-task' }, check, h('div', { class: 'task-t' + (task.done ? ' done' : '') }, h('span', { text: task.text }), task.due ? h('small', { text: 'Dato: ' + new Date(task.due + 'T12:00:00').toLocaleDateString('da-DK') }) : null), actionLink('Slet', () => { saved.tasks = saved.tasks.filter(t => t.id !== task.id); persistRender('Opgaven er slettet fra demoen.'); }));
      })) : h('p', { class: 'workspace-empty', text: 'Du har ingen opgaver endnu. Tilføj en opgave her, eller gem et næste skridt fra dine værktøjer.' })));
  }
  function account() {
    const prefs = saved.preferences || clone(DEFAULTS.preferences);
    return h('section', { class: 'workspace-panel', id: 'p-konto' }, head('Konto og adgang', 'Én konto til Y, Business Pro og dit medlemskab.'),
      h('div', { class: 'app-grid' },
        card('Dit abonnement i demoen', h('h3', { class: 'workspace-heading', text: 'Business Pro · Aktiv adgang' }), note('Virksomhed i demoen: ' + state.company + '. Alle værktøjer er tilgængelige i denne præsentation.'),
          h('div', { class: 'workspace-card-actions' }, parentLink('Se produkt og pakker →', '#pro-produkt'), button('Log ud af demoen', () => send('logout')))),
        diCard('Dansk Industri', h('h3', { class: 'workspace-heading', text: state.access === 'di' ? 'DI-medlemskab verificeret i demoen' : 'Medlemskab skal verificeres' }), note('Det særlige DI-univers kræver verificeret medlemsadgang ud over Business Pro.'), parentLink(state.access === 'di' ? 'Åbn DI-universet →' : 'Gå til DI-medlemsadgang →', '#forside')),
        card('Dine præferencer · Demo', h('div', { class: 'workspace-prefs' }, [['brief', 'Morgenbrief'], ['mentions', 'Omtaler af virksomheden'], ['tenders', 'Relevante udbud']].map(([key, text]) => h('label', {}, h('input', { type: 'checkbox', checked: prefs[key], onchange: e => { prefs[key] = e.target.checked; saved.preferences = prefs; save(); announce('Præferencen er gemt i demoen. Ingen beskeder udsendes.'); } }), text))), note('Lokale demopræferencer. Der sendes ingen e-mail eller notifikationer.'))));
  }
  const views = { idag: overview, brief, medier: media, markeds: market, udbud: tenders, ai, rapporter: reports, opgaver: tasks, konto: account };
  function render({ focus = false } = {}) {
    if (!['pro', 'di'].includes(state.access)) return;
    const nav = h('nav', { class: 'workspace-nav tabs', 'aria-label': 'Business Pro-værktøjer' }, TABS.map(([key, text]) => h('a', { href: '#' + key, 'data-tab': key, 'aria-current': state.tab === key ? 'page' : null, text })));
    root.replaceChildren(
      h('header', { class: 'workspace-top' }, h('div', {}, mono('Din virksomhed · Byggeri'), h('h1', { text: 'Mit Business Pro' }), note(state.company + ' · Virksomhedseksempel')),
        h('div', { class: 'workspace-top-actions' }, h('span', { class: 'workspace-access', text: state.access === 'di' ? 'Pro + DI-adgang aktiv' : 'Pro-adgang aktiv' }), parentLink('Redaktionelt overblik →', '#pro-overblik'))),
      nav, h('p', { class: 'workspace-note', text: 'Interaktiv demo · Virksomhedsdata, omtaler, udbud og nye rapportuddrag er illustrative. Ingen liveforbindelser.' }), views[state.tab]());
    if (focus) root.querySelector('.workspace-panel h2')?.focus({ preventScroll: true });
    resize();
  }
  function selectTab(tab) {
    if (!views[tab]) return;
    if (dialog.open) dialog.close();
    state.tab = tab; render({ focus: true }); send('tab', { tab });
  }
  document.addEventListener('click', e => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const route = e.target.closest('[data-parent-route]');
    if (route) { e.preventDefault(); if (dialog.open) dialog.close(); send('navigate', { route: route.dataset.parentRoute }); return; }
    const tab = e.target.closest('[data-tab]');
    if (tab) { e.preventDefault(); selectTab(tab.dataset.tab); }
  });
  const d_nav = () => document.querySelector('.workspace-nav');
  window.addEventListener('message', e => {
    if (e.source !== parent || parent === window || !trustedOrigin(e.origin) || e.data?.channel !== 'y-business-workspace') return;
    const data = e.data;
    if (data.type === 'init') {
      if (!['pro', 'di'].includes(data.access)) return;
      const company = typeof data.company === 'string' && data.company.trim() ? data.company.trim().slice(0, 80) : DEFAULT_COMPANY_NAME;
      state = { access: data.access, theme: data.theme === 'light' ? 'light' : 'dark', tab: views[data.tab] ? data.tab : 'idag', articles: Array.isArray(data.articles) ? data.articles : [], company };
      document.documentElement.setAttribute('data-theme', state.theme); render();
    } else if (data.type === 'stick') {
      const bar = d_nav();
      if (bar && Number.isFinite(data.offset)) {
        const current = Number(bar.dataset.stick || 0), natural = bar.getBoundingClientRect().top - current;
        const y = Math.max(0, Math.min(Math.round(data.offset - natural), 14000));
        bar.dataset.stick = String(y); bar.style.transform = y ? `translateY(${y}px)` : '';
      }
    } else if (data.type === 'theme') {
      state.theme = data.theme === 'light' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', state.theme); resize();
    }
  });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(root);
  if (typeof document.fonts?.addEventListener === 'function') document.fonts.addEventListener('loadingdone', resize);
  window.addEventListener('resize', resize);
  send('ready');
})();
