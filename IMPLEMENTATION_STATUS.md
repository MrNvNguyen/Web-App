# 🚧 HIERARCHICAL SYSTEM - IMPLEMENTATION STATUS

## ✅ COMPLETED (Phase 1)

### Database Schema
- ✅ Added `role`, `manager_id`, `created_by` to staff table (Migration 0003)
- ✅ Created `staff_managers` junction table for multiple managers (Migration 0004)
- ✅ Migrated existing data to new schema
- ✅ Created indexes for performance

### Documentation
- ✅ HIERARCHICAL_SYSTEM_SPEC.md - Complete system specification
- ✅ Database migration files with comments

---

## 🔄 IN PROGRESS - FULL IMPLEMENTATION PLAN

### Phase 2: Authentication System (Database-driven)

**Files to Create/Modify**:
1. `src/index.tsx` - Add login API endpoint
2. `public/static/auth.js` - Rewrite to use database auth

**Tasks**:
- [ ] Create POST /api/auth/login endpoint
  - Query staff table with email/username
  - Validate password (need to add password column)
  - Return user with role from database
- [ ] Create POST /api/auth/register endpoint (Admin only)
- [ ] Update getCurrentUser() to fetch from session/JWT
- [ ] Remove hardcoded TEST_ACCOUNTS
- [ ] Add password hashing (bcrypt or similar)

**Challenge**: Cloudflare Workers doesn't support bcrypt  
**Solution**: Use Web Crypto API for password hashing

---

### Phase 3: API Updates with Hierarchy Filtering

**Files to Modify**:
1. `src/index.tsx` - All GET endpoints

**APIs to Update**:

#### GET /api/staff
```typescript
// Add filtering by hierarchy
const currentUser = getCurrentUserFromRequest(c);
if (currentUser.role === 'Admin') {
  // Return all staff
} else if (currentUser.role === 'BIM Manager') {
  // Return only coordinators/modelers under this manager
  const staffIds = await getTeamMembers(currentUser.id);
  query += ` WHERE id IN (${staffIds.join(',')})`;
} else if (currentUser.role === 'BIM Coordinator') {
  // Return only modelers under this coordinator
  // ...
}
```

#### GET /api/projects
```typescript
// Filter by PM or assignment
if (currentUser.role === 'Admin') {
  // All projects
} else if (currentUser.role === 'BIM Manager') {
  // Only projects where I'm PM
  query += ` WHERE project_manager_id = ?`;
} else {
  // Only projects I'm assigned to
  query += ` WHERE id IN (SELECT project_id FROM project_staff WHERE staff_id = ?)`;
}
```

#### GET /api/tasks
```typescript
// Filter by assignment
if (currentUser.role === 'Admin' || currentUser.role === 'BIM Manager') {
  // Tasks in my projects
} else if (currentUser.role === 'BIM Coordinator') {
  // Tasks in my projects or assigned to me
} else {
  // Only tasks assigned to me
  query += ` WHERE assigned_to = ?`;
}
```

---

### Phase 4: User Management UI (Admin Only)

**New Files to Create**:
1. `public/static/user-management.js` - User CRUD operations
2. Add "Quản lý Users" menu item (Admin only)

**Features**:
- [ ] List all users in hierarchy tree view
- [ ] Create new user modal
  - Select role dropdown
  - Select managers (multiple select for Coordinators)
  - Generate default password
  - Send credentials via alert/email
- [ ] Edit user modal
  - Change role
  - Change managers
  - Deactivate/Activate
- [ ] Delete user (soft delete - set status='inactive')
- [ ] View team structure (org chart style)

**UI Layout**:
```
┌─────────────────────────────────────┐
│ Quản lý Users                       │
├─────────────────────────────────────┤
│ [+ Thêm User]          [Search...]  │
├─────────────────────────────────────┤
│ 📊 Hierarchy View  📋 List View     │
├─────────────────────────────────────┤
│ 👤 Admin: Nguyễn Văn An             │
│   ├─ 👨‍💼 Manager: Trần Thị Bình       │
│   │   ├─ 👷 Coordinator: Person A   │
│   │   │   └─ 🔧 Modeler: Person B   │
│   │   └─ 👷 Coordinator: Person C   │
│   └─ 👨‍💼 Manager: New Manager        │
└─────────────────────────────────────┘
```

---

### Phase 5: Team Management UI (Manager & Coordinator)

**New Sections**:

#### For BIM Manager:
**Menu**: "Đội ngũ của tôi"

Features:
- [ ] List my coordinators
- [ ] Create new coordinator
- [ ] Assign coordinator to projects
- [ ] View coordinator performance
- [ ] View all modelers under my coordinators

#### For BIM Coordinator:
**Menu**: "Modelers của tôi"

Features:
- [ ] List my modelers
- [ ] Create new modeler
- [ ] Assign modelers to tasks
- [ ] View modeler performance
- [ ] Approve timesheets

---

### Phase 6: Permission Matrix Implementation

**File**: `public/static/auth.js`

**Update hasPermission() function**:
```javascript
function hasPermission(action, resourceOwnerId = null) {
  const user = getCurrentUser();
  if (!user) return false;
  
  const permissions = {
    'Admin': {
      'create_user': true,
      'create_project': true,
      'view_finances': true,
      'view_all_data': true,
      // ... all permissions
    },
    'BIM Manager': {
      'create_coordinator': true,
      'create_task': (taskProjectId) => {
        // Check if I'm PM of this project
        return isMyProject(taskProjectId);
      },
      'view_project': (projectId) => {
        return isMyProject(projectId);
      },
      'view_finances': false,
      // ...
    },
    // ... other roles
  };
  
  const perm = permissions[user.role][action];
  if (typeof perm === 'function') {
    return perm(resourceOwnerId);
  }
  return perm;
}
```

