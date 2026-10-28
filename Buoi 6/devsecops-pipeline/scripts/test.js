/**
 * Automated Test Script for Docusaurus Site Artifacts
 * Sinh vien: Trinh Thanh Dong - MSSV: 2387700372
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const targetDir = fs.existsSync(path.join(rootDir, 'public')) ? path.join(rootDir, 'public') : path.join(rootDir, 'build');

console.log('[TEST] Running automated test on generated artifacts in:', targetDir);

let passCount = 0;
let failCount = 0;

function assert(cond, name) {
  if (cond) {
    console.log(`  ✔ [PASS] ${name}`);
    passCount++;
  } else {
    console.error(`  ✘ [FAIL] ${name}`);
    failCount++;
  }
}

// 1. Kiem tra thu muc ton tai
assert(fs.existsSync(targetDir), `Target directory exists (${targetDir})`);

// 2. Kiem tra index.html ton tai
const indexFile = path.join(targetDir, 'index.html');
assert(fs.existsSync(indexFile), 'index.html exists');

// 3. Kiem tra kich thuoc file
if (fs.existsSync(indexFile)) {
  const stat = fs.statSync(indexFile);
  assert(stat.size > 500, `index.html is valid file size (${stat.size} bytes)`);

  const content = fs.readFileSync(indexFile, 'utf-8');
  assert(content.includes('DevSecOps Pipeline Tutorial'), 'Title contains expected project name');
  assert(content.includes('Trịnh Thành Đông'), 'Author verification matches student credentials');
  assert(content.includes('2387700372'), 'Student ID matches MSSV');
  assert(content.includes('Stage 1: Build'), 'Contains pipeline stage documentation');
}

console.log(`\n[TEST SUMMARY] Total: ${passCount + failCount} | Passed: ${passCount} | Failed: ${failCount}`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('[TEST] All tests passed successfully!');
}
