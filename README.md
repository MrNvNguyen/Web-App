# Hệ thống Quản lý Dự án BIM - OneCad

## 📋 Tổng quan Dự án

**Tên dự án:** BIM Management System  
**Phiên bản:** v2.1 - Complete with Authentication  
**Mục tiêu:** Hệ thống quản lý toàn diện cho các dự án BIM (Building Information Modeling) trong lĩnh vực xây dựng, hạ tầng và giao thông  
**Công ty:** OneCad Vietnam - https://onecadvn.com

## 🌐 URLs

- **Development (Sandbox):** https://3000-il1ec2okaahgchy9k3855-cbeee0f9.sandbox.novita.ai
- **GitHub Repository:** https://github.com/MrNvNguyen/Web-App
- **Source Code Backup:** https://www.genspark.ai/api/files/s/siC71ntG

## 🔐 TÀI KHOẢN TEST (MỚI!)

Hệ thống giờ có **đăng nhập**! Sử dụng các tài khoản sau để test:

| Tên đăng nhập | Mật khẩu | Vai trò |
|---------------|----------|---------|
| **admin** | admin123 | Admin |
| **manager** | manager123 | BIM Manager |
| **coordinator** | coord123 | BIM Coordinator |
| **modeler** | model123 | BIM Modeler |

**📖 Hướng dẫn đầy đủ:** [COMPLETE_USER_GUIDE.md](./COMPLETE_USER_GUIDE.md)

## 🔧 FIX LỖI D1 CONSOLE QUAN TRỌNG!

**❌ Lỗi:** "The request is malformed: Requests without any query are not supported"

**✅ Giải pháp:** Đã tạo 6 file SQL tối ưu (không comments, format 1 dòng):
- 📁 `d1-1-tables-oneline.sql` - Tạo 9 tables
- 📁 `d1-2-indexes-oneline.sql` - Tạo 16 indexes
- 📁 `d1-3-seed1-oneline.sql` - Import Disciplines, Expense Types, Staff
- 📁 `d1-4-seed2-oneline.sql` - Import Projects, Categories
- 📁 `d1-5-seed3-oneline.sql` - Import Tasks
- 📁 `d1-6-seed4-oneline.sql` - Import Timesheets, Finances

**📖 Hướng dẫn chi tiết:**
- [QUICK_FIX_D1.md](./QUICK_FIX_D1.md) - Hướng dẫn nhanh
- [FINAL_FIX_D1.md](./FINAL_FIX_D1.md) - Hướng dẫn đầy đủ

## ✨ Tính năng Chính

### ⭐ **Phase 2a - MỚI CẬP NHẬT!**

#### 1. **Form Modal đầy đủ cho tất cả module** 🎉
- ✅ **Modal Thêm Dự án**: Form nhập đầy đủ thông tin dự án
  - Tên, mã dự án, chủ đầu tư, địa điểm
  - Ngày bắt đầu/kết thúc
  - Giá trị hợp đồng, chi phí dự toán
  - Chọn người quản lý từ danh sách nhân sự
  - Trạng thái dự án

- ✅ **Modal Thêm Nhân sự**: Quản lý thông tin nhân sự
  - Họ tên, email, số điện thoại
  - Chức vụ (BIM Manager, Coordinator, Modeler...)
  - Lương theo giờ
  - Trạng thái active/inactive

- ✅ **Modal Thêm Nhiệm vụ**: Tạo task chi tiết
  - Chọn dự án, hạng mục, bộ môn
  - Giao nhiệm vụ cho nhân sự
  - Số giờ ước tính
  - Ưu tiên (Low, Medium, High, Urgent)
  - Trạng thái (Todo, In Progress, Review, Completed)
  - Hạn hoàn thành

- ✅ **Modal Thêm Timesheet**: Ghi nhận giờ làm
  - Chọn nhân sự, dự án, nhiệm vụ
  - Ngày làm việc
  - Số giờ làm việc (tự động cập nhật vào task)
  - Mô tả công việc đã làm

