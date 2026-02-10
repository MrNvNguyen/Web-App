# 🎬 VIDEO HƯỚNG DẪN DEPLOY V2 - BƯỚC ĐƠN GIẢN

## ✅ Code đã push lên GitHub: https://github.com/MrNvNguyen/Web-App

---

## 🚀 HƯỚNG DẪN DEPLOY - 6 BƯỚC ĐỂN GIẢN

### 📹 BƯỚC 1: Tạo D1 Database (2 phút)

```
1. Mở: https://dash.cloudflare.com/
2. Sidebar → Workers & Pages
3. Tab "D1 SQL Database"
4. Click [Create database]
5. Tên: bim-management-production
6. Click [Create]
7. ✅ Xong! Giữ tab này mở để dùng ở bước 2
```

### 📹 BƯỚC 2: Tạo Tables trong Database (2 phút)

```
1. Trong database vừa tạo, click tab [Console]
2. Mở file này: https://github.com/MrNvNguyen/Web-App/blob/main/migrations/0001_initial_schema.sql
3. Click nút [Raw] để xem code SQL
4. Copy TẤT CẢ code (Ctrl+A, Ctrl+C)
5. Paste vào D1 Console
6. Click [Execute]
7. ✅ Xong! Bạn sẽ thấy "25 commands executed successfully"
```

### 📹 BƯỚC 3: Thêm dữ liệu mẫu (Optional - 1 phút)

```
1. Vẫn trong D1 Console
2. Mở: https://github.com/MrNvNguyen/Web-App/blob/main/seed.sql
3. Click [Raw], copy TẤT CẢ
4. Paste vào Console, click [Execute]
5. ✅ Xong! Có 3 dự án, 8 nhân sự, 9 nhiệm vụ mẫu
```

### 📹 BƯỚC 4: Deploy từ GitHub (3 phút)

```
1. Vào: https://dash.cloudflare.com/
2. Workers & Pages → [Create application]
3. Tab [Pages] → [Connect to Git]
4. [Connect GitHub account] (nếu chưa connect)
5. Chọn repository: MrNvNguyen/Web-App
6. Click [Begin setup]

Cấu hình:
- Project name: bim-management
- Production branch: main
- Framework preset: None
- Build command: npm run build
- Build output directory: dist

7. Click [Save and Deploy]
8. ⏳ Chờ 2-3 phút...
9. ✅ Deploy xong! Có URL như: https://bim-management.pages.dev
```

### 📹 BƯỚC 5: Bind Database vào Pages (2 phút)

```
1. Trong project vừa deploy, click [Settings]
2. Sidebar → [Functions]
3. Scroll xuống "D1 database bindings"
4. Click [Add binding]
   - Variable name: DB
   - D1 database: bim-management-production
5. Click [Save]
6. Quay lại tab [Deployments]
7. Click [...] ở deployment mới nhất → [Retry deployment]
8. ⏳ Chờ 1 phút...
9. ✅ Xong!
```

### 📹 BƯỚC 6: Test Production! (5 phút)

```
1. Click vào URL production: https://bim-management.pages.dev

2. Test Dashboard:
   ✅ Thấy 3 dự án, 8 nhân sự
   ✅ Biểu đồ hiển thị

3. Test tính năng V2 - TẠO LOẠI CHI PHÍ MỚI:
   - Click "Quản lý Thu Chi"
   - Click [Thêm Thu Chi]
   - Tại "Loại chi phí", click [➕ Thêm mới]
   - Nhập:
     * Tên: "Thuê máy TBM"
     * Category: Material
     * Mô tả: "Chi phí thuê máy khoan hầm TBM"
   - Click [Thêm]
   - ✅ Loại mới xuất hiện ngay trong dropdown!

4. Test TẠO DỰ ÁN MỚI:
   - Click "Quản lý Dự án"
   - Click [Thêm Dự án]
   - Điền thông tin dự án của bạn
   - Click [Thêm]
   - ✅ Dự án mới xuất hiện trong bảng!

5. Test TẠO NHIỆM VỤ:
   - Click "Quản lý Nhiệm vụ"
   - Click [Thêm Nhiệm vụ]
   - Chọn dự án → Hạng mục tự động lọc
   - Giao cho nhân sự
   - ✅ Nhiệm vụ được tạo!

6. Test TIMESHEET:
   - Click "Timesheet"
   - Click [Thêm Timesheet]
   - Chọn nhân sự, dự án, nhiệm vụ
   - Nhập giờ làm
   - ✅ Giờ thực tế tự động cập nhật!
```

