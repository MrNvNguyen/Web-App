# 🎯 HIERARCHICAL SYSTEM - CURRENT STATUS & NEXT STEPS

## ✅ COMPLETED SO FAR (Phase 1 + 2 Partial)

### Database Schema ✅ DONE
- ✅ staff.role (Admin/Manager/Coordinator/Modeler)
- ✅ staff.manager_id (primary manager reference)
- ✅ staff.created_by (creator tracking)
- ✅ staff.username (generated from email)
- ✅ staff.password_hash (default: 'password123' hashed)
- ✅ staff.last_login (login tracking)
- ✅ staff_managers table (many-to-many for multiple managers)
- ✅ All indexes created

### Test Accounts ✅ READY
```
Username: an.nguyen | Password: password123 | Role: Admin
Username: binh.tran | Password: password123 | Role: BIM Manager
Username: cuong.le | Password: password123 | Role: BIM Modeler
Username: dung.pham | Password: password123 | Role: BIM Modeler
Username: duc.hoang | Password: password123 | Role: BIM Modeler
```

---

## ⏸️ REMAINING WORK

Để hoàn thành hệ thống phân cấp, cần implement các phần sau. Đây là công việc lớn (~8-9 hours) nên tôi khuyến nghị làm từng phase có testing.

### Phase 2B: Login API (1-2 hours)

**File: `src/index.tsx`**

Thêm endpoints:

```typescript
// POST /api/auth/login
app.post('/api/auth/login', async (c) => {
  const { username, password } = await c.req.json();
  
  // Simple hash for demo (in production use proper crypto)
  const passwordHash = simpleHash(password);
  
  const user = await c.env.DB.prepare(`
    SELECT id, name, email, username, role, manager_id
    FROM staff
    WHERE username = ? AND password_hash = ? AND status = 'active'
  `).bind(username, passwordHash).first();
  
  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }
  
  // Update last_login
  await c.env.DB.prepare(`
    UPDATE staff SET last_login = CURRENT_TIMESTAMP WHERE id = ?
  `).bind(user.id).run();
  
  // In production: Create JWT token
  // For now: Return user info
  return c.json({ user });
});

// POST /api/auth/change-password
app.post('/api/auth/change-password', async (c) => {
  const { username, oldPassword, newPassword } = await c.req.json();
  
  // Verify old password
  const user = await c.env.DB.prepare(`
    SELECT id FROM staff WHERE username = ? AND password_hash = ?
  `).bind(username, simpleHash(oldPassword)).first();
  
  if (!user) {
    return c.json({ error: 'Invalid old password' }, 401);
  }
  
  // Update password
  await c.env.DB.prepare(`
    UPDATE staff SET password_hash = ? WHERE id = ?
  `).bind(simpleHash(newPassword), user.id).run();
  
  return c.json({ success: true });
});

// Helper function for simple hashing (demo only)
function simpleHash(text: string): string {
  // In production: Use Web Crypto API
  // For demo: Simple MD5-like hash
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}
```

**File: `public/static/auth.js`**

Replace with database authentication:

```javascript
// Remove TEST_ACCOUNTS

async function login(username, password) {
  try {
    const response = await axios.post('/api/auth/login', {
      username,
      password
    });
    
    if (response.data.user) {
      // Store user info (without password)
      localStorage.setItem('bim_user', JSON.stringify(response.data.user));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}

function getCurrentUser() {
  const userJson = localStorage.getItem('bim_user');
  if (!userJson) return null;
  
  const user = JSON.parse(userJson);
  // User object now has: id, name, email, username, role, manager_id
  return user;
}

// Update showLoginScreen to show username field instead
```

---

### Phase 3: API Filtering (1.5 hours)

**File: `src/index.tsx`**

Update all GET endpoints with hierarchy filtering:

#### GET /api/staff
```typescript
app.get('/api/staff', async (c) => {
  // Get current user from session/header
  const currentUser = await getCurrentUserFromRequest(c);
  
  let query = 'SELECT * FROM staff WHERE status = "active"';
  let params = [];
  
  if (currentUser.role === 'Admin') {
    // Admin sees all
  } else if (currentUser.role === 'BIM Manager') {
    // Manager sees own team
    query += ` AND id IN (
      SELECT staff_id FROM staff_managers 
      WHERE manager_id = ? AND is_active = 1
    )`;
    params.push(currentUser.id);
  } else if (currentUser.role === 'BIM Coordinator') {
    // Coordinator sees own modelers
    query += ` AND id IN (
      SELECT staff_id FROM staff_managers 
      WHERE manager_id = ? AND is_active = 1
    )`;
    params.push(currentUser.id);
  } else {
    // Modeler sees only self
    query += ` AND id = ?`;
    params.push(currentUser.id);
  }
  
  const stmt = c.env.DB.prepare(query);
  const result = await stmt.bind(...params).all();
  return c.json(result.results);
});
```

