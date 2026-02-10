# 🚀 HƯỚNG DẪN DEPLOY V2 LÊN CLOUDFLARE PAGES

## ✅ Code đã được push lên GitHub thành công!

**Repository:** https://github.com/MrNvNguyen/Web-App

---

## 📋 CÁCH 1: Deploy từ Cloudflare Dashboard (KHUYẾN NGHỊ - DỄ NHẤT!)

### Bước 1: Tạo D1 Database

1. Vào https://dash.cloudflare.com/
2. Chọn **Workers & Pages** → **D1 SQL Database**
3. Click **Create database**
4. Nhập tên: `bim-management-production`
5. Click **Create**
6. **LƯU LẠI database ID** (sẽ cần dùng sau)

### Bước 2: Apply Migrations vào D1 Database

#### Option A: Từ Dashboard (Dễ)

1. Vào database `bim-management-production` vừa tạo
2. Click tab **Console**
3. Copy nội dung từ file `/home/user/webapp/migrations/0001_initial_schema.sql`
4. Paste vào console và click **Execute**
5. Kiểm tra: Nên thấy 9 tables được tạo

#### Option B: Từ local (Nếu có token không bị IP restriction)

```bash
cd /home/user/webapp
npx wrangler d1 migrations apply bim-management-production
```

### Bước 3: (Optional) Thêm dữ liệu mẫu

Nếu muốn có dữ liệu demo:

1. Vào D1 Console
2. Copy nội dung từ `/home/user/webapp/seed.sql`
3. Paste và Execute

### Bước 4: Deploy từ GitHub

1. Vào https://dash.cloudflare.com/
2. Chọn **Workers & Pages**
3. Click **Create application**
4. Chọn tab **Pages**
5. Click **Connect to Git**

6. **Authorize GitHub:**
   - Select repository: `MrNvNguyen/Web-App`
   - Click **Begin setup**

7. **Build settings:**
   - Project name: `bim-management`
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`

8. **Environment variables** (KHÔNG CẦN thiết lập gì)

9. Click **Save and Deploy**

### Bước 5: Bind D1 Database

Sau khi deploy xong (khoảng 2-3 phút):

1. Vào project `bim-management` trong Cloudflare Pages
2. Chọn **Settings** → **Functions**
3. Scroll xuống **D1 database bindings**
4. Click **Add binding**
   - Variable name: `DB`
   - D1 database: `bim-management-production`
5. Click **Save**
6. Click **Redeploy** ở tab **Deployments**

### Bước 6: Kiểm tra Production

Sau khi deploy xong, bạn sẽ có URL:
- `https://bim-management.pages.dev`
- Hoặc `https://bim-management-xxx.pages.dev`

Truy cập và kiểm tra:
- ✅ Dashboard hiển thị
- ✅ Các module hoạt động
- ✅ Thêm dữ liệu mới (test form modal)
- ✅ Tạo loại chi phí tùy biến

---

## 📋 CÁCH 2: Deploy từ Local Machine

Nếu bạn có máy tính local và muốn deploy từ đó:

### Bước 1: Clone repository

```bash
git clone https://github.com/MrNvNguyen/Web-App.git
cd Web-App
```

### Bước 2: Install dependencies

```bash
npm install
```

### Bước 3: Login Cloudflare (chỉ cần 1 lần)

```bash
npx wrangler login
```

Browser sẽ mở, đăng nhập vào Cloudflare account của bạn.

### Bước 4: Tạo D1 Database

```bash
npx wrangler d1 create bim-management-production
```

