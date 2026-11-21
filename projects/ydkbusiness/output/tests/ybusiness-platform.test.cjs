const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const html = readFileSync(path.join(root, 'ybusiness-di-artikler.html'), 'utf8');
const articles = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const platform = readFileSync(path.join(root, 'ybusiness-platform.js'), 'utf8');

function setup(t, initial = '#business', base = 'http://localhost/') {
  const dom = new JSDOM(html, { url: base + initial, runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window, d = w.document, errors = [];
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.matchMedia = () => ({ matches: false });
  // jsdom does not render native dialogs. Test only their open/close lifecycle here.
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(new w.Event('close'));
  };
  w.addEventListener('error', e => errors.push(e.error || e.message));
  w.eval(articles + '\n' + platform + '\nwindow.__testContent = { business: BARTICLES, di: ARTICLES, pro: PRO };');
  t.after(() => { dom.window.close(); assert.deepEqual(errors, [], 'No runtime errors'); });
  const $ = selector => d.querySelector(selector);
  const $$ = selector => [...d.querySelectorAll(selector)];
  const click = selector => { const item = $(selector); assert(item, selector); item.click(); };
  const press = (selector, text) => {
    const item = $$(selector).find(e => e.textContent.includes(text));
    assert(item, `Missing ${selector}: ${text}`); item.click();
  };
  const nextRoute = () => new Promise(resolve => w.addEventListener('hashchange', resolve, { once: true }));
  const go = async hash => {
    if (w.location.hash === hash) return;
    const navigated = nextRoute();
    w.location.hash = hash;
    await navigated;
  };
  const selectAccess = async access => {
    const navigated = access !== 'free' && w.location.hash !== '#pro' ? nextRoute() : null;
    click(`[data-access="${access}"]`);
    if (navigated) assert.equal(w.location.hash, '#pro');
    await navigated;
  };
  const submit = () => $('.demo-form').dispatchEvent(new w.Event('submit', { cancelable: true, bubbles: true }));
  return { w, d, $, $$, click, press, go, selectAccess, submit };
}

test('Business preserves original content and shows premium status', t => {
  const { $, $$ } = setup(t);
  assert.equal($$('main h1').length, 1);
  assert($('main').textContent.includes('Agenter brød ud'));
  assert($('main').textContent.includes('Porsche'));
  assert($('.bf-mint .access-label .lock-icon'));
  assert.deepEqual($$('.ysite-nav a:not(#pro-bloom a)').map(a => a.textContent.trim()), ['POLITIK', 'INTERNATIONAL', 'BUSINESS', 'PRO']);
  assert($('.bf-more'));
  for (let id = 1; id <= 11; id++) assert($(`main a[href="#b${id}"]`), `Business story ${id} remains discoverable`);
});

test('All 23 original article records keep their complete text and metadata', t => {
  const { w } = setup(t);
  const data = w.__testContent;
  const current = {
    ...Object.fromEntries(Object.entries(data.business).map(([id, a]) => ['b' + id, a])),
    ...Object.fromEntries(Object.entries(data.di).map(([id, a]) => ['a' + id, a])),
    p0: { h: data.pro.headline, k: data.pro.kicker, p: data.pro.dek, body: data.pro.body, kilder: data.pro.kilder },
    ...Object.fromEntries(data.pro.cards.map((a, i) => ['p' + (i + 1), a]))
  };
  const original = JSON.parse(readFileSync(path.join(__dirname, 'original-content.json'), 'utf8'));
  assert.equal(Object.keys(current).length, 23);
  for (const [key, hash] of Object.entries(original.articles)) {
    assert.equal(createHash('sha256').update(JSON.stringify(current[key])).digest('hex'), hash, `Original article ${key} must not change`);
  }
});

test('Original header, category links and complete article picker remain available', t => {
  const { $, $$, click } = setup(t);
  assert($('#themeBtn'));
  assert.equal($('#platform-cta').textContent, 'Prøv Pro+ | 0 kr. første måned');
  assert.deepEqual($$('.sn-categories a').map(a => a.textContent), ['International', 'Danmark', 'AI']);
  assert($('#mockPanel').hidden);
  click('#mockBtn');
  assert(!$('#mockPanel').hidden);
  const articleLinks = $$('#tabs a').filter(a => /^#[abp]\d+$/.test(a.getAttribute('href')));
  assert.equal(articleLinks.length, 23);
  click('#mockBtn');
  assert($('#mockPanel').hidden);
});

test('DI preview keeps both disclosures and all seven stories', t => {
  const { $, $$, click } = setup(t);
  assert($('#di-preview-content').hidden);
  click('[aria-controls="di-preview-content"]');
  assert(!$('#di-preview-content').hidden);
  assert.equal($$('.di-news-leads .story-card').length, 2);
  assert(!$('.di-case-disclosure').open);
  click('.di-case-disclosure summary');
  assert($('.di-case-disclosure').open);
  assert.equal($$('.di-news-cases .story-card').length, 5);
  click('[aria-controls="di-preview-content"]');
  assert($('#di-preview-content').hidden);
});

test('Original theme control switches between dark and light without changing content', t => {
  const { $, click, d } = setup(t);
  const content = $('main').textContent;
  assert.equal(d.documentElement.getAttribute('data-y-theme'), 'dark');
  click('#themeBtn');
  assert.equal(d.documentElement.getAttribute('data-y-theme'), 'light');
  click('#themeBtn');
  assert.equal(d.documentElement.getAttribute('data-y-theme'), 'dark');
  assert.equal($('main').textContent, content);
});

test('Premium click opens paywall; direct URL shows teaser; downgrade removes full text', async t => {
  const { $, click, go, selectAccess, w } = setup(t);
  click('a[href="#b6"]');
  assert($('#platform-dialog').open);
  assert.equal(w.location.hash, '#business');
  click('#platform-dialog-close');
  await go('#b6');
  assert($('.article-tease')); assert(!$('.article .body'));
  await selectAccess('pro');
  await go('#b6');
  assert($('.article .body')); assert(!$('.paywall-inline'));
  click('[data-access="free"]');
  assert(!$('.article .body')); assert($('.paywall-inline'));
});

test('Alle Business-artikler er bag paywall for ikke-medlemmer og åbne for Pro og DI', async t => {
  const { $, click, go, selectAccess, w } = setup(t);
  const ids = Object.keys(w.__testContent.business);
  assert.equal(ids.length, 11);
  // Klik på et kort på Business-forsiden åbner paywall, og siden forbliver på forsiden.
  click('a[href="#b1"]');
  assert($('#platform-dialog').open);
  assert.equal(w.location.hash, '#business');
  click('#platform-dialog-close');
  // Direkte links (fx fra Y-forsiden) viser teaser og ingen fuld tekst.
  for (const id of ids) {
    await go('#b' + id);
    assert($('.article-tease'), `b${id} skal vise teaser`);
    assert(!$('.article .body'), `b${id} må ikke vise fuld tekst for ikke-medlemmer`);
  }
  // Pro og DI læser alle artikler.
  for (const access of ['pro', 'di']) {
    await selectAccess(access);
    for (const id of ids) {
      await go('#b' + id);
      assert($('.article .body'), `b${id} skal være åben for ${access}`);
      assert(!$('.paywall-inline'), `b${id} må ikke vise paywall for ${access}`);
    }
  }
});

test('Industry changes lead and related stories, and format filter preserves industry', async t => {
  const { $, go, w } = setup(t, '#pro-overblik');
  const broad = $('.curation-lead h2').textContent;
  await go('#byggeri');
  assert($('.curation-lead h2').textContent.includes('Aarsleff'));
  assert($('.curation-side').textContent.includes('renoveringsregning'));
  await go('#byggeri?f=analyse');
  assert.equal(w.YBusinessDemo.getState().sector, 'byggeri');
  assert(!$('.curation-grid'));
  assert($('.content-section').textContent.includes('byggefejl'));
  await go('#pro-overblik');
  assert.equal($('.curation-lead h2').textContent, broad);
});

test('Tool tabs support arrow keys, and non-subscriber preview is inert', t => {
  const { $, w } = setup(t);
  assert($('.tool-screen.is-locked .tool-screen-content[inert]'));
  $('#tool-tab-brief').dispatchEvent(new w.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
  assert.equal($('#tool-tab-media').getAttribute('aria-selected'), 'true');
  assert.equal($('#tools-panel').getAttribute('aria-labelledby'), 'tool-tab-media');
});

test('Tender filter and save interaction work for subscribers', async t => {
  const { $, $$, click, go, selectAccess, press, w } = setup(t);
  await selectAccess('pro'); await go('#business'); click('#tool-tab-tender'); press('#tools-panel button', 'Åbn');
  assert.equal($$('.dialog-body .tool-list article').length, 3);
  const select = $('.dialog-body select'); select.value = 'jylland'; select.dispatchEvent(new w.Event('change'));
  assert.equal($$('.dialog-body .tool-list article').length, 1);
  assert($('.dialog-body').textContent.includes('Aarhus'));
  press('.dialog-body button', 'Gem udbud');
  assert($('.dialog-body button').disabled);
});

test('Monitor search shows an empty state when nothing matches', async t => {
  const { $, click, go, selectAccess, press, w } = setup(t);
  await selectAccess('pro'); await go('#business'); click('#tool-tab-media'); press('#tools-panel button', 'Åbn');
  const input = $('.dialog-body input[type="search"]'); input.value = 'nothing-matches'; input.dispatchEvent(new w.Event('input'));
  assert($('.dialog-body').textContent.includes('Ingen demoresultater'));
});

test('DI access requires verification separately from ordinary Pro', async t => {
  const { $, click, go, selectAccess } = setup(t);
  await selectAccess('pro'); click('#pro-bloom a[href="#forside"]');
  assert($('.dialog-head').textContent.includes('Trin 2'));
  click('#platform-dialog-close'); await go('#forside');
  assert($('#di-preview-content').hidden); assert($('.di-access-row button'));
  await selectAccess('di'); await go('#forside');
  assert($('.di-news-page .di-partner-banner'));
  assert.equal($('.di-news-leads .story-card').getAttribute('href'), '#a7');
  assert.equal($('.di-news-cases .story-card').getAttribute('href'), '#a1');
  await go('#a1'); assert($('.article .body'));
  await selectAccess('pro'); await go('#a1'); assert(!$('.article .body'));
});

test('DI members open the Business Pro workspace from the DI link', async t => {
  const { $, click, selectAccess, w } = setup(t);
  await selectAccess('di');
  const navigated = new Promise(resolve => w.addEventListener('hashchange', resolve, { once: true }));
  click('#nav-pro');
  await navigated;
  assert.equal(w.location.hash, '#mit-pro');
  assert($('.pro-workspace-page iframe'));
  assert.equal($('#nav-pro').getAttribute('aria-current'), 'page');
  assert.equal(w.document.title, 'Til jer i dag · Business Pro × DI | Y');
  assert($('.pro-workspace-page a[href="#forside"]'), 'DI universe stays reachable from the workspace');
});

test('DI login and verification return to intended member article', async t => {
  const { $, click, submit, w } = setup(t);
  click('[aria-controls="di-preview-content"]');
  click('.di-case-disclosure summary');
  click('.di-news-cases a[href="#a1"]');
  assert($('.dialog-head').textContent.includes('Trin 1')); submit();
  assert($('.dialog-head').textContent.includes('Trin 2'));
  const navigated = new Promise(resolve => w.addEventListener('hashchange', resolve, { once: true }));
  $('.demo-form input[type="checkbox"]').checked = true; submit();
  await navigated;
  assert.equal(w.YBusinessDemo.getState().access, 'di');
  assert.equal(w.location.hash, '#a1'); assert($('.article .body'));
});

test('Subscription flow resumes premium article without a payment request', async t => {
  const { $, click, press, submit, w } = setup(t);
  click('a[href="#b6"]'); press('.dialog-body button', 'Prøv Business Pro'); submit();
  await new Promise(resolve => w.setTimeout(resolve, 40));
  assert.equal(w.location.hash, '#b6'); assert($('.article .body'));
  assert.equal(w.YBusinessDemo.getState().access, 'pro');
});

test('Construction report keeps industry context through subscription', t => {
  const { $, press, submit } = setup(t, '#byggeri?f=rapporter');
  press('#rapporter button', 'Se rapporten'); press('.dialog-body button', 'Prøv Business Pro'); submit();
  assert($('#platform-dialog').open);
  assert($('.dialog-body h2').textContent.includes('Robotter på byggepladsen'));
});

test('Skip link focuses content without changing the application route', t => {
  const { $, click, w, d } = setup(t, '#byggeri');
  click('.skip-link');
  assert.equal(w.location.hash, '#byggeri');
  assert.equal(d.activeElement, $('#view'));
});

test('Market controls change the illustrative dataset', t => {
  const { $, click } = setup(t);
  const before = $('.market-grid').textContent;
  click('button[data-period="uge"]');
  assert.notEqual($('.market-grid').textContent, before);
  assert.equal($('button[data-period="uge"]').getAttribute('aria-pressed'), 'true');
});

test('Business Pro opens login/paywall for visitors and the workspace after login', async t => {
  const { $, click, press, go, submit, w } = setup(t);
  await go('#pro');
  assert($('.pro-access-page'));
  assert(!$('.pro-tools-frame'));
  press('.pro-login-card button', 'Log ind og åbn');
  assert($('#platform-dialog').open);
  submit();
  assert.equal(w.YBusinessDemo.getState().access, 'pro');
  assert($('.pro-tools-frame'));
  assert(!$('.pro-access-page'));
});

test('Selecting Business Pro or DI opens the workspace, and downgrading removes it', async t => {
  const { $, go, selectAccess, w } = setup(t);
  for (const access of ['pro', 'di']) {
    await go('#business');
    await selectAccess(access);
    assert.equal(w.location.hash, '#pro');
    assert($('.pro-tools-frame'));
    assert(!$('.pro-access-page'));
  }
  await selectAccess('free');
  assert(!$('.pro-tools-frame'));
  assert($('.pro-access-page'));
});

test('Mit Business Pro direct URL is gated and product landing remains available separately', async t => {
  const { $, $$, go } = setup(t, '#mit-pro');
  assert($('.pro-access-page')); assert(!$('.pro-tools-frame'));
  await go('#pro-produkt');
  assert.equal($$('.plan').length, 2);
  assert($('.pro-landing-page h1'));
  assert(!$('.pro-access-page'));
});

test('Workspace handshake validates source and origin and supplies Y theme and existing stories', t => {
  const { $, click, w } = setup(t, '#pro');
  click('[data-access="pro"]');
  const frame = $('.pro-tools-frame'), messages = [];
  frame.contentWindow.postMessage = (data, origin) => messages.push({ data, origin });
  const send = (source, origin, type, rest = {}) => w.dispatchEvent(new w.MessageEvent('message', { source, origin, data: { channel: 'y-business-workspace', type, ...rest } }));
  send(w, 'http://localhost', 'ready'); assert.equal(messages.length, 0);
  send(frame.contentWindow, 'https://unrelated.example', 'ready'); assert.equal(messages.length, 0);
  send(frame.contentWindow, 'http://localhost', 'ready');
  assert.equal(messages[0].data.type, 'init');
  assert.equal(messages[0].data.access, 'pro');
  assert.equal(messages[0].data.theme, 'dark');
  assert.equal(messages[0].data.articles.length, 7);
  assert.equal(messages[0].data.articles[0].key, 'p0');
  assert.equal(messages[0].origin, 'http://localhost');
  click('#themeBtn'); assert.equal(messages.at(-1).data.theme, 'light');
  send(frame.contentWindow, 'http://localhost', 'height', { height: 1750 }); assert.equal(frame.style.height, '1750px');
  send(frame.contentWindow, 'http://localhost', 'logout');
  assert($('.pro-access-page')); assert(!$('.pro-tools-frame'));
});

test('Parent accepts workspace messages when the mock is opened as a local file', t => {
  const { $, click, w } = setup(t, '#pro', 'file:///Users/demo/output/ybusiness-di-artikler.html');
  click('[data-access="pro"]');
  const frame = $('.pro-tools-frame'), messages = [];
  frame.contentWindow.postMessage = (data, origin) => messages.push({ data, origin });
  const send = (source, origin, type, rest = {}) => w.dispatchEvent(new w.MessageEvent('message', { source, origin, data: { channel: 'y-business-workspace', type, ...rest } }));
  send(frame.contentWindow, 'https://unrelated.example', 'ready'); assert.equal(messages.length, 0);
  send(w, 'null', 'ready'); assert.equal(messages.length, 0, 'source must still be the workspace frame');
  send(frame.contentWindow, 'null', 'ready'); assert.equal(messages.at(-1).data.type, 'init');
  send(frame.contentWindow, 'file://', 'ready'); assert.equal(messages.length, 2);
  assert.equal(messages[0].origin, '*', 'file:// pages post with a wildcard target');
});

test('All routes render once, with unique IDs, in every access state', async t => {
  const { $, $$, selectAccess, go } = setup(t);
  const routes = ['y', 'business', 'pro', 'pro-produkt', 'pro-overblik', 'byggeri', 'mit-pro', 'forside', 'international', 'danmark', 'ai', 'byggeri?f=rapporter', 'byggeri?f=vaerktoejer',
    ...Array.from({ length: 11 }, (_, i) => 'b' + (i + 1)), ...Array.from({ length: 5 }, (_, i) => 'p' + i), ...Array.from({ length: 7 }, (_, i) => 'a' + (i + 1))];
  for (const access of ['free', 'pro', 'di']) {
    await selectAccess(access);
    for (const route of routes) {
      await go('#' + route);
      assert.equal($$('main h1').length, 1, `${access}: ${route}`);
      const ids = $$('[id]').map(node => node.id);
      assert.equal(new Set(ids).size, ids.length, `${access}: ${route}`);
      assert(!$('main').textContent.includes('undefined'), `${access}: ${route}`);
    }
  }
});

test('Pro-menuen er lukket som standard og folder Brancher og DI-medlem ud under PRO', async t => {
  const { $, $$, click, w } = setup(t);
  const wait = ms => new Promise(resolve => w.setTimeout(resolve, ms));
  assert($('#pro-bloom').hidden, 'lukket som standard');
  assert.equal($('#pro-bloom-toggle').getAttribute('aria-expanded'), 'false');
  assert.deepEqual($$('.sn-in .sn-i').map(a => a.textContent), ['Overblik', 'International', 'Danmark', 'AI'], 'Business-linjen har hverken Brancher eller DI-medlem');
  click('#pro-bloom-toggle');
  assert.equal($('#pro-bloom-toggle').getAttribute('aria-expanded'), 'true');
  assert(!$('#pro-bloom').hidden);
  const links = $$('#pro-bloom a').map(a => a.textContent);
  assert(links.includes('Byggeri') && links.includes('Alle brancher →') && links.includes('Log ind som DI-medlem →'), links.join(' | '));
  w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await wait(220);
  assert($('#pro-bloom').hidden);
  assert.equal($('#pro-bloom-toggle').getAttribute('aria-expanded'), 'false');
  click('#pro-bloom-toggle');
  assert(!$('#pro-bloom').hidden);
  w.document.body.click();
  await wait(220);
  assert($('#pro-bloom').hidden, 'klik udenfor lukker');
});

test('Overblik er altid Business, og PRO åbner værktøjet for Pro og DI', async t => {
  const { $, go, selectAccess } = setup(t);
  assert.equal($('.sn-i[href="#business"]').getAttribute('aria-current'), 'page');
  await go('#b2');
  assert.equal($('.sn-i[href="#business"]').getAttribute('aria-current'), 'page', 'også på en Business-artikel');
  await go('#ai');
  assert.equal($('.sn-i[href="#business"]').getAttribute('aria-current'), null);
  assert.equal($('#nav-pro').getAttribute('href'), '#pro-overblik');
  await selectAccess('pro');
  assert.equal($('#nav-pro').getAttribute('href'), '#mit-pro');
  await selectAccess('di');
  assert.equal($('#nav-pro').getAttribute('href'), '#mit-pro');
  assert.equal($('#pro-bloom a.bloom-di').getAttribute('href'), '#forside');
});

test('Ingen tekst påstår, at DI-medlemskab inkluderer Business Pro', async t => {
  const { $, go, selectAccess } = setup(t);
  for (const access of ['free', 'pro', 'di']) {
    await selectAccess(access);
    for (const route of ['pro-produkt', 'forside', 'business']) {
      await go('#' + route);
      const text = $('main').textContent + $('#pro-bloom').textContent;
      assert(!/DI-medlem[^.]{0,60}(følger|inkluder)/i.test(text) && !/Business Pro[^.]{0,40}(følger|inkluder)[^.]{0,30}(DI|medlem)/i.test(text), `${access} ${route}`);
    }
  }
});

test('Intet linker ud af mockuppen, og alt hedder Business Pro', async t => {
  const { $, $$, go, selectAccess } = setup(t);
  const routes = ['y', 'business', 'pro', 'pro-produkt', 'pro-overblik', 'forside', 'politik', 'international', 'liveblog/reuters', 'liveblog/ritzau', 'b2', 'a1', 'p1'];
  for (const access of ['free', 'pro', 'di']) {
    await selectAccess(access);
    for (const route of routes) {
      await go('#' + route);
      for (const a of $$('a[href]')) {
        const href = a.getAttribute('href');
        assert(!href.startsWith('http') && !href.startsWith('//'), `${access} ${route}: ekstern href ${href}`);
        assert.notEqual(a.getAttribute('target'), '_blank', `${access} ${route}: ${href}`);
      }
    }
  }
  assert(!$('.platform-footer').textContent.toLowerCase().includes('y business'));
  assert($('.platform-footer strong').textContent.includes('Business Pro'));
});

test('Y-forsiden og Business deler samme header, og skiftet er en rute uden sideindlæsning', async t => {
  const { $, $$, go, w } = setup(t, '#y');
  const header = $('#ysite'), theme = w.document.documentElement.getAttribute('data-y-theme');
  assert.equal($('.ysite-logo').getAttribute('href'), '#y');
  assert($('main h1').closest('.yf'));
  assert($('#sn').hidden, 'ingen Business-linje på Y-forsiden');
  assert.equal($$('.ysite-nav a:not(#pro-bloom a)').length, 4);
  await go('#business');
  assert.equal($('#ysite'), header, 'samme header-element');
  assert(!$('#sn').hidden);
  assert.equal(w.document.documentElement.getAttribute('data-y-theme'), theme, 'samme tema');
  await go('#y');
  assert.equal($('#ysite'), header);
  assert.equal($('.yf-hero').getAttribute('href'), '#b1');
});

test('Markederne er blurret og låst for ikke-abonnenter og åbne for Pro', async t => {
  const { $, click, go, selectAccess } = setup(t, '#business');
  assert($('.market-graphic.is-gated .market-locked'), 'låst for ikke-abonnent');
  assert($('.market-locked > .market-grid').hasAttribute('inert'));
  click('.market-lock-cta');
  assert($('#platform-dialog').open, 'knappen åbner paywall');
  click('#platform-dialog-close');
  await selectAccess('pro');
  await go('#business');
  assert(!$('.market-locked'), 'åbne for Pro');
  assert($('.market-graphic .market-grid'));
});

test('Låste historier har ikon og handling, og DI-pitchen nævner ekstra fordele uden at love Pro', async t => {
  const { $, $$, go, selectAccess } = setup(t, '#business');
  assert($$('.premium-lock-overlay').length > 0);
  assert($('.premium-lock-overlay .lock-icon'));
  assert.equal($('.premium-lock-overlay').textContent.trim(), 'Læs hele historien →');
  await go('#pro-produkt');
  const text = $('.di-partner-banner').textContent;
  assert(text.includes('Er du DI-medlem?') && text.includes('ekstra fordele') && text.includes('separat abonnement'));
  await selectAccess('di');
  await go('#mit-pro');
  assert($('.workspace-bar').textContent.includes('Åbn DI-universet'), 'DI-linje øverst i værktøjet');
  assert($('.workspace-bar a[href="#forside"]'));
});
