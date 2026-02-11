-- Seed Data Part 2: Projects and Categories

INSERT OR IGNORE INTO projects (name, code, client, location, description, start_date, end_date, contract_value, estimated_cost, status, project_manager_id) VALUES 
  ('Khu phức hợp Vinhomes Ocean Park 3', 'VOP3-2024', 'Vingroup', 'Hưng Yên', 'Tư vấn BIM cho khu phức hợp gồm chung cư, biệt thự, trường học', '2024-01-15', '2025-12-31', 5000000000, 3500000000, 'design_technical', 1),
  ('Dự án Metro Line 5', 'METRO5-2024', 'Ban quản lý đường sắt đô thị Hà Nội', 'Hà Nội', 'Tư vấn BIM thiết kế tuyến Metro số 5', '2024-03-01', '2026-06-30', 8000000000, 6000000000, 'design_basic', 1),
  ('Bệnh viện Đa khoa Quốc tế', 'BVQT-2024', 'Tập đoàn Y tế ABC', 'TP.HCM', 'Tư vấn BIM cho bệnh viện 500 giường', '2024-02-10', '2025-08-30', 3000000000, 2200000000, 'construction', 2);

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
