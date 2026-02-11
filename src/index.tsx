import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for all API routes
app.use('/api/*', cors())

// ==================== API ROUTES ====================

// Dashboard API - Tổng quan thống kê
app.get('/api/dashboard/stats', async (c) => {
  const db = c.env.DB
  
  try {
    // Tổng số dự án theo trạng thái
    const projectStats = await db.prepare(`
      SELECT status, COUNT(*) as count
      FROM projects
      GROUP BY status
    `).all()
    
    // Tổng nhân sự active
    const staffCount = await db.prepare(`
      SELECT COUNT(*) as count FROM staff WHERE status = 'active'
    `).first()
    
    // Tổng số task theo trạng thái
    const taskStats = await db.prepare(`
      SELECT status, COUNT(*) as count
      FROM tasks
      GROUP BY status
    `).all()
    
    // Tổng thu chi
    const financeStats = await db.prepare(`
      SELECT 
        transaction_type,
        SUM(amount) as total
      FROM project_finances
      GROUP BY transaction_type
    `).all()
    
    // Nhiệm vụ quá hạn (overdue tasks)
    const overdueTasks = await db.prepare(`
      SELECT COUNT(*) as count
      FROM tasks
      WHERE status != 'completed' 
      AND due_date IS NOT NULL 
      AND DATE(due_date) < DATE('now')
    `).first()
    
    // Top 5 nhân sự hiệu suất cao
    const staffPerformance = await db.prepare(`
      SELECT 
        s.id,
        s.name,
        s.position,
        COUNT(DISTINCT t.id) as total_tasks,
        SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) as completed_tasks,
        COALESCE(SUM(ts.hours), 0) as total_hours,
        ROUND(CAST(SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) AS FLOAT) * 100.0 / NULLIF(COUNT(t.id), 0), 1) as completion_rate
      FROM staff s
      LEFT JOIN tasks t ON s.id = t.assigned_to
      LEFT JOIN timesheets ts ON s.id = ts.staff_id
      WHERE s.status = 'active'
      GROUP BY s.id, s.name, s.position
      HAVING COUNT(t.id) > 0
      ORDER BY completion_rate DESC, completed_tasks DESC
      LIMIT 5
    `).all()
    
    return c.json({
      projects: projectStats.results,
      staff: staffCount,
      tasks: taskStats.results,
      finances: financeStats.results,
      overdueTasks: overdueTasks,
      staffPerformance: staffPerformance.results
    })
  } catch (error) {
    return c.json({ error: 'Failed to fetch dashboard stats' }, 500)
  }
})

// Projects API
app.get('/api/projects', async (c) => {
  const db = c.env.DB
  const status = c.req.query('status')
  
  let query = `
    SELECT p.*, s.name as manager_name
    FROM projects p
    LEFT JOIN staff s ON p.project_manager_id = s.id
  `
  
  if (status) {
    query += ` WHERE p.status = ?`
    const result = await db.prepare(query).bind(status).all()
    return c.json(result.results)
  }
  
  const result = await db.prepare(query).all()
  return c.json(result.results)
})

