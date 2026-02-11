# 🎉 HỆ THỐNG HOÀN THIỆN - HƯỚNG DẪN SỬ DỤNG

## ✅ CẬP NHẬT MỚI NHẤT (Feb 11, 2026)

### 🔐 **HỆ THỐNG ĐĂNG NHẬP ĐÃ HOẠT ĐỘNG!**

Hệ thống giờ đã có **đăng nhập với 4 tài khoản test**:

| Tên đăng nhập | Mật khẩu | Vai trò | Email |
|---------------|----------|---------|-------|
| **admin** | admin123 | Admin | admin@onecad.vn |
| **manager** | manager123 | BIM Manager | an.nguyen@onecad.vn |
| **coordinator** | coord123 | BIM Coordinator | binh.tran@onecad.vn |
| **modeler** | model123 | BIM Modeler | cuong.le@onecad.vn |

---

## 🚀 TRUY CẬP HỆ THỐNG

### Development URL (Đang hoạt động):
**https://3000-il1ec2okaahgchy9k3855-cbeee0f9.sandbox.novita.ai**

1. Mở URL trên
2. Bạn sẽ thấy **màn hình đăng nhập đẹp mắt** với logo OneCad
3. Chọn một trong 4 tài khoản test (xem bảng trên)
4. Click "Đăng nhập"
5. Hệ thống sẽ chuyển đến Dashboard

---

## 📋 ĐÃ SỬA LỖI & CẢI TIẾN

### ✅ Đã hoàn thành:

1. **✅ Fix lỗi export trong modals.js**
   - Đã chuyển từ ES6 `export` sang `window` object
   - Modals giờ load và hoạt động bình thường

2. **✅ Thêm hệ thống đăng nhập**
   - Login screen chuyên nghiệp với logo OneCad
   - 4 tài khoản test với roles khác nhau
   - User info hiển thị ở header
   - Nút đăng xuất trong user menu

3. **✅ Tích hợp localStorage authentication**
   - Session được lưu trong trình duyệt
   - Tự động redirect về login nếu chưa đăng nhập
   - Hiển thị thông tin user sau khi đăng nhập

4. **✅ Database đã có data đầy đủ**
   - 3 dự án mẫu
   - 8 nhân sự
   - 9 nhiệm vụ
   - 10 timesheet records
   - 10 giao dịch thu chi
   - 7 loại chi phí

---

## 🎯 HƯỚNG DẪN SỬ DỤNG CHI TIẾT

### 1. **Đăng Nhập**

**Bước 1:** Truy cập URL development  
**Bước 2:** Nhập username và password (ví dụ: `admin` / `admin123`)  
**Bước 3:** Click "Đăng nhập"

**Kết quả:** Bạn sẽ thấy Dashboard với:
- Tổng số dự án, nhân sự, nhiệm vụ
- Lợi nhuận hiện tại
- Biểu đồ trạng thái dự án và nhiệm vụ

---

### 2. **Dashboard**

Sau khi đăng nhập, bạn sẽ thấy Dashboard với các thông tin:

📊 **Stats Cards:**
- **Tổng Dự án:** 3 dự án
- **Tổng Nhân sự:** 8 nhân viên
- **Nhiệm vụ đang làm:** 5 tasks
- **Lợi nhuận:** 4.16 tỷ VNĐ

📈 **Charts:**
- **Biểu đồ trạng thái dự án** (Planning, Design Basic, Design Technical, Construction, Completed)
- **Biểu đồ trạng thái nhiệm vụ** (Todo, In Progress, Review, Completed)

---

### 3. **Quản lý Dự án**

**Click "Quản lý Dự án" trong sidebar**

📋 **Danh sách dự án hiện có:**
1. Vinhomes Ocean Park 3 - Dự án phức hợp căn hộ cao cấp
2. Metro Line 5 Phase 1 - Tuyến Metro số 5
3. Bệnh viện Đa khoa Quốc tế - Bệnh viện 500 giường

**Mỗi dự án hiển thị:**
- Tên, mã dự án
- Chủ đầu tư
- Giá trị hợp đồng
- Chi phí dự toán
- Trạng thái (Planning → Design Basic → Design Technical → Construction → Completed)
- Quản lý dự án