Similar filtering for:
- GET /api/projects
- GET /api/tasks
- GET /api/timesheets
- GET /api/finances

---

### Phase 4: User Management UI (1.5 hours)

**New File: `public/static/user-management.js`**

```javascript
// Admin UI for managing users

async function loadUsers() {
  const { data } = await axios.get('/api/staff');
  
  // Build hierarchy tree
  const tree = buildHierarchyTree(data);
  
  // Render tree view
  renderUserTree(tree);
}

function buildHierarchyTree(users) {
  const admin = users.find(u => u.role === 'Admin');
  const managers = users.filter(u => u.role === 'BIM Manager');
  // ... build tree structure
  return tree;
}

async function showCreateUserModal() {
  const modal = `
    <div class="modal">
      <h3>Tạo User Mới</h3>
      <form onsubmit="handleCreateUser(event)">
        <input name="name" placeholder="Họ tên" required>
        <input name="email" placeholder="Email" required>
        <select name="role" required>
          <option value="BIM Manager">BIM Manager</option>
          <option value="BIM Coordinator">BIM Coordinator</option>
          <option value="BIM Modeler">BIM Modeler</option>
        </select>
        <div id="managers-select">
          <!-- Multi-select for managers if role is Coordinator -->
        </div>
        <button type="submit">Tạo</button>
      </form>
    </div>
  `;
  openModal('createUserModal');
}

async function handleCreateUser(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  // Generate username from email
  data.username = data.email.split('@')[0].toLowerCase();
  
  // Default password
  data.password = 'password123';
  
  // POST to API
  await axios.post('/api/staff', data);
  
  // Show credentials to admin
  alert(`User created!\nUsername: ${data.username}\nPassword: password123\n\nPlease inform the user to change password on first login.`);
  
  loadUsers();
}
```

**Update: `src/index.tsx`**

Add menu item (Admin only):
```html
<a href="#" onclick="showView('users')" class="menu-users ...">
  <i class="fas fa-users"></i>
  <span>Quản lý Users</span>
</a>
```

---

### Phase 5: Team Management UI (1 hour)

Similar to Phase 4 but for Manager and Coordinator roles:

**Manager Panel**: "Đội ngũ của tôi"
- List coordinators under me
- Create coordinator button
- View modelers under my coordinators

**Coordinator Panel**: "Modelers của tôi"
- List my modelers
- Create modeler button
- Assign tasks

---

### Phase 6: Permission Matrix (1 hour)

**File: `public/static/auth.js`**

```javascript
function hasPermission(action, resourceId = null) {
  const user = getCurrentUser();
  if (!user) return false;
  
  // Permission definitions
  const permissions = {
    'Admin': {
      'create_user': () => true,
      'create_project': () => true,
      'view_finances': () => true,
      'manage_finances': () => true,
      // ... all permissions return true
    },
    'BIM Manager': {
      'create_coordinator': () => true,
      'create_task': async (projectId) => {
        // Check if I'm PM of this project
        const project = await getProject(projectId);
        return project.project_manager_id === user.id;
      },
      'view_project': async (projectId) => {
        const project = await getProject(projectId);
        return project.project_manager_id === user.id;
      },
      'view_finances': () => false,
      // ...
    },
    'BIM Coordinator': {
      'create_modeler': () => true,
      'create_task': async (projectId) => {
        // Check if I'm assigned to this project
        return await isAssignedToProject(user.id, projectId);
      },
      'view_finances': () => false,
      // ...
    },
    'BIM Modeler': {
      'view_task': async (taskId) => {
        const task = await getTask(taskId);
        return task.assigned_to === user.id;
      },
      'update_task_status': async (taskId) => {
        const task = await getTask(taskId);
        return task.assigned_to === user.id;
      },
      // ... very limited permissions
    }
  };
  
  const perm = permissions[user.role][action];
  if (!perm) return false;
  
  if (typeof perm === 'function') {
    return await perm(resourceId);
  }
  return perm;
}
```

---

### Phase 7: UI Updates (1 hour)

Update all existing views to filter data:

