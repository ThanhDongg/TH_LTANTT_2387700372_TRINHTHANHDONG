# BÁO CÁO THỰC HÀNH BÀI 1: XÁC THỰC DỮ LIỆU ĐẦU VÀO, GITSECURE & NHẬT KÝ BẢO MẬT

- **Học phần:** Lập trình An toàn Thông tin
- **Sinh viên:** Trịnh Thành Đông
- **MSSV:** 2387700372
- **Lớp / Khóa:** 2023 - HUTECH

---

## 1. GIỚI THIỆU TỔNG QUAN

Bài thực hành số 1 tập trung vào ba kỹ thuật an toàn phần mềm then chốt trong chu trình phát triển ứng dụng:
1. **Lab 1 - Secure Input Validator (`secure-validator-lab`):** Xây dựng bộ thư viện và ứng dụng kiểm tra tính hợp lệ (Validation) và làm sạch dữ liệu đầu vào (Sanitization) nhằm triệt tiêu các vector tấn công phổ biến như Cross-Site Scripting (XSS), SQL Injection (SQLi) và Path Traversal.
2. **Lab 2 - GitSecure Pre-commit Hook (`.githooks/` & `pre-commit-hook-test`):** Thiết lập cơ chế kiểm soát mã nguồn tự động ở cấp độ Git Hook, ngăn chặn việc commit các dữ liệu nhạy cảm (API Keys, Mật khẩu hardcoded, AWS credentials) và phân tích tĩnh tệp tin trước khi đẩy lên kho lưu trữ.
3. **Lab 3 - Secure Logging Service (`secure_logger_lab`):** Xây dựng hệ thống ghi nhật ký an toàn chuẩn JSON, tự động che giấu thông tin định danh cá nhân (PII Masking), nén xoay vòng tệp log (GZip Rotation) và tạo chữ ký băm SHA-256 bảo đảm tính toàn vẹn, chống giả mạo nhật ký (Tamper-evident Audit Trail).

---

## 2. LAB 1: SECURE INPUT VALIDATION (CHUẨN HÓA & LÀM SẠCH ĐẦU VÀO)