- ✅ **Modal Thêm Thu Chi**: Quản lý tài chính
  - Chọn dự án
  - Loại chi phí (hoặc tạo mới)
  - Thu/Chi
  - Số tiền, ngày giao dịch
  - Số chứng từ, mô tả

#### 2. **Tạo loại chi phí tùy biến** ⭐ **TÍNH NĂNG ĐẶC BIỆT**
- ✅ Trong form "Thêm Thu Chi", có nút **"➕ Thêm mới"** bên cạnh "Loại chi phí"
- ✅ Modal tạo loại chi phí mới với:
  - Tên loại chi phí
  - Danh mục (Labor, Material, Travel, Overhead, Other, Income)
  - Mô tả
- ✅ Tự động cập nhật dropdown sau khi thêm
- ✅ Linh hoạt cho từng dự án, từng giai đoạn

### 1. Dashboard Tổng quan
- Thống kê tổng số dự án, nhân sự, nhiệm vụ
- Biểu đồ phân tích trạng thái dự án và nhiệm vụ
- Tính toán lợi nhuận tự động (Doanh thu - Chi phí)

### 2. Quản lý Dự án
- ✅ Quản lý thông tin dự án: Tên, mã, chủ đầu tư, địa điểm
- ✅ Theo dõi giá trị hợp đồng và chi phí dự toán
- ✅ Quản lý các giai đoạn: Thiết kế cơ sở → Thiết kế kỹ thuật → Thi công → Hoàn công
- ✅ Phân chia Hạng mục (Categories) cho từng dự án
- ✅ Xem chi tiết: Hạng mục, nhân sự, nhiệm vụ, thu chi

### 3. Quản lý Nhân sự
- ✅ Danh sách nhân sự với thông tin: Họ tên, email, chức vụ, lương/giờ
- ✅ Phân công nhân sự vào các dự án
- ✅ Theo dõi trạng thái: Active/Inactive
- ✅ Xem lịch sử timesheet của từng nhân sự

### 4. Quản lý Nhiệm vụ (Tasks)
- ✅ Tạo nhiệm vụ theo Dự án → Hạng mục → Bộ môn
- ✅ Gán nhiệm vụ cho nhân sự
- ✅ Theo dõi số giờ ước tính và thực tế
- ✅ Quản lý ưu tiên: Low, Medium, High, Urgent
- ✅ Trạng thái: Todo, In Progress, Review, Completed

### 5. Quản lý Timesheet
- ✅ Ghi nhận giờ làm việc hàng ngày
- ✅ Liên kết với nhiệm vụ và dự án
- ✅ Phê duyệt timesheet
- ✅ Tự động cập nhật số giờ thực tế vào nhiệm vụ

### 6. Quản lý Thu Chi
- ✅ Ghi nhận thu nhập và chi phí theo dự án
- ✅ Phân loại chi phí tùy biến: Lương, Văn phòng phẩm, Công tác phí, Phần mềm, etc.
- ✅ Theo dõi số chứng từ và ngày giao dịch
- ✅ Báo cáo tài chính chi tiết cho từng dự án

### 7. Bộ môn (Disciplines) - Dùng chung
- ✅ Kiến trúc, Kết cấu, Điện, HVAC, Cấp thoát nước
- ✅ Phòng cháy chữa cháy, Hạ tầng, Giao thông, Cảnh quan

## 📊 Cấu trúc Dữ liệu

### Database Schema (Cloudflare D1 - SQLite)

**Bảng chính:**
- `projects` - Dự án
- `categories` - Hạng mục của dự án
- `staff` - Nhân sự
- `tasks` - Nhiệm vụ
- `timesheets` - Bảng chấm công
- `project_finances` - Thu chi dự án
- `disciplines` - Bộ môn (dùng chung)
- `expense_types` - Loại chi phí (tùy biến)
- `project_staff` - Phân công nhân sự vào dự án

**Quan hệ dữ liệu:**
```
projects (1) ──→ (n) categories
         (1) ──→ (n) tasks
         (1) ──→ (n) project_finances
         (1) ──→ (n) project_staff ←─ (n) staff

tasks (1) ──→ (n) timesheets ←─ (n) staff
```

