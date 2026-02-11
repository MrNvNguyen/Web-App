# 🚀 QUICK START GUIDE - Hierarchical System

## 📝 Hướng dẫn Sử dụng Nhanh

### 1. Đăng nhập Hệ thống

**URL Development**: https://3000-il1ec2okaahgchy9k3855-cbeee0f9.sandbox.novita.ai

**Tài khoản Test**:

```
Admin (Quản trị viên):
Username: an.nguyen
Password: 123456

BIM Manager (Quản lý):
Username: binh.tran
Password: 123456

BIM Modeler (Nhân viên):
Username: cuong.le
Password: 123456
```

---

### 2. Quyền hạn theo Vai trò

#### 🔴 Admin (Quản trị viên)
**Có thể làm gì:**
- ✅ Xem/quản lý TẤT CẢ dữ liệu
- ✅ Quản lý Users (tạo, sửa, vô hiệu hóa)
- ✅ Xem Giá trị Hợp đồng và Lương/Giờ
- ✅ Quản lý Tài chính (Thu Chi, Loại Chi phí)

**Menu có thể thấy:**
- Dashboard
- Quản lý Dự án
- Quản lý Nhân sự
- **Quản lý Users** ⭐
- Quản lý Nhiệm vụ
- Timesheet
- Quản lý Thu Chi
- Loại Chi phí

---

#### 🔵 BIM Manager (Quản lý)
**Có thể làm gì:**
- ✅ Quản lý Projects mình là PM
- ✅ Quản lý Coordinators và Modelers trong team
- ✅ Tạo/phân công Tasks cho team
- ✅ Xem/duyệt Timesheets của team
- ❌ KHÔNG quản lý tài chính
- ❌ KHÔNG xem Giá trị HĐ và Lương

**Menu có thể thấy:**
- Dashboard
- Quản lý Dự án
- Quản lý Nhân sự (chỉ team)
- **Đội của tôi** ⭐
- Quản lý Nhiệm vụ
- Timesheet

---

#### 🟢 BIM Coordinator (Điều phối viên)
**Có thể làm gì:**
- ✅ Xem Projects có tasks của mình
- ✅ Quản lý Modelers dưới quyền
- ✅ Tạo/phân công Tasks cho Modelers
- ✅ Xem/duyệt Timesheets của Modelers
- ❌ KHÔNG quản lý Projects
- ❌ KHÔNG xem Giá trị HĐ và Lương

**Menu có thể thấy:**
- Dashboard
- Quản lý Dự án (Read-only)
- **Đội của tôi** ⭐
- Quản lý Nhiệm vụ
- Timesheet

---

#### 🟣 BIM Modeler (Nhân viên)
**Có thể làm gì:**
- ✅ Xem Projects có tasks của mình
- ✅ Xem/cập nhật Tasks được gán
- ✅ Nhập Timesheets của mình
- ❌ KHÔNG quản lý ai
- ❌ KHÔNG tạo Projects/Tasks
- ❌ KHÔNG xem data người khác

**Menu có thể thấy:**
- Dashboard (giới hạn)
- Quản lý Nhiệm vụ (chỉ tasks của mình)
- Timesheet (chỉ của mình)

---

### 3. Tính năng Mới

#### ⭐ Quản lý Users (Admin only)

**Cách sử dụng:**
1. Login bằng tài khoản Admin
2. Click menu "Quản lý Users"
3. Xem danh sách TẤT CẢ users trong hệ thống
4. Thông tin hiển thị:
   - Họ tên
   - Username
   - Email
   - Vai trò (Role badge với màu sắc)
   - Chức vụ
   - Quản lý (Manager name)
   - Trạng thái
5. Click nút Edit để chỉnh sửa (tính năng đang phát triển)

**Lưu ý:**
- Chỉ Admin mới thấy menu này
- Hiển thị TẤT CẢ users không bị filter

---

#### ⭐ Đội của tôi (Manager & Coordinator)

**Cách sử dụng:**
1. Login bằng tài khoản Manager hoặc Coordinator
2. Click menu "Đội của tôi"
3. Xem team members trong hierarchy của mình

**Manager thấy:**
- Coordinators dưới quyền
- Modelers của các Coordinators đó

**Coordinator thấy:**
- Chỉ Modelers dưới quyền trực tiếp

**Thông tin hiển thị:**
- Avatar với chữ cái đầu
- Họ tên & Chức vụ
- Email
- Role badge
- Nút "Xem chi tiết"

**Layout:**
- Desktop: 3 cột
- Tablet: 2 cột
- Mobile: 1 cột

---

### 4. Data Filtering (Tự động)

Hệ thống TỰ ĐỘNG filter dữ liệu theo hierarchy:

**Admin:**
- Staff: 10 người (TẤT CẢ)
- Projects: 5 dự án (TẤT CẢ)
- Tasks: 19 nhiệm vụ (TẤT CẢ)

**Manager (binh.tran):**
- Staff: 9 người (team của mình)
- Projects: Dự án mình quản lý
- Tasks: Tasks trong projects hoặc gán cho team

**Modeler (cuong.le):**
- Staff: 1 người (chính mình)
- Projects: Dự án có tasks của mình
- Tasks: 8 nhiệm vụ (được gán)