app.get('/api/projects/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  const project = await db.prepare(`
    SELECT p.*, s.name as manager_name
    FROM projects p
    LEFT JOIN staff s ON p.project_manager_id = s.id
    WHERE p.id = ?
  `).bind(id).first()
  
  if (!project) {
    return c.json({ error: 'Project not found' }, 404)
  }
  
  // Get categories
  const categories = await db.prepare(`
    SELECT * FROM categories WHERE project_id = ?
  `).bind(id).all()
  
  // Get assigned staff
  const staff = await db.prepare(`
    SELECT s.*, ps.role, ps.assigned_date
    FROM project_staff ps
    JOIN staff s ON ps.staff_id = s.id
    WHERE ps.project_id = ? AND ps.is_active = 1
  `).bind(id).all()
  
  // Get tasks
  const tasks = await db.prepare(`
    SELECT t.*, s.name as assigned_name, d.name as discipline_name
    FROM tasks t
    LEFT JOIN staff s ON t.assigned_to = s.id
    LEFT JOIN disciplines d ON t.discipline_id = d.id
    WHERE t.project_id = ?
    ORDER BY t.created_at DESC
  `).bind(id).all()
  
  // Get finances
  const finances = await db.prepare(`
    SELECT pf.*, et.name as expense_type_name
    FROM project_finances pf
    JOIN expense_types et ON pf.expense_type_id = et.id
    WHERE pf.project_id = ?
    ORDER BY pf.transaction_date DESC
  `).bind(id).all()
  
  return c.json({
    ...project,
    categories: categories.results,
    staff: staff.results,
    tasks: tasks.results,
    finances: finances.results
  })
})

app.post('/api/projects', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  
  try {
    const result = await db.prepare(`
      INSERT INTO projects (name, code, client, location, description, start_date, end_date, contract_value, estimated_cost, status, project_manager_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.name,
      body.code,
      body.client,
      body.location || null,
      body.description || null,
      body.start_date || null,
      body.end_date || null,
      body.contract_value || 0,
      body.estimated_cost || 0,
      body.status || 'planning',
      body.project_manager_id || null
    ).run()
    
    return c.json({ id: result.meta.last_row_id, ...body }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create project' }, 500)
  }
})

app.put('/api/projects/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  
  try {
    await db.prepare(`
      UPDATE projects SET
        name = ?, code = ?, client = ?, location = ?, description = ?,
        start_date = ?, end_date = ?, contract_value = ?, estimated_cost = ?,
        status = ?, project_manager_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      body.name,
      body.code,
      body.client,
      body.location,
      body.description,
      body.start_date,
      body.end_date,
      body.contract_value,
      body.estimated_cost,
      body.status,
      body.project_manager_id,
      id
    ).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to update project' }, 500)
  }
})

app.delete('/api/projects/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    await db.prepare('DELETE FROM projects WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to delete project' }, 500)
  }
})

// Categories API
app.get('/api/categories', async (c) => {
  const db = c.env.DB
  const projectId = c.req.query('project_id')
  
  if (!projectId) {
    return c.json({ error: 'project_id is required' }, 400)
  }
  
  const result = await db.prepare(`
    SELECT * FROM categories WHERE project_id = ?
  `).bind(projectId).all()
  
  return c.json(result.results)
})

app.post('/api/categories', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  
  try {
    const result = await db.prepare(`
      INSERT INTO categories (project_id, name, code, description, status)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      body.project_id,
      body.name,
      body.code,
      body.description || null,
      body.status || 'pending'
    ).run()
    
    return c.json({ id: result.meta.last_row_id, ...body }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create category' }, 500)
  }
})

// Staff API
app.get('/api/staff', async (c) => {
  const db = c.env.DB
  const status = c.req.query('status')
  
  let query = 'SELECT * FROM staff'
  
  if (status) {
    query += ' WHERE status = ?'
    const result = await db.prepare(query).bind(status).all()
    return c.json(result.results)
  }
  
  const result = await db.prepare(query).all()
  return c.json(result.results)
})

app.get('/api/staff/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  const staff = await db.prepare('SELECT * FROM staff WHERE id = ?').bind(id).first()
  
  if (!staff) {
    return c.json({ error: 'Staff not found' }, 404)
  }
  
  // Get assigned projects
  const projects = await db.prepare(`
    SELECT p.*, ps.role, ps.assigned_date
    FROM project_staff ps
    JOIN projects p ON ps.project_id = p.id
    WHERE ps.staff_id = ? AND ps.is_active = 1
  `).bind(id).all()
  
  // Get timesheets
  const timesheets = await db.prepare(`
    SELECT t.*, ts.work_date, ts.hours, ts.description as work_description,
           p.name as project_name, tsk.title as task_title
    FROM timesheets t
    JOIN tasks tsk ON t.task_id = tsk.id
    JOIN projects p ON t.project_id = p.id
    WHERE t.staff_id = ?
    ORDER BY t.work_date DESC
    LIMIT 50
  `).bind(id).all()
  
  return c.json({
    ...staff,
    projects: projects.results,
    timesheets: timesheets.results
  })
})

