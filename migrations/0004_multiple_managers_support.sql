-- Migration: Support multiple managers per coordinator
-- Version: 0004
-- Date: 2026-02-11

-- Create staff_managers junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS staff_managers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER NOT NULL,
  manager_id INTEGER NOT NULL,
  assigned_date DATE DEFAULT CURRENT_DATE,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES staff(id) ON DELETE CASCADE,
  UNIQUE(staff_id, manager_id)
);

-- Migrate existing manager_id data to junction table
INSERT INTO staff_managers (staff_id, manager_id, assigned_date, is_active)
SELECT id, manager_id, CURRENT_DATE, 1
FROM staff
WHERE manager_id IS NOT NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_staff_managers_staff ON staff_managers(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_managers_manager ON staff_managers(manager_id);
CREATE INDEX IF NOT EXISTS idx_staff_managers_active ON staff_managers(is_active);

-- Note: We keep manager_id column for backward compatibility
-- It will store the PRIMARY manager (can be null for Admin)
