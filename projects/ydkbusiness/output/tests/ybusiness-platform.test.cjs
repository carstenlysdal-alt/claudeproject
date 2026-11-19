const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const html = readFileSync(path.join(root, 'ybusiness-di-artikler.html'), 'utf8');
const articles = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const platform = readFileSync(path.join(root, 'ybusiness-platform.js'), 'utf8');

function setup(t, initial = '#business') {
  const dom = new JSDOM(html, { url: 'http://localhost/' + initial, runScripts: 'outside-only', pretendToBeVisual: true });
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
  w.eval(articles + '\n' + platform);
  t.after(() => { dom.window.close(); assert.deepEqual(errors, [], 'No runtime errors'); });
  const $ = selector => d.querySelector(selector);
  const $$ = selector => [...d.querySelectorAll(selector)];
  const click = selector => { const item = $(selector); assert(item, selector); item.click(); };
  const press = (selector, text) => {
    const item = $$(selector).find(e => e.textContent.includes(text));
    assert(item, `Missing ${selector}: ${text}`); item.click();
  };
  const go = async hash => {
    if (w.location.hash === hash) return;
    await new Promise(resolve => {
      w.addEventListener('hashchange', resolve, { once: true });
      w.location.hash = hash;
    });
  };
  const submit = () => $('.demo-form').dispatchEvent(new w.Event('submit', { cancelable: true, bubbles: true }));
  return { w, d, $, $$, click, press, go, submit };
}

test('Business preserves original content and shows premium status', t => {
  const { $, $$ } = setup(t);
  assert.equal($$('main h1').length, 1);
  assert($('main').textContent.includes('Agenter brød ud'));
  assert($('main').textContent.includes('Porsche'));
  assert($('.bf-mint .access-label .lock-icon'));
  assert.deepEqual($$('.ysite-nav a').map(a => a.textContent.trim()), ['Politik', 'Internationalt', 'Business', 'Pro']);
});

test('Premium click opens paywall; direct URL shows teaser; downgrade removes full text', async t => {
  const { $, click, go, w } = setup(t);
  click('a[href="#b6"]');
  assert($('#platform-dialog').open);
  assert.equal(w.location.hash, '#business');
  click('#platform-dialog-close');
  await go('#b6');
  assert($('.article-tease')); assert(!$('.article .body'));
  click('[data-access="pro"]');
  assert($('.article .body')); assert(!$('.paywall-inline'));
  click('[data-access="free"]');
  assert(!$('.article .body')); assert($('.paywall-inline'));
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

test('Tender filter and save interaction work for subscribers', t => {
  const { $, $$, click, press, w } = setup(t);
  click('[data-access="pro"]'); click('#tool-tab-tender'); press('#tools-panel button', 'Åbn');
  assert.equal($$('.dialog-body .tool-list article').length, 3);
  const select = $('.dialog-body select'); select.value = 'jylland'; select.dispatchEvent(new w.Event('change'));
  assert.equal($$('.dialog-body .tool-list article').length, 1);
  assert($('.dialog-body').textContent.includes('Aarhus'));
  press('.dialog-body button', 'Gem udbud');
  assert($('.dialog-body button').disabled);
});

test('Monitor search shows an empty state when nothing matches', t => {
  const { $, click, press, w } = setup(t);
  click('[data-access="pro"]'); click('#tool-tab-media'); press('#tools-panel button', 'Åbn');
  const input = $('.dialog-body input[type="search"]'); input.value = 'nothing-matches'; input.dispatchEvent(new w.Event('input'));
  assert($('.dialog-body').textContent.includes('Ingen demoresultater'));
});

test('DI access requires verification separately from ordinary Pro', async t => {
  const { $, click, go } = setup(t);
  click('[data-access="pro"]'); click('a.sn-i[href="#forside"]');
  assert($('.dialog-head').textContent.includes('Trin 2'));
  click('#platform-dialog-close'); await go('#forside');
  assert(!$('.front')); assert($('.paywall-inline'));
  click('[data-access="di"]');
  assert($('.front .di-edition'));
  await go('#a1'); assert($('.article .body'));
  click('[data-access="pro"]'); assert(!$('.article .body'));
});

test('DI login and verification return to intended member article', async t => {
  const { $, click, submit, w } = setup(t);
  click('a[href="#a1"]');
  assert($('.dialog-head').textContent.includes('Trin 1')); submit();
  assert($('.dialog-head').textContent.includes('Trin 2'));
  $('.demo-form input[type="checkbox"]').checked = true; submit();
  await new Promise(resolve => w.setTimeout(resolve, 0));
  assert.equal(w.YBusinessDemo.getState().access, 'di');
  assert.equal(w.location.hash, '#a1'); assert($('.article .body'));
});

test('Subscription flow resumes premium article without a payment request', async t => {
  const { $, click, press, submit, w } = setup(t);
  click('a[href="#b6"]'); press('.dialog-body button', 'Prøv Business Pro'); submit();
  await new Promise(resolve => w.setTimeout(resolve, 0));
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

test('All routes render once, with unique IDs, in every access state', async t => {
  const { $, $$, click, go } = setup(t);
  const routes = ['business', 'pro', 'pro-overblik', 'byggeri', 'mit-pro', 'forside', 'international', 'danmark', 'ai', 'byggeri?f=rapporter', 'byggeri?f=vaerktoejer',
    ...Array.from({ length: 11 }, (_, i) => 'b' + (i + 1)), ...Array.from({ length: 5 }, (_, i) => 'p' + i), ...Array.from({ length: 7 }, (_, i) => 'a' + (i + 1))];
  for (const access of ['free', 'pro', 'di']) {
    click(`[data-access="${access}"]`);
    for (const route of routes) {
      await go('#' + route);
      assert.equal($$('main h1').length, 1, `${access}: ${route}`);
      const ids = $$('[id]').map(node => node.id);
      assert.equal(new Set(ids).size, ids.length, `${access}: ${route}`);
      assert(!$('main').textContent.includes('undefined'), `${access}: ${route}`);
    }
  }
});