**Dashboard**:
```javascript
async function loadDashboard() {
  const user = getCurrentUser();
  
  if (user.role === 'Admin') {
    // Load system-wide stats
  } else if (user.role === 'BIM Manager') {
    // Load only my projects stats
  } else if (user.role === 'BIM Coordinator') {
    // Load my tasks stats
  } else {
    // Modeler - show only own tasks
  }
}
```

**Projects List**:
- Already filtered by API
- Just call GET /api/projects (API handles filtering)

**Tasks List**:
- Already filtered by API
- Call GET /api/tasks (API handles filtering)

**Staff List**:
- Already filtered by API
- Hide for Modelers completely

---

## 🧪 TESTING CHECKLIST

After implementing all phases:

### Authentication
- [ ] Login with an.nguyen / password123 (Admin)
- [ ] Login with binh.tran / password123 (Manager)
- [ ] Login with cuong.le / password123 (Modeler)
- [ ] Change password works
- [ ] Logout clears session
- [ ] Invalid credentials shows error

### Permissions
- [ ] Admin sees "Quản lý Users" menu
- [ ] Manager doesn't see "Quản lý Users"
- [ ] Manager sees "Đội ngũ của tôi"
- [ ] Coordinator sees "Modelers của tôi"
- [ ] Modeler only sees Tasks menu

### Data Filtering
- [ ] Admin GET /api/staff returns all
- [ ] Manager GET /api/staff returns only team
- [ ] Admin GET /api/projects returns all
- [ ] Manager GET /api/projects returns only own
- [ ] Modeler GET /api/tasks returns only assigned

### User Management (Admin)
- [ ] Can create BIM Manager
- [ ] Can create BIM Coordinator with multiple managers
- [ ] Can create BIM Modeler
- [ ] Can edit user roles
- [ ] Can deactivate users

### Team Management (Manager)
- [ ] Can create coordinator
- [ ] Can view team structure
- [ ] Cannot see other managers' teams

### Team Management (Coordinator)
- [ ] Can create modelers
- [ ] Can assign tasks
- [ ] Cannot see other coordinators' modelers

---

## 📦 FILES TO CREATE/MODIFY

### New Files
- [ ] public/static/user-management.js
- [ ] public/static/team-management.js
- [ ] Helper functions in auth.js

### Modified Files
- [ ] src/index.tsx (add login API + filter all GET endpoints)
- [ ] public/static/auth.js (rewrite with database auth)
- [ ] public/static/app.js (add view filtering)
- [ ] All modal/form files (add role-based visibility)

---

## ⚠️ IMPORTANT NOTES

### Default Passwords
All users have password: `password123`
- Admin should change on first login
- Users should be notified to change password

### Multiple Managers
- Use staff_managers junction table
- When creating coordinator, allow selecting multiple managers
- UI should show multi-select dropdown

### Session Management
Current implementation uses localStorage (client-side)
- For production: Implement JWT tokens
- Store token in httpOnly cookie
- Validate token on each API call

### Password Hashing
Current implementation uses simple hash
- For production: Use Web Crypto API
- Implement proper salt + hash
- Example:
```javascript
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

---

## 🚀 RECOMMENDED APPROACH

Given the complexity, I recommend:

### Option A: Implement Phase by Phase with Testing
1. Complete Phase 2B (Login API) - Test
2. Complete Phase 3 (API Filtering) - Test
3. Complete Phase 4-5 (UI) - Test
4. Complete Phase 6-7 (Permissions + Filters) - Test
5. Full system test

### Option B: Minimum Viable Product
1. Implement Login API only
2. Keep current frontend auth
3. Add basic API filtering
4. Simple user management (no hierarchy tree)
5. Can enhance later

### Option C: Use Current System with Minor Enhancements
1. Keep localStorage auth
2. Add role to TEST_ACCOUNTS based on database
3. Add basic hierarchy filtering
4. Enhance gradually over time

---

## 💡 MY RECOMMENDATION

Given we're already 2+ hours into this and have ~82k tokens left:

**Implement a HYBRID approach**:
1. ✅ Database schema DONE
2. ✅ Test accounts ready DONE
3. 🔄 Keep current client-side auth BUT load role from database
4. 🔄 Implement API filtering (Phase 3)
5. 🔄 Basic user management UI (simplified Phase 4)
6. 📝 Document remaining work for future

This gives you:
- Working database hierarchy
- API data filtering by role
- Basic user CRUD
- Foundation for full implementation

**Estimated time**: 2-3 more hours  
**Result**: 70% functional hierarchical system

---

**What do you prefer? Continue with hybrid approach or need something else?** 🤔
