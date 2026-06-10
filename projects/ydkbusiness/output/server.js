const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DIR = __dirname;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO  = 'carstenlysdal-alt/claudeproject';
const FEEDBACK_PATH = 'projects/ydkbusiness/output/feedback-log.md';

const DEPLOY_TIME = new Date().toLocaleString('da-DK', {
  timeZone: 'Europe/Copenhagen',
  day: '2-digit', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit'
});

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

function formatEntry(dateStr, author, text) {
  const bullets = text.trim().split(/\n\s*\n/)
    .map(p => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean)
    .map(p => `  - ${p}`).join('\n');
  return `\n## ${dateStr}\n\n- **Af:** ${author}\n- **Bemærkning:**\n${bullets}\n`;
}

function githubGet(filePath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${GITHUB_REPO}/contents/${filePath}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'YBusiness-Dashboard',
        'Accept': 'application/vnd.github+json',
      },
    };
    const req = https.request(options, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => r.statusCode < 300 ? resolve(JSON.parse(d)) : reject(new Error(d)));
    });
    req.on('error', reject);
    req.end();
  });
}

function githubPut(filePath, content, sha, message) {
  const body = JSON.stringify({
    message,
    content: Buffer.from(content).toString('base64'),
    sha,
    branch: 'main',
  });
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${GITHUB_REPO}/contents/${filePath}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'YBusiness-Dashboard',
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => r.statusCode < 300 ? resolve() : reject(new Error(d)));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function handleFeedback(req, res) {
  let body = '';
  req.on('data', c => body += c);
  req.on('end', async () => {
    try {
      const { text, author } = JSON.parse(body);
      if (!text || text.trim().length < 2) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Bemærkning må ikke være tom.' }));
      }
      const now = new Date();
      const dateStr = now.toLocaleString('da-DK', {
        timeZone: 'Europe/Copenhagen',
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
      const by = (author || '').trim() || 'Anonym';
      const entry = formatEntry(dateStr, by, text.trim());

      const file = await githubGet(FEEDBACK_PATH);
      const current = Buffer.from(file.content, 'base64').toString('utf8');
      await githubPut(FEEDBACK_PATH, current + entry, file.sha, `feedback: bemærkning i Y Business dashboard`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch (err) {
      console.error('[feedback]', err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Kunne ikke gemme feedback.' }));
    }
  });
}

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/feedback') {
    return handleFeedback(req, res);
  }

  let filePath = req.url === '/' ? '/ybusiness-dashboard.html' : req.url;
  filePath = path.join(DIR, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(DIR, 'ybusiness-dashboard.html'), 'utf8', (e, d) => {
        const html = d.replace('{{DEPLOY_TIME}}', DEPLOY_TIME);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
      });
      return;
    }
    const ext = path.extname(filePath);
    if (ext === '.html') {
      const html = data.toString('utf8').replace('{{DEPLOY_TIME}}', DEPLOY_TIME);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } else {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
      res.end(data);
    }
  });
}).listen(PORT, () => console.log(`Running on port ${PORT} — deployed ${DEPLOY_TIME}`));
