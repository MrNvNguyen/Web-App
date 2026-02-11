// Database Authentication System
// Uses /api/auth/login for authentication

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('bim_user') !== null;
}

// Get current user
function getCurrentUser() {
  const userJson = localStorage.getItem('bim_user');
  return userJson ? JSON.parse(userJson) : null;
}

// Login function - Uses database authentication
async function login(username, password) {
  try {
    const response = await axios.post('/api/auth/login', {
      username: username,
      password: password
    });
    
    if (response.data && response.data.id) {
      // Store user info in localStorage
      localStorage.setItem('bim_user', JSON.stringify(response.data));
      return { success: true, user: response.data };
    }
    
    return { success: false, error: 'Invalid response from server' };
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error.response?.data?.error || 'Đăng nhập thất bại. Vui lòng thử lại.';
    return { success: false, error: errorMessage };
  }
}

// Logout function
function logout() {
  localStorage.removeItem('bim_user');
  window.location.reload();
}

// Show login screen
function showLoginScreen() {
  const loginHTML = `
    <div class="fixed inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div class="text-center mb-8">
          <img src="https://onecadvn.com/Upload/images/logo/logo.png" alt="OneCad" class="h-16 mx-auto mb-4">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">BIM Management System</h1>
          <p class="text-gray-600">Hệ thống Quản lý Dự án BIM</p>
        </div>
        
        <form id="loginForm" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập</label>
            <input type="text" id="username" required 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên đăng nhập">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
            <input type="password" id="password" required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập mật khẩu">
          </div>
          
          <button type="submit" id="loginButton"
            class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
            <i class="fas fa-sign-in-alt mr-2"></i>Đăng nhập
          </button>
        </form>
        
        <div id="loginError" class="hidden mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          <i class="fas fa-exclamation-circle mr-2"></i><span></span>
        </div>
        
        <div class="mt-8 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm font-semibold text-gray-700 mb-2">
            <i class="fas fa-info-circle mr-2 text-blue-600"></i>Thông tin đăng nhập:
          </p>
          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex justify-between">
              <span><strong>an.nguyen</strong> / 123456</span>
              <span class="text-xs text-gray-500">Admin</span>
            </div>
            <div class="flex justify-between">
              <span><strong>binh.tran</strong> / 123456</span>
              <span class="text-xs text-gray-500">BIM Manager</span>
            </div>
            <div class="flex justify-between">
              <span><strong>cuong.le</strong> / 123456</span>
              <span class="text-xs text-gray-500">BIM Modeler</span>
            </div>
          </div>
        </div>
        
        <p class="mt-6 text-center text-xs text-gray-500">
          <i class="fas fa-lock mr-1"></i>Database authentication system
        </p>
      </div>
    </div>
  `;
  
  document.getElementById('loginScreen').innerHTML = loginHTML;
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('mainApp').classList.add('hidden');
  
  // Handle login form submit
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('loginButton');
    const errorDiv = document.getElementById('loginError');
    
    // Disable button during login
    loginButton.disabled = true;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang đăng nhập...';
    
    const result = await login(username, password);
    
    if (result.success) {
      document.getElementById('loginScreen').classList.add('hidden');
      document.getElementById('mainApp').classList.remove('hidden');
      updateUserInfo();
      showView('dashboard');
    } else {
      errorDiv.querySelector('span').textContent = result.error;
      errorDiv.classList.remove('hidden');
      loginButton.disabled = false;
      loginButton.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Đăng nhập';
    }
  });
}

// Change password function - Uses database API
async function changePassword(oldPassword, newPassword) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: 'Vui lòng đăng nhập lại' };
  
  try {
    const response = await axios.post('/api/auth/change-password', {
      userId: user.id,
      oldPassword: oldPassword,
      newPassword: newPassword
    });
    
    if (response.data.success) {
      return { success: true, message: response.data.message };
    }
    
    return { success: false, message: response.data.error || 'Đổi mật khẩu thất bại' };
  } catch (error) {
    console.error('Change password error:', error);
    const errorMessage = error.response?.data?.error || 'Đổi mật khẩu thất bại. Vui lòng thử lại.';
    return { success: false, message: errorMessage };
  }
}

