// BIM Management System - Frontend JavaScript

// ==================== VIEW MANAGEMENT ====================
function showView(viewName) {
  document.querySelectorAll('.view-content').forEach(el => el.classList.add('hidden'))
  document.getElementById('view-' + viewName).classList.remove('hidden')
  
  // Load data based on view
  switch(viewName) {
    case 'dashboard': loadDashboard(); break;
    case 'projects': loadProjects(); break;
    case 'staff': loadStaff(); break;
    case 'tasks': loadTasks(); break;
    case 'timesheets': loadTimesheets(); break;
    case 'finances': loadFinances(); break;
  }
}

// ==================== STATUS BADGE HELPER ====================
function getStatusBadge(status, type) {
  const statusConfig = {
    project: {
      planning: 'bg-yellow-100 text-yellow-800',
      design_basic: 'bg-blue-100 text-blue-800',
      design_technical: 'bg-purple-100 text-purple-800',
      construction: 'bg-orange-100 text-orange-800',
      completed: 'bg-green-100 text-green-800'
    },
    task: {
      todo: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      review: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800'
    },
    priority: {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    }
  }
  
  const config = statusConfig[type] || {}
  const colorClass = config[status] || 'bg-gray-100 text-gray-800'
  return `<span class="status-badge ${colorClass}">${status}</span>`
}

// ==================== FORMAT CURRENCY ====================
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ'
}

