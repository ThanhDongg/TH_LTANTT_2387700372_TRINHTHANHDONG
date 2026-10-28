/**
 * Static Application Security Testing (SAST) Scanner Gate
 * DevSecOps Security Gate (Lab 06 - 6.1.2)
 * Sinh vien: Trinh Thanh Dong - MSSV: 2387700372
 */

const fs = require('fs');
const path = require('path');

console.log('[SECURITY-GATE: SAST] Running static code analysis for injection flaws and dangerous sinks...');

const DANGEROUS_SINKS = [
  { name: 'eval() execution', regex: /\beval\s*\(/ },
  { name: 'Function constructor', regex: /new\s+Function\s*\(/ },
  { name: 'child_process execution without sanitation', regex: /execSync\s*\(\s*`[^`]*\$\{/ },
  { name: 'Dangerous innerHTML assignment', regex: /\.innerHTML\s*=/ }
];

let issues = 0;
let filesScanned = 0;

function scanDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.git' || item === 'build' || item === 'public') continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (stat.isFile() && item.endsWith('.js')) {
      if (fullPath.includes('sast_scan.js')) continue;
      filesScanned++;
      const content = fs.readFileSync(fullPath, 'utf-8');
      for (const sink of DANGEROUS_SINKS) {
        if (sink.regex.test(content)) {
          console.error(`  [SAST ALERT] Found ${sink.name} in: ${fullPath}`);
          issues++;
        }
      }
    }
  }
}

const rootDir = path.resolve(__dirname, '..');
scanDir(rootDir);

console.log(`[SECURITY-GATE: SAST] Scanned ${filesScanned} JavaScript source files.`);
if (issues > 0) {
  console.error(`[SECURITY-GATE: SAST] FAILED: ${issues} dangerous patterns detected!`);
  process.exit(1);
} else {
  console.log('[SECURITY-GATE: SAST] PASSED: No high-risk security flaws found in source code.');
}
