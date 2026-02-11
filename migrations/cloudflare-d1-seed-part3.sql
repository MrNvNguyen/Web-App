-- Seed Data Part 3: Tasks

INSERT OR IGNORE INTO tasks (project_id, category_id, discipline_id, title, description, assigned_to, estimated_hours, priority, status, due_date) VALUES 
  (1, 1, 1, 'Mô hình LOD 300 - Tòa S1', 'Hoàn thiện mô hình kiến trúc LOD 300 tòa S1', 3, 120, 'high', 'in_progress', '2024-03-30'),
  (1, 1, 2, 'Mô hình kết cấu - Tòa S1', 'Mô hình kết cấu bê tông, thép tòa S1', 4, 100, 'high', 'in_progress', '2024-03-30'),
  (1, 1, 4, 'Hệ thống HVAC - Tòa S1', 'Thiết kế và mô hình hệ thống HVAC', 5, 80, 'medium', 'todo', '2024-04-15'),
  (1, 2, 1, 'Mô hình LOD 300 - Tòa S2', 'Hoàn thiện mô hình kiến trúc LOD 300 tòa S2', 3, 120, 'medium', 'todo', '2024-05-30'),
  (1, 4, 1, 'Clash Detection - Trường học', 'Kiểm tra xung đột mô hình trường học', 8, 20, 'low', 'completed', '2024-02-28'),
  (2, 5, 7, 'Mô hình nhà ga C9', 'Mô hình kiến trúc, kết cấu nhà ga C9', 6, 200, 'high', 'in_progress', '2024-06-30'),
  (2, 7, 7, 'Mô hình hầm TBM', 'Mô hình đoạn hầm đào máy khiên', 6, 150, 'high', 'in_progress', '2024-08-30'),
  (3, 8, 1, 'As-built Model - Khối điều trị', 'Cập nhật mô hình as-built sau thi công', 3, 40, 'medium', 'completed', '2024-06-30'),
  (3, 9, 1, 'Mô hình kiến trúc - Khối hành chính', 'Mô hình LOD 400 khối hành chính', 3, 60, 'high', 'in_progress', '2024-04-30');
