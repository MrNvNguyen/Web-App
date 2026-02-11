// Modal HTML templates and form handlers
const modalTemplates = `
<!-- Category Modal -->
<div id="categoryModal" class="modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">Thêm Hạng mục</h3>
      <button onclick="closeModal('categoryModal')" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form id="categoryForm" onsubmit="handleCategorySubmit(event)">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên hạng mục *</label>
          <input type="text" name="name" required placeholder="VD: Thiết kế kiến trúc" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mã hạng mục *</label>
          <input type="text" name="code" required placeholder="VD: TKKT" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea name="description" rows="3" placeholder="Mô tả chi tiết về hạng mục..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"></textarea>
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" onclick="closeModal('categoryModal')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
          Thêm
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Add Task in Project Modal -->
<div id="addProjectTaskModal" class="modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">Thêm Nhiệm vụ</h3>
      <button onclick="closeModal('addProjectTaskModal')" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form id="addProjectTaskForm" onsubmit="handleProjectTaskSubmit(event)">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
          <input type="text" name="title" required placeholder="VD: Mô hình 3D tầng 1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hạng mục</label>
            <select name="category_id" id="project-task-category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
              <option value="">-- Chọn hạng mục --</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bộ môn</label>
            <select name="discipline_id" id="project-task-discipline" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
              <option value="">-- Chọn bộ môn --</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giao cho</label>
            <select name="assigned_to" id="project-task-assignee" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
              <option value="">-- Chọn nhân sự --</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giờ dự kiến</label>
            <input type="number" name="estimated_hours" step="0.5" min="0" value="8" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ưu tiên</label>
            <select name="priority" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
              <option value="low">Thấp</option>
              <option value="medium" selected>Trung bình</option>
              <option value="high">Cao</option>
              <option value="urgent">Khẩn cấp</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hạn hoàn thành</label>
            <input type="date" name="due_date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea name="description" rows="3" placeholder="Mô tả chi tiết nhiệm vụ..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"></textarea>
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" onclick="closeModal('addProjectTaskModal')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
          Thêm
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Edit Discipline Modal -->
<div id="editDisciplineModal" class="modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">Chỉnh sửa Bộ môn</h3>
      <button onclick="closeModal('editDisciplineModal')" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form id="editDisciplineForm" onsubmit="handleEditDisciplineSubmit(event)">
      <input type="hidden" name="id" id="edit-discipline-id">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên bộ môn *</label>
          <input type="text" name="name" id="edit-discipline-name" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mã bộ môn *</label>
          <input type="text" name="code" id="edit-discipline-code" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea name="description" id="edit-discipline-description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"></textarea>
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" onclick="closeModal('editDisciplineModal')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
          Lưu
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Expense Type Modal -->
<div id="expenseTypeModal" class="modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">Thêm Loại Chi Phí</h3>
      <button onclick="closeModal('expenseTypeModal')" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form id="expenseTypeForm" onsubmit="handleExpenseTypeSubmit(event)">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên loại chi phí *</label>
          <input type="text" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
          <select name="category" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">-- Chọn danh mục --</option>
            <option value="labor">Labor (Chi phí nhân sự)</option>
            <option value="material">Material (Vật liệu)</option>
            <option value="travel">Travel (Đi lại)</option>
            <option value="overhead">Overhead (Chi phí chung)</option>
            <option value="other">Other (Khác)</option>
            <option value="income">Income (Thu nhập)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea name="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" onclick="closeModal('expenseTypeModal')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
          Thêm
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Project Modal -->
<div id="projectModal" class="modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">Thêm Dự Án</h3>
      <button onclick="closeModal('projectModal')" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form id="projectForm" onsubmit="handleProjectSubmit(event)">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên dự án *</label>
          <input type="text" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mã dự án *</label>
          <input type="text" name="code" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Chủ đầu tư *</label>
          <input type="text" name="client" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
          <input type="text" name="location" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Người quản lý</label>
          <select name="project_manager_id" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">-- Chọn người quản lý --</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
          <input type="date" name="start_date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc</label>
          <input type="date" name="end_date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Giá trị hợp đồng (VNĐ)</label>
          <input type="number" name="contract_value" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Chi phí dự toán (VNĐ)</label>
          <input type="number" name="estimated_cost" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
          <select name="status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="planning">Planning</option>
            <option value="design_basic">Design Basic</option>
            <option value="design_technical">Design Technical</option>
            <option value="construction">Construction</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea name="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"></textarea>
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" onclick="closeModal('projectModal')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
          Thêm
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Staff Modal -->
<div id="staffModal" class="modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">Thêm Nhân Sự</h3>
      <button onclick="closeModal('staffModal')" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form id="staffForm" onsubmit="handleStaffSubmit(event)">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
          <input type="text" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Chức vụ *</label>
          <input type="text" name="position" required placeholder="VD: BIM Manager, BIM Coordinator..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lương/giờ (VNĐ) *</label>
          <input type="number" name="hourly_rate" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          <input type="tel" name="phone" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
          <select name="status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" onclick="closeModal('staffModal')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
          Thêm
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Task Modal -->
<div id="taskModal" class="modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">Thêm Nhiệm Vụ</h3>
      <button onclick="closeModal('taskModal')" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form id="taskForm" onsubmit="handleTaskSubmit(event)">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Dự án *</label>
          <select name="project_id" required onchange="loadCategories(this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">-- Chọn dự án --</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Hạng mục</label>
          <select name="category_id" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">-- Chọn hạng mục --</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Bộ môn</label>
          <select name="discipline_id" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">-- Chọn bộ môn --</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên nhiệm vụ *</label>
          <input type="text" name="title" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea name="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Giao cho</label>
          <select name="assigned_to" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">-- Chọn nhân sự --</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Số giờ ước tính</label>
          <input type="number" name="estimated_hours" step="0.5" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ưu tiên</label>
            <select name="priority" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
              <option value="low">Low</option>
              <option value="medium" selected>Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select name="status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
              <option value="todo" selected>Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Hạn hoàn thành</label>
          <input type="date" name="due_date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" onclick="closeModal('taskModal')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
          Thêm
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Timesheet Modal -->
<div id="timesheetModal" class="modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">Thêm Timesheet</h3>
      <button onclick="closeModal('timesheetModal')" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form id="timesheetForm" onsubmit="handleTimesheetSubmit(event)">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nhân sự *</label>
          <select name="staff_id" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">-- Chọn nhân sự --</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Dự án *</label>
          <select name="project_id" required onchange="loadTasksForTimesheet(this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">-- Chọn dự án --</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nhiệm vụ *</label>
          <select name="task_id" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">-- Chọn nhiệm vụ --</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ngày làm việc *</label>
          <input type="date" name="work_date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Số giờ *</label>
          <input type="number" name="hours" required step="0.5" min="0.5" max="24" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Giờ tăng ca (OT)</label>
          <input type="number" name="overtime_hours" step="0.5" min="0" max="12" value="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
          <p class="text-xs text-gray-500 mt-1">Giờ làm thêm ngoài giờ hành chính</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả công việc</label>
          <textarea name="description" rows="3" placeholder="Mô tả những gì đã làm trong ngày..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"></textarea>
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" onclick="closeModal('timesheetModal')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
          Thêm
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Finance Modal -->
<div id="financeModal" class="modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">Thêm Thu Chi</h3>
      <button onclick="closeModal('financeModal')" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form id="financeForm" onsubmit="handleFinanceSubmit(event)">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Dự án *</label>
          <select name="project_id" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">-- Chọn dự án --</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Loại chi phí * 
            <button type="button" onclick="showExpenseTypeModal()" class="text-primary hover:text-secondary text-xs ml-2">
              <i class="fas fa-plus"></i> Thêm mới
            </button>
          </label>
          <select name="expense_type_id" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="">-- Chọn loại chi phí --</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Loại giao dịch *</label>
          <select name="transaction_type" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
            <option value="income">Thu (Income)</option>
            <option value="expense">Chi (Expense)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Số tiền (VNĐ) *</label>
          <input type="number" name="amount" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ngày giao dịch *</label>
          <input type="date" name="transaction_date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Số chứng từ</label>
          <input type="text" name="reference_no" placeholder="VD: TT-001-2024" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea name="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"></textarea>
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button type="button" onclick="closeModal('financeModal')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
          Thêm
        </button>
      </div>
    </form>
  </div>
</div>
`;