Copy `database_id` từ output, cập nhật vào `wrangler.jsonc`:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "bim-management-production",
      "database_id": "PASTE_YOUR_DATABASE_ID_HERE"
    }
  ]
}
```

### Bước 5: Apply Migrations

```bash
npx wrangler d1 migrations apply bim-management-production
```

### Bước 6: (Optional) Seed data

```bash
npx wrangler d1 execute bim-management-production --file=./seed.sql
```

### Bước 7: Create Pages Project

```bash
npx wrangler pages project create bim-management --production-branch main
```

### Bước 8: Deploy!

```bash
npm run build
npx wrangler pages deploy dist --project-name bim-management
```

---

## 🎯 Sau khi Deploy thành công

### Bạn sẽ có:

1. **Production URL:** https://bim-management.pages.dev
2. **GitHub Repo:** https://github.com/MrNvNguyen/Web-App
3. **Automatic deploys:** Mỗi khi push code mới lên GitHub, sẽ tự động deploy!

### Test các tính năng V2:

#### 1. **Tạo loại chi phí tùy biến:**
```
1. Click "Quản lý Thu Chi"
2. Click "Thêm Thu Chi"
3. Tại "Loại chi phí", click "➕ Thêm mới"
4. Nhập tên (VD: "Thuê thiết bị BIM"), chọn category, mô tả
5. Click "Thêm"
6. → Loại mới xuất hiện trong dropdown ngay lập tức!
```

#### 2. **Thêm dự án mới:**
```
1. Click "Quản lý Dự án"
2. Click "Thêm Dự án"
3. Điền form đầy đủ
4. Chọn người quản lý từ dropdown
5. Click "Thêm"
6. → Dự án mới xuất hiện trong bảng!
```

#### 3. **Tạo nhiệm vụ:**
```
1. Click "Quản lý Nhiệm vụ"
2. Click "Thêm Nhiệm vụ"
3. Chọn dự án → Hạng mục tự động filter
4. Chọn bộ môn, giao cho nhân sự
5. Click "Thêm"
```

#### 4. **Ghi timesheet:**
```
1. Click "Timesheet"
2. Click "Thêm Timesheet"
3. Chọn nhân sự, dự án
4. Chọn nhiệm vụ → Tự động filter theo dự án
5. Nhập giờ làm
6. → Số giờ thực tế của task tự động cập nhật!
```

---

## 🔧 Troubleshooting

### Lỗi: "Cannot find database"

**Giải pháp:** Chưa bind D1 database
1. Vào Cloudflare Pages project
2. Settings → Functions → D1 database bindings
3. Add binding: `DB` → `bim-management-production`
4. Redeploy

### Lỗi: "Tables not found"

**Giải pháp:** Chưa apply migrations
1. Vào D1 Console
2. Execute nội dung của `migrations/0001_initial_schema.sql`

### Lỗi: "No data showing"

**Giải pháp:** Database trống
1. Vào D1 Console
2. Execute nội dung của `seed.sql`
3. Hoặc thêm dữ liệu thủ công qua form modal

---

## 📞 Support

Nếu gặp vấn đề, check:
1. Cloudflare Pages deployment logs
2. Browser console (F12) để xem lỗi JavaScript
3. D1 Console để xem database có data không

---

## 🎉 Chúc mừng!

Sau khi hoàn tất, bạn sẽ có:
- ✅ Website production hoạt động 24/7
- ✅ Tất cả tính năng V2 (modal forms + tùy biến chi phí)
- ✅ Auto deploy khi push code mới
- ✅ Database D1 production
- ✅ SSL/HTTPS miễn phí
- ✅ CDN toàn cầu

**Happy deploying! 🚀**

---

## 📊 So sánh 2 cách deploy

| Tiêu chí | Dashboard (Khuyến nghị) | Local Machine |
|----------|-------------------------|---------------|
| Độ khó | ⭐⭐ Dễ | ⭐⭐⭐ Trung bình |
| Yêu cầu | Chỉ cần browser | Cần máy local + Node.js |
| Auto deploy | ✅ Có (từ GitHub) | ⚠️ Phải deploy manual |
| IP restriction | ✅ Không bị | ⚠️ Có thể bị |
| Thời gian | ~10 phút | ~5 phút (nếu không lỗi) |

**→ Khuyến nghị: Sử dụng Cách 1 (Dashboard) cho lần đầu tiên!**

---

*Last updated: 2026-02-10*  
*Version: V2 - Phase 2a Complete*