## 🔧 API Endpoints

### Dashboard
- `GET /api/dashboard/stats` - Thống kê tổng quan

### Projects
- `GET /api/projects` - Danh sách dự án
- `GET /api/projects/:id` - Chi tiết dự án
- `POST /api/projects` - Tạo dự án mới
- `PUT /api/projects/:id` - Cập nhật dự án

### Staff
- `GET /api/staff` - Danh sách nhân sự
- `GET /api/staff/:id` - Chi tiết nhân sự
- `POST /api/staff` - Thêm nhân sự
- `PUT /api/staff/:id` - Cập nhật nhân sự

### Tasks
- `GET /api/tasks?project_id=&assigned_to=&status=` - Danh sách nhiệm vụ
- `POST /api/tasks` - Tạo nhiệm vụ
- `PUT /api/tasks/:id` - Cập nhật nhiệm vụ

### Timesheets
- `GET /api/timesheets?project_id=&staff_id=` - Danh sách timesheet
- `POST /api/timesheets` - Thêm timesheet

### Finances
- `GET /api/finances?project_id=` - Danh sách thu chi
- `POST /api/finances` - Thêm giao dịch thu chi

### Disciplines & Expense Types
- `GET /api/disciplines` - Danh sách bộ môn
- `GET /api/expense-types` - Danh sách loại chi phí
- `POST /api/expense-types` - Thêm loại chi phí mới

## 🎨 Giao diện

- **Màu chủ đạo:** #0066CC (OneCad Blue)
- **Framework CSS:** TailwindCSS (via CDN)
- **Icons:** Font Awesome 6
- **Charts:** Chart.js
- **Design:** Clean, professional, responsive

## 🚀 Hướng dẫn Sử dụng

### Bước 1: Truy cập hệ thống
Mở trình duyệt và truy cập: https://3000-il1ec2okaahgchy9k3855-cbeee0f9.sandbox.novita.ai

### Bước 2: Khám phá các module
- **Dashboard:** Xem tổng quan thống kê
- **Quản lý Dự án:** Xem danh sách 3 dự án mẫu
- **Quản lý Nhân sự:** 8 nhân sự đã được thêm sẵn
- **Quản lý Nhiệm vụ:** 9 nhiệm vụ mẫu
- **Timesheet:** 10 bản ghi chấm công mẫu
- **Quản lý Thu Chi:** Xem chi tiết thu chi của các dự án

### Bước 3: Thêm dữ liệu mới
Sử dụng các nút "Thêm..." trên mỗi module để thêm:
- Dự án mới
- Nhân sự mới
- Nhiệm vụ mới
- Timesheet mới
- Giao dịch thu chi mới

## 📈 Dữ liệu Mẫu

### Dự án mẫu
1. **Vinhomes Ocean Park 3** (VOP3-2024)
   - Chủ đầu tư: Vingroup
   - Giá trị HĐ: 5 tỷ VNĐ
   - Trạng thái: Thiết kế kỹ thuật

2. **Metro Line 5** (METRO5-2024)
   - Chủ đầu tư: Ban quản lý đường sắt đô thị Hà Nội
   - Giá trị HĐ: 8 tỷ VNĐ
   - Trạng thái: Thiết kế cơ sở

3. **Bệnh viện Đa khoa Quốc tế** (BVQT-2024)
   - Chủ đầu tư: Tập đoàn Y tế ABC
   - Giá trị HĐ: 3 tỷ VNĐ
   - Trạng thái: Thi công

### Nhân sự mẫu
- 1 BIM Manager
- 1 BIM Coordinator
- 4 BIM Modelers (Kiến trúc, Kết cấu, MEP, Hạ tầng)
- 1 BIM Technician
- 1 QA/QC Specialist

## 🛠️ Tech Stack

