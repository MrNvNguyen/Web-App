// Task Detail Modal
let currentTask = null;

// Show task detail
async function showTaskDetail(taskId) {
  try {
    const { data: task } = await axios.get(`/api/tasks/${taskId}`);
    currentTask = task;
    
    const user = getCurrentUser();
    const canEdit = hasPermission('all') || hasPermission('manage_tasks') || 
                    (hasPermission('update_task_status') && task.assigned_to === user?.id);
    
    const modalHTML = `
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h3 class="text-xl font-bold">Chi tiết Nhiệm vụ</h3>
          <button onclick="closeTaskDetailModal()" class="text-white hover:bg-blue-700 px-2 py-1 rounded">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-6 space-y-6">
          <!-- Task Info -->
          <div>
            <h4 class="text-lg font-semibold mb-3">${task.title}</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm text-gray-500">Dự án</label>
                <p class="font-medium">${task.project_name || 'N/A'}</p>
              </div>
              <div>
                <label class="text-sm text-gray-500">Bộ môn</label>
                <p class="font-medium">${task.discipline_name || 'N/A'}</p>
              </div>
              <div>
                <label class="text-sm text-gray-500">Giao cho</label>
                <p class="font-medium">${task.assigned_name || 'Chưa gán'}</p>
              </div>
              <div>
                <label class="text-sm text-gray-500">Hạn hoàn thành</label>
                <p class="font-medium">${task.due_date || 'Không có'}</p>
              </div>
            </div>
          </div>
          
          <!-- Progress & Status -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="text-sm font-medium text-gray-700">Trạng thái</label>
                ${canEdit ? `
                  <select id="taskStatus" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
                    <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>Chưa làm</option>
                    <option value="in_progress" ${task.status === 'in_progress' ? 'selected' : ''}>Đang làm</option>
                    <option value="review" ${task.status === 'review' ? 'selected' : ''}>Đang kiểm tra</option>
                    <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Hoàn thành</option>
                  </select>
                ` : `
                  <p class="mt-1">${getStatusBadge(task.status, 'task')}</p>
                `}
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700">Tiến độ (%)</label>
                ${canEdit ? `
                  <input type="number" id="taskProgress" min="0" max="100" value="${task.progress || 0}" 
                    class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
                ` : `
                  <p class="mt-1 font-medium text-primary">${task.progress || 0}%</p>
                `}
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="mt-2">
              <div class="flex justify-between text-sm mb-1">
                <span>Tiến độ hoàn thành</span>
                <span class="font-medium">${task.progress || 0}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-primary rounded-full h-3 transition-all" style="width: ${task.progress || 0}%"></div>
              </div>
            </div>
          </div>
          
          <!-- Hours -->
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center p-3 bg-blue-50 rounded-lg">
              <p class="text-sm text-gray-600">Giờ ước tính</p>
              <p class="text-2xl font-bold text-blue-600">${task.estimated_hours || 0}h</p>
            </div>
            <div class="text-center p-3 bg-green-50 rounded-lg">
              <p class="text-sm text-gray-600">Giờ thực tế</p>
              <p class="text-2xl font-bold text-green-600">${task.actual_hours || 0}h</p>
            </div>
            <div class="text-center p-3 ${(task.actual_hours || 0) > (task.estimated_hours || 0) ? 'bg-red-50' : 'bg-gray-50'} rounded-lg">
              <p class="text-sm text-gray-600">Chênh lệch</p>
              <p class="text-2xl font-bold ${(task.actual_hours || 0) > (task.estimated_hours || 0) ? 'text-red-600' : 'text-gray-600'}">
                ${((task.actual_hours || 0) - (task.estimated_hours || 0)).toFixed(1)}h
              </p>
            </div>
          </div>
          
          <!-- Priority -->
          <div>
            <label class="text-sm font-medium text-gray-700">Ưu tiên</label>
            <div class="mt-1">${getStatusBadge(task.priority, 'priority')}</div>
          </div>
          
          <!-- Description -->
          ${task.description ? `
            <div>
              <label class="text-sm font-medium text-gray-700">Mô tả</label>
              <p class="mt-1 text-gray-600 whitespace-pre-wrap">${task.description}</p>
            </div>
          ` : ''}
          
          <!-- Actions -->
          ${canEdit ? `
            <div class="flex justify-end space-x-3 pt-4 border-t">
              <button onclick="closeTaskDetailModal()" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Đóng
              </button>
              <button onclick="saveTaskUpdate()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
                <i class="fas fa-save mr-2"></i>Lưu thay đổi
              </button>
            </div>
          ` : `
            <div class="flex justify-end pt-4 border-t">
              <button onclick="closeTaskDetailModal()" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                Đóng
              </button>
            </div>
          `}
        </div>
      </div>
    `;
    
    // Create modal if not exists
    let modal = document.getElementById('taskDetailModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'taskDetailModal';
      modal.className = 'modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50';
      document.body.appendChild(modal);
    }
    
    modal.innerHTML = modalHTML;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
  } catch (error) {
    alert('Lỗi: ' + (error.response?.data?.error || 'Không thể tải chi tiết nhiệm vụ'));
  }
}

// Close task detail modal
function closeTaskDetailModal() {
  const modal = document.getElementById('taskDetailModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  currentTask = null;
}

// Save task update
async function saveTaskUpdate() {
  if (!currentTask) return;
  
  const status = document.getElementById('taskStatus')?.value;
  const progress = parseInt(document.getElementById('taskProgress')?.value || 0);
  
  // Validation
  if (progress < 0 || progress > 100) {
    alert('Tiến độ phải từ 0-100%');
    return;
  }
  
  try {
    await axios.put(`/api/tasks/${currentTask.id}`, {
      ...currentTask,
      status: status || currentTask.status,
      progress: progress
    });
    
    alert('✅ Cập nhật nhiệm vụ thành công!');
    closeTaskDetailModal();
    
    // Reload current view
    const currentView = document.querySelector('.view-content:not(.hidden)');
    if (currentView?.id === 'view-tasks') {
      loadTasks();
    } else if (currentProjectId) {
      loadProjectTasks(currentProjectId);
    }
  } catch (error) {
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể cập nhật nhiệm vụ'));
  }
}

// Make functions globally available
window.showTaskDetail = showTaskDetail;
window.closeTaskDetailModal = closeTaskDetailModal;
window.saveTaskUpdate = saveTaskUpdate;