app.post('/api/staff', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  
  try {
    const result = await db.prepare(`
      INSERT INTO staff (name, email, position, hourly_rate, phone, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      body.name,
      body.email,
      body.position,
      body.hourly_rate || 0,
      body.phone || null,
      body.status || 'active'
    ).run()
    
    return c.json({ id: result.meta.last_row_id, ...body }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create staff' }, 500)
  }
})

app.put('/api/staff/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  
  try {
    await db.prepare(`
      UPDATE staff SET
        name = ?, email = ?, position = ?, hourly_rate = ?, phone = ?, status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      body.name,
      body.email,
      body.position,
      body.hourly_rate,
      body.phone,
      body.status,
      id
    ).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to update staff' }, 500)
  }
})

// Tasks API
app.get('/api/tasks', async (c) => {
  const db = c.env.DB
  const projectId = c.req.query('project_id')
  const assignedTo = c.req.query('assigned_to')
  const status = c.req.query('status')
  
  let query = `
    SELECT t.*, s.name as assigned_name, p.name as project_name,
           c.name as category_name, d.name as discipline_name
    FROM tasks t
    LEFT JOIN staff s ON t.assigned_to = s.id
    LEFT JOIN projects p ON t.project_id = p.id
    LEFT JOIN categories c ON t.category_id = c.id
    LEFT JOIN disciplines d ON t.discipline_id = d.id
    WHERE 1=1
  `
  
  const bindings = []
  
  if (projectId) {
    query += ' AND t.project_id = ?'
    bindings.push(projectId)
  }
  
  if (assignedTo) {
    query += ' AND t.assigned_to = ?'
    bindings.push(assignedTo)
  }
  
  if (status) {
    query += ' AND t.status = ?'
    bindings.push(status)
  }
  
  query += ' ORDER BY t.created_at DESC'
  
  const result = await db.prepare(query).bind(...bindings).all()
  return c.json(result.results)
})

app.post('/api/tasks', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  
  try {
    const result = await db.prepare(`
      INSERT INTO tasks (project_id, category_id, discipline_id, title, description, assigned_to, estimated_hours, priority, status, due_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.project_id,
      body.category_id || null,
      body.discipline_id || null,
      body.title,
      body.description || null,
      body.assigned_to || null,
      body.estimated_hours || 0,
      body.priority || 'medium',
      body.status || 'todo',
      body.due_date || null
    ).run()
    
    return c.json({ id: result.meta.last_row_id, ...body }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create task' }, 500)
  }
})

app.put('/api/tasks/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  
  try {
    await db.prepare(`
      UPDATE tasks SET
        title = ?, description = ?, assigned_to = ?, estimated_hours = ?,
        priority = ?, status = ?, due_date = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      body.title,
      body.description,
      body.assigned_to,
      body.estimated_hours,
      body.priority,
      body.status,
      body.due_date,
      id
    ).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to update task' }, 500)
  }
})

// Timesheets API
app.get('/api/timesheets', async (c) => {
  const db = c.env.DB
  const projectId = c.req.query('project_id')
  const staffId = c.req.query('staff_id')
  
  let query = `
    SELECT t.*, s.name as staff_name, p.name as project_name,
           tsk.title as task_title, approver.name as approver_name
    FROM timesheets t
    JOIN staff s ON t.staff_id = s.id
    JOIN projects p ON t.project_id = p.id
    JOIN tasks tsk ON t.task_id = tsk.id
    LEFT JOIN staff approver ON t.approved_by = approver.id
    WHERE 1=1
  `
  
  const bindings = []
  
  if (projectId) {
    query += ' AND t.project_id = ?'
    bindings.push(projectId)
  }
  
  if (staffId) {
    query += ' AND t.staff_id = ?'
    bindings.push(staffId)
  }
  
  query += ' ORDER BY t.work_date DESC LIMIT 100'
  
  const result = await db.prepare(query).bind(...bindings).all()
  return c.json(result.results)
})

