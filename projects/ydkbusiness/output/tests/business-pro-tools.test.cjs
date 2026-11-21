const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const dir = path.resolve(__dirname, '../business-pro');
const html = readFileSync(path.join(dir, 'index.html'), 'utf8');
const source = readFileSync(path.join(dir, 'tools.js'), 'utf8');
const ARTICLES = ['p0', 'p1', 'p2', 'p3', 'p4', 'b6', 'b11'].map((key, index) => ({ key, title: `Original historie ${index + 1}`, dek: `Den eksisterende manchet ${index + 1}.`, label: 'Byggeri' }));

function setup(t, { access = 'pro', standalone = false, url = 'http://localhost/business-pro/index.html' } = {}) {
  const dom = new JSDOM(standalone ? html : '<iframe src="/business-pro/index.html"></iframe>', { url, runScripts: 'outside-only', pretendToBeVisual: true });
  const host = dom.window;
  const w = standalone ? host : host.document.querySelector('iframe').contentWindow;
  if (!standalone) { w.document.open(); w.document.write(html); w.document.close(); }
  const d = w.document, errors = [], messages = [];
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () { if (this.open) { this.open = false; this.dispatchEvent(new w.Event('close')); } };
  host.postMessage = data => messages.push(data);
  w.addEventListener('error', e => errors.push(e.error || e.message));
  w.eval(source);
  const send = (payload, { origin = 'http://localhost', sender = host } = {}) => w.dispatchEvent(new w.MessageEvent('message', { source: sender, origin, data: { channel: 'y-business-workspace', ...payload } }));
  if (!standalone && access) send({ type: 'init', access, theme: 'dark', tab: 'idag', articles: ARTICLES });
  t.after(() => { dom.window.close(); assert.deepEqual(errors, []); });
  const $ = selector => d.querySelector(selector);
  const $$ = selector => [...d.querySelectorAll(selector)];
  const click = selector => { const node = $(selector); assert(node, selector); node.click(); };
  const press = (selector, text) => { const node = $$(selector).find(item => item.textContent.includes(text)); assert(node, text); node.click(); };
  const tab = name => click(`.workspace-nav [data-tab="${name}"]`);
  const submit = selector => $(selector).dispatchEvent(new w.Event('submit', { cancelable: true, bubbles: true }));
  return { w, d, $, $$, click, press, tab, submit, messages, send, host };
}

test('Direct standalone tool URL never opens the signed-in workspace', t => {
  const { $, send } = setup(t, { standalone: true });
  send({ type: 'init', access: 'pro', articles: ARTICLES });
  assert($('.workspace-gate'));
  assert(!$('.workspace-nav'));
});

test('Workspace starts only after a valid parent handshake with active access', t => {
  const { $, send, w } = setup(t, { access: null });
  send({ type: 'init', access: 'free', articles: ARTICLES }); assert(!$('.workspace-nav'));
  send({ type: 'init', access: 'pro', articles: ARTICLES }, { origin: 'https://other.example' }); assert(!$('.workspace-nav'));
  send({ type: 'init', access: 'pro', articles: ARTICLES }, { sender: w }); assert(!$('.workspace-nav'));
  send({ type: 'init', access: 'pro', articles: ARTICLES }); assert($('.workspace-nav'));
});

test('Workspace accepts the parent handshake when opened as a local file', t => {
  for (const origin of ['null', 'file://']) {
    const { $, send } = setup(t, { access: null, url: 'file:///Users/demo/output/business-pro/index.html' });
    send({ type: 'init', access: 'pro', articles: ARTICLES }, { origin: 'https://other.example' }); assert(!$('.workspace-nav'), 'foreign origin');
    send({ type: 'init', access: 'pro', articles: ARTICLES }, { origin }); assert($('.workspace-nav'), `origin ${origin}`);
  }
});

test('Workspace shows the company chosen in the parent', t => {
  const { $, send } = setup(t, { access: null });
  send({ type: 'init', access: 'di', company: 'Nordlys Byg A/S', articles: ARTICLES });
  assert($('.workspace-top').textContent.includes('Nordlys Byg A/S'));
  assert(!$('.workspace-top').textContent.includes('Enemærke'));
});

test('All nine tool pages render with one page heading and no duplicate IDs', t => {
  const { $, $$, tab } = setup(t);
  for (const name of ['idag', 'brief', 'medier', 'markeds', 'udbud', 'ai', 'rapporter', 'opgaver', 'konto']) {
    tab(name);
    assert.equal($$('main h1').length, 1, name);
    assert($('.workspace-panel'), name);
    const ids = $$('[id]').map(item => item.id);
    assert.equal(new Set(ids).size, ids.length, name);
    assert(!$('main').textContent.includes('undefined'), name);
    assert.equal($('.workspace-nav [aria-current="page"]').dataset.tab, name);
  }
});

