const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DIR = __dirname;

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
};

http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/ybusiness-dashboard.html' : req.url;
  filePath = path.join(DIR, filePath);

  fs.readFile(filePath, 'utf8', (err, data) => {
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
      const html = data.replace('{{DEPLOY_TIME}}', DEPLOY_TIME);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } else {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
      res.end(data);
    }
  });
}).listen(PORT, () => console.log(`Running on port ${PORT} — deployed ${DEPLOY_TIME}`));
