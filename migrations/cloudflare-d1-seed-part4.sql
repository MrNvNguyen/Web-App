-- Seed Data Part 4: Timesheets and Finances

INSERT OR IGNORE INTO timesheets (staff_id, task_id, project_id, work_date, hours, description, status, approved_by, approved_at) VALUES 
  (3, 1, 1, '2024-02-05', 8, 'Mô hình mặt bằng tầng điển hình T1-T10', 'approved', 1, '2024-02-06 09:00:00'),
  (3, 1, 1, '2024-02-06', 8, 'Mô hình mặt bằng tầng T11-T20', 'approved', 1, '2024-02-07 09:00:00'),
  (3, 1, 1, '2024-02-07', 7, 'Mô hình mặt bằng tầng T21-T30', 'approved', 1, '2024-02-08 09:00:00'),
  (4, 2, 1, '2024-02-05', 8, 'Mô hình móng và tầng hầm', 'approved', 1, '2024-02-06 09:00:00'),
  (4, 2, 1, '2024-02-06', 8, 'Mô hình kết cấu sàn tầng điển hình', 'approved', 1, '2024-02-07 09:00:00'),
  (5, 3, 1, '2024-02-08', 6, 'Survey hiện trạng và lập kế hoạch', 'pending', NULL, NULL),
  (6, 6, 2, '2024-03-10', 8, 'Mô hình kết cấu nhà ga C9', 'approved', 1, '2024-03-11 09:00:00'),
  (6, 7, 2, '2024-03-12', 8, 'Mô hình profile hầm TBM', 'approved', 1, '2024-03-13 09:00:00'),
  (3, 9, 3, '2024-03-01', 8, 'Mô hình kiến trúc tầng 1-2', 'approved', 2, '2024-03-02 09:00:00'),
  (3, 9, 3, '2024-03-02', 8, 'Mô hình kiến trúc tầng 3-4', 'approved', 2, '2024-03-03 09:00:00');

INSERT OR IGNORE INTO project_finances (project_id, expense_type_id, transaction_type, amount, description, transaction_date, reference_no, created_by) VALUES 
  (1, 8, 'income', 1500000000, 'Thanh toán đợt 1 - Thiết kế cơ sở', '2024-02-28', 'TT-001-2024', 1),
  (1, 1, 'expense', 450000000, 'Lương nhân sự tháng 1-2/2024', '2024-02-28', 'CT-001-2024', 1),
  (1, 4, 'expense', 50000000, 'Gia hạn license BIM360 năm 2024', '2024-01-20', 'CT-002-2024', 1),
  (1, 3, 'expense', 15000000, 'Công tác phí khảo sát hiện trường', '2024-01-25', 'CT-003-2024', 1),
  (2, 8, 'income', 2400000000, 'Thanh toán đợt 1 - Thiết kế cơ sở', '2024-04-30', 'TT-002-2024', 1),
  (2, 1, 'expense', 600000000, 'Lương nhân sự tháng 3-4/2024', '2024-04-30', 'CT-004-2024', 1),
  (2, 5, 'expense', 80000000, 'Thuê chuyên gia tư vấn hầm ngầm', '2024-03-15', 'CT-005-2024', 1),
  (3, 8, 'income', 900000000, 'Thanh toán đợt 1', '2024-03-30', 'TT-003-2024', 2),
  (3, 8, 'income', 900000000, 'Thanh toán đợt 2', '2024-06-30', 'TT-004-2024', 2),
  (3, 1, 'expense', 350000000, 'Lương nhân sự tháng 2-6/2024', '2024-06-30', 'CT-006-2024', 2);