app.post('/api/timesheets', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  
  try {
    const result = await db.prepare(`
      INSERT INTO timesheets (staff_id, task_id, project_id, work_date, hours, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.staff_id,
      body.task_id,
      body.project_id,
      body.work_date,
      body.hours,
      body.description || null,
      body.status || 'pending'
    ).run()
    
    // Update task actual_hours
    await db.prepare(`
      UPDATE tasks SET actual_hours = actual_hours + ? WHERE id = ?
    `).bind(body.hours, body.task_id).run()
    
    return c.json({ id: result.meta.last_row_id, ...body }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create timesheet' }, 500)
  }
})

// Finances API
app.get('/api/finances', async (c) => {
  const db = c.env.DB
  const projectId = c.req.query('project_id')
  
  let query = `
    SELECT pf.*, et.name as expense_type_name, et.category as expense_category,
           p.name as project_name, s.name as created_by_name
    FROM project_finances pf
    JOIN expense_types et ON pf.expense_type_id = et.id
    JOIN projects p ON pf.project_id = p.id
    LEFT JOIN staff s ON pf.created_by = s.id
    WHERE 1=1
  `
  
  if (projectId) {
    query += ' AND pf.project_id = ?'
    const result = await db.prepare(query).bind(projectId).all()
    return c.json(result.results)
  }
  
  query += ' ORDER BY pf.transaction_date DESC LIMIT 100'
  const result = await db.prepare(query).all()
  return c.json(result.results)
})

app.post('/api/finances', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  
  try {
    const result = await db.prepare(`
      INSERT INTO project_finances (project_id, expense_type_id, transaction_type, amount, description, transaction_date, reference_no, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.project_id,
      body.expense_type_id,
      body.transaction_type,
      body.amount,
      body.description || null,
      body.transaction_date,
      body.reference_no || null,
      body.created_by || null
    ).run()
    
    return c.json({ id: result.meta.last_row_id, ...body }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create finance record' }, 500)
  }
})

// Disciplines API
app.get('/api/disciplines', async (c) => {
  const db = c.env.DB
  const result = await db.prepare('SELECT * FROM disciplines ORDER BY name').all()
  return c.json(result.results)
})

// Expense Types API
app.get('/api/expense-types', async (c) => {
  const db = c.env.DB
  const result = await db.prepare('SELECT * FROM expense_types ORDER BY category, name').all()
  return c.json(result.results)
})

app.post('/api/expense-types', async (c) => {
  const db = c.env.DB
  const body = await c.req.json()
  
  try {
    const result = await db.prepare(`
      INSERT INTO expense_types (name, category, description)
      VALUES (?, ?, ?)
    `).bind(
      body.name,
      body.category,
      body.description || null
    ).run()
    
    return c.json({ id: result.meta.last_row_id, ...body }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create expense type' }, 500)
  }
})

app.put('/api/expense-types/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const body = await c.req.json()
  
  try {
    await db.prepare(`
      UPDATE expense_types SET
        name = ?, category = ?, description = ?
      WHERE id = ?
    `).bind(
      body.name,
      body.category,
      body.description,
      id
    ).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to update expense type' }, 500)
  }
})

app.delete('/api/expense-types/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    await db.prepare('DELETE FROM expense_types WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to delete expense type' }, 500)
  }
})

