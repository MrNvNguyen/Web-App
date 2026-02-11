// Simple authentication system with test accounts
// NOTE: This is a demo authentication for testing only
// Production should use real authentication like JWT, OAuth, etc.

const TEST_ACCOUNTS = [
  { username: 'admin', password: 'admin123', name: 'Admin', role: 'Admin', email: 'admin@onecad.vn' },
  { username: 'manager', password: 'manager123', name: 'Nguyễn Văn An', role: 'BIM Manager', email: 'an.nguyen@onecad.vn' },
  { username: 'coordinator', password: 'coord123', name: 'Trần Thị Bình', role: 'BIM Coordinator', email: 'binh.tran@onecad.vn' },
  { username: 'modeler', password: 'model123', name: 'Lê Văn Cường', role: 'BIM Modeler', email: 'cuong.le@onecad.vn' }
];

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('bim_user') !== null;
}

// Get current user
function getCurrentUser() {
  const userJson = localStorage.getItem('bim_user');
  return userJson ? JSON.parse(userJson) : null;
}

// Login function
function login(username, password) {
  const user = TEST_ACCOUNTS.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Store user info (without password)
    const { password: _, ...userInfo } = user;
    localStorage.setItem('bim_user', JSON.stringify(userInfo));
    return true;
  }
  
  return false;
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
          
          <button type="submit" 
            class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
            <i class="fas fa-sign-in-alt mr-2"></i>Đăng nhập
          </button>
        </form>
        
        <div id="loginError" class="hidden mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          <i class="fas fa-exclamation-circle mr-2"></i><span></span>
        </div>
        
        <div class="mt-8 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm font-semibold text-gray-700 mb-2">
            <i class="fas fa-info-circle mr-2 text-blue-600"></i>Tài khoản test:
          </p>
          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex justify-between">
              <span><strong>admin</strong> / admin123</span>
              <span class="text-xs text-gray-500">Admin</span>
            </div>
            <div class="flex justify-between">
              <span><strong>manager</strong> / manager123</span>
              <span class="text-xs text-gray-500">BIM Manager</span>
            </div>
            <div class="flex justify-between">
              <span><strong>coordinator</strong> / coord123</span>
              <span class="text-xs text-gray-500">BIM Coordinator</span>
            </div>
            <div class="flex justify-between">
              <span><strong>modeler</strong> / model123</span>
              <span class="text-xs text-gray-500">BIM Modeler</span>
            </div>
          </div>
        </div>
        
        <p class="mt-6 text-center text-xs text-gray-500">
          <i class="fas fa-lock mr-1"></i>Demo authentication for testing purposes
        </p>
      </div>
    </div>
  `;
  
  document.getElementById('loginScreen').innerHTML = loginHTML;
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('mainApp').classList.add('hidden');
  
  // Handle login form submit
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (login(username, password)) {
      document.getElementById('loginScreen').classList.add('hidden');
      document.getElementById('mainApp').classList.remove('hidden');
      updateUserInfo();
      showView('dashboard');
    } else {
      const errorDiv = document.getElementById('loginError');
      errorDiv.querySelector('span').textContent = 'Tên đăng nhập hoặc mật khẩu không đúng';
      errorDiv.classList.remove('hidden');
    }
  });
}

// Update user info in header
function updateUserInfo() {
  const user = getCurrentUser();
  if (user) {
    const userInfoHTML = `
      <div class="flex items-center space-x-3">
        <div class="text-right">
          <p class="text-sm font-semibold text-gray-800">${user.name}</p>
          <p class="text-xs text-gray-500">${user.role}</p>
        </div>
        <div class="relative">
          <button onclick="toggleUserMenu()" class="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
            <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              ${user.name.charAt(0).toUpperCase()}
            </div>
            <i class="fas fa-chevron-down text-gray-500 text-sm"></i>
          </button>
          <div id="userMenu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div class="py-2">
              <a href="#" onclick="logout()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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

// Make functions globally available
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.login = login;
window.logout = logout;
window.showLoginScreen = showLoginScreen;
window.updateUserInfo = updateUserInfo;
window.toggleUserMenu = toggleUserMenu;
