-- Seed Data for BIM Management System

-- Insert Disciplines (Bộ môn)
INSERT OR IGNORE INTO disciplines (name, code, description) VALUES 
  ('Kiến trúc', 'AR', 'Thiết kế kiến trúc'),
  ('Kết cấu', 'ST', 'Thiết kế kết cấu xây dựng'),
  ('Điện', 'EL', 'Hệ thống điện'),
  ('Điều hòa thông gió', 'HVAC', 'Hệ thống điều hòa không khí'),
  ('Cấp thoát nước', 'PL', 'Hệ thống cấp thoát nước và vệ sinh'),
  ('Phòng cháy chữa cháy', 'FP', 'Hệ thống phòng cháy chữa cháy'),
  ('Hạ tầng', 'INF', 'Hạ tầng kỹ thuật'),
  ('Giao thông', 'TRAN', 'Giao thông và đường bộ'),
  ('Cảnh quan', 'LS', 'Thiết kế cảnh quan');

-- Insert Expense Types (Loại chi phí)
INSERT OR IGNORE INTO expense_types (name, category, description) VALUES 
  ('Lương nhân sự', 'labor', 'Chi phí lương và phụ cấp nhân sự'),
  ('Văn phòng phẩm', 'material', 'Giấy tờ, bút, mực in, etc.'),
  ('Công tác phí', 'travel', 'Chi phí đi lại, khách sạn, ăn uống'),
  ('Phần mềm', 'overhead', 'License Revit, Navisworks, BIM360, etc.'),
  ('Thuê ngoài', 'other', 'Chi phí thuê chuyên gia bên ngoài'),
  ('Thiết bị', 'material', 'Máy tính, máy scan, máy in'),
  ('Đào tạo', 'overhead', 'Chi phí đào tạo và nâng cao kỹ năng'),
  ('Thanh toán từ chủ đầu tư', 'income', 'Thu từ các đợt thanh toán theo hợp đồng');

-- Insert Staff (Nhân sự mẫu)
INSERT OR IGNORE INTO staff (name, email, position, hourly_rate, phone, status) VALUES 
  ('Nguyễn Văn An', 'an.nguyen@onecad.vn', 'BIM Manager', 150000, '0901234567', 'active'),
  ('Trần Thị Bình', 'binh.tran@onecad.vn', 'BIM Coordinator', 120000, '0901234568', 'active'),
  ('Lê Văn Cường', 'cuong.le@onecad.vn', 'BIM Modeler - Kiến trúc', 100000, '0901234569', 'active'),
  ('Phạm Thị Dung', 'dung.pham@onecad.vn', 'BIM Modeler - Kết cấu', 100000, '0901234570', 'active'),
  ('Hoàng Văn Đức', 'duc.hoang@onecad.vn', 'BIM Modeler - MEP', 100000, '0901234571', 'active'),
  ('Vũ Thị Hoa', 'hoa.vu@onecad.vn', 'BIM Modeler - Hạ tầng', 95000, '0901234572', 'active'),
  ('Đỗ Văn Hùng', 'hung.do@onecad.vn', 'BIM Technician', 80000, '0901234573', 'active'),
  ('Mai Thị Lan', 'lan.mai@onecad.vn', 'QA/QC Specialist', 110000, '0901234574', 'active');

-- Insert Projects (Dự án mẫu)
INSERT OR IGNORE INTO projects (name, code, client, location, description, start_date, end_date, contract_value, estimated_cost, status, project_manager_id) VALUES 
  ('Khu phức hợp Vinhomes Ocean Park 3', 'VOP3-2024', 'Vingroup', 'Hưng Yên', 'Tư vấn BIM cho khu phức hợp gồm chung cư, biệt thự, trường học', '2024-01-15', '2025-12-31', 5000000000, 3500000000, 'design_technical', 1),
  ('Dự án Metro Line 5', 'METRO5-2024', 'Ban quản lý đường sắt đô thị Hà Nội', 'Hà Nội', 'Tư vấn BIM thiết kế tuyến Metro số 5', '2024-03-01', '2026-06-30', 8000000000, 6000000000, 'design_basic', 1),
  ('Bệnh viện Đa khoa Quốc tế', 'BVQT-2024', 'Tập đoàn Y tế ABC', 'TP.HCM', 'Tư vấn BIM cho bệnh viện 500 giường', '2024-02-10', '2025-08-30', 3000000000, 2200000000, 'construction', 2);

-- Insert Categories (Hạng mục)
INSERT OR IGNORE INTO categories (project_id, name, code, description, status) VALUES 
  (1, 'Tòa nhà S1', 'S1', 'Tòa chung cư 30 tầng', 'in_progress'),
  (1, 'Tòa nhà S2', 'S2', 'Tòa chung cư 32 tầng', 'in_progress'),
  (1, 'Biệt thự BT01-BT20', 'BT01-20', 'Khu biệt thự đơn lập', 'pending'),
  (1, 'Trường học', 'SCH', 'Trường mầm non và tiểu học', 'completed'),
  (2, 'Nhà ga C9', 'STA-C9', 'Nhà ga ngầm số 9', 'in_progress'),
  (2, 'Nhà ga C10', 'STA-C10', 'Nhà ga ngầm số 10', 'pending'),
  (2, 'Đoạn hầm TBM', 'TBM-01', 'Đoạn hầm đào máy khiên 2.5km', 'in_progress'),
  (3, 'Khối điều trị', 'MED', 'Khối nhà điều trị chính', 'completed'),
  (3, 'Khối hành chính', 'ADM', 'Khối nhà hành chính và phòng khám', 'in_progress');

-- Insert Project Staff (Phân công nhân sự vào dự án)
INSERT OR IGNORE INTO project_staff (project_id, staff_id, role, assigned_date, is_active) VALUES 
  (1, 1, 'Project Manager', '2024-01-15', 1),
  (1, 2, 'BIM Coordinator', '2024-01-15', 1),
  (1, 3, 'BIM Modeler - AR', '2024-01-20', 1),
  (1, 4, 'BIM Modeler - ST', '2024-01-20', 1),
  (1, 5, 'BIM Modeler - MEP', '2024-01-25', 1),
  (2, 1, 'Project Manager', '2024-03-01', 1),
  (2, 6, 'BIM Modeler - INF', '2024-03-05', 1),
  (2, 7, 'BIM Technician', '2024-03-05', 1),
  (3, 2, 'Project Manager', '2024-02-10', 1),
  (3, 3, 'BIM Modeler - AR', '2024-02-15', 1),
  (3, 8, 'QA/QC Specialist', '2024-02-15', 1);

-- Insert Tasks (Nhiệm vụ mẫu)
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

-- Insert Timesheets (Chấm công mẫu)
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

-- Insert Project Finances (Thu chi dự án)
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