// Show change password modal
function showChangePasswordModal() {
  const modal = document.getElementById('changePasswordModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// Close change password modal
function closeChangePasswordModal() {
  const modal = document.getElementById('changePasswordModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.getElementById('changePasswordForm').reset();
    const errorDiv = document.getElementById('passwordError');
    if (errorDiv) {
      errorDiv.classList.add('hidden');
    }
  }
}

// Handle change password form
async function handleChangePassword(event) {
  event.preventDefault();
  const form = event.target;
  const oldPassword = form.oldPassword.value;
  const newPassword = form.newPassword.value;
  const confirmPassword = form.confirmPassword.value;
  
  const errorDiv = document.getElementById('passwordError');
  const submitButton = form.querySelector('button[type="submit"]');
  
  if (newPassword !== confirmPassword) {
    errorDiv.querySelector('span').textContent = 'Mật khẩu mới không khớp';
    errorDiv.classList.remove('hidden');
    return;
  }
  
  if (newPassword.length < 6) {
    errorDiv.querySelector('span').textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
    errorDiv.classList.remove('hidden');
    return;
  }
  
  // Disable button during request
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang lưu...';
  
  const result = await changePassword(oldPassword, newPassword);
  
  if (result.success) {
    alert('✅ ' + result.message);
    closeChangePasswordModal();
  } else {
    errorDiv.querySelector('span').textContent = result.message;
    errorDiv.classList.remove('hidden');
  }
  
  // Re-enable button
  submitButton.disabled = false;
  submitButton.innerHTML = '<i class="fas fa-save mr-2"></i>Lưu';
}

// Update user info in header
function updateUserInfo() {
  const user = getCurrentUser();
  if (user) {
    // Role colors with better contrast
    const roleColors = {
      'Admin': 'bg-red-100 text-red-800 border border-red-200',
      'BIM Manager': 'bg-blue-100 text-blue-800 border border-blue-200',
      'BIM Coordinator': 'bg-green-100 text-green-800 border border-green-200',
      'BIM Modeler': 'bg-purple-100 text-purple-800 border border-purple-200'
    };
    
    const roleColorClass = roleColors[user.role] || 'bg-gray-100 text-gray-800';
    
    const userInfoHTML = `
      <div class="flex items-center space-x-3">
        <div class="text-right">
          <p class="text-sm font-bold text-white">${user.name}</p>
          <span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${roleColorClass}">
            ${user.role}
          </span>
        </div>
        <div class="relative">
          <button onclick="toggleUserMenu()" class="flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded-lg transition">
            <div class="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center font-bold text-lg border-2 border-white shadow-lg">
              ${user.name.charAt(0).toUpperCase()}
            </div>
            <i class="fas fa-chevron-down text-white text-sm"></i>
          </button>
          <div id="userMenu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div class="py-2">
              <div class="px-4 py-2 border-b border-gray-200">
                <p class="text-xs text-gray-500">Đăng nhập với</p>
                <p class="text-sm font-semibold text-gray-800">${user.email}</p>
              </div>
              <a href="#" onclick="showChangePasswordModal(); toggleUserMenu(); return false;" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-key mr-2 text-blue-600"></i>Đổi mật khẩu
              </a>
              <a href="#" onclick="logout(); return false;" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <i class="fas fa-sign-out-alt mr-2"></i>Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    
    const userInfoContainer = document.getElementById('userInfo');
    if (userInfoContainer) {
      userInfoContainer.innerHTML = userInfoHTML;
    }
    
    // Add change password modal if not exists
    if (!document.getElementById('changePasswordModal')) {
      const modalHTML = `
        <div id="changePasswordModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800">Đổi mật khẩu</h3>
              <button onclick="closeChangePasswordModal()" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <form id="changePasswordForm" onsubmit="handleChangePassword(event)">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại *</label>
                  <input type="password" name="oldPassword" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới *</label>
                  <input type="password" name="newPassword" required minlength="6" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới *</label>
                  <input type="password" name="confirmPassword" required minlength="6" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
                </div>
              </div>
              <div id="passwordError" class="hidden mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                <i class="fas fa-exclamation-circle mr-2"></i><span></span>
              </div>
              <div class="flex justify-end space-x-3 mt-6">
                <button type="button" onclick="closeChangePasswordModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Hủy
                </button>
                <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
                  <i class="fas fa-save mr-2"></i>Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
  }
}

// Toggle user menu
function toggleUserMenu() {
  const menu = document.getElementById('userMenu');
  menu.classList.toggle('hidden');
}

// Close user menu when clicking outside
document.addEventListener('click', (e) => {
  const userMenu = document.getElementById('userMenu');
  if (userMenu && !userMenu.classList.contains('hidden')) {
    if (!e.target.closest('#userInfo')) {
      userMenu.classList.add('hidden');
    }
  }
});

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
  if (!isLoggedIn()) {
    showLoginScreen();
  } else {
    updateUserInfo();
  }
});

// Permission helper functions
function hasPermission(action) {
  const user = getCurrentUser();
  if (!user) return false;
  
  const permissions = {
    'Admin': ['all'],
    'BIM Manager': ['view_all', 'manage_projects', 'manage_staff', 'manage_tasks', 'manage_timesheets', 'manage_disciplines', 'manage_categories'],
    'BIM Coordinator': ['view_projects', 'manage_categories', 'manage_disciplines', 'manage_tasks', 'manage_timesheets', 'add_tasks'],
    'BIM Modeler': ['view_projects', 'view_tasks', 'update_task_status', 'manage_own_timesheets']
  };
  
  const userPermissions = permissions[user.role] || [];
  return userPermissions.includes('all') || userPermissions.includes(action);
}

function canViewSalary() {
  const user = getCurrentUser();
  return user && user.role === 'Admin';
}

// Make functions globally available
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.login = login;
window.logout = logout;
window.changePassword = changePassword;
window.showLoginScreen = showLoginScreen;
window.updateUserInfo = updateUserInfo;
window.toggleUserMenu = toggleUserMenu;
window.showChangePasswordModal = showChangePasswordModal;
window.closeChangePasswordModal = closeChangePasswordModal;
window.handleChangePassword = handleChangePassword;
window.hasPermission = hasPermission;
window.canViewSalary = canViewSalary;