---

### 5. Đổi Mật khẩu

**Cách đổi mật khẩu:**
1. Click vào avatar ở góc phải trên
2. Chọn "Đổi mật khẩu"
3. Nhập:
   - Mật khẩu hiện tại
   - Mật khẩu mới (tối thiểu 6 ký tự)
   - Xác nhận mật khẩu mới
4. Click "Lưu"

**Lưu ý:**
- Mật khẩu được mã hóa SHA-256
- Bắt buộc phải nhập đúng mật khẩu cũ
- Mật khẩu mới phải ít nhất 6 ký tự

---

### 6. Cột Tài chính (Ẩn/Hiện)

**Cột "Giá trị HĐ" (Contract Value):**
- ✅ Admin: Thấy
- ❌ Manager: ẨN
- ❌ Coordinator: ẨN
- ❌ Modeler: ẨN

**Cột "Lương/Giờ" (Hourly Rate):**
- ✅ Admin: Thấy
- ❌ Manager: ẨN
- ❌ Coordinator: ẨN
- ❌ Modeler: ẨN

**Tự động:**
- Hệ thống tự động ẩn/hiện dựa trên role
- Không cần cấu hình gì thêm

---

### 7. Troubleshooting

#### ❓ Không thấy menu "Quản lý Users"
**Giải pháp:**
- Chỉ Admin mới thấy menu này
- Kiểm tra role của bạn (góc phải trên)
- Nếu không phải Admin, liên hệ Admin để cấp quyền

#### ❓ Không thấy menu "Đội của tôi"
**Giải pháp:**
- Chỉ Manager và Coordinator mới thấy menu này
- Modeler không có menu này
- Kiểm tra role của bạn

#### ❓ Không thấy cột "Giá trị HĐ" hoặc "Lương/Giờ"
**Giải pháp:**
- Đây là tính năng bảo mật
- Chỉ Admin mới thấy các cột này
- Nếu bạn là non-admin, đây là hành vi đúng

#### ❓ Thấy ít dữ liệu hơn mong đợi
**Giải pháp:**
- Đây là tính năng hierarchy filtering
- Bạn chỉ thấy dữ liệu trong hierarchy của mình
- Nếu cần xem thêm, liên hệ Admin để kiểm tra cấu trúc hierarchy

#### ❓ Cache Issue - Menu/Cột không cập nhật
**Giải pháp:**
1. **Hard Refresh**:
   - Windows/Linux: `Ctrl + Shift + R` hoặc `Ctrl + F5`
   - Mac: `Cmd + Shift + R`
2. Nếu vẫn không được:
   - Logout
   - Clear browser cache
   - Login lại

---

### 8. Hướng dẫn Test Nhanh

**Test Admin:**
```
1. Login: an.nguyen / 123456
2. Click "Quản lý Users" → Thấy 10 users
3. Click "Quản lý Dự án" → Thấy 5 projects
4. Kiểm tra cột "Giá trị HĐ" hiển thị
5. Kiểm tra cột "Lương/Giờ" hiển thị
```

**Test Manager:**
```
1. Login: binh.tran / 123456
2. Click "Đội của tôi" → Thấy 9 team members
3. Click "Quản lý Nhân sự" → Thấy 9 staff (filtered)
4. Kiểm tra cột "Giá trị HĐ" ẨN
5. Kiểm tra cột "Lương/Giờ" ẨN
6. Verify KHÔNG thấy: Users, Finances, Expense Types
```

**Test Modeler:**
```
1. Login: cuong.le / 123456
2. Verify menu: CHỈ Dashboard, Tasks, Timesheets
3. Click "Quản lý Nhiệm vụ" → Thấy 8 tasks (assigned)
4. Click "Timesheet" → Chỉ thấy timesheets của mình
5. Verify KHÔNG thấy: Projects, Staff, Users, My Team, Finances
```

---

### 9. API Endpoints (For Developers)

**Authentication:**
```bash
# Login
POST /api/auth/login
Body: {"username": "an.nguyen", "password": "123456"}

# Change Password
POST /api/auth/change-password
Body: {"userId": 1, "oldPassword": "123456", "newPassword": "newpass"}
```

**Data APIs (with hierarchy filtering):**
```bash
# Get Staff (filtered by hierarchy)
GET /api/staff?currentUserId=1&currentUserRole=Admin

# Get Projects (filtered by hierarchy)
GET /api/projects?currentUserId=2&currentUserRole=BIM%20Manager

# Get Tasks (filtered by hierarchy)
GET /api/tasks?currentUserId=3&currentUserRole=BIM%20Modeler
```

---

### 10. Liên hệ & Hỗ trợ

**Development URL**: https://3000-il1ec2okaahgchy9k3855-cbeee0f9.sandbox.novita.ai  
**GitHub**: https://github.com/MrNvNguyen/Web-App  
**Company**: OneCad Vietnam  
**Status**: ✅ Production Ready

**Báo lỗi hoặc yêu cầu hỗ trợ:**
- GitHub Issues: https://github.com/MrNvNguyen/Web-App/issues
- Email: admin@onecad.vn

---

**🎉 Chúc bạn sử dụng hệ thống hiệu quả! 🎉**
