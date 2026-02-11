// Vietnamese language configuration
const vi = {
  // Navigation
  nav: {
    dashboard: 'Bảng điều khiển',
    projects: 'Quản lý Dự án',
    staff: 'Quản lý Nhân sự',
    tasks: 'Quản lý Nhiệm vụ',
    timesheets: 'Bảng chấm công',
    finances: 'Quản lý Thu Chi',
    expenseTypes: 'Loại Chi phí'
  },
  
  // Common
  common: {
    add: 'Thêm',
    edit: 'Sửa',
    delete: 'Xóa',
    save: 'Lưu',
    cancel: 'Hủy',
    close: 'Đóng',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    export: 'Xuất',
    import: 'Nhập',
    detail: 'Chi tiết',
    view: 'Xem',
    status: 'Trạng thái',
    actions: 'Thao tác',
    loading: 'Đang tải...',
    noData: 'Không có dữ liệu',
    success: 'Thành công!',
    error: 'Có lỗi xảy ra!',
    confirm: 'Xác nhận',
    required: 'Bắt buộc',
    optional: 'Tùy chọn'
  },
  
  // Dashboard
  dashboard: {
    title: 'Bảng điều khiển tổng quan',
    totalProjects: 'Tổng Dự án',
    totalStaff: 'Tổng Nhân sự',
    activeTasks: 'Nhiệm vụ đang làm',
    profit: 'Lợi nhuận (Tỷ VNĐ)',
    overdueTasks: 'Nhiệm vụ quá hạn',
    staffPerformance: 'Hiệu suất Nhân sự',
    projectStatus: 'Trạng thái Dự án',
    taskStatus: 'Trạng thái Nhiệm vụ',
    topPerformers: 'Nhân sự xuất sắc',
    hoursWorked: 'Giờ làm việc',
    efficiency: 'Hiệu suất',
    tasksCompleted: 'Nhiệm vụ hoàn thành'
  },
  
  // Projects
  projects: {
    title: 'Quản lý Dự án',
    addProject: 'Thêm Dự án',
    projectName: 'Tên dự án',
    projectCode: 'Mã dự án',
    client: 'Chủ đầu tư',
    location: 'Địa điểm',
    description: 'Mô tả',
    startDate: 'Ngày bắt đầu',
    endDate: 'Ngày kết thúc',
    contractValue: 'Giá trị hợp đồng',
    estimatedCost: 'Chi phí dự toán',
    actualCost: 'Chi phí thực tế',
    manager: 'Quản lý dự án',
    categories: 'Hạng mục',
    disciplines: 'Bộ môn',
    team: 'Nhóm làm việc'
  },
  
  // Staff
  staff: {
    title: 'Quản lý Nhân sự',
    addStaff: 'Thêm Nhân sự',
    staffName: 'Họ và tên',
    email: 'Email',
    position: 'Chức vụ',
    hourlyRate: 'Lương theo giờ (VNĐ)',
    phone: 'Số điện thoại',
    active: 'Đang làm việc',
    inactive: 'Nghỉ việc',
    totalHours: 'Tổng giờ làm',
    assignedProjects: 'Dự án tham gia'
  },
  
  // Tasks
  tasks: {
    title: 'Quản lý Nhiệm vụ',
    addTask: 'Thêm Nhiệm vụ',
    taskTitle: 'Tiêu đề nhiệm vụ',
    project: 'Dự án',
    category: 'Hạng mục',
    discipline: 'Bộ môn',
    assignedTo: 'Giao cho',
    estimatedHours: 'Giờ ước tính',
    actualHours: 'Giờ thực tế',
    progress: 'Tiến độ (%)',
    priority: 'Ưu tiên',
    dueDate: 'Hạn hoàn thành',
    startDate: 'Ngày bắt đầu',
    completedDate: 'Ngày hoàn thành',
    overdue: 'Quá hạn'
  },
  
  // Timesheets
  timesheets: {
    title: 'Bảng chấm công',
    addTimesheet: 'Thêm Timesheet',
    workDate: 'Ngày làm việc',
    hours: 'Số giờ làm',
    overtimeHours: 'Giờ tăng ca',
    task: 'Nhiệm vụ',
    workDescription: 'Mô tả công việc',
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối',
    approvedBy: 'Người duyệt',
    approvedAt: 'Ngày duyệt'
  },
  
  // Finances
  finances: {
    title: 'Quản lý Thu Chi',
    addTransaction: 'Thêm Thu Chi',
    income: 'Thu nhập',
    expense: 'Chi phí',
    amount: 'Số tiền (VNĐ)',
    transactionType: 'Loại giao dịch',
    expenseType: 'Loại chi phí',
    transactionDate: 'Ngày giao dịch',
    referenceNumber: 'Số chứng từ',
    totalIncome: 'Tổng thu',
    totalExpense: 'Tổng chi',
    netProfit: 'Lợi nhuận ròng'
  },
  
  // Status
  status: {
    planning: 'Lập kế hoạch',
    design_basic: 'Thiết kế cơ sở',
    design_technical: 'Thiết kế kỹ thuật',
    construction: 'Thi công',
    completed: 'Hoàn thành',
    todo: 'Chưa làm',
    in_progress: 'Đang làm',
    review: 'Đang kiểm tra',
    pending: 'Chờ xử lý',
    approved: 'Đã duyệt',
    rejected: 'Từ chối'
  },
  
  // Priority
  priority: {
    low: 'Thấp',
    medium: 'Trung bình',
    high: 'Cao',
    urgent: 'Khẩn cấp'
  },
  
  // Expense categories
  expenseCategory: {
    labor: 'Chi phí nhân sự',
    material: 'Vật liệu',
    travel: 'Đi lại',
    overhead: 'Chi phí chung',
    other: 'Khác',
    income: 'Thu nhập'
  },
  
  // Roles
  roles: {
    admin: 'Quản trị viên',
    manager: 'Quản lý BIM',
    coordinator: 'Điều phối viên BIM',
    modeler: 'Người mô hình hóa BIM'
  },
  
  // Messages
  messages: {
    addSuccess: 'Thêm thành công!',
    updateSuccess: 'Cập nhật thành công!',
    deleteSuccess: 'Xóa thành công!',
    deleteConfirm: 'Bạn có chắc chắn muốn xóa?',
    loginSuccess: 'Đăng nhập thành công!',
    loginFailed: 'Tên đăng nhập hoặc mật khẩu không đúng',
    changePasswordSuccess: 'Đổi mật khẩu thành công!',
    changePasswordFailed: 'Đổi mật khẩu thất bại!',
    noPermission: 'Bạn không có quyền thực hiện thao tác này',
    pleaseSelectProject: 'Vui lòng chọn dự án',
    pleaseSelectStaff: 'Vui lòng chọn nhân sự',
    pleaseSelectTask: 'Vui lòng chọn nhiệm vụ'
  },
  
  // Auth
  auth: {
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    username: 'Tên đăng nhập',
    password: 'Mật khẩu',
    changePassword: 'Đổi mật khẩu',
    currentPassword: 'Mật khẩu hiện tại',
    newPassword: 'Mật khẩu mới',
    confirmPassword: 'Xác nhận mật khẩu',
    loggedInAs: 'Đăng nhập với'
  }
};

// Make available globally
window.vi = vi;

// Helper function to get translated text
function t(path) {
  const keys = path.split('.');
  let result = vi;
  for (const key of keys) {
    result = result[key];
    if (!result) return path; // Return path if translation not found
  }
  return result;
}

window.t = t;