---

## 🎯 KẾT QUẢ SAU KHI HOÀN TẤT

✅ **Website production:** https://bim-management.pages.dev  
✅ **Auto deploy:** Push code mới lên GitHub → Tự động deploy  
✅ **Database production:** D1 với đầy đủ dữ liệu  
✅ **Tất cả tính năng V2:** Modal forms + Tùy biến chi phí  
✅ **SSL/HTTPS:** Miễn phí, tự động  
✅ **CDN toàn cầu:** Tốc độ nhanh  

---

## ⏱️ TỔNG THỜI GIAN: ~15 phút

Phân bổ:
- Bước 1-2: Tạo database + tables (4 phút)
- Bước 3: Seed data (1 phút) - Optional
- Bước 4: Deploy Pages (3 phút)
- Bước 5: Bind database (2 phút)
- Bước 6: Test (5 phút)

---

## 🆘 NẾU GẶP LỖI

### Lỗi: "Database not found"
**Fix:** Quên bind database ở Bước 5
→ Settings → Functions → Add D1 binding → Redeploy

### Lỗi: "Tables not found"  
**Fix:** Quên execute migrations ở Bước 2
→ Vào D1 Console → Execute lại file migrations

### Lỗi: "No data"
**Fix:** Database trống
→ Execute seed.sql ở Bước 3
→ Hoặc thêm dữ liệu thủ công qua form

### Lỗi: "Build failed"
**Fix:** Check build logs
→ Thường do thiếu dependencies
→ Redeploy là xong (Cloudflare sẽ cache dependencies)

---

## 📱 TEST TRÊN MOBILE

Website đã responsive, test trên điện thoại:
1. Mở browser mobile
2. Vào: https://bim-management.pages.dev
3. Tất cả tính năng đều hoạt động!

---

## 🎥 KHUYẾN NGHỊ

**Quay video màn hình khi làm theo hướng dẫn này để:**
1. Có tài liệu training cho team
2. Debug dễ hơn nếu gặp lỗi
3. Chia sẻ với đồng nghiệp

**Tools quay màn hình:**
- Windows: Xbox Game Bar (Win + G)
- Mac: QuickTime Player
- Online: Loom.com

---

## 🔗 LINKS QUAN TRỌNG

- **GitHub Repo:** https://github.com/MrNvNguyen/Web-App
- **Cloudflare Dashboard:** https://dash.cloudflare.com/
- **Migrations file:** https://github.com/MrNvNguyen/Web-App/blob/main/migrations/0001_initial_schema.sql
- **Seed data:** https://github.com/MrNvNguyen/Web-App/blob/main/seed.sql
- **Full Documentation:** https://github.com/MrNvNguyen/Web-App/blob/main/README.md

---

## ✨ SAU KHI DEPLOY

### Các bạn trong công ty có thể:
1. Truy cập URL production 24/7
2. Thêm dự án thực tế của công ty
3. Quản lý nhân sự và task
4. Tạo loại chi phí tùy biến cho từng dự án
5. Theo dõi thu chi chi tiết

### Mỗi khi cần cập nhật code:
1. Developer push code lên GitHub
2. Cloudflare tự động deploy (2-3 phút)
3. Website tự động cập nhật
4. Zero downtime!

---

## 🎉 CHÚC MỪNG!

Bạn đã thành công deploy hệ thống BIM Management V2 lên production!

**Happy managing! 🏗️**

---

*Created: 2026-02-10*  
*Total time to follow: ~15 minutes*  
*Difficulty: ⭐⭐ Easy*