### 2.1 Cấu trúc Thư viện và Các Thuật toán Xử lý (`securevalidator/core.py`)
- **Sanitize HTML / XSS Prevention (`sanitize_html_input`):** Mã hóa các ký tự đặc biệt của HTML (`<`, `>`, `&`, `"`, `'`) thành HTML entities thông qua `html.escape()`, loại bỏ triệt để các thẻ thực thi mã kịch bản độc hại.
- **Sanitize SQL Injection (`sanitize_sql_input`):** Sử dụng biểu thức chính quy (Regex) để nhận diện và vô hiệu hóa các siêu ký tự SQL nguy hiểm như dấu nháy đơn, nháy kép, dấu chấm phẩy phân tách lệnh, cùng các từ khóa injection điển hình (`DROP`, `UNION`, `SELECT`, `OR 1=1`).
- **Email Validation (`validate_email`):** Kiểm tra tính hợp lệ của địa chỉ email theo chuẩn định dạng nghiêm ngặt bằng Regex.
- **URL Whitelist Validation (`validate_url`):** Giới hạn các giao thức an toàn (`http://`, `https://`) và kiểm tra cấu trúc tên miền hợp lệ.
- **Chống Path Traversal (`validate_filename`):** Lọc bỏ các mẫu chuỗi điều hướng thư mục nguy hiểm (`../`, `..\`) và chuẩn hóa tên file an toàn thông qua `os.path.basename()`.

### 2.2 Kết quả Kiểm thử Đơn vị Tự động (Unit Tests)
Toàn bộ các hàm kiểm tra và làm sạch dữ liệu được kiểm thử với 10 ca kiểm thử bao phủ toàn diện:
```powershell
python -m unittest tests/test_validators.py
```
*Kết quả: **10/10 test cases** đều vượt qua thành công (**10 passed**).*

![Secure Validator Unit Tests](screenshots/01_secure_validator_tests.png)

### 2.3 Giao diện Web Trực quan (Flask Web Application)
Khởi chạy máy chủ giao diện web kiểm thử:
```powershell
python app.py
```
Giao diện trực quan hỗ trợ nhập liệu chuỗi tấn công, hiển thị trực tiếp dữ liệu đã làm sạch và trạng thái kiểm tra tính hợp lệ.

![Secure Validator Web UI](screenshots/02_secure_validator_web_ui.png)

---

## 3. LAB 2: GITSECURE PRE-COMMIT HOOK (KIỂM SOÁT BẢO MẬT COMMIT)

### 3.1 Cơ chế Hoạt động của Git Hook
Script `pre-commit` được cấu hình trong thư mục `.githooks/` hoạt động tự động mỗi khi nhà phát triển thực hiện lệnh commit:
1. **Quét mẫu dữ liệu nhạy cảm (Secret Leak Detection):** Phân tích mã nguồn staged bằng hệ thống Regex định danh chuỗi API Key bí mật, Private Key, Mật khẩu bản rõ, Token xác thực và AWS Key (`(AKIA|ASIA)...`).
2. **Kiểm tra phân quyền tệp (File Permissions):** Cảnh báo nếu phát hiện tệp tin có quyền ghi mở rộng cho bên thứ ba (world-writable).
3. **Phân tích tĩnh Bandit SAST:** Kích hoạt Bandit để rà soát mã nguồn Python phát hiện sớm các lỗ hổng bảo mật nghiêm trọng.
4. **Cơ chế Chặn đứng & Kiểm toán:** Khi phát hiện vi phạm, Hook lập tức hủy bỏ thao tác commit (`exit 1`) và ghi nhận lại đầy đủ dấu vết vi phạm kèm dấu mốc thời gian vào tệp `gitsecure.log`.

### 3.2 Thử nghiệm Chặn Commit Tệp Chứa Mật khẩu (`bad.py`)
Thực hiện chạy kiểm thử phát hiện bí mật rò rỉ:
```powershell
python ..\.githooks\pre-commit bad.py
```
Hook lập tức ngăn chặn thành công và đưa ra thông báo cảnh báo chi tiết:

![GitSecure Hook Block](screenshots/03_gitsecure_hook_block.png)

### 3.3 Nhật ký Kiểm toán Bảo mật (`gitsecure.log`)
Trích xuất tệp nhật ký kiểm toán cho thấy mọi hành vi vi phạm an toàn đều được lưu trữ đầy đủ phục vụ rà soát tuân thủ:

![GitSecure Audit Log](screenshots/04_gitsecure_log.png)

---

## 4. LAB 3: SECURE LOGGING SERVICE (NHẬT KÝ BẢO MẬT & CHỐNG GIẢ MẠO)

### 4.1 Cơ chế Che giấu Thông tin Nhạy cảm (PII Masking)
- Để đáp ứng các tiêu chuẩn bảo mật dữ liệu riêng tư, module `securelogger/logger.py` áp dụng bộ lọc Regex tự động tìm kiếm và thay thế dữ liệu định danh người dùng:
  - Địa chỉ Email -> `<email_masked>`
  - Khóa truy cập, Mật khẩu, API Token -> `<token_masked>`

### 4.2 Cấu trúc JSON & Nén Xoay vòng (GZip Rotation)
- Mỗi bản ghi nhật ký được định dạng dưới dạng đối tượng JSON chuẩn gồm các trường: `timestamp` (UTC ISO 8601), `level` (INFO/WARNING/ERROR), `message` và trường dữ liệu mở rộng (`data`, `results`).
- Tích hợp lớp `SecureRotatingFileHandler` và `GZipRotator`: khi tệp nhật ký đạt dung lượng ngưỡng tối đa (`1MB`), hệ thống tự động xoay vòng và nén dữ liệu cũ thành file `.gz`.

### 4.3 Chuỗi Băm Toàn vẹn Chống Giả Mạo (Tamper-evident Signatures)
- Điểm nổi bật của hệ thống là tính năng tạo chữ ký toàn vẹn: mỗi dòng nhật ký sau khi ghi thành công sẽ được tính toán giá trị băm mật mã SHA-256 và nối vào tệp chữ ký riêng biệt `secure.log.sig`.
- Khi cần kiểm tra tính nguyên vẹn, quản trị viên chỉ cần băm lại từng dòng trong `secure.log` và so khớp với `secure.log.sig`. Bất kỳ hành vi sửa đổi, xóa dòng hoặc chèn log giả mạo đều sẽ bị phát hiện ngay lập tức.

### 4.4 Thử nghiệm Dịch vụ Web API & Kết quả Ghi Nhật ký
Khởi chạy dịch vụ API ghi nhận log:
```powershell
python app.py
```

![Secure Logger API](screenshots/05_secure_logger_api.png)

Kiểm tra nội dung tệp `secure.log` và chữ ký toàn vẹn `secure.log.sig`:

![Secure Logger Masked and Signature](screenshots/06_secure_logger_masked.png)

---

## 5. TỔNG KẾT BÀI THỰC HÀNH 1

| Hạng mục / Module | Cơ chế An toàn Thực hiện | Kết quả Thực nghiệm |
| :--- | :--- | :--- |
| **Secure Validator** | HTML escape, Regex SQL filtering, Path Traversal barrier | **10/10 Unit tests Passed**; Giao diện Web hoạt động chuẩn |
| **GitSecure Hook** | Secret Pattern Matching, File Permissions, Bandit scan | **Chặn thành công commit rò rỉ secret**, ghi nhận `gitsecure.log` |
| **Secure Logger** | PII Auto-Masking, JSON Formatter, GZip Rotation | **Dữ liệu nhạy cảm được che giấu**; Chuỗi băm SHA-256 toàn vẹn |
