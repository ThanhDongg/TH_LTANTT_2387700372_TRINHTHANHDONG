/**
 * Secret Scanning Gate
 * DevSecOps Security Gate (Lab 06 - 6.1.1 & 6.1.2)
 * Sinh vien: Trinh Thanh Dong - MSSV: 2387700372
 */

const fs = require('fs');
const path = require('path');

console.log('[SECURITY-GATE: SECRETS] Scanning codebase for leaked credentials, private keys and tokens...');

const SECRET_PATTERNS = [
  /password\s*[:=]\s*['"][^'"]{4,}['"]/i,
  /apikey\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/i,
  /secret\s*[:=]\s*['"][A-Za-z0-9_\-]{8,}['"]/i,
  /(AKIA|ASIA)[A-Z0-9]{16}/,
  /-----BEGIN (RSA|EC|DSA|OPENSSH) PRIVATE KEY-----/
];

let filesScanned = 0;
let secretsFound = 0;

function scanDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.git' || item === 'build' || item === 'public') continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.yml') || item.endsWith('.json') || item.endsWith('.md'))) {
      filesScanned++;
      const content = fs.readFileSync(fullPath, 'utf-8');
      for (const pattern of SECRET_PATTERNS) {
        if (pattern.test(content)) {
          // Ngoai le neu day la file pattern definition
          if (!fullPath.includes('secret_scan.js')) {
            console.error(`  [VIOLATION] Secret pattern matched in: ${fullPath}`);
            secretsFound++;
          }
        }
      }
    }
  }
}

const rootDir = path.resolve(__dirname, '..');
scanDir(rootDir);

console.log(`[SECURITY-GATE: SECRETS] Scanned ${filesScanned} files across repository.`);
if (secretsFound > 0) {
  console.error(`[SECURITY-GATE: SECRETS] FAILED: ${secretsFound} secret leaks detected in codebase!`);
  process.exit(1);
} else {
  console.log('[SECURITY-GATE: SECRETS] PASSED: Zero leaked secrets detected.');
}