---

### Phase 7: UI Updates with Hierarchy

**Files to Update**:
1. `public/static/app.js` - Add hierarchy filtering
2. `src/index.tsx` - Update menu structure

**Changes**:

#### Dashboard
- Admin: System-wide stats
- Manager: My projects stats
- Coordinator: My tasks stats
- Modeler: My tasks only

#### Projects List
- Admin: All projects
- Manager: My projects (where I'm PM)
- Coordinator: Projects I'm assigned to
- Modeler: Projects I have tasks in

#### Staff List
- Admin: All staff
- Manager: My coordinators + their modelers
- Coordinator: My modelers
- Modeler: Cannot access (hidden)

#### Tasks List
- Admin: All tasks
- Manager: Tasks in my projects
- Coordinator: Tasks in my projects or assigned to me
- Modeler: Only tasks assigned to me

---

## 🔧 TECHNICAL CHALLENGES & SOLUTIONS

### Challenge 1: Password Storage
**Problem**: Need to store passwords securely  
**Solution**: 
```javascript
// Use Web Crypto API (available in Cloudflare Workers)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}
```

### Challenge 2: Session Management
**Problem**: No server-side sessions in Workers  
**Solution**: Use JWT tokens or signed cookies
```javascript
// Store user info in signed JWT
const token = await createJWT({
  id: user.id,
  role: user.role,
  exp: Date.now() + 24*60*60*1000 // 24h
});
```

### Challenge 3: Multiple Managers Query
**Problem**: Complex SQL for many-to-many  
**Solution**:
```sql
-- Get all managers of a staff
SELECT m.* FROM staff m
JOIN staff_managers sm ON sm.manager_id = m.id
WHERE sm.staff_id = ? AND sm.is_active = 1

-- Get all staff under a manager
SELECT s.* FROM staff s
JOIN staff_managers sm ON sm.staff_id = s.id  
WHERE sm.manager_id = ? AND sm.is_active = 1
```

---

## 📝 MIGRATION PATH

### For Existing Users:
1. Admin needs to set passwords for all existing staff
2. Staff login first time with default password
3. Force password change on first login
4. Update authentication to use database

### For Existing Data:
1. All existing staff get role='BIM Modeler' by default
2. Admin manually assigns correct roles
3. Admin assigns managers to coordinators
4. Coordinators assign managers to modelers (if multiple)

---

## 🧪 TESTING CHECKLIST

### Authentication
- [ ] Admin can login with database credentials
- [ ] Manager can login
- [ ] Coordinator can login
- [ ] Modeler can login
- [ ] Password change works
- [ ] Logout clears session

### Permissions
- [ ] Admin sees all menus
- [ ] Manager doesn't see finances
- [ ] Coordinator sees limited menus
- [ ] Modeler sees only tasks

### Data Filtering
- [ ] Admin sees all projects
- [ ] Manager sees only own projects
- [ ] Coordinator sees assigned projects
- [ ] Modeler sees only own tasks

### User Management (Admin)
- [ ] Can create all role types
- [ ] Can assign multiple managers to coordinator
- [ ] Can edit user roles
- [ ] Can deactivate users

### Team Management (Manager)
- [ ] Can create coordinators
- [ ] Can view team structure
- [ ] Cannot see other managers' teams

### Team Management (Coordinator)
- [ ] Can create modelers
- [ ] Can assign tasks to modelers
- [ ] Cannot see other coordinators' modelers

---

## ⏱️ ESTIMATED TIME

| Phase | Tasks | Time |
|-------|-------|------|
| Phase 2: Auth System | Database auth, password hashing, JWT | 2 hours |
| Phase 3: API Filtering | Update all GET endpoints | 1.5 hours |
| Phase 4: User Management UI | Admin UI for CRUD | 1.5 hours |
| Phase 5: Team Management UI | Manager/Coordinator UI | 1 hour |
| Phase 6: Permissions | Update hasPermission | 1 hour |
| Phase 7: UI Updates | Filter all views | 1 hour |
| Testing | End-to-end testing | 1 hour |
| **TOTAL** | | **~9 hours** |

---

## 🚀 CURRENT STATUS

```
✅ Phase 1: Database Schema (100%)
⏳ Phase 2: Authentication (0%)
⏳ Phase 3: API Filtering (0%)
⏳ Phase 4: User Management (0%)
⏳ Phase 5: Team Management (0%)
⏳ Phase 6: Permissions (0%)
⏳ Phase 7: UI Updates (0%)

Overall Progress: 14% (1/7 phases)
```

---

## 💡 RECOMMENDATION

Given the complexity and time required, I recommend:

**Option A**: Continue full implementation now (~9 hours)
- Complete all phases in one session
- Thorough testing
- Production-ready hierarchical system

**Option B**: Implement in stages with testing
- Phase 2+3 (Auth + API) first
- Test and verify
- Then Phase 4-7 (UI)

**Option C**: Simplified MVP
- Keep current auth
- Add basic hierarchy filtering to APIs
- Simple user management UI
- Can enhance later

---

**Which option would you prefer? I'm ready to continue with Option A if you want the full implementation now.** 🚀
