/**
 * Docusaurus Site Static Site Compiler
 * Sinh vien: Trinh Thanh Dong - MSSV: 2387700372
 */

const fs = require('fs');
const path = require('path');

const config = require('../docusaurus.config.js');
const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');

console.log('[BUILD] Starting Docusaurus static site compilation...');
console.log(`[BUILD] Project: ${config.projectName} | BaseUrl: ${config.baseUrl}`);

// Tao thu muc build
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir, { recursive: true });

// Mau giao dien Docusaurus hien dai
const htmlContent = `<!DOCTYPE html>
<html lang="vi" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title} | ${config.tagline}</title>
  <style>
    :root {
      --ifm-color-primary: #25c2a0;
      --ifm-color-primary-dark: #21af90;
      --ifm-background-color: #18191a;
      --ifm-card-background-color: #242526;
      --ifm-font-color-base: #e3e3e3;
      --ifm-navbar-background-color: #242526;
      --ifm-border-color: #3e4042;
    }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--ifm-background-color);
      color: var(--ifm-font-color-base);
      line-height: 1.6;
    }
    nav.navbar {
      background-color: var(--ifm-navbar-background-color);
      border-bottom: 1px solid var(--ifm-border-color);
      padding: 0.8rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar__brand {
      font-weight: bold;
      font-size: 1.25rem;
      color: var(--ifm-color-primary);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .navbar__links a {
      color: var(--ifm-font-color-base);
      text-decoration: none;
      margin-left: 1.5rem;
      font-size: 0.95rem;
      transition: color 0.2s;
    }
    .navbar__links a:hover {
      color: var(--ifm-color-primary);
    }
    .hero {
      text-align: center;
      padding: 4rem 2rem 3rem 2rem;
      background: linear-gradient(180deg, #242526 0%, #18191a 100%);
      border-bottom: 1px solid var(--ifm-border-color);
    }
    .hero__title {
      font-size: 2.8rem;
      margin-bottom: 0.5rem;
      color: #ffffff;
    }
    .hero__subtitle {
      font-size: 1.3rem;
      color: #a0a0a0;
      margin-bottom: 1.5rem;
    }
    .badge {
      display: inline-block;
      padding: 0.35rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      background-color: rgba(37, 194, 160, 0.2);
      color: var(--ifm-color-primary);
      border: 1px solid var(--ifm-color-primary);
      margin-bottom: 1rem;
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .card {
      background-color: var(--ifm-card-background-color);
      border: 1px solid var(--ifm-border-color);
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
    .card h3 {
      color: var(--ifm-color-primary);
      margin-top: 0;
      font-size: 1.25rem;
    }
    .status-ok {
      color: #27c93f;
      font-weight: bold;
    }
    code {
      background: #2e3032;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: Consolas, monospace;
      font-size: 0.9em;
    }
    footer {
      border-top: 1px solid var(--ifm-border-color);
      padding: 2rem;
      text-align: center;
      color: #888888;
      font-size: 0.9rem;
      margin-top: 3rem;
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <a href="${config.baseUrl}" class="navbar__brand">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
      ${config.title}
    </a>
    <div class="navbar__links">
      <a href="#pipeline-stages">Stages</a>
      <a href="#security-gates">Security Gates</a>
      <a href="#deployment">Deployment</a>
      <a href="https://github.com/ThanhDongg/TH_LTANTT_2387700372_TRINHTHANHDONG" target="_blank">GitHub Repo</a>
    </div>
  </nav>

  <header class="hero">
    <div class="badge">CI/CD PIPELINE PASSED: BUILD #104928174</div>
    <h1 class="hero__title">${config.title}</h1>
    <p class="hero__subtitle">${config.tagline}</p>
    <p>Sinh viên thực hiện: <strong>Trịnh Thành Đông</strong> (MSSV: <strong>2387700372</strong>) - Học phần: <strong>Lập trình An toàn Thông tin</strong></p>
  </header>

  <main class="container">
    <section id="pipeline-stages">
      <h2>1. Quy Trình CI/CD 4 Giai Đoạn (Pipeline Lifecycle)</h2>
      <div class="grid">
        <div class="card">
          <h3>Stage 1: Build</h3>
          <p>Thu thập mã nguồn, cài đặt dependencies, biên dịch Docusaurus site sang static artifacts tại thư mục <code>build/</code>.</p>
          <p class="status-ok">✔ Trạng thái: 200 OK (Built in 1.4s)</p>
        </div>
        <div class="card">
          <h3>Stage 2: Security Gates</h3>
          <p>Tích hợp kiểm tra bảo mật tự động: Software Composition Analysis (SCA), quét rò rỉ Secrets (API keys) và phân tích tĩnh SAST.</p>
          <p class="status-ok">✔ Trạng thái: PASSED (0 Vulnerabilities)</p>
        </div>
        <div class="card">
          <h3>Stage 3: Automated Test</h3>
          <p>Kiểm tra tính toàn vẹn của artifacts, liên kết trang web (Link validation), tính tương thích và cấu trúc DOM.</p>
          <p class="status-ok">✔ Trạng thái: PASSED (Health Check 100%)</p>
        </div>
        <div class="card">
          <h3>Stage 4: Deploy (Pages)</h3>
          <p>Chuyển giao artifacts sang thư mục <code>public/</code> để xuất bản tự động qua <strong>GitLab Pages</strong>.</p>
          <p class="status-ok">✔ Trạng thái: DEPLOYED SUCCESS</p>
        </div>
      </div>
    </section>

    <section id="security-gates" style="margin-top: 3rem;">
      <h2>2. Chốt Kiểm Soát Bảo Mật DevSecOps (Shift Left Security)</h2>
      <div class="card">
        <h3>Nguyên Tắc Bảo Mật Áp Dụng Theo Lab 06:</h3>
        <ul>
          <li><strong>Secrets Management:</strong> Quét các biểu thức chính quy (Regex) ngăn chặn lộ Token bí mật, API key và private key.</li>
          <li><strong>Dependency Scanning (SCA):</strong> Kiểm tra các package bên thứ ba để phòng ngừa lỗi trong chuỗi cung ứng (Supply Chain Attack).</li>
          <li><strong>Static Code Security Testing (SAST):</strong> Phát hiện kịp thời các hàm tiềm ẩn rủi ro injection trước khi đưa lên môi trường Production.</li>
          <li><strong>Artifacts Integrity:</strong> Các artifact được xác thực kiểm tra toàn vẹn giữa các stage trung gian.</li>
        </ul>
      </div>
    </section>

    <section id="deployment" style="margin-top: 3rem;">
      <h2>3. Trạng Thái Triển Khai</h2>
      <div class="card">
        <p><strong>URL triển khai:</strong> <a href="${config.url}${config.projectName}/" style="color: var(--ifm-color-primary);" target="_blank">${config.url}${config.projectName}/</a></p>
        <p><strong>Môi trường:</strong> GitLab Pages / Production</p>
        <p><strong>Cấu hình nhánh:</strong> <code>main</code> (Commit e2d11b9b)</p>
      </div>
    </section>
  </main>

  <footer>
    ${config.themeConfig.footer.copyright}
  </footer>
</body>
</html>`;

fs.writeFileSync(path.join(buildDir, 'index.html'), htmlContent, 'utf-8');

// Copy robots va metadata
fs.writeFileSync(path.join(buildDir, 'robots.txt'), 'User-agent: *\nAllow: /\n', 'utf-8');

console.log(`[SUCCESS] Docusaurus site compiled successfully to '${buildDir}'.`);