test('Existing brief stories navigate back to parent articles', t => {
  const { click, messages, tab } = setup(t);
  tab('brief'); click('[data-parent-route="#p0"]');
  assert.equal(messages.at(-1).type, 'navigate'); assert.equal(messages.at(-1).route, '#p0');
});

test('Actions become tasks, which can be completed and deleted', t => {
  const { $, click, press, tab } = setup(t);
  press('.workspace-link', 'Gem som opgave');
  tab('opgaver'); assert($('.workspace-task'));
  click('.workspace-task input[type="checkbox"]'); assert($('.workspace-task .done'));
  press('.workspace-task button', 'Slet'); assert(!$('.workspace-task'));
  assert($('.workspace-empty').textContent.includes('ingen opgaver'));
});

test('Custom tasks accept text safely and keep their optional date', t => {
  const { $, tab, submit } = setup(t);
  tab('opgaver');
  $('.workspace-task-form input[name="task"]').value = '<img src=x onerror=alert(1)> Vurdér tilbud';
  $('.workspace-task-form input[name="due"]').value = '2026-12-04';
  submit('.workspace-task-form');
  assert($('.workspace-task').textContent.includes('<img src=x'));
  assert(!$('.workspace-task img'));
  assert($('.workspace-task small').textContent.includes('2026'));
});

test('Media search filters the examples and supports a saved search profile', t => {
  const { $, $$, tab, w, submit } = setup(t);
  tab('medier');
  assert.equal($$('.mention').length, 3);
  $('.workspace-search').value = 'renovering'; $('.workspace-search').dispatchEvent(new w.Event('input'));
  assert.equal($$('.mention').length, 1);
  $('.workspace-search').value = 'nothing-matches'; $('.workspace-search').dispatchEvent(new w.Event('input'));
  assert($('.workspace-empty').textContent.includes('Ingen demo-omtaler'));
  $('input[name="profile"]').value = 'Mit virksomhedsbrand'; submit('.workspace-form');
  assert($('main').textContent.includes('Mit virksomhedsbrand'));
});

test('Company follow and removal update the market monitor', t => {
  const { $, $$, tab, submit, press } = setup(t);
  tab('markeds');
  const before = $$('.co-grid .card').length;
  $('input[name="company"]').value = 'Testvirksomhed ApS'; submit('.workspace-form');
  assert.equal($$('.co-grid .card').length, before + 1);
  press('.co-grid button', 'Stop med at følge');
  assert.equal($$('.co-grid .card').length, before);
});

test('Tender tabs, geographical filtering, and saved opportunities work together', t => {
  const { $, $$, tab, press, w } = setup(t);
  tab('udbud'); press('button', 'Åbne udbud');
  const region = $('select'); region.value = 'jylland'; region.dispatchEvent(new w.Event('change'));
  assert.equal($$('.workspace-list .card').length, 1);
  assert($('.workspace-list').textContent.includes('Aarhus'));
  press('.workspace-list button', 'Gem mulighed');
  press('.workspace-controls button', 'Gemte'); assert.equal($$('.workspace-list .card').length, 1);
  press('.workspace-list button', 'Fjern'); assert($('.workspace-empty'));
});

test('Business AI demo answers cite existing content and decline unsupported topics', t => {
  const { $, tab, submit, $$ } = setup(t);
  tab('ai'); $('textarea').value = 'Hvordan bruger vi AI i tilbud?'; submit('.workspace-ai-form');
  assert.equal($$('.workspace-ai-answer [data-parent-route]').length, 3);
  assert($('.workspace-ai-answer').textContent.includes('Det ved vi ikke'));
  $('textarea').value = 'Hvad er vejret i morgen?'; submit('.workspace-ai-form');
  assert($('.workspace-ai-answer').textContent.includes('kan demoens kilder ikke besvare'));
});

test('Report excerpts open locally and account logout returns control to the parent', t => {
  const { $, tab, press, click, messages } = setup(t);
  tab('rapporter'); press('button', 'Åbn rapportuddrag');
  assert($('#tool-dialog').open);
  assert($('#tool-dialog-content').textContent.includes('ikke en offentliggjort brancherapport'));
  click('#tool-dialog-close'); tab('konto'); press('button', 'Log ud');
  assert.equal(messages.at(-1).type, 'logout');
});
