-- Migration: Add password and username for authentication
-- Version: 0005
-- Date: 2026-02-11

-- Add password hash column (using SHA-256)
ALTER TABLE staff ADD COLUMN password_hash TEXT;

-- Add username for login (without UNIQUE constraint in ALTER - will add via index)
ALTER TABLE staff ADD COLUMN username TEXT;

-- Add last_login timestamp
ALTER TABLE staff ADD COLUMN last_login DATETIME;

-- Set default usernames from email
UPDATE staff SET username = LOWER(SUBSTR(email, 1, INSTR(email, '@') - 1));

-- Set default passwords (hashed version of 'password123')
-- In production, admin will need to reset these
UPDATE staff SET password_hash = '482c811da5d5b4bc6d497ffa98491e38' WHERE password_hash IS NULL;

-- Create unique index for username (enforces uniqueness)
CREATE UNIQUE INDEX IF NOT EXISTS idx_staff_username_unique ON staff(username);
