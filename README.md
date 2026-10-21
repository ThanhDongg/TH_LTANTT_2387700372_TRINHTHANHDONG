# TH_LTANTT - Bài Thực Hành An Toàn Thông Tin

**Tác giả:** Trịnh Thành Đông  
**MSSV:** 2387700372  
**Học phần:** Lập trình An toàn Thông tin - HUTECH  

Repository lưu trữ toàn bộ các bài thực hành môn Lập trình An toàn Thông tin từ Buổi 1 đến Buổi 5. Mỗi buổi thực hành đều có mã nguồn hoàn chỉnh, kịch bản kiểm thử tự động, giao diện trực quan và báo cáo chi tiết kèm hình ảnh minh chứng thực tế từ hệ thống.

---

## Cấu trúc Repository

```text
.
├── Buoi 1/
│   ├── secure-validator-lab/    # Kiểm tra & làm sạch dữ liệu đầu vào (XSS, SQLi, Path Traversal)
│   ├── .githooks/               # GitSecure pre-commit hook ngăn rò rỉ secrets
│   ├── pre-commit-hook-test/    # Môi trường kiểm thử Git hook
│   ├── secure_logger_lab/       # Nhật ký bảo mật che giấu PII & chữ ký băm SHA-256
│   ├── screenshots/             # Ảnh chụp thực tế kết quả kiểm thử & giao diện
│   └── README.md                # Báo cáo chi tiết Buổi 1
├── Buoi 2/
│   ├── crypto-toolkit/          # Bộ công cụ mã hóa AES-256-GCM, PBKDF2, Argon2, RSA-2048
│   ├── mini-ca/                 # Hạ tầng chứng chỉ số PKI 2 tầng, X.509, CRL & OCSP
│   ├── screenshots/             # Ảnh chụp thực tế kết quả kiểm thử & giao diện
│   └── README.md                # Báo cáo chi tiết Buổi 2
├── Buoi 3/
│   ├── lab1/
│   │   └── secure-chat/         # Ứng dụng chat bảo mật SSL/TLS mTLS, AES-256
│   ├── lab2/
│   │   └── netrecon/            # Bộ công cụ trinh sát mạng đa luồng & Web Dashboard
│   ├── screenshots/             # Ảnh chụp thực tế kết quả kiểm thử & giao diện
│   └── README.md                # Báo cáo chi tiết Buổi 3
├── Buoi 4/
│   ├── jwt-security-tools/      # Phân tích token JWT, vét cạn HMAC, khai thác lỗ hổng None
│   ├── web-vuln-scanner/        # Quét lỗ hổng web tự động (SQLi, XSS, CSRF, SSRF)
│   ├── screenshots/             # Ảnh chụp thực tế kết quả kiểm thử & giao diện
│   └── README.md                # Báo cáo chi tiết Buổi 4
└── Buoi 5/
    ├── sast-tool/               # Công cụ phân tích tĩnh mã nguồn AST & chuẩn hóa SARIF
    ├── dast-tool/               # Phân tích bảo mật động thời gian thực & Sandbox cách ly
    ├── screenshots/             # Ảnh chụp thực tế kết quả kiểm thử & giao diện
    └── README.md                # Báo cáo chi tiết Buổi 5
```

---

## Danh Mục Báo Cáo Thực Hành

### [Buổi 1: Xác Thực Dữ Liệu Đầu Vào, GitSecure & Nhật Ký Bảo Mật](Buoi%201/README.md)
- **Lab 1 - Secure Input Validator:** Xây dựng thư viện chuẩn hóa và làm sạch đầu vào, chống tấn công XSS, SQL Injection và Path Traversal. Đạt **10/10 Unit tests Passed**, hỗ trợ giao diện web Flask tương tác trực tiếp.
- **Lab 2 - GitSecure Pre-commit Hook:** Thiết lập Git hook tự động phát hiện rò rỉ mã khóa bí mật (API Keys, Passwords, Tokens), kiểm tra quyền tệp tin và tích hợp quét tĩnh Bandit SAST. Chặn đứng commit không an toàn và ghi nhận nhật ký kiểm toán `gitsecure.log`.
- **Lab 3 - Secure Logging Service:** Hệ thống ghi nhật ký an toàn JSON, tự động che dấu thông tin định danh cá nhân (PII Masking), nén xoay vòng tệp log GZip và tạo chuỗi băm SHA-256 chống giả mạo nhật ký.
- *Xem chi tiết báo cáo và hình ảnh minh chứng tại:* [**Buoi 1/README.md**](Buoi%201/README.md)

---

