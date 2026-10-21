# TH_LTANTT - Bài Thực Hành An Toàn Thông Tin

**Tác giả:** Trịnh Thành Đông  
**MSSV:** 2387700372  

Repository lưu trữ các bài thực hành môn Lập trình An toàn Thông tin.

## Cấu trúc Repository

```text
.
├── buoi3/
│   ├── lab1/
│   │   └── secure-chat/
│   └── lab2/
│       └── netrecon/
├── Buoi4/
│   ├── jwt-security-tools/
│   └── web-vuln-scanner/
└── buoi 5/
    ├── sast-tool/
    │   ├── examples/
    │   ├── rules/
    │   ├── sast_tool/
    │   └── tests/
    └── dast-tool/
        ├── tests/
        ├── app.py
        ├── main.py
        └── ...
```

---

## Buổi 3 - Bảo Mật Mạng Máy Tính

Buổi 3 gồm 2 bài thực hành:
- **Lab 1 - SecureChat:** Xây dựng ứng dụng chat bảo mật sử dụng SSL/TLS, chứng chỉ số x509 và mã hóa tin nhắn đối xứng AES.
- **Lab 2 - NetRecon:** Xây dựng bộ công cụ trinh sát, quét cổng mạng và phân tích lưu lượng gói tin.

Xem chi tiết tại [buoi3/README.md](buoi3/README.md).

---

## Buổi 4 - Kiểm Thử Bảo Mật Web & Xác Thực Token

Buổi 4 gồm 2 bài thực hành:
- **jwt-security-tools:** Bộ công cụ kiểm thử bảo mật cho JSON Web Token (JWT).
  - Khai thác lỗ hổng thuật toán `None` (Algorithm Confusion / None algorithm).
  - Tấn công vét cạn khóa bí mật yếu (Brute-force Weak HMAC Secret).
  - Phân tích cấu trúc header, payload, signature và giả mạo token.
- **web-vuln-scanner:** Công cụ quét lỗ hổng ứng dụng web tự động.
  - Tự động phát hiện lỗi SQL Injection (SQLi) dựa trên phản hồi lỗi và phân tích boolean.
  - Quét lỗ hổng Cross-Site Scripting (Reflected & Stored XSS).
  - Thu thập liên kết và báo cáo các điểm đầu vào (input forms / query parameters) có nguy cơ.

---

## Buổi 5 - Phân Tích Và Kiểm Thử Bảo Mật (SAST & DAST)

Buổi 5 gồm 2 công cụ phân tích an toàn thông tin:
- **sast-tool (Static Analysis Security Testing):** Công cụ phân tích mã nguồn tĩnh bằng Python mà không cần thực thi mã.
  - `ASTAnalyzer`: Phân tích cây cú pháp trừu tượng (Abstract Syntax Tree) phát hiện các hàm tiềm ẩn nguy hiểm như `eval()`.
  - `VulnPatternMatcher`: Nhận diện các pattern rủi ro (hardcoded credentials, unsafe module imports như `pickle`).
  - `CodeQualityChecker`: Tích hợp linter `flake8` để đo lường chất lượng mã nguồn và phát hiện các vi phạm quy chuẩn.
  - `SecurityRuleEngine`: Hệ thống luật kiểm tra mềm dẻo nạp từ JSON, tự động phân loại mức độ nghiêm trọng (Severity: High, Medium, Low).
  - `SarifReporter`: Chuẩn hóa kết quả kiểm tra và xuất báo cáo chuẩn công nghiệp SARIF (Static Analysis Results Interchange Format - `report.sarif`).
- **dast-tool (Dynamic Analysis Security Testing):** Nền tảng phân tích bảo mật động thời gian thực khi ứng dụng đang chạy.
  - `RuntimeMonitor`: Sử dụng `psutil` theo dõi mức tiêu thụ CPU, RAM (RSS) và danh sách file descriptor mở của tiến trình.
  - `MemoryAnalyzer`: Sử dụng `gc` kiểm tra rò rỉ bộ nhớ (memory leak) và phát hiện tràn số nguyên (`overflow`).
  - `NetworkTrafficAnalyzer`: Giám sát lưu lượng mạng (bytes gửi/nhận, packet) theo từng interface mạng thời gian thực.
  - `SecurityBehaviorChecker`: Phát hiện hành vi nghi ngờ và các cuộc gọi hệ thống nguy hiểm (`os.system`, `eval`, `exec`).
  - `VirtualSandbox`: Môi trường hộp cát cách ly tạm thời (`tempfile.mkdtemp()`) thực thi lệnh an toàn không ảnh hưởng hệ thống gốc.
  - `app.py`: Cung cấp RESTful API qua Flask (`/api/monitor`, `/api/memory`, `/api/network`, `/api/security`, `/api/sandbox`).

Xem chi tiết báo cáo thực hành có hình ảnh minh chứng tại [buoi 5/README.md](buoi%205/README.md).

