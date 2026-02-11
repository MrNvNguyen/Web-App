-- Migration: Add hierarchical structure to staff table
-- Version: 0003
-- Date: 2026-02-11

-- Add manager_id column to track who manages this staff
ALTER TABLE staff ADD COLUMN manager_id INTEGER;

-- Add role column to define hierarchy level
ALTER TABLE staff ADD COLUMN role TEXT NOT NULL DEFAULT 'BIM Modeler';

-- Add created_by to track who created this user
ALTER TABLE staff ADD COLUMN created_by INTEGER;

-- Add foreign key constraints
-- Note: SQLite doesn't enforce FK by default in ALTER, but we document it here
-- FOREIGN KEY (manager_id) REFERENCES staff(id)
-- FOREIGN KEY (created_by) REFERENCES staff(id)

-- Update existing staff with default values
-- Set first user (id=1) as Admin
UPDATE staff SET role = 'Admin', manager_id = NULL, created_by = NULL WHERE id = 1;

-- Set second user (id=2) as BIM Manager under Admin
UPDATE staff SET role = 'BIM Manager', manager_id = 1, created_by = 1 WHERE id = 2;

-- Set remaining users as per their positions
UPDATE staff SET role = CASE
  WHEN position LIKE '%Manager%' THEN 'BIM Manager'
  WHEN position LIKE '%Coordinator%' THEN 'BIM Coordinator'
  WHEN position LIKE '%Modeler%' THEN 'BIM Modeler'
  ELSE 'BIM Modeler'
END WHERE id > 2;

-- Set manager_id for coordinators and modelers
-- Coordinators managed by first BIM Manager (id=2)
UPDATE staff 
SET manager_id = 2, created_by = 2 
WHERE role = 'BIM Coordinator' AND manager_id IS NULL;

-- Modelers managed by first BIM Coordinator (id=3 if exists)
UPDATE staff 
SET manager_id = (SELECT id FROM staff WHERE role = 'BIM Coordinator' LIMIT 1),
    created_by = (SELECT id FROM staff WHERE role = 'BIM Coordinator' LIMIT 1)
WHERE role = 'BIM Modeler' AND manager_id IS NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_staff_manager_id ON staff(manager_id);
CREATE INDEX IF NOT EXISTS idx_staff_role ON staff(role);
CREATE INDEX IF NOT EXISTS idx_staff_created_by ON staff(created_by);