// ==================== FRONTEND ====================

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hệ thống Quản lý Dự án BIM - OneCad</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#0066CC',
                  secondary: '#004C99',
                  accent: '#0080FF'
                }
              }
            }
          }
        </script>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .sidebar { transition: all 0.3s; }
          .card { transition: transform 0.2s; }
          .card:hover { transform: translateY(-2px); }
          .status-badge {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
          }
          .table-container { max-height: 600px; overflow-y: auto; }
          
          /* Modal Styles */
          .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.5);
          }
          .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .modal-content {
            background-color: white;
            padding: 0;
            border-radius: 12px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          }
          .modal-header {
            padding: 20px 24px;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .modal-body {
            padding: 24px;
          }
          .modal-footer {
            padding: 16px 24px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            justify-content: flex-end;
            gap: 12px;
          }
          
          /* Tab Styles */
          .tabs {
            display: flex;
            border-bottom: 2px solid #e5e7eb;
            margin-bottom: 20px;
          }
          .tab {
            padding: 12px 24px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
            font-weight: 500;
          }
          .tab:hover {
            background-color: #f3f4f6;
          }
          .tab.active {
            color: #0066CC;
            border-bottom-color: #0066CC;
          }
          .tab-content {
            display: none;
          }
          .tab-content.active {
            display: block;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Login Screen -->
        <div id="loginScreen" class="hidden"></div>

        <!-- Main Application -->
        <div id="mainApp">
            <!-- Navigation Bar -->
            <nav class="bg-primary text-white shadow-lg">
                <div class="container mx-auto px-4">
                    <div class="flex items-center justify-between py-3">
                        <div class="flex items-center space-x-4">
                            <img src="https://onecadvn.com/Upload/images/logo/logo.png" alt="OneCad" class="h-10">
                            <h1 class="text-xl font-bold">Hệ thống Quản lý Dự án BIM</h1>
                        </div>
                        <div id="userInfo" class="flex items-center space-x-4">
                            <span class="text-sm"><i class="fas fa-user-circle mr-2"></i>Loading...</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="flex">
            <!-- Sidebar -->
            <aside class="sidebar bg-white w-64 min-h-screen shadow-lg">
                <div class="p-4">
                    <nav class="space-y-2">
                        <a href="#" onclick="showView('dashboard')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg transition">
                            <i class="fas fa-chart-line w-6"></i>
                            <span class="ml-3">Dashboard</span>
                        </a>
                        <a href="#" onclick="showView('projects')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg transition">
                            <i class="fas fa-building w-6"></i>
                            <span class="ml-3">Quản lý Dự án</span>
                        </a>
                        <a href="#" onclick="showView('staff')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg transition">
                            <i class="fas fa-users w-6"></i>
                            <span class="ml-3">Quản lý Nhân sự</span>
                        </a>
                        <a href="#" onclick="showView('tasks')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg transition">
                            <i class="fas fa-tasks w-6"></i>
                            <span class="ml-3">Quản lý Nhiệm vụ</span>
                        </a>
                        <a href="#" onclick="showView('timesheets')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg transition">
                            <i class="fas fa-clock w-6"></i>
                            <span class="ml-3">Timesheet</span>
                        </a>
                        <a href="#" onclick="showView('finances')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg transition">
                            <i class="fas fa-dollar-sign w-6"></i>
                            <span class="ml-3">Quản lý Thu Chi</span>
                        </a>
                        <a href="#" onclick="showView('expense-types')" class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg transition">
                            <i class="fas fa-tags w-6"></i>
                            <span class="ml-3">Loại Chi phí</span>
                        </a>
                    </nav>
                </div>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 p-6">
                <!-- Dashboard View -->
                <div id="view-dashboard" class="view-content">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Dashboard Tổng quan</h2>
                    
                    <!-- Stats Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div class="card bg-white p-6 rounded-lg shadow">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm">Tổng Dự án</p>
                                    <p id="total-projects" class="text-3xl font-bold text-primary">0</p>
                                </div>
                                <i class="fas fa-building text-4xl text-primary opacity-20"></i>
                            </div>
                        </div>
                        <div class="card bg-white p-6 rounded-lg shadow">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm">Nhân sự</p>
                                    <p id="total-staff" class="text-3xl font-bold text-green-600">0</p>
                                </div>
                                <i class="fas fa-users text-4xl text-green-600 opacity-20"></i>
                            </div>
                        </div>
                        <div class="card bg-white p-6 rounded-lg shadow">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm">Nhiệm vụ đang làm</p>
                                    <p id="active-tasks" class="text-3xl font-bold text-orange-600">0</p>
                                </div>
                                <i class="fas fa-tasks text-4xl text-orange-600 opacity-20"></i>
                            </div>
                        </div>
                        <div class="card bg-white p-6 rounded-lg shadow">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm">Lợi nhuận (tỷ VNĐ)</p>
                                    <p id="profit" class="text-3xl font-bold text-purple-600">0</p>
                                </div>
                                <i class="fas fa-chart-line text-4xl text-purple-600 opacity-20"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Charts -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold mb-4">Trạng thái Dự án</h3>
                            <canvas id="projectStatusChart"></canvas>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold mb-4">Trạng thái Nhiệm vụ</h3>
                            <canvas id="taskStatusChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Projects View -->
                <div id="view-projects" class="view-content hidden">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Quản lý Dự án</h2>
                        <button onclick="showProjectForm()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
                            <i class="fas fa-plus mr-2"></i>Thêm Dự án
                        </button>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="table-container">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã DA</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên dự án</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chủ đầu tư</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá trị HĐ</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="projects-table" class="bg-white divide-y divide-gray-200">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Staff View -->
                <div id="view-staff" class="view-content hidden">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Quản lý Nhân sự</h2>
                        <button onclick="showStaffForm()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
                            <i class="fas fa-plus mr-2"></i>Thêm Nhân sự
                        </button>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="table-container">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ tên</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chức vụ</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lương/giờ</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="staff-table" class="bg-white divide-y divide-gray-200">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Tasks View -->
                <div id="view-tasks" class="view-content hidden">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Quản lý Nhiệm vụ</h2>
                        <button onclick="showTaskForm()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
                            <i class="fas fa-plus mr-2"></i>Thêm Nhiệm vụ
                        </button>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="table-container">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nhiệm vụ</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dự án</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người thực hiện</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ưu tiên</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hạn</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="tasks-table" class="bg-white divide-y divide-gray-200">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Timesheets View -->
                <div id="view-timesheets" class="view-content hidden">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Quản lý Timesheet</h2>
                        <button onclick="showTimesheetForm()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
                            <i class="fas fa-plus mr-2"></i>Thêm Timesheet
                        </button>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="table-container">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nhân sự</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dự án</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nhiệm vụ</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giờ làm</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="timesheets-table" class="bg-white divide-y divide-gray-200">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Finances View -->
                <div id="view-finances" class="view-content hidden">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Quản lý Thu Chi</h2>
                        <button onclick="showFinanceForm()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
                            <i class="fas fa-plus mr-2"></i>Thêm Thu Chi
                        </button>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="table-container">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dự án</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thu/Chi</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số tiền</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
                                    </tr>
                                </thead>
                                <tbody id="finances-table" class="bg-white divide-y divide-gray-200">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Expense Types View -->
                <div id="view-expense-types" class="view-content hidden">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Quản lý Loại Chi phí</h2>
                        <button onclick="showExpenseTypeForm()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
                            <i class="fas fa-plus mr-2"></i>Thêm Loại Chi phí
                        </button>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="table-container">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên loại chi phí</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="expense-types-table" class="bg-white divide-y divide-gray-200">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div> <!-- End mainApp -->

        <!-- Modals will be dynamically inserted here -->
        <div id="modals-container"></div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/lang-vi.js"></script>
        <script src="/static/auth.js"></script>
        <script src="/static/project-detail.js"></script>
        <script src="/static/modals.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
