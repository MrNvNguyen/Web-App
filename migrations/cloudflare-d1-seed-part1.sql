-- Seed Data Part 1: Basic Data (Disciplines, Expense Types, Staff)

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

INSERT OR IGNORE INTO expense_types (name, category, description) VALUES 
  ('Lương nhân sự', 'labor', 'Chi phí lương và phụ cấp nhân sự'),
  ('Văn phòng phẩm', 'material', 'Giấy tờ, bút, mực in, etc.'),
  ('Công tác phí', 'travel', 'Chi phí đi lại, khách sạn, ăn uống'),
  ('Phần mềm', 'overhead', 'License Revit, Navisworks, BIM360, etc.'),
  ('Thuê ngoài', 'other', 'Chi phí thuê chuyên gia bên ngoài'),
  ('Thiết bị', 'material', 'Máy tính, máy scan, máy in'),
  ('Đào tạo', 'overhead', 'Chi phí đào tạo và nâng cao kỹ năng'),
  ('Thanh toán từ chủ đầu tư', 'income', 'Thu từ các đợt thanh toán theo hợp đồng');

INSERT OR IGNORE INTO staff (name, email, position, hourly_rate, phone, status) VALUES 
  ('Nguyễn Văn An', 'an.nguyen@onecad.vn', 'BIM Manager', 150000, '0901234567', 'active'),
  ('Trần Thị Bình', 'binh.tran@onecad.vn', 'BIM Coordinator', 120000, '0901234568', 'active'),
  ('Lê Văn Cường', 'cuong.le@onecad.vn', 'BIM Modeler - Kiến trúc', 100000, '0901234569', 'active'),
  ('Phạm Thị Dung', 'dung.pham@onecad.vn', 'BIM Modeler - Kết cấu', 100000, '0901234570', 'active'),
  ('Hoàng Văn Đức', 'duc.hoang@onecad.vn', 'BIM Modeler - MEP', 100000, '0901234571', 'active'),
  ('Vũ Thị Hoa', 'hoa.vu@onecad.vn', 'BIM Modeler - Hạ tầng', 95000, '0901234572', 'active'),
  ('Đỗ Văn Hùng', 'hung.do@onecad.vn', 'BIM Technician', 80000, '0901234573', 'active'),
  ('Mai Thị Lan', 'lan.mai@onecad.vn', 'QA/QC Specialist', 110000, '0901234574', 'active');