### [Buổi 2: Mật Mã Ứng Dụng & Hạ Tầng Chứng Chỉ Số (PKI / Mini CA)](Buoi%202/README.md)
- **Lab 1 - Secure Crypto Toolkit:** Bộ thư viện mã hóa toàn diện gồm:
  - Mã hóa đối xứng xác thực tệp tin AES-256-GCM kết hợp dẫn xuất khóa PBKDF2HMAC-SHA256 (100.000 iterations).
  - Băm mật khẩu thế hệ mới chống tấn công phần cứng Argon2id (`argon2-cffi`).
  - Mật mã bất đối xứng RSA-2048: mã hóa dữ liệu với OAEP/SHA-256 và ký số điện tử với PSS.
  - Hỗ trợ đầy đủ các kênh giao tiếp: Pytest (6/6 Passed), Dòng lệnh CLI, Giao diện Tkinter GUI và REST Web API.
- **Lab 2 - Mini Certificate Authority:** Thiết lập hệ thống thẩm quyền chứng chỉ số chuẩn X.509 v3 với mô hình phân cấp 2 tầng (Root CA và Intermediate CA), cơ chế ký phát hành chứng chỉ thực thể cuối, xác thực chuỗi chứng chỉ (Chain Validation), và quản trị thu hồi chứng chỉ qua danh sách CRL (`ca_crl.pem`) & kiểm tra trạng thái OCSP.
- *Xem chi tiết báo cáo và hình ảnh minh chứng tại:* [**Buoi 2/README.md**](Buoi%202/README.md)

---

### [Buổi 3: Bảo Mật Mạng Máy Tính & Trinh Sát Hệ Thống](Buoi%203/README.md)
- **Lab 1 - SecureChat:** Xây dựng ứng dụng chat bảo mật sử dụng xác thực hai chiều Mutual TLS (mTLS), hạ tầng chứng chỉ số tự ký X.509 (Root CA, Server, Client) và mã hóa nội dung tin nhắn đầu cuối đối xứng AES-256-CBC.
- **Lab 2 - NetRecon:** Bộ công cụ trinh sát mạng đa luồng, hỗ trợ quét cổng mở (Port Scanning), nhận diện dịch vụ đang chạy, thu thập biểu ngữ phản hồi (Banner Grabbing), đánh giá các tiêu đề HTTP an ninh và bảng điều khiển Flask Web Dashboard.
- *Xem chi tiết báo cáo và hình ảnh minh chứng tại:* [**Buoi 3/README.md**](Buoi%203/README.md)

---

### [Buổi 4: Kiểm Thử Bảo Mật Web & Xác Thực Token](Buoi%204/README.md)
- **Lab 1 - jwt-security-tools:** Bộ công cụ kiểm thử bảo mật chuyên sâu cho chuẩn JSON Web Token (JWT). Khai thác lỗ hổng thuật toán None (None Algorithm Confusion), tấn công vét cạn khóa bí mật HMAC yếu (Dictionary Attack), và xây dựng API Gateway bảo vệ endpoint với Bearer Token. Đạt **7/7 test cases passed**.
- **Lab 2 - web-vuln-scanner:** Nền tảng tự động quét và đánh giá các lỗ hổng web OWASP Top 10: SQL Injection (SQLi) dựa trên phản hồi lỗi và boolean, Cross-Site Scripting (Reflected & Stored XSS), Cross-Site Request Forgery (CSRF) và Server-Side Request Forgery (SSRF). Đạt **9/9 test cases passed**.
- *Xem chi tiết báo cáo và hình ảnh minh chứng tại:* [**Buoi 4/README.md**](Buoi%204/README.md)

---

### [Buổi 5: Phân Tích Và Kiểm Thử An Toàn Phần Mềm (SAST & DAST)](Buoi%205/README.md)
- **Lab 1 - sast-tool (Static Analysis Security Testing):** Phân tích mã nguồn tĩnh không cần thực thi mã. Sử dụng mô hình cây cú pháp trừu tượng AST (`ASTAnalyzer`), nhận diện mẫu rủi ro (`VulnPatternMatcher`), tích hợp linter chất lượng mã nguồn `flake8`, hệ thống luật mềm dẻo từ JSON (`SecurityRuleEngine`), và xuất báo cáo chuẩn công nghiệp SARIF (`report.sarif`). Đạt **6/6 test cases passed**.
- **Lab 2 - dast-tool (Dynamic Analysis Security Testing):** Phân tích bảo mật động thời gian thực khi ứng dụng đang chạy. Giám sát tài nguyên CPU/RAM/FD (`RuntimeMonitor`), phát hiện rò rỉ bộ nhớ & tràn số (`MemoryAnalyzer`), phân tích lưu lượng mạng (`NetworkTrafficAnalyzer`), kiểm tra hành vi nguy hiểm (`SecurityBehaviorChecker`), hộp cát cách ly (`VirtualSandbox`), và hệ thống Web REST API điều khiển. Đạt **5/5 test cases passed**.
- *Xem chi tiết báo cáo và hình ảnh minh chứng tại:* [**Buoi 5/README.md**](Buoi%205/README.md)
