# 🚀 Hướng dẫn Deploy Hệ thống BIM Management

## ✅ Phase 2a Đã Hoàn Thành!

### Tính năng mới đã được thêm:

#### 1. **Form tạo loại chi phí tùy biến** ✨
- Trong module "Quản lý Thu Chi", nhấn nút "Thêm Thu Chi"
- Trong form, bên cạnh "Loại chi phí", nhấn nút "➕ Thêm mới"
- Bạn có thể tự tạo loại chi phí mới với các danh mục:
  - **Labor** (Chi phí nhân sự)
  - **Material** (Vật liệu)
  - **Travel** (Đi lại)
  - **Overhead** (Chi phí chung)
  - **Other** (Khác)
  - **Income** (Thu nhập)

#### 2. **Form Modal đầy đủ cho tất cả module**:
- ✅ **Thêm Dự án**: Nhập đầy đủ thông tin dự án, chọn người quản lý
- ✅ **Thêm Nhân sự**: Họ tên, email, chức vụ, lương/giờ
- ✅ **Thêm Nhiệm vụ**: Gắn với dự án, hạng mục, bộ môn, giao cho nhân sự
- ✅ **Thêm Timesheet**: Ghi nhận giờ làm việc hàng ngày
- ✅ **Thêm Thu Chi**: Chọn dự án, loại chi phí (hoặc tạo mới), số tiền

---

## 📋 Các bước Deploy

### Bước 1: Setup GitHub (BẮT BUỘC)

1. **Vào tab #github** trong giao diện code sandbox
2. **Authorize GitHub App** - cho phép truy cập
3. **Chọn repository**: `MrNvNguyen/Web-App`
4. **Sau khi setup xong**, chạy lệnh sau để push code:

```bash
cd /home/user/webapp
git remote add origin https://github.com/MrNvNguyen/Web-App.git
git branch -M main
git push -f origin main
```

---

### Bước 2: Setup Cloudflare (Đã hoàn tất ✅)

Cloudflare API đã được cấu hình! Bây giờ cần create D1 database trên production:

```bash
cd /home/user/webapp
npx wrangler d1 create bim-management-db
```

**Sau đó copy `database_id` vào `wrangler.jsonc`:**

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "bim-management-db",
      "database_id": "PASTE_YOUR_DATABASE_ID_HERE"  // ← Thay bằng ID thực tế
    }
  ]
}
```

---

### Bước 3: Apply Migrations lên Production

```bash
cd /home/user/webapp
npx wrangler d1 migrations apply bim-management-db
```

---

### Bước 4: Seed Data (Tùy chọn)

Nếu muốn có dữ liệu mẫu trên production:

```bash
cd /home/user/webapp
npx wrangler d1 execute bim-management-db --file=./seed.sql
```

---

### Bước 5: Deploy lên Cloudflare Pages

#### 5.1. Tạo Project (lần đầu tiên)

```bash
cd /home/user/webapp
npx wrangler pages project create webapp --production-branch main
```

#### 5.2. Build và Deploy

```bash
cd /home/user/webapp
npm run build
npx wrangler pages deploy dist --project-name webapp
```

**Bạn sẽ nhận được 2 URLs:**
- **Production**: `https://random-id.webapp.pages.dev`
- **Branch**: `https://main.webapp.pages.dev`

---

### Bước 6: Kiểm tra Production

Sau khi deploy, truy cập URL production và kiểm tra:

1. ✅ Dashboard hiển thị đúng
2. ✅ Các module hoạt động
3. ✅ Form modal mở được
4. ✅ Thêm dữ liệu mới thành công
5. ✅ API endpoints hoạt động

---

## 🔧 Troubleshooting

### Lỗi: "Cannot use the access token from location"

Nếu gặp lỗi IP restriction, có 2 cách:

**Cách 1: Deploy từ máy local của bạn**

```bash
# Clone repo về máy
git clone https://github.com/MrNvNguyen/Web-App.git
cd Web-App

# Install dependencies
npm install

# Setup Cloudflare API token
export CLOUDFLARE_API_TOKEN=your_token_here

# Deploy
npm run deploy
```

**Cách 2: Sử dụng Cloudflare Pages GitHub Integration**

1. Vào https://dash.cloudflare.com/
2. Pages → Create a project
3. Connect to Git → Chọn repo `MrNvNguyen/Web-App`
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Environment variables:
   - Thêm D1 database binding

---

## 📊 Sau khi Deploy

### Update README với Production URLs

Cập nhật file README.md với URLs thực tế:

```markdown
## 🌐 URLs

- **Production:** https://your-project.pages.dev
- **GitHub:** https://github.com/MrNvNguyen/Web-App
```

---

## 🎯 Tính năng Phase 3 (Đề xuất tiếp theo)

Sau khi deploy production, các tính năng có thể phát triển tiếp:

1. **Chi tiết dự án với tabs**: Xem đầy đủ thông tin dự án, hạng mục, nhân sự, nhiệm vụ, thu chi
2. **Báo cáo tuần/tháng**: Tự động tạo báo cáo tiến độ
3. **Export Excel**: Xuất dữ liệu ra file Excel
4. **Quản lý file**: Upload và quản lý file đính kèm (Cloudflare R2)
5. **Thông báo**: Nhắc nhở deadline
6. **Phân quyền**: Admin, PM, Staff có quyền khác nhau
7. **Đăng nhập**: Authentication và authorization

---

## 📞 Liên hệ

Nếu gặp khó khăn trong quá trình deploy, vui lòng liên hệ hoặc mở issue trên GitHub!

**Happy Deploying! 🚀**