➕ **Thêm dự án mới:**
1. Click nút "➕ Thêm Dự án"
2. Modal sẽ hiện lên
3. Điền thông tin:
   - Tên dự án *
   - Mã dự án *
   - Chủ đầu tư *
   - Địa điểm
   - Ngày bắt đầu / Ngày kết thúc
   - Giá trị hợp đồng
   - Chi phí dự toán
   - Chọn người quản lý
   - Trạng thái
4. Click "Thêm"

---

### 4. **Quản lý Nhân sự**

**Click "Quản lý Nhân sự" trong sidebar**

👥 **Danh sách nhân sự hiện có:**
- Nguyễn Văn An - BIM Manager (150,000 VNĐ/giờ)
- Trần Thị Bình - BIM Coordinator (120,000 VNĐ/giờ)
- Lê Văn Cường - Senior BIM Modeler (100,000 VNĐ/giờ)
- Phạm Thị Dung - BIM Modeler (80,000 VNĐ/giờ)
- ... và 4 người nữa

➕ **Thêm nhân sự mới:**
1. Click "➕ Thêm Nhân sự"
2. Điền thông tin:
   - Họ tên *
   - Email *
   - Chức vụ *
   - Lương theo giờ (VNĐ) *
   - Số điện thoại
   - Trạng thái (Active/Inactive)
3. Click "Thêm"

---

### 5. **Quản lý Nhiệm vụ**

**Click "Quản lý Nhiệm vụ" trong sidebar**

✅ **Danh sách nhiệm vụ hiện có:**
- Tạo BIM Model Kiến trúc (Completed)
- Kiểm tra va chạm MEP (In Progress)
- Xuất bản vẽ thi công (Review)
- ... và 6 nhiệm vụ khác

**Mỗi nhiệm vụ hiển thị:**
- Tiêu đề
- Dự án
- Giao cho nhân viên nào
- Ưu tiên (Low/Medium/High/Urgent)
- Trạng thái (Todo/In Progress/Review/Completed)
- Giờ ước tính / Giờ thực tế

➕ **Thêm nhiệm vụ mới:**
1. Click "➕ Thêm Nhiệm vụ"
2. Điền thông tin:
   - Tiêu đề *
   - Chọn dự án *
   - Chọn hạng mục
   - Chọn bộ môn (Architecture, Structure, MEP, etc.)
   - Giao cho nhân viên
   - Mô tả
   - Số giờ ước tính
   - Ưu tiên
   - Trạng thái
   - Hạn hoàn thành
3. Click "Thêm"

---

### 6. **Timesheet**

**Click "Timesheet" trong sidebar**

⏰ **Danh sách timesheet hiện có:**
- 10 bản ghi timesheet từ các nhân sự
- Mỗi bản ghi có: Nhân sự, Dự án, Nhiệm vụ, Ngày làm, Số giờ, Trạng thái (Pending/Approved)

➕ **Thêm timesheet mới:**
1. Click "➕ Thêm Timesheet"
2. Điền thông tin:
   - Chọn nhân sự *
   - Chọn dự án *
   - Chọn nhiệm vụ *
   - Ngày làm việc *
   - Số giờ làm việc *
   - Mô tả công việc
3. Click "Thêm"

**⚙️ Tính năng tự động:**
- Sau khi thêm timesheet, số giờ thực tế (`actual_hours`) của nhiệm vụ sẽ tự động cập nhật

---

### 7. **Quản lý Thu Chi**

**Click "Quản lý Thu Chi" trong sidebar**

💰 **Danh sách giao dịch hiện có:**
- 10 giao dịch thu chi
- Phân loại: Income (Doanh thu) / Expense (Chi phí)
- Các loại chi phí: Lương nhân viên, Lương chuyên gia, Văn phòng phẩm, Công tác phí, Phần mềm BIM, Thuê ngoài, Doanh thu hợp đồng

