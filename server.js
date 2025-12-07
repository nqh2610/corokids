const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const LicenseValidator = require('./license-validator');

// ============ KIỂM TRA LICENSE ============
const validator = new LicenseValidator();
const license = validator.getLicense();
const ALLOWED_DOMAIN = process.env.ALLOWED_DOMAIN || 'sorokid.com';

if (process.env.NODE_ENV === 'production') {
  if (!license) {
    console.error('❌ ERROR: License key not found!');
    console.error('Please set SOROKIDS_LICENSE environment variable or create .license file');
    process.exit(1);
  }

  const result = validator.validateLicense(license, ALLOWED_DOMAIN);
  if (!result.valid) {
    console.error('❌ LICENSE ERROR:', result.error);
    process.exit(1);
  }
  console.log('✅ License validated:', result.message);
}
// ==========================================

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Force HTTPS redirect in production
      if (process.env.NODE_ENV === 'production') {
        const proto = req.headers['x-forwarded-proto'];
        if (proto === 'http') {
          const host = req.headers.host || ALLOWED_DOMAIN;
          res.writeHead(301, { Location: `https://${host}${req.url}` });
          res.end();
          return;
        }
      }

      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