// Make modalTemplates available globally
window.modalTemplates = modalTemplates;

// ==================== MODAL MANAGEMENT FUNCTIONS ====================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Show modals
function showExpenseTypeModal() {
  openModal('expenseTypeModal');
}

function showProjectForm() {
  console.log('🎯 showProjectForm called');
  try {
    loadStaffForSelect();
    openModal('projectModal');
    console.log('✅ Project modal opened');
  } catch (error) {
    console.error('❌ Error in showProjectForm:', error);
  }
}

function showStaffForm() {
  console.log('🎯 showStaffForm called');
  try {
    openModal('staffModal');
    console.log('✅ Staff modal opened');
  } catch (error) {
    console.error('❌ Error in showStaffForm:', error);
  }
}

function showTaskForm() {
  console.log('🎯 showTaskForm called');
  try {
    loadProjectsForSelect();
    loadStaffForSelect();
    loadDisciplinesForSelect();
    openModal('taskModal');
    console.log('✅ Task modal opened');
  } catch (error) {
    console.error('❌ Error in showTaskForm:', error);
  }
}

function showTimesheetForm() {
  loadStaffForSelect();
  loadProjectsForSelect();
  openModal('timesheetModal');
}

function showFinanceForm() {
  loadProjectsForSelect();
  loadExpenseTypesForSelect();
  openModal('financeModal');
}