➕ **Thêm giao dịch thu chi:**
1. Click "➕ Thêm Thu Chi"
2. Điền thông tin:
   - Chọn dự án *
   - Loại giao dịch (Income/Expense) *
   - **Chọn loại chi phí** (dropdown list)
   - **Hoặc click "➕ Thêm mới"** để tạo loại chi phí tùy biến
   - Số tiền *
   - Ngày giao dịch *
   - Số chứng từ
   - Mô tả
3. Click "Thêm"

---

### 8. **⭐ Tạo Loại Chi Phí Tùy Biến (Tính năng đặc biệt!)**

**Trong form "Thêm Thu Chi":**

1. Click "➕ Thêm mới" bên cạnh dropdown "Loại chi phí"
2. Modal "Thêm Loại Chi Phí" sẽ hiện lên
3. Điền thông tin:
   - **Tên loại chi phí** * (ví dụ: "Thuê máy trạm")
   - **Danh mục** *:
     - Labor (Chi phí nhân sự)
     - Material (Vật liệu)
     - Travel (Đi lại)
     - Overhead (Chi phí chung)
     - Other (Khác)
     - Income (Thu nhập)
   - **Mô tả** (tùy chọn)
4. Click "Thêm"
5. Loại chi phí mới sẽ xuất hiện ngay trong dropdown!

**Lợi ích:**
- ✅ Tạo loại chi phí linh hoạt cho từng dự án
- ✅ Không cần reload trang
- ✅ Phân loại chi phí theo danh mục rõ ràng
- ✅ Tái sử dụng cho các giao dịch sau

---

## 🎨 GIAO DIỆN

### Màu sắc OneCad:
- **Primary:** #0066CC (Xanh dương OneCad)
- **Secondary:** #004C99
- **Accent:** #0080FF

### Components:
- ✅ Sidebar navigation với icons
- ✅ Stats cards với số liệu thời gian thực
- ✅ Charts (Chart.js)
- ✅ Tables với sorting và filtering
- ✅ Modal forms đẹp mắt
- ✅ Status badges màu sắc
- ✅ Responsive design (TailwindCSS)
- ✅ Icons (Font Awesome)

---

## 🔒 ĐĂNG XUẤT

**Để đăng xuất:**
1. Click vào avatar/tên của bạn ở góc phải trên header
2. Click "Đăng xuất"
3. Hệ thống sẽ quay về màn hình đăng nhập

---

## 🗄️ CƠ SỞ DỮ LIỆU

### Cấu trúc database (Cloudflare D1):

**9 bảng chính:**
1. **staff** - Nhân sự
2. **disciplines** - Bộ môn (Architecture, Structure, MEP...)
3. **expense_types** - Loại chi phí (có thể thêm tùy biến)
4. **projects** - Dự án
5. **categories** - Hạng mục của dự án
6. **tasks** - Nhiệm vụ
7. **timesheets** - Bảng công
8. **project_finances** - Thu chi dự án
9. **project_staff** - Phân công nhân sự cho dự án

### Dữ liệu mẫu đã có:
- ✅ 3 dự án
- ✅ 9 hạng mục
- ✅ 8 nhân sự
- ✅ 9 bộ môn
- ✅ 7 loại chi phí (có thể thêm tùy biến)
- ✅ 9 nhiệm vụ
- ✅ 10 timesheet
- ✅ 10 giao dịch thu chi

---

## 🔧 TECH STACK

- **Backend:** Hono (TypeScript) - Lightweight web framework
- **Database:** Cloudflare D1 (SQLite)
- **Frontend:** TailwindCSS + Vanilla JavaScript
- **Charts:** Chart.js
- **Icons:** Font Awesome 6
- **HTTP Client:** Axios
- **Authentication:** LocalStorage-based (demo)
- **Deployment:** Cloudflare Pages

---

## 📦 FILES STRUCTURE

```
webapp/
├── src/
│   └── index.tsx              # Main Hono application
├── public/
│   └── static/
│       ├── app.js             # Frontend logic
│       ├── modals.js          # Modal templates & handlers
│       ├── auth.js            # Authentication system
│       └── style.css          # Custom styles
├── migrations/
│   └── 0001_initial_schema.sql  # Database schema
├── dist/                      # Build output (Cloudflare Pages)
├── ecosystem.config.cjs       # PM2 configuration
├── wrangler.jsonc             # Cloudflare configuration
└── package.json               # Dependencies
```

