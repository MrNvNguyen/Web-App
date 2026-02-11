-- Add progress column to tasks table
ALTER TABLE tasks ADD COLUMN progress INTEGER DEFAULT 0 CHECK(progress >= 0 AND progress <= 100);

-- Add overtime_hours column to timesheets table  
ALTER TABLE timesheets ADD COLUMN overtime_hours REAL DEFAULT 0;
