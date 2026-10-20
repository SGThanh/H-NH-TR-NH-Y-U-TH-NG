# 👑 Trần Đan Thanh & Đồng Thị Ngọc Yến — Hành Trình Yêu Thương

Website kỷ niệm tình yêu kết hợp hài hòa giữa nét vương giả cung đình Việt Nam (Cổ Phục Hoàng Triều Áo Nhật Bình) và giao diện hiện đại tinh tế, ghi dấu hành trình từ ngày đầu gặp gỡ đến ngày chung đôi của Trần Đan Thanh và Đồng Thị Ngọc Yến.

---

## 🚀 Hướng Dẫn Đưa Lên GitHub & Chạy GitHub Pages Miễn Phí

Trang web đã được cấu hình sẵn **GitHub Actions** tự động biên dịch và triển khai lên **GitHub Pages**. Bạn chỉ cần làm theo 3 bước đơn giản dưới đây:

### Bước 1: Tạo Repository mới trên GitHub
1. Truy cập [github.com/new](https://github.com/new) và đăng nhập tài khoản GitHub của bạn.
2. Đặt tên Repository (Ví dụ: `danthanh-ngocyen` hoặc `tinh-yeu`).
3. Chọn chế độ **Public** (hoặc Private nếu có GitHub Pro).
4. **Không** tích chọn "Add a README file" (vì dự án đã có sẵn).
5. Nhấn **Create repository**.

### Bước 2: Đẩy toàn bộ mã nguồn lên GitHub
Mở terminal/dòng lệnh tại thư mục dự án và chạy các lệnh sau:

```bash
# 1. Thêm địa chỉ kho chứa từ xa của bạn (thay <USERNAME> và <REPO_NAME> bằng tên tài khoản và kho chứa của bạn)
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git

# 2. Đổi nhánh chính thành main (nếu chưa có)
git branch -M main

# 3. Đẩy toàn bộ code lên GitHub
git push -u origin main
```

*(Nếu bạn dùng GitHub Desktop hoặc công cụ đồ họa, chỉ cần mở thư mục dự án và nhấn **Publish repository**).*

---

### Bước 3: Bật tính năng GitHub Pages tự động
1. Trên giao diện GitHub của kho chứa vừa tạo, vào mục **Settings** (Cài đặt) ở thanh trên cùng.
2. Ở menu bên trái, tìm và nhấn vào **Pages**.
3. Tại phần **Build and deployment** -> **Source**:
   - Chuyển từ `Deploy from a branch` sang 👉 **GitHub Actions**.
4. Xong! Hệ thống GitHub Actions sẽ tự động kích hoạt tiến trình xây dựng web.
5. Sau khoảng 1 - 2 phút, đường dẫn website trực tiếp của bạn sẽ xuất hiện:
   **`https://<USERNAME>.github.io/<REPO_NAME>/`**

---

## 🛠️ Chạy Thử Trên Máy Tính (Local Development)

Nếu muốn chỉnh sửa hoặc chạy thử trực tiếp trên máy tính:

```bash
# 1. Cài đặt các thư viện cần thiết
npm install --legacy-peer-deps

# 2. Khởi chạy máy chủ phát triển
npm run dev

# 3. Mở trình duyệt tại: http://localhost:3000 (hoặc cổng hiển thị trên terminal)
```

Khi muốn đóng gói website ra thư mục tĩnh (`dist`):
```bash
npm run build
```

---

## 📸 Lưu Ý Về Hình Ảnh & Dữ Liệu Tùy Biến
- Nếu bạn đã thêm hoặc thay đổi ảnh trên giao diện website, các ảnh đó được lưu trong trình duyệt.
- Bạn có thể nhấn vào nút **"Xuất lên GitHub & Sao lưu"** ở thanh điều hướng hoặc chân trang của website để:
  1. Tải về file sao lưu `.json`.
  2. Xuất mã nguồn ảnh nhúng sẵn vào code để ảnh hiển thị cố định vĩnh viễn cho tất cả mọi người khi vào link web.