---

## 🚀 DEPLOYMENT

### Option 1: Development (Sandbox - Đang chạy)
```bash
cd /home/user/webapp
npm run build
pm2 start ecosystem.config.cjs
```
**URL:** https://3000-il1ec2okaahgchy9k3855-cbeee0f9.sandbox.novita.ai

### Option 2: Production (Cloudflare Pages)
Xem hướng dẫn chi tiết trong:
- `QUICK_DEPLOY_VIDEO_GUIDE.md`
- `DEPLOY_V2_GUIDE.md`

**Lưu ý về D1 Database:**
- Xem hướng dẫn sửa lỗi: `QUICK_FIX_D1.md` hoặc `FINAL_FIX_D1.md`
- Dùng 6 files SQL tối ưu: `d1-1-tables-oneline.sql` → `d1-6-seed4-oneline.sql`

---

## ✅ TÍNH NĂNG ĐÃ HOÀN THÀNH

### Phase 1:
- ✅ Database schema design
- ✅ API endpoints (20+)
- ✅ Dashboard with charts
- ✅ CRUD cho tất cả modules
- ✅ Seed data đầy đủ

### Phase 2a:
- ✅ Modal forms cho tất cả modules
- ✅ **Tạo loại chi phí tùy biến**
- ✅ Form validation
- ✅ Success/Error alerts
- ✅ Auto-refresh data after submit

### Phase 2b (MỚI):
- ✅ **Login system với 4 test accounts**
- ✅ **Authentication với localStorage**
- ✅ **User info display trong header**
- ✅ **Logout functionality**
- ✅ **Session management**

---

## 📝 TRO UBLES SHOOTING

### Vấn đề: Không thấy modal forms
**Giải pháp:** Check browser console (F12), đảm bảo không có lỗi JavaScript

### Vấn đề: Lỗi 404 khi load
**Giải pháp:** Đây là lỗi favicon (không ảnh hưởng chức năng)

### Vấn đề: Sau khi thêm data không thấy cập nhật
**Giải pháp:** Reload trang hoặc click lại vào menu sidebar

### Vấn đề: Không đăng nhập được
**Giải pháp:** Kiểm tra username/password chính xác (xem bảng tài khoản test ở đầu tài liệu)

---

## 🎓 NEXT STEPS

### Phase 3 (Đề xuất):
1. ✅ ~~Add authentication~~ (Đã hoàn thành)
2. Chi tiết dự án với tabs (Categories, Tasks, Staff, Finances)
3. Báo cáo tuần/tháng tự động
4. Export Excel
5. File đính kèm (Cloudflare R2)
6. Notifications cho deadline
7. Role-based permissions
8. Email integration
9. Mobile app

---

## 📞 HỖ TRỢ

- **GitHub:** https://github.com/MrNvNguyen/Web-App
- **Development URL:** https://3000-il1ec2okaahgchy9k3855-cbeee0f9.sandbox.novita.ai
- **Documentation:** README.md, DEPLOYMENT.md, PHASE2A_COMPLETE.md

---

## 🎉 KẾT LUẬN

**Hệ thống BIM Management đã hoàn thiện với:**
- ✅ 6 modules chính
- ✅ 20+ API endpoints
- ✅ Hệ thống đăng nhập
- ✅ 4 test accounts
- ✅ Modal forms đầy đủ
- ✅ Tạo loại chi phí tùy biến
- ✅ Dashboard với charts
- ✅ Database đầy đủ dữ liệu mẫu

**BẠN CÓ THỂ:**
1. ✅ Đăng nhập và test ngay trên development URL
2. ✅ Thêm/sửa/xóa dữ liệu trên tất cả các modules
3. ✅ Tạo loại chi phí tùy biến
4. ✅ Xem dashboard với biểu đồ
5. ✅ Deploy lên Cloudflare Pages production

**CHÚC BẠN SỬ DỤNG THÀNH CÔNG! 🚀**

---

**Developed by:** GenSpark AI Assistant  
**Date:** February 11, 2026  
**Version:** V2.1 - Complete with Authentication  
**Project:** OneCad BIM Management System
