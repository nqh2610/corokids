const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class LicenseValidator {
  constructor() {
    this.SECRET_KEY = 'SOROKIDS_SECRET_2024_CHANGE_THIS';
    this.LICENSE_FILE = path.join(process.cwd(), '.license');
  }

  generateLicense(domain, expiryDate) {
    const data = {
      domain: domain,
      expiry: expiryDate,
      created: new Date().toISOString()
    };
    
    const payload = JSON.stringify(data);
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      crypto.scryptSync(this.SECRET_KEY, 'salt', 32),
      Buffer.alloc(16, 0)
    );
    
    let encrypted = cipher.update(payload, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    const checksum = crypto
      .createHmac('sha256', this.SECRET_KEY)
      .update(encrypted)
      .digest('hex')
      .substring(0, 8);
    
    return `SORO-${encrypted}-${checksum}`;
  }

  validateLicense(licenseKey, currentDomain) {
    try {
      const parts = licenseKey.split('-');
      if (parts[0] !== 'SORO' || parts.length < 3) {
        return { valid: false, error: 'Invalid license format' };
      }

      const encrypted = parts.slice(1, -1).join('-');
      const checksum = parts[parts.length - 1];

      const expectedChecksum = crypto
        .createHmac('sha256', this.SECRET_KEY)
        .update(encrypted)
        .digest('hex')
        .substring(0, 8);

      if (checksum !== expectedChecksum) {
        return { valid: false, error: 'License checksum invalid' };
      }

      const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        crypto.scryptSync(this.SECRET_KEY, 'salt', 32),
        Buffer.alloc(16, 0)
      );

      let decrypted = decipher.update(encrypted, 'base64', 'utf8');
      decrypted += decipher.final('utf8');

      const data = JSON.parse(decrypted);

      if (data.domain !== '*' && data.domain !== currentDomain) {
        return { valid: false, error: `License not valid for domain: ${currentDomain}` };
      }

      const expiry = new Date(data.expiry);
      if (expiry < new Date()) {
        return { valid: false, error: 'License has expired' };
      }

      return { 
        valid: true, 
        data: data,
        message: `License valid until ${data.expiry}` 
      };

    } catch (error) {
      return { valid: false, error: 'License decryption failed' };
    }
  }

  getLicense() {
    if (process.env.SOROKIDS_LICENSE) {
      return process.env.SOROKIDS_LICENSE;
    }

    if (fs.existsSync(this.LICENSE_FILE)) {
      return fs.readFileSync(this.LICENSE_FILE, 'utf8').trim();
    }

    return null;
  }
}

module.exports = LicenseValidator;

if (require.main === module) {
  const validator = new LicenseValidator();
  const args = process.argv.slice(2);
  
  if (args[0] === 'generate') {
    const domain = args[1] || 'sorokid.com';
    const expiry = args[2] || '2099-12-31';
    const license = validator.generateLicense(domain, expiry);
    console.log('\n🔑 LICENSE KEY:\n');
    console.log(license);
    console.log(`\n📌 Domain: ${domain}`);
    console.log(`📅 Expiry: ${expiry}`);
  }
}
