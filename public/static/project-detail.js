// Project Detail View with Tabs
let currentProjectId = null;

// Show project detail
async function showProjectDetail(projectId) {
  currentProjectId = projectId;
  
  try {
    const { data: project } = await axios.get(`/api/projects/${projectId}`);
    
    // Check user permissions
    const user = window.getCurrentUser();
    const canViewFinances = user && user.role === 'Admin';
    
    const detailHTML = `
      <div class="bg-white rounded-lg shadow-lg">
        <!-- Header -->
        <div class="bg-primary text-white p-6 rounded-t-lg">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-2xl font-bold mb-2">${project.name}</h2>
              <p class="text-blue-100">Mã dự án: ${project.code}</p>
            </div>
            <button onclick="closeProjectDetail()" class="text-white hover:bg-blue-700 px-3 py-2 rounded">
              <i class="fas fa-times"></i> Đóng
            </button>
          </div>
        </div>
        
        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="flex space-x-4 px-6" role="tablist">
            <button onclick="switchProjectTab('overview')" id="tab-overview" class="project-tab active px-4 py-3 font-medium text-sm border-b-2 border-primary text-primary">
              <i class="fas fa-info-circle mr-2"></i>Tổng quan
            </button>
            <button onclick="switchProjectTab('categories')" id="tab-categories" class="project-tab px-4 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              <i class="fas fa-folder mr-2"></i>Hạng mục
            </button>
            <button onclick="switchProjectTab('disciplines')" id="tab-disciplines" class="project-tab px-4 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              <i class="fas fa-graduation-cap mr-2"></i>Bộ môn
            </button>
            <button onclick="switchProjectTab('tasks')" id="tab-tasks" class="project-tab px-4 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              <i class="fas fa-tasks mr-2"></i>Nhiệm vụ
            </button>
            ${canViewFinances ? `
            <button onclick="switchProjectTab('finances')" id="tab-finances" class="project-tab px-4 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              <i class="fas fa-dollar-sign mr-2"></i>Thu chi
            </button>
            ` : ''}
          </nav>
        </div>
        
        <!-- Tab Content -->
        <div class="p-6">
          <!-- Overview Tab -->
          <div id="project-tab-overview" class="project-tab-content">
            <div class="grid grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
                <dl class="space-y-3">
                  <div>
                    <dt class="text-sm text-gray-500">Chủ đầu tư</dt>
                    <dd class="text-base font-medium">${project.client}</dd>
                  </div>
                  <div>
                    <dt class="text-sm text-gray-500">Địa điểm</dt>
                    <dd class="text-base font-medium">${project.location || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt class="text-sm text-gray-500">Quản lý dự án</dt>
                    <dd class="text-base font-medium">${project.manager_name || 'Chưa gán'}</dd>
                  </div>
                  <div>
                    <dt class="text-sm text-gray-500">Trạng thái</dt>
                    <dd class="mt-1">${getStatusBadge(project.status, 'project')}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-4">Tài chính</h3>
                <dl class="space-y-3">
                  <div>
                    <dt class="text-sm text-gray-500">Giá trị hợp đồng</dt>
                    <dd class="text-base font-medium text-green-600">${formatCurrency(project.contract_value)}</dd>
                  </div>
                  <div>
                    <dt class="text-sm text-gray-500">Chi phí dự toán</dt>
                    <dd class="text-base font-medium text-orange-600">${formatCurrency(project.estimated_cost)}</dd>
                  </div>
                  <div>
                    <dt class="text-sm text-gray-500">Lợi nhuận dự kiến</dt>
                    <dd class="text-base font-medium text-blue-600">${formatCurrency(project.contract_value - project.estimated_cost)}</dd>
                  </div>
                </dl>
              </div>
            </div>
            ${project.description ? `
              <div class="mt-6">
                <h3 class="text-lg font-semibold mb-2">Mô tả</h3>
                <p class="text-gray-700">${project.description}</p>
              </div>
            ` : ''}
          </div>
          
          <!-- Categories Tab -->
          <div id="project-tab-categories" class="project-tab-content hidden">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">Danh sách Hạng mục</h3>
              <button onclick="openAddCategoryModal(${projectId})" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary">
                <i class="fas fa-plus mr-2"></i>Thêm Hạng mục
              </button>
            </div>
            <div id="categories-list"></div>
          </div>
          
          <!-- Disciplines Tab -->
          <div id="project-tab-disciplines" class="project-tab-content hidden">
            <h3 class="text-lg font-semibold mb-4">Bộ môn trong dự án</h3>
            <div id="disciplines-list"></div>
          </div>
          
          <!-- Tasks Tab -->
          <div id="project-tab-tasks" class="project-tab-content hidden">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">Nhiệm vụ dự án</h3>
              <button onclick="openAddTaskModal(${projectId})" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary">
                <i class="fas fa-plus mr-2"></i>Thêm Nhiệm vụ
              </button>
            </div>
            <div id="project-tasks-list"></div>
          </div>
          
          <!-- Finances Tab -->
          <div id="project-tab-finances" class="project-tab-content hidden">
            <h3 class="text-lg font-semibold mb-4">Thu chi dự án</h3>
            <div id="project-finances-list"></div>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('view-projects').innerHTML = detailHTML;
    
    // Load categories
    loadProjectCategories(projectId);
    
  } catch (error) {
    alert('Lỗi: ' + (error.response?.data?.error || 'Không thể tải chi tiết dự án'));
  }
}

// Switch project tabs
function switchProjectTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.project-tab').forEach(tab => {
    tab.classList.remove('active', 'border-primary', 'text-primary');
    tab.classList.add('border-transparent', 'text-gray-500');
  });
  document.getElementById(`tab-${tabName}`).classList.add('active', 'border-primary', 'text-primary');
  document.getElementById(`tab-${tabName}`).classList.remove('border-transparent', 'text-gray-500');
  
  // Update tab content
  document.querySelectorAll('.project-tab-content').forEach(content => {
    content.classList.add('hidden');
  });
  document.getElementById(`project-tab-${tabName}`).classList.remove('hidden');
  
  // Load data based on tab
  switch(tabName) {
    case 'categories':
      loadProjectCategories(currentProjectId);
      break;
    case 'disciplines':
      loadProjectDisciplines(currentProjectId);
      break;
    case 'tasks':
      loadProjectTasks(currentProjectId);
      break;
    case 'finances':
      loadProjectFinances(currentProjectId);
      break;
  }
}

// Load project categories
async function loadProjectCategories(projectId) {
  try {
    const { data: categories } = await axios.get(`/api/categories?project_id=${projectId}`);
    
    const html = categories.length > 0 ? `
      <div class="space-y-3">
        ${categories.map(cat => `
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h4 class="font-semibold text-gray-800">${cat.name}</h4>
                <p class="text-sm text-gray-500">Mã: ${cat.code}</p>
                ${cat.description ? `<p class="text-sm text-gray-600 mt-2">${cat.description}</p>` : ''}
              </div>
              <div class="flex items-center space-x-2">
                ${getStatusBadge(cat.status || 'pending', 'project')}
                ${hasPermission('manage_projects') ? `
                  <button onclick="editCategory(${cat.id})" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button onclick="deleteCategory(${cat.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i>
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    ` : '<p class="text-gray-500 text-center py-8">Chưa có hạng mục nào</p>';
    
    document.getElementById('categories-list').innerHTML = html;
  } catch (error) {
    document.getElementById('categories-list').innerHTML = '<p class="text-red-500">Lỗi tải hạng mục</p>';
  }
}

// Load project disciplines
async function loadProjectDisciplines(projectId) {
  try {
    const { data: disciplines } = await axios.get('/api/disciplines');
    const { data: project } = await axios.get(`/api/projects/${projectId}`);
    
    const user = window.getCurrentUser();
    const isAdmin = user && user.role === 'Admin';
    
    const html = `
      <div class="grid grid-cols-3 gap-4">
        ${disciplines.map(disc => `
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div class="flex justify-between items-start mb-2">
              <div class="text-3xl">
                ${getDisciplineIcon(disc.code)}
              </div>
              ${isAdmin ? `
                <button onclick="editDiscipline(${disc.id})" class="text-blue-600 hover:text-blue-800 text-sm" title="Chỉnh sửa">
                  <i class="fas fa-edit"></i>
                </button>
              ` : ''}
            </div>
            <h4 class="font-semibold text-gray-800 text-center">${disc.name}</h4>
            <p class="text-xs text-gray-500 text-center">${disc.code}</p>
            ${disc.description ? `<p class="text-xs text-gray-600 mt-2">${disc.description}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
    
    document.getElementById('disciplines-list').innerHTML = html;
  } catch (error) {
    document.getElementById('disciplines-list').innerHTML = '<p class="text-red-500">Lỗi tải bộ môn</p>';
  }
}

// Load project tasks
async function loadProjectTasks(projectId) {
  try {
    const { data: tasks } = await axios.get(`/api/tasks?project_id=${projectId}`);
    
    const html = tasks.length > 0 ? `
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nhiệm vụ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giao cho</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ưu tiên</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giờ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            ${tasks.map(task => `
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3">
                  <div class="font-medium text-gray-900">${task.title}</div>
                  <div class="text-sm text-gray-500">${task.discipline_name || 'N/A'}</div>
                </td>
                <td class="px-4 py-3 text-sm">${task.assigned_name || 'Chưa gán'}</td>
                <td class="px-4 py-3">${getStatusBadge(task.priority, 'priority')}</td>
                <td class="px-4 py-3">${getStatusBadge(task.status, 'task')}</td>
                <td class="px-4 py-3 text-sm">${task.actual_hours || 0}/${task.estimated_hours || 0}h</td>
                <td class="px-4 py-3">
                  <button onclick="showTaskDetail(${task.id})" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : '<p class="text-gray-500 text-center py-8">Chưa có nhiệm vụ nào</p>';
    
    document.getElementById('project-tasks-list').innerHTML = html;
  } catch (error) {
    document.getElementById('project-tasks-list').innerHTML = '<p class="text-red-500">Lỗi tải nhiệm vụ</p>';
  }
}

// Load project finances
async function loadProjectFinances(projectId) {
  try {
    const { data: finances } = await axios.get(`/api/finances?project_id=${projectId}`);
    
    if (!hasPermission('view_finances') && !hasPermission('all')) {
      document.getElementById('project-finances-list').innerHTML = '<p class="text-yellow-600 text-center py-8">Bạn không có quyền xem thông tin thu chi</p>';
      return;
    }
    
    const html = finances.length > 0 ? `
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thu/Chi</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Số tiền</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            ${finances.map(fin => `
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 text-sm">${fin.transaction_date}</td>
                <td class="px-4 py-3 text-sm">${fin.expense_type_name}</td>
                <td class="px-4 py-3">
                  <span class="px-2 py-1 rounded-full text-xs font-semibold ${fin.transaction_type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${fin.transaction_type === 'income' ? 'Thu' : 'Chi'}
                  </span>
                </td>
                <td class="px-4 py-3 text-right font-medium ${fin.transaction_type === 'income' ? 'text-green-600' : 'text-red-600'}">
                  ${formatCurrency(fin.amount)}
                </td>
                <td class="px-4 py-3 text-sm text-gray-600">${fin.description || 'N/A'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : '<p class="text-gray-500 text-center py-8">Chưa có giao dịch nào</p>';
    
    document.getElementById('project-finances-list').innerHTML = html;
  } catch (error) {
    document.getElementById('project-finances-list').innerHTML = '<p class="text-red-500">Lỗi tải thu chi</p>';
  }
}

// Close project detail
function closeProjectDetail() {
  currentProjectId = null;
  showView('projects');
}

// Get discipline icon
function getDisciplineIcon(code) {
  const icons = {
    'AR': '🏛️',
    'ST': '🏗️',
    'EL': '⚡',
    'HVAC': '❄️',
    'PL': '💧',
    'FP': '🔥',
    'CI': '🛤️',
    'TR': '🚗',
    'LA': '🌳'
  };
  return icons[code] || '📐';
}

// Add category modal
function openAddCategoryModal(projectId) {
  // This will be handled by modals.js
  openModal('categoryModal');
  document.getElementById('categoryForm').dataset.projectId = projectId;
}

// Open Add Task Modal
async function openAddTaskModal(projectId) {
  // Load data for dropdowns
  try {
    const [categories, disciplines, staff] = await Promise.all([
      axios.get(`/api/categories?project_id=${projectId}`),
      axios.get('/api/disciplines'),
      axios.get('/api/staff?status=active')
    ]);
    
    // Populate category dropdown
    const categorySelect = document.getElementById('project-task-category');
    categorySelect.innerHTML = '<option value="">-- Chọn hạng mục --</option>' +
      categories.data.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    
    // Populate discipline dropdown
    const disciplineSelect = document.getElementById('project-task-discipline');
    disciplineSelect.innerHTML = '<option value="">-- Chọn bộ môn --</option>' +
      disciplines.data.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    
    // Populate assignee dropdown
    const assigneeSelect = document.getElementById('project-task-assignee');
    assigneeSelect.innerHTML = '<option value="">-- Chọn nhân sự --</option>' +
      staff.data.map(s => `<option value="${s.id}">${s.name} - ${s.position}</option>`).join('');
    
    // Set project_id in form
    document.getElementById('addProjectTaskForm').dataset.projectId = projectId;
    
    // Open modal
    openModal('addProjectTaskModal');
  } catch (error) {
    console.error('Error loading task form data:', error);
    alert('❌ Lỗi tải dữ liệu form. Vui lòng thử lại.');
  }
}

// Edit discipline
async function editDiscipline(disciplineId) {
  try {
    const { data: disc } = await axios.get(`/api/disciplines/${disciplineId}`);
    
    // Fill form
    document.getElementById('edit-discipline-id').value = disc.id;
    document.getElementById('edit-discipline-name').value = disc.name;
    document.getElementById('edit-discipline-code').value = disc.code;
    document.getElementById('edit-discipline-description').value = disc.description || '';
    
    // Open modal
    openModal('editDisciplineModal');
  } catch (error) {
    console.error('Error loading discipline:', error);
    alert('❌ Lỗi tải thông tin bộ môn');
  }
}

// Make functions globally available
window.showProjectDetail = showProjectDetail;
window.switchProjectTab = switchProjectTab;
window.closeProjectDetail = closeProjectDetail;
window.openAddCategoryModal = openAddCategoryModal;
window.openAddTaskModal = openAddTaskModal;
window.editDiscipline = editDiscipline;
window.loadProjectCategories = loadProjectCategories;
window.loadProjectTasks = loadProjectTasks;
window.getDisciplineIcon = getDisciplineIcon;