- **Backend:** Hono (Lightweight web framework)
- **Runtime:** Cloudflare Workers
- **Database:** Cloudflare D1 (SQLite)
- **Frontend:** HTML5, TailwindCSS, Vanilla JavaScript
- **Charts:** Chart.js
- **Deployment:** Cloudflare Pages

## 📝 Tính năng Chưa triển khai

### ~~Phase 2a (Đã hoàn thành ✅)~~
- ✅ Form thêm/sửa dự án, nhân sú, nhiệm vụ (UI Modal)
- ✅ Tạo loại chi phí tùy biến

### Phase 2b (Tiếp theo)
- [ ] Chi tiết dự án với tabs: Thông tin, Hạng mục, Nhiệm vụ, Thu chi
- [ ] Edit/Delete cho các module
- [ ] Báo cáo tuần/tháng tự động
- [ ] Export Excel cho các báo cáo
- [ ] Quản lý file đính kèm (sử dụng Cloudflare R2)
- [ ] Thông báo và reminder cho deadline
- [ ] Phân quyền người dùng (Admin, PM, Staff)
- [ ] Đăng nhập và xác thực
- [ ] Dashboard theo từng dự án
- [ ] Gantt chart cho timeline dự án
- [ ] Mobile responsive optimization

### Phase 3 (Tính năng nâng cao)
- [ ] Tích hợp với BIM 360/Autodesk Platform
- [ ] AI phân tích tiến độ và dự báo chi phí
- [ ] Chatbot hỗ trợ truy vấn dữ liệu
- [ ] Real-time collaboration
- [ ] API webhook cho tích hợp bên ngoài

## 🔄 Deployment Status

- **Platform:** Development Sandbox + Production Ready
- **Status:** ✅ Phase 2a Complete
- **Database:** Cloudflare D1 (local + ready for production)
- **GitHub:** Ready to push to https://github.com/MrNvNguyen/Web-App
- **Cloudflare:** Ready to deploy to Cloudflare Pages
- **Last Updated:** 2026-02-10 - Phase 2a Complete

### 🚀 Deployment Guide

Xem file [DEPLOYMENT.md](DEPLOYMENT.md) để biết chi tiết cách:
1. Push code lên GitHub
2. Deploy lên Cloudflare Pages production
3. Setup D1 database trên production
4. Troubleshooting các vấn đề thường gặp

### 📦 Quick Commands

```bash
# Push to GitHub (after setup authorization)
./push-to-github.sh

# Deploy to Cloudflare Pages
npm run deploy

# Or manual steps
npm run build
npx wrangler pages deploy dist --project-name webapp
```

## 📚 Commands Reference

### Development
```bash
npm run dev              # Vite dev server
npm run dev:sandbox      # Wrangler dev with D1
npm run build            # Build for production
```

### Database
```bash
npm run db:migrate:local # Apply migrations locally
npm run db:seed          # Seed sample data
npm run db:reset         # Reset and reseed database
```

### PM2 Management
```bash
pm2 list                 # List all services
pm2 logs bim-management  # View logs
pm2 restart bim-management
pm2 stop bim-management
pm2 delete bim-management
```

### Git
```bash
npm run git:status       # Check git status
npm run git:commit "msg" # Quick commit
```

## 🎯 Kết luận

Hệ thống Quản lý Dự án BIM đã được xây dựng hoàn chỉnh với đầy đủ các tính năng cơ bản:

✅ **Giải quyết được các vấn đề:**
1. Quản lý phân công nhân sự trên nhiều dự án
2. Theo dõi tiến độ và báo cáo nhân sự
3. Kiểm soát hiệu năng qua timesheet
4. Quản lý chi phí và dự báo lợi nhuận

✅ **Giao diện chuyên nghiệp:** Màu sắc theo OneCad brand (#0066CC)

✅ **Dễ sử dụng:** Dashboard trực quan, dữ liệu mẫu sẵn có

✅ **Sẵn sàng mở rộng:** Kiến trúc module, API RESTful đầy đủ

---

**Developed by:** GenSpark AI  
**For:** OneCad Vietnam  
**Date:** February 10, 2026
