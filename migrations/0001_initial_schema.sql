-- BIM Management System Database Schema

-- Bảng Staff (Nhân sự)
CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  position TEXT NOT NULL, -- Chức vụ: BIM Manager, BIM Coordinator, BIM Modeler, etc.
  hourly_rate REAL NOT NULL DEFAULT 0, -- Lương theo giờ để tính chi phí
  phone TEXT,
  status TEXT DEFAULT 'active', -- active, inactive
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Disciplines (Bộ môn - có thể dùng chung cho nhiều dự án)
CREATE TABLE IF NOT EXISTS disciplines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL, -- Kiến trúc, Kết cấu, MEP, Hạ tầng, Giao thông, etc.
  code TEXT UNIQUE NOT NULL, -- AR, ST, MEP, INF, TRAN
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Expense Types (Loại chi phí - có thể tùy biến)
CREATE TABLE IF NOT EXISTS expense_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL, -- Lương nhân sự, Văn phòng phẩm, Công tác phí, etc.
  category TEXT NOT NULL, -- labor, material, travel, overhead, other
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Projects (Dự án)
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL, -- Mã dự án
  client TEXT NOT NULL, -- Tên chủ đầu tư
  location TEXT,
  description TEXT,
  start_date DATE,
  end_date DATE,
  contract_value REAL DEFAULT 0, -- Giá trị hợp đồng (doanh thu dự kiến)
  estimated_cost REAL DEFAULT 0, -- Chi phí dự toán
  status TEXT DEFAULT 'planning', -- planning, design_basic, design_technical, construction, completed
  project_manager_id INTEGER, -- Người quản lý dự án
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_manager_id) REFERENCES staff(id)
);

-- Bảng Categories (Hạng mục của dự án)
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  name TEXT NOT NULL, -- Tên hạng mục: Tòa nhà A, Khu vực B, etc.
  code TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending', -- pending, in_progress, completed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Bảng Tasks (Nhiệm vụ)
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  category_id INTEGER,
  discipline_id INTEGER, -- Bộ môn
  title TEXT NOT NULL,
  description TEXT,
  assigned_to INTEGER, -- Nhân sự được giao
  estimated_hours REAL DEFAULT 0, -- Số giờ ước tính
  actual_hours REAL DEFAULT 0, -- Số giờ thực tế (tự động tính từ timesheet)
  priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
  status TEXT DEFAULT 'todo', -- todo, in_progress, review, completed
  due_date DATE,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (discipline_id) REFERENCES disciplines(id) ON DELETE SET NULL,
  FOREIGN KEY (assigned_to) REFERENCES staff(id) ON DELETE SET NULL
);

-- Bảng Timesheets (Bảng chấm công/ghi nhận giờ làm)
CREATE TABLE IF NOT EXISTS timesheets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER NOT NULL,
  task_id INTEGER NOT NULL,
  project_id INTEGER NOT NULL,
  work_date DATE NOT NULL,
  hours REAL NOT NULL, -- Số giờ làm việc
  description TEXT, -- Mô tả công việc đã làm
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  approved_by INTEGER, -- Người phê duyệt
  approved_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (approved_by) REFERENCES staff(id) ON DELETE SET NULL
);

-- Bảng Project Finances (Thu chi của dự án)
CREATE TABLE IF NOT EXISTS project_finances (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  expense_type_id INTEGER NOT NULL,
  transaction_type TEXT NOT NULL, -- income (thu), expense (chi)
  amount REAL NOT NULL,
  description TEXT,
  transaction_date DATE NOT NULL,
  reference_no TEXT, -- Số chứng từ
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (expense_type_id) REFERENCES expense_types(id),
  FOREIGN KEY (created_by) REFERENCES staff(id) ON DELETE SET NULL
);

-- Bảng Project Staff (Phân công nhân sự vào dự án)
CREATE TABLE IF NOT EXISTS project_staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  staff_id INTEGER NOT NULL,
  role TEXT, -- Project Manager, BIM Coordinator, BIM Modeler, etc.
  assigned_date DATE DEFAULT (date('now')),
  removed_date DATE,
  is_active INTEGER DEFAULT 1, -- 1: active, 0: inactive
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
  UNIQUE(project_id, staff_id)
);

-- Indexes để tăng hiệu suất truy vấn
CREATE INDEX IF NOT EXISTS idx_staff_email ON staff(email);
CREATE INDEX IF NOT EXISTS idx_staff_status ON staff(status);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_code ON projects(code);
CREATE INDEX IF NOT EXISTS idx_categories_project ON categories(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_timesheets_staff ON timesheets(staff_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_project ON timesheets(project_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_task ON timesheets(task_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_date ON timesheets(work_date);
CREATE INDEX IF NOT EXISTS idx_finances_project ON project_finances(project_id);
CREATE INDEX IF NOT EXISTS idx_finances_type ON project_finances(expense_type_id);
CREATE INDEX IF NOT EXISTS idx_project_staff_active ON project_staff(project_id, is_active);
