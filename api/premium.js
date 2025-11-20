const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'templates', 'premium.html');
const rawTemplate = fs.readFileSync(templatePath, 'utf8');
let cachedHtml = null;

function renderHtml() {
  if (!cachedHtml) {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_replace_with_real_key';
    cachedHtml = rawTemplate.replace(/__STRIPE_PUBLISHABLE_KEY__/g, publishableKey);
  }
  return cachedHtml;
}

module.exports = (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).end('Method Not Allowed');
    return;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');

  if (req.method === 'HEAD') {
    res.status(200).end();
    return;
  }

  res.status(200).send(renderHtml());
};