// Load data for selects
async function loadStaffForSelect() {
  try {
    const { data } = await axios.get('/api/staff?status=active');
    const selects = document.querySelectorAll('select[name="project_manager_id"], select[name="assigned_to"], select[name="staff_id"]');
    selects.forEach(select => {
      const currentValue = select.value;
      select.innerHTML = '<option value="">-- Chọn nhân sự --</option>';
      data.forEach(s => {
        select.innerHTML += \`<option value="\${s.id}">\${s.name} - \${s.position}</option>\`;
      });
      if (currentValue) select.value = currentValue;
    });
  } catch (error) {
    console.error('Error loading staff:', error);
  }
}

async function loadProjectsForSelect() {
  try {
    const { data } = await axios.get('/api/projects');
    const selects = document.querySelectorAll('select[name="project_id"]');
    selects.forEach(select => {
      const currentValue = select.value;
      select.innerHTML = '<option value="">-- Chọn dự án --</option>';
      data.forEach(p => {
        select.innerHTML += \`<option value="\${p.id}">\${p.code} - \${p.name}</option>\`;
      });
      if (currentValue) select.value = currentValue;
    });
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

async function loadDisciplinesForSelect() {
  try {
    const { data } = await axios.get('/api/disciplines');
    const select = document.querySelector('select[name="discipline_id"]');
    select.innerHTML = '<option value="">-- Chọn bộ môn --</option>';
    data.forEach(d => {
      select.innerHTML += \`<option value="\${d.id}">\${d.name} (\${d.code})</option>\`;
    });
  } catch (error) {
    console.error('Error loading disciplines:', error);
  }
}

async function loadExpenseTypesForSelect() {
  try {
    const { data } = await axios.get('/api/expense-types');
    const select = document.querySelector('select[name="expense_type_id"]');
    select.innerHTML = '<option value="">-- Chọn loại chi phí --</option>';
    data.forEach(et => {
      select.innerHTML += \`<option value="\${et.id}">\${et.name} (\${et.category})</option>\`;
    });
  } catch (error) {
    console.error('Error loading expense types:', error);
  }
}

async function loadCategories(projectId) {
  if (!projectId) return;
  try {
    const { data } = await axios.get('/api/categories?project_id=' + projectId);
    const select = document.querySelector('select[name="category_id"]');
    select.innerHTML = '<option value="">-- Chọn hạng mục --</option>';
    data.forEach(c => {
      select.innerHTML += \`<option value="\${c.id}">\${c.name} (\${c.code})</option>\`;
    });
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

async function loadTasksForTimesheet(projectId) {
  if (!projectId) return;
  try {
    const { data } = await axios.get('/api/tasks?project_id=' + projectId);
    const select = document.querySelector('#timesheetForm select[name="task_id"]');
    select.innerHTML = '<option value="">-- Chọn nhiệm vụ --</option>';
    data.forEach(t => {
      select.innerHTML += \`<option value="\${t.id}">\${t.title}</option>\`;
    });
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

// Form submit handlers
async function handleExpenseTypeSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  try {
    await axios.post('/api/expense-types', data);
    alert('Thêm loại chi phí thành công!');
    form.reset();
    closeModal('expenseTypeModal');
    loadExpenseTypesForSelect(); // Reload expense types
  } catch (error) {
    alert('Lỗi: ' + (error.response?.data?.error || 'Không thể thêm loại chi phí'));
  }
}

async function handleProjectSubmit(event) {
  event.preventDefault();
  console.log('🚀 handleProjectSubmit called');
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  console.log('📝 Form data:', data);
  
  // Convert to numbers
  data.contract_value = parseFloat(data.contract_value) || 0;
  data.estimated_cost = parseFloat(data.estimated_cost) || 0;
  data.project_manager_id = data.project_manager_id ? parseInt(data.project_manager_id) : null;
  
  console.log('✅ Processed data:', data);
  
  try {
    const response = await axios.post('/api/projects', data);
    console.log('✅ Server response:', response.data);
    alert('✅ Thêm dự án thành công!');
    form.reset();
    closeModal('projectModal');
    if (typeof loadProjects !== 'undefined') {
      loadProjects(); // Reload projects table
    }
  } catch (error) {
    console.error('❌ Error:', error);
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể thêm dự án'));
  }
}

async function handleStaffSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  data.hourly_rate = parseFloat(data.hourly_rate) || 0;
  
  try {
    const response = await axios.post('/api/staff', data);
    const newStaff = response.data;
    
    // Auto-create login account for new staff
    // Generate username from email (part before @)
    const username = data.email.split('@')[0];
    // Default password: first name + "123"
    const firstName = data.name.split(' ').pop().toLowerCase();
    const password = firstName + '123';
    
    // Add to accounts in localStorage
    const accounts = JSON.parse(localStorage.getItem('bim_accounts') || '[]');
    accounts.push({
      username: username,
      password: password,
      name: data.name,
      role: data.position,
      email: data.email
    });
    localStorage.setItem('bim_accounts', JSON.stringify(accounts));
    
    alert(`✅ Thêm nhân sự thành công!\n\n🔐 Thông tin đăng nhập:\nUsername: ${username}\nPassword: ${password}\n\n(Người dùng nên đổi mật khẩu sau lần đăng nhập đầu tiên)`);
    form.reset();
    closeModal('staffModal');
    loadStaff(); // Reload staff table
  } catch (error) {
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể thêm nhân sự'));
  }
}

async function handleTaskSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Convert to correct types
  data.project_id = parseInt(data.project_id);
  data.category_id = data.category_id ? parseInt(data.category_id) : null;
  data.discipline_id = data.discipline_id ? parseInt(data.discipline_id) : null;
  data.assigned_to = data.assigned_to ? parseInt(data.assigned_to) : null;
  data.estimated_hours = parseFloat(data.estimated_hours) || 0;
  
  try {
    await axios.post('/api/tasks', data);
    alert('Thêm nhiệm vụ thành công!');
    form.reset();
    closeModal('taskModal');
    loadTasks(); // Reload tasks table
  } catch (error) {
    alert('Lỗi: ' + (error.response?.data?.error || 'Không thể thêm nhiệm vụ'));
  }
}

async function handleTimesheetSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Convert to correct types
  data.staff_id = parseInt(data.staff_id);
  data.project_id = parseInt(data.project_id);
  data.task_id = parseInt(data.task_id);
  data.hours = parseFloat(data.hours);
  data.overtime_hours = parseFloat(data.overtime_hours || 0);
  
  try {
    await axios.post('/api/timesheets', data);
    alert('Thêm timesheet thành công!');
    form.reset();
    closeModal('timesheetModal');
    loadTimesheets(); // Reload timesheets table
  } catch (error) {
    alert('Lỗi: ' + (error.response?.data?.error || 'Không thể thêm timesheet'));
  }
}

async function handleFinanceSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Convert to correct types
  data.project_id = parseInt(data.project_id);
  data.expense_type_id = parseInt(data.expense_type_id);
  data.amount = parseFloat(data.amount);
  
  try {
    await axios.post('/api/finances', data);
    alert('Thêm giao dịch thu chi thành công!');
    form.reset();
    closeModal('financeModal');
    loadFinances(); // Reload finances table
    loadDashboard(); // Refresh dashboard stats
  } catch (error) {
    alert('Lỗi: ' + (error.response?.data?.error || 'Không thể thêm giao dịch'));
  }
}

// ==================== CATEGORY FORM HANDLER ====================
async function handleCategorySubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Get project_id from form dataset
  const projectId = parseInt(form.dataset.projectId);
  if (!projectId) {
    alert('Lỗi: Không xác định được dự án');
    return;
  }
  
  data.project_id = projectId;
  
  try {
    await axios.post('/api/categories', data);
    alert('✅ Thêm hạng mục thành công!');
    form.reset();
    closeModal('categoryModal');
    
    // Reload categories in project detail
    if (window.loadProjectCategories) {
      window.loadProjectCategories(projectId);
    }
  } catch (error) {
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể thêm hạng mục'));
  }
}

// ==================== PROJECT TASK FORM HANDLER ====================
async function handleProjectTaskSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Get project_id from form dataset
  const projectId = parseInt(form.dataset.projectId);
  if (!projectId) {
    alert('Lỗi: Không xác định được dự án');
    return;
  }
  
  data.project_id = projectId;
  
  // Convert to correct types
  if (data.category_id) data.category_id = parseInt(data.category_id);
  if (data.discipline_id) data.discipline_id = parseInt(data.discipline_id);
  if (data.assigned_to) data.assigned_to = parseInt(data.assigned_to);
  data.estimated_hours = parseFloat(data.estimated_hours || 0);
  
  try {
    await axios.post('/api/tasks', data);
    alert('✅ Thêm nhiệm vụ thành công!');
    form.reset();
    closeModal('addProjectTaskModal');
    
    // Reload tasks in project detail
    if (window.loadProjectTasks) {
      window.loadProjectTasks(projectId);
    }
    
    // Also reload main tasks table if on that view
    if (typeof loadTasks !== 'undefined') {
      loadTasks();
    }
  } catch (error) {
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể thêm nhiệm vụ'));
  }
}

// ==================== EDIT DISCIPLINE HANDLER ====================
async function handleEditDisciplineSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  const disciplineId = parseInt(data.id);
  if (!disciplineId) {
    alert('Lỗi: Không xác định được bộ môn');
    return;
  }
  
  // Remove id from data (it's in URL)
  delete data.id;
  
  try {
    await axios.put(`/api/disciplines/${disciplineId}`, data);
    alert('✅ Cập nhật bộ môn thành công!');
    closeModal('editDisciplineModal');
    
    // Reload disciplines if in project detail
    if (window.currentProjectId && window.loadProjectDisciplines) {
      window.loadProjectDisciplines(window.currentProjectId);
    }
  } catch (error) {
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể cập nhật bộ môn'));
  }
}

// ==================== EXPORT ALL FUNCTIONS ====================
// Modal management
window.openModal = openModal;
window.closeModal = closeModal;

// Show modal functions
window.showExpenseTypeModal = showExpenseTypeModal;
window.showProjectForm = showProjectForm;
window.showStaffForm = showStaffForm;
window.showTaskForm = showTaskForm;
window.showTimesheetForm = showTimesheetForm;
window.showFinanceForm = showFinanceForm;

// Form handlers
window.handleProjectSubmit = handleProjectSubmit;
window.handleStaffSubmit = handleStaffSubmit;
window.handleTaskSubmit = handleTaskSubmit;
window.handleTimesheetSubmit = handleTimesheetSubmit;
window.handleFinanceSubmit = handleFinanceSubmit;
window.handleExpenseTypeSubmit = handleExpenseTypeSubmit;
window.handleCategorySubmit = handleCategorySubmit;
window.handleProjectTaskSubmit = handleProjectTaskSubmit;
window.handleEditDisciplineSubmit = handleEditDisciplineSubmit;