// ==================== LOAD DASHBOARD ====================
async function loadDashboard() {
  try {
    const { data } = await axios.get('/api/dashboard/stats')
    
    // Update stats cards
    const totalProjects = data.projects.reduce((sum, p) => sum + p.count, 0)
    document.getElementById('total-projects').textContent = totalProjects
    document.getElementById('total-staff').textContent = data.staff.count || 0
    
    const activeTasks = data.tasks.find(t => t.status === 'in_progress')
    document.getElementById('active-tasks').textContent = activeTasks ? activeTasks.count : 0
    
    const income = data.finances.find(f => f.transaction_type === 'income')?.total || 0
    const expense = data.finances.find(f => f.transaction_type === 'expense')?.total || 0
    const profit = (income - expense) / 1000000000
    document.getElementById('profit').textContent = profit.toFixed(2)
    
    // Display overdue tasks
    const overdueTasks = data.overdueTasks?.count || 0
    const overdueEl = document.getElementById('overdue-tasks')
    if (overdueEl) {
      overdueEl.textContent = overdueTasks
      const container = document.getElementById('overdue-container')
      if (container) {
        container.className = overdueTasks > 0 
          ? 'bg-red-50 border-l-4 border-red-500 p-4 rounded' 
          : 'bg-green-50 border-l-4 border-green-500 p-4 rounded'
      }
    }
    
    // Display staff performance
    if (data.staffPerformance && data.staffPerformance.length > 0) {
      const perfTableBody = document.getElementById('staff-performance-table')
      if (perfTableBody) {
        perfTableBody.innerHTML = data.staffPerformance.map(s => `
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-3 text-sm text-gray-900">${s.name || 'N/A'}</td>
            <td class="px-4 py-3 text-sm text-center">${s.total_tasks || 0}</td>
            <td class="px-4 py-3 text-sm text-center">${s.completed_tasks || 0}</td>
            <td class="px-4 py-3 text-sm text-center">${s.total_hours || 0}h</td>
            <td class="px-4 py-3 text-sm text-center">
              <span class="font-semibold ${s.completion_rate >= 80 ? 'text-green-600' : s.completion_rate >= 50 ? 'text-yellow-600' : 'text-red-600'}">
                ${s.completion_rate || 0}%
              </span>
            </td>
          </tr>
        `).join('')
      }
    }
    
    // Destroy existing charts if they exist
    const projectChartCanvas = document.getElementById('projectStatusChart');
    const taskChartCanvas = document.getElementById('taskStatusChart');
    
    if (window.projectChart) window.projectChart.destroy();
    if (window.taskChart) window.taskChart.destroy();
    
    // Project Status Chart
    const projectLabels = data.projects.map(p => p.status)
    const projectCounts = data.projects.map(p => p.count)
    
    window.projectChart = new Chart(projectChartCanvas, {
      type: 'doughnut',
      data: {
        labels: projectLabels,
        datasets: [{
          data: projectCounts,
          backgroundColor: ['#FCD34D', '#60A5FA', '#A78BFA', '#FB923C', '#34D399']
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
    
    // Task Status Chart
    const taskLabels = data.tasks.map(t => t.status)
    const taskCounts = data.tasks.map(t => t.count)
    
    window.taskChart = new Chart(taskChartCanvas, {
      type: 'bar',
      data: {
        labels: taskLabels,
        datasets: [{
          label: 'Số lượng',
          data: taskCounts,
          backgroundColor: '#0066CC'
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  } catch (error) {
    console.error('Error loading dashboard:', error)
  }
}

// ==================== LOAD PROJECTS ====================
async function loadProjects() {
  try {
    const { data } = await axios.get('/api/projects')
    const tbody = document.getElementById('projects-table')
    tbody.innerHTML = data.map(p => `
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${p.code}</td>
        <td class="px-6 py-4 text-sm">
          <button onclick="showProjectDetail(${p.id})" class="text-primary hover:text-secondary font-medium hover:underline text-left">
            ${p.name}
          </button>
        </td>
        <td class="px-6 py-4 text-sm text-gray-700">${p.client}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${getStatusBadge(p.status, 'project')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${formatCurrency(p.contract_value)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button onclick="showProjectDetail(${p.id})" class="text-primary hover:text-secondary" title="Xem chi tiết">
            <i class="fas fa-eye"></i>
          </button>
        </td>
      </tr>
    `).join('')
  } catch (error) {
    console.error('Error loading projects:', error)
  }
}

// ==================== LOAD STAFF ====================
async function loadStaff() {
  try {
    const { data } = await axios.get('/api/staff')
    const tbody = document.getElementById('staff-table')
    if (!tbody) {
      console.error('Staff table element not found')
      return
    }
    
    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">Chưa có nhân sự nào</td></tr>'
      return
    }
    
    tbody.innerHTML = data.map(s => `
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <button onclick="viewStaffDetail(${s.id})" class="text-primary hover:underline">
            ${s.name}
          </button>
        </td>
        <td class="px-6 py-4 text-sm text-gray-700">${s.email}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${s.position}</td>
        <td class="salary-column px-6 py-4 whitespace-nowrap text-sm text-gray-700">${formatCurrency(s.hourly_rate)}/giờ</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${getStatusBadge(s.status, 'project')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button onclick="viewStaffDetail(${s.id})" class="text-primary hover:text-secondary" title="Xem chi tiết">
            <i class="fas fa-eye"></i>
          </button>
        </td>
      </tr>
    `).join('')
  } catch (error) {
    console.error('Error loading staff:', error)
    const tbody = document.getElementById('staff-table')
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">❌ Lỗi tải dữ liệu nhân sự. Vui lòng thử lại.</td></tr>'
    }
  }
}

// ==================== LOAD TASKS ====================
async function loadTasks() {
  try {
    const { data } = await axios.get('/api/tasks')
    const tbody = document.getElementById('tasks-table')
    tbody.innerHTML = data.map(t => `
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 text-sm">
          <button onclick="showTaskDetail(${t.id})" class="text-primary hover:text-secondary font-medium hover:underline text-left">
            ${t.title}
          </button>
        </td>
        <td class="px-6 py-4 text-sm text-gray-700">${t.project_name}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${t.assigned_name || '-'}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${getStatusBadge(t.priority, 'priority')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${getStatusBadge(t.status, 'task')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          ${t.progress !== undefined ? `
            <div class="flex items-center space-x-2">
              <div class="w-20 bg-gray-200 rounded-full h-2">
                <div class="bg-primary rounded-full h-2" style="width: ${t.progress}%"></div>
              </div>
              <span class="text-xs">${t.progress}%</span>
            </div>
          ` : '-'}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${t.due_date || '-'}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button onclick="showTaskDetail(${t.id})" class="text-primary hover:text-secondary" title="Xem chi tiết">
            <i class="fas fa-eye"></i>
          </button>
        </td>
      </tr>
    `).join('')
  } catch (error) {
    console.error('Error loading tasks:', error)
  }
}

// ==================== LOAD TIMESHEETS ====================
async function loadTimesheets() {
  try {
    const { data } = await axios.get('/api/timesheets')
    const tbody = document.getElementById('timesheets-table')
    tbody.innerHTML = data.map(t => `
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${t.work_date}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${t.staff_name}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${t.project_name}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${t.task_title}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${t.hours}h</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">${t.overtime_hours || 0}h</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${getStatusBadge(t.status, 'task')}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button class="text-green-600 hover:text-green-800">
            <i class="fas fa-check"></i>
          </button>
        </td>
      </tr>
    `).join('')
  } catch (error) {
    console.error('Error loading timesheets:', error)
  }
}

// ==================== LOAD FINANCES ====================
async function loadFinances() {
  try {
    const { data } = await axios.get('/api/finances')
    const tbody = document.getElementById('finances-table')
    tbody.innerHTML = data.map(f => `
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${f.transaction_date}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${f.project_name}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${f.expense_type_name}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <span class="status-badge ${f.transaction_type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
            ${f.transaction_type === 'income' ? 'Thu' : 'Chi'}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ${f.transaction_type === 'income' ? 'text-green-600' : 'text-red-600'}">
          ${formatCurrency(f.amount)}
        </td>
        <td class="px-6 py-4 text-sm text-gray-700">${f.description || '-'}</td>
      </tr>
    `).join('')
  } catch (error) {
    console.error('Error loading finances:', error)
  }
}

// ==================== MODAL MANAGEMENT ====================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// ==================== SHOW MODALS ====================
function showExpenseTypeModal() {
  openModal('expenseTypeModal');
}

function showProjectForm() {
  loadStaffForSelect();
  openModal('projectModal');
}

function showStaffForm() {
  openModal('staffModal');
}

function showTaskForm() {
  loadProjectsForSelect();
  loadStaffForSelect();
  loadDisciplinesForSelect();
  openModal('taskModal');
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

// ==================== LOAD DATA FOR SELECTS ====================
async function loadStaffForSelect() {
  try {
    const { data } = await axios.get('/api/staff?status=active');
    const selects = document.querySelectorAll('select[name="project_manager_id"], select[name="assigned_to"], select[name="staff_id"]');
    selects.forEach(select => {
      const currentValue = select.value;
      select.innerHTML = '<option value="">-- Chọn nhân sự --</option>';
      data.forEach(s => {
        select.innerHTML += `<option value="${s.id}">${s.name} - ${s.position}</option>`;
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
        select.innerHTML += `<option value="${p.id}">${p.code} - ${p.name}</option>`;
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
    if (select) {
      select.innerHTML = '<option value="">-- Chọn bộ môn --</option>';
      data.forEach(d => {
        select.innerHTML += `<option value="${d.id}">${d.name} (${d.code})</option>`;
      });
    }
  } catch (error) {
    console.error('Error loading disciplines:', error);
  }
}

async function loadExpenseTypesForSelect() {
  try {
    const { data } = await axios.get('/api/expense-types');
    const select = document.querySelector('select[name="expense_type_id"]');
    if (select) {
      select.innerHTML = '<option value="">-- Chọn loại chi phí --</option>';
      data.forEach(et => {
        select.innerHTML += `<option value="${et.id}">${et.name} (${et.category})</option>`;
      });
    }
  } catch (error) {
    console.error('Error loading expense types:', error);
  }
}

async function loadCategories(projectId) {
  if (!projectId) return;
  try {
    const { data } = await axios.get('/api/categories?project_id=' + projectId);
    const select = document.querySelector('select[name="category_id"]');
    if (select) {
      select.innerHTML = '<option value="">-- Chọn hạng mục --</option>';
      data.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.name} (${c.code})</option>`;
      });
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

async function loadTasksForTimesheet(projectId) {
  if (!projectId) return;
  try {
    const { data } = await axios.get('/api/tasks?project_id=' + projectId);
    const select = document.querySelector('#timesheetForm select[name="task_id"]');
    if (select) {
      select.innerHTML = '<option value="">-- Chọn nhiệm vụ --</option>';
      data.forEach(t => {
        select.innerHTML += `<option value="${t.id}">${t.title}</option>`;
      });
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

// ==================== FORM SUBMIT HANDLERS ====================
async function handleExpenseTypeSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  try {
    await axios.post('/api/expense-types', data);
    alert('✅ Thêm loại chi phí thành công!');
    form.reset();
    closeModal('expenseTypeModal');
    loadExpenseTypesForSelect();
  } catch (error) {
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể thêm loại chi phí'));
  }
}

async function handleProjectSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  data.contract_value = parseFloat(data.contract_value) || 0;
  data.estimated_cost = parseFloat(data.estimated_cost) || 0;
  data.project_manager_id = data.project_manager_id ? parseInt(data.project_manager_id) : null;
  
  try {
    await axios.post('/api/projects', data);
    alert('✅ Thêm dự án thành công!');
    form.reset();
    closeModal('projectModal');
    loadProjects();
  } catch (error) {
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
    await axios.post('/api/staff', data);
    alert('✅ Thêm nhân sự thành công!');
    form.reset();
    closeModal('staffModal');
    loadStaff();
  } catch (error) {
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể thêm nhân sự'));
  }
}

async function handleTaskSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  data.project_id = parseInt(data.project_id);
  data.category_id = data.category_id ? parseInt(data.category_id) : null;
  data.discipline_id = data.discipline_id ? parseInt(data.discipline_id) : null;
  data.assigned_to = data.assigned_to ? parseInt(data.assigned_to) : null;
  data.estimated_hours = parseFloat(data.estimated_hours) || 0;
  
  try {
    await axios.post('/api/tasks', data);
    alert('✅ Thêm nhiệm vụ thành công!');
    form.reset();
    closeModal('taskModal');
    loadTasks();
  } catch (error) {
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể thêm nhiệm vụ'));
  }
}

async function handleTimesheetSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  data.staff_id = parseInt(data.staff_id);
  data.project_id = parseInt(data.project_id);
  data.task_id = parseInt(data.task_id);
  data.hours = parseFloat(data.hours);
  
  try {
    await axios.post('/api/timesheets', data);
    alert('✅ Thêm timesheet thành công!');
    form.reset();
    closeModal('timesheetModal');
    loadTimesheets();
  } catch (error) {
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể thêm timesheet'));
  }
}

async function handleFinanceSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  data.project_id = parseInt(data.project_id);
  data.expense_type_id = parseInt(data.expense_type_id);
  data.amount = parseFloat(data.amount);
  
  try {
    await axios.post('/api/finances', data);
    alert('✅ Thêm giao dịch thu chi thành công!');
    form.reset();
    closeModal('financeModal');
    loadFinances();
    loadDashboard(); // Refresh dashboard
  } catch (error) {
    alert('❌ Lỗi: ' + (error.response?.data?.error || 'Không thể thêm giao dịch'));
  }
}

// ==================== DETAIL VIEW FUNCTIONS ====================
function viewProjectDetail(id) {
  if (window.showProjectDetail) {
    window.showProjectDetail(id);
  } else {
    console.error('Project detail function not loaded');
  }
}

function viewStaffDetail(id) {
  if (window.showStaffDetail) {
    window.showStaffDetail(id);
  } else {
    console.error('Staff detail function not loaded');
  }
}

function viewTaskDetail(id) {
  if (window.showTaskDetail) {
    window.showTaskDetail(id);
  } else {
    console.error('Task detail function not loaded');
  }
}

// ==================== INITIALIZE ====================
// Export utility functions globally
window.getStatusBadge = getStatusBadge;
window.formatCurrency = formatCurrency;
window.showView = showView;

// Apply role-based UI permissions
function applyRolePermissions() {
  const user = window.getCurrentUser();
  if (!user) return;
  
  const role = user.role;
  
  // Menu items to hide based on role
  const menuPermissions = {
    'BIM Manager': ['.menu-finances', '.menu-expense-types'],  // Manager: Ẩn Finances & Expense Types
    'BIM Coordinator': ['.menu-finances', '.menu-expense-types', '.menu-staff'],  // Coordinator: Ẩn Finances, Expense, Staff
    'BIM Modeler': ['.menu-projects', '.menu-staff', '.menu-finances', '.menu-expense-types']  // Modeler: Chỉ Tasks & Timesheets
  };
  
  // Hide menu items
  if (menuPermissions[role]) {
    menuPermissions[role].forEach(selector => {
      const menuItem = document.querySelector(selector);
      if (menuItem) menuItem.style.display = 'none';
    });
  }
  
  // Hide finance tab in project detail for non-admins
  if (role !== 'Admin') {
    window.userCanViewFinances = false;
  } else {
    window.userCanViewFinances = true;
  }
  
  // Hide salary columns for Coordinator and Modeler
  if (role === 'BIM Coordinator' || role === 'BIM Modeler') {
    const salaryColumns = document.querySelectorAll('.salary-column');
    salaryColumns.forEach(el => el.style.display = 'none');
  }
  
  // Hide add buttons based on permissions
  const addButtons = {
    'BIM Modeler': ['.btn-add-project', '.btn-add-staff', '.btn-add-expense-type']
  };
  
  if (addButtons[role]) {
    addButtons[role].forEach(selector => {
      const btn = document.querySelector(selector);
      if (btn) btn.style.display = 'none';
    });
  }
}

window.onload = () => {
  showView('dashboard');
  
  // Apply role-based permissions
  applyRolePermissions();
  
  // Insert modals HTML
  const modalsContainer = document.getElementById('modals-container');
  if (modalsContainer && typeof window.modalTemplates !== 'undefined') {
    modalsContainer.innerHTML = window.modalTemplates;
  }
}
