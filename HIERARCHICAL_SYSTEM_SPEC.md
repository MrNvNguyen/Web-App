# 📋 HIERARCHICAL BIM MANAGEMENT SYSTEM SPECIFICATION

## 🏗️ Cấu Trúc Phân Cấp

```
Admin (1)
  └─> BIM Manager (n)
        └─> BIM Coordinator (n)
              └─> BIM Modeler (n)
```

---

## 👥 Chi Tiết Vai Trò

### 1️⃣ ADMIN (Administrator)

**Quyền Hạn**:
- ✅ Tạo/Sửa/Xóa **Users** (tất cả roles)
- ✅ Tạo/Sửa/Xóa **Dự án**
- ✅ Tạo/Sửa/Xóa **Nhiệm vụ**
- ✅ Tạo/Sửa/Xóa **Staff**
- ✅ Quản lý **Tài chính** (Thu/Chi)
- ✅ Quản lý **Loại chi phí**
- ✅ Xem **tất cả dữ liệu** (bao gồm Giá trị HĐ, Lương)
- ✅ Gán **BIM Manager** cho dự án
- ✅ Xem **báo cáo tổng thể**

**Không Thể**:
- ❌ Không có giới hạn

**Dữ Liệu Truy Cập**:
- Tất cả dự án
- Tất cả users
- Tất cả tasks
- Tất cả tài chính

---

### 2️⃣ BIM MANAGER

**Quyền Hạn**:
- ✅ Quản lý **BIM Coordinators** (dưới quyền mình)
  - Tạo/Sửa/Khóa BIM Coordinator accounts
  - Gán Coordinator cho dự án
- ✅ Quản lý **Dự án được giao** (làm Project Manager)
  - Xem/Sửa thông tin dự án
  - Tạo hạng mục, bộ môn
  - Gán Coordinator vào dự án
- ✅ Tạo/Sửa/Xóa **Nhiệm vụ** trong dự án của mình
- ✅ Phê duyệt **Timesheets**
- ✅ Xem **Báo cáo** dự án của mình

**Không Thể**:
- ❌ Không tạo/xóa Dự án (chỉ Admin)
- ❌ Không xem **Giá trị HĐ**
- ❌ Không xem **Lương/Giờ** của nhân viên
- ❌ Không quản lý **Tài chính** (Thu/Chi)
- ❌ Không xem dự án của Manager khác

**Dữ Liệu Truy Cập**:
- Chỉ dự án mà mình là Project Manager
- Chỉ Coordinators mà mình tạo
- Chỉ Modelers thuộc Coordinators của mình
- Tasks trong dự án của mình

**Mối Quan Hệ**:
- Được giao bởi: **Admin**
- Quản lý: **BIM Coordinators**
- Gắn với: **Projects** (làm project_manager_id)

---

### 3️⃣ BIM COORDINATOR

**Quyền Hạn**:
- ✅ Quản lý **BIM Modelers** (dưới quyền mình)
  - Tạo/Sửa/Khóa BIM Modeler accounts
  - Gán Modeler vào task
- ✅ Tạo/Sửa **Tasks** trong dự án được giao
- ✅ Theo dõi **Tiến độ** tasks
- ✅ Phê duyệt **Timesheets** của Modelers
- ✅ Xem **Báo cáo** tasks và performance

**Không Thể**:
- ❌ Không tạo/xóa Dự án
- ❌ Không xem **Giá trị HĐ**
- ❌ Không xem **Lương/Giờ**
- ❌ Không quản lý **Tài chính**
- ❌ Không xem dự án của Coordinator khác
- ❌ Không quản lý Modelers của Coordinator khác

**Dữ Liệu Truy Cập**:
- Chỉ dự án được giao bởi Manager
- Chỉ Modelers mà mình tạo
- Chỉ Tasks được giao cho mình hoặc team mình

**Mối Quan Hệ**:
- Được tạo bởi: **BIM Manager**
- Quản lý: **BIM Modelers**
- Làm việc trên: **Projects** (được Manager gán)

---

### 4️⃣ BIM MODELER

**Quyền Hạn**:
- ✅ Xem **Tasks** được giao cho mình
- ✅ Cập nhật **Trạng thái** task (Todo → In Progress → Review → Completed)
- ✅ Cập nhật **Tiến độ** (0-100%)
- ✅ Thêm **Timesheets** cho tasks của mình
- ✅ Xem **Thông tin dự án** (không có tài chính)
- ✅ Upload **Files** cho tasks

**Không Thể**:
- ❌ Không tạo Tasks
- ❌ Không xem tasks của người khác
- ❌ Không xem **Giá trị HĐ**
- ❌ Không xem **Lương/Giờ**
- ❌ Không xem **Tài chính**
- ❌ Không quản lý Users
- ❌ Không xem Dashboard tổng thể

**Dữ Liệu Truy Cập**:
- Chỉ Tasks được giao cho mình (assigned_to = self)
- Chỉ Timesheets của mình
- Thông tin dự án cơ bản (không có financial)

**Mối Quan Hệ**:
- Được tạo bởi: **BIM Coordinator**
- Làm việc cho: **BIM Coordinator**
- Thực hiện: **Tasks** (được gán qua assigned_to)

---

## 🗄️ Database Schema Changes

### Table: `staff` (Updated)

```sql
ALTER TABLE staff ADD COLUMN manager_id INTEGER;
ALTER TABLE staff ADD COLUMN role TEXT NOT NULL DEFAULT 'BIM Modeler';
ALTER TABLE staff ADD COLUMN created_by INTEGER;

-- manager_id: ID của người quản lý trực tiếp
-- role: 'Admin', 'BIM Manager', 'BIM Coordinator', 'BIM Modeler'
-- created_by: ID của user tạo ra staff này
```

### Quan Hệ:
```
Admin (id=1)
  ├─> BIM Manager (id=2, manager_id=1, created_by=1)
  │     ├─> BIM Coordinator (id=3, manager_id=2, created_by=2)
  │     │     ├─> BIM Modeler (id=4, manager_id=3, created_by=3)
  │     │     └─> BIM Modeler (id=5, manager_id=3, created_by=3)
  │     └─> BIM Coordinator (id=6, manager_id=2, created_by=2)
  └─> BIM Manager (id=7, manager_id=1, created_by=1)
```

---

## 🔐 Permission Matrix (Updated)

| Feature | Admin | BIM Manager | BIM Coordinator | BIM Modeler |
|---------|-------|-------------|-----------------|-------------|
| **Users** |
| Create Users | All roles | Coordinator only | Modeler only | ❌ |
| Edit Users | All | Own team | Own team | ❌ |
| Delete Users | All | Own team | Own team | ❌ |
| View Users | All | Own team | Own team | Self only |
| **Projects** |
| Create Project | ✅ | ❌ | ❌ | ❌ |
| Edit Project | ✅ | Own only | ❌ | ❌ |
| Delete Project | ✅ | ❌ | ❌ | ❌ |
| View Project | All | Own only | Assigned | Assigned |
| Assign PM | ✅ | ❌ | ❌ | ❌ |
| **Tasks** |
| Create Task | ✅ | Own projects | Own projects | ❌ |
| Edit Task | ✅ | Own projects | Own projects | Own only |
| Delete Task | ✅ | Own projects | Own projects | ❌ |
| View Task | All | Own projects | Own projects | Assigned only |
| Update Status | ✅ | ✅ | ✅ | Assigned only |
| **Financials** |
| View Contract Value | ✅ | ❌ | ❌ | ❌ |
| View Salary | ✅ | ❌ | ❌ | ❌ |
| Manage Finances | ✅ | ❌ | ❌ | ❌ |
| **Reports** |
| System Dashboard | ✅ | ❌ | ❌ | ❌ |
| Project Dashboard | ✅ | Own | Own | ❌ |
| Team Performance | ✅ | Own team | Own team | Self |

---

## 📱 UI Changes Required

### 1. Admin Panel - User Management

**New Menu Item**: "Quản lý Users" (Admin only)

Features:
- List all users with hierarchy tree
- Create new users (any role)
- Assign manager when creating user
- Edit user info
- Deactivate/Activate users

### 2. Manager Panel - Team Management

**New Section**: "Đội ngũ của tôi"

Features:
- List coordinators under me
- Create new coordinator
- Assign coordinators to projects
- View team performance

### 3. Coordinator Panel - Modeler Management

**New Section**: "Modelers của tôi"

Features:
- List modelers under me
- Create new modeler
- Assign modelers to tasks
- View modeler performance

### 4. Filtering by Hierarchy

All data views filter by hierarchy:
- Manager sees only own projects
- Coordinator sees only assigned projects
- Modeler sees only assigned tasks

---

## 🔄 API Changes Required

### 1. Authentication

Update JWT/Session to include:
```json
{
  "id": 1,
  "name": "User Name",
  "role": "BIM Manager",
  "manager_id": 1,
  "created_by": 1
}
```

### 2. GET /api/staff

Add query param:
- `?managed_by=<user_id>` - Get staff managed by user
- `?role=<role>` - Filter by role

### 3. GET /api/projects

Add filtering:
- Admin: All projects
- Manager: `WHERE project_manager_id = current_user.id`
- Coordinator: `WHERE id IN (SELECT project_id FROM project_staff WHERE staff_id = current_user.id)`
- Modeler: Same as Coordinator

### 4. GET /api/tasks

Add filtering:
- Admin: All tasks
- Manager: `WHERE project_id IN (own_projects)`
- Coordinator: `WHERE project_id IN (assigned_projects)`
- Modeler: `WHERE assigned_to = current_user.id`

---

## 🎯 Implementation Priority

### Phase 1: Database & Schema
1. Add columns to staff table
2. Create migration
3. Seed data with hierarchy

### Phase 2: Backend APIs
1. Update GET APIs with filtering
2. Add manager validation on create/update
3. Add hierarchy checks

### Phase 3: Frontend
1. Update permissions matrix
2. Add User Management UI (Admin)
3. Add Team Management UI (Manager/Coordinator)
4. Filter all lists by hierarchy

### Phase 4: Testing
1. Test with each role
2. Verify data isolation
3. Test edge cases

---

## ❓ Questions to Clarify

1. **Multiple Managers**: Một Coordinator có thể làm cho nhiều Manager không?
   - Hiện tại spec: NO (1 manager only)
   - Có cần: YES?

2. **Cross-Project**: Một Modeler có thể được gán task từ nhiều Coordinator không?
   - Hiện tại spec: YES (via task assignment)

3. **Manager Switch**: Admin có thể chuyển Coordinator từ Manager A sang Manager B không?
   - Hiện tại spec: YES (via edit user)

4. **Data Migration**: Staff hiện tại sẽ gán manager_id như thế nào?
   - Default all to Admin (manager_id=1)?

---

**Bạn đồng ý với spec này không? Có điều gì cần điều chỉnh không?**
