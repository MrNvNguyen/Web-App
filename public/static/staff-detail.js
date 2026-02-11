// Staff Detail Modal
let currentStaff = null;

// Show staff detail
async function showStaffDetail(staffId) {
  try {
    const { data: staff } = await axios.get(`/api/staff/${staffId}`);
    currentStaff = staff;
    
    const user = getCurrentUser();
    const canViewSalary = user && (user.role === 'Admin');
    
    const modalHTML = `
      <div class="modal-content max-w-2xl">
        <div class="modal-header bg-primary text-white">
          <h3 class="text-xl font-bold">Thông tin Nhân sự</h3>
          <button onclick="closeStaffDetailModal()" class="text-white hover:bg-blue-700 px-2 py-1 rounded">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-6 space-y-6">
          <!-- Staff Info -->
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-semibold mb-4">${staff.name}</h4>
              <dl class="space-y-3">
                <div>
                  <dt class="text-sm text-gray-500">Email</dt>
                  <dd class="text-base font-medium">${staff.email}</dd>
                </div>
                <div>
                  <dt class="text-sm text-gray-500">Chức vụ</dt>
                  <dd class="text-base font-medium">${staff.position}</dd>
                </div>
                <div>
                  <dt class="text-sm text-gray-500">Số điện thoại</dt>
                  <dd class="text-base font-medium">${staff.phone || 'N/A'}</dd>
                </div>
                ${canViewSalary ? `
                  <div>
                    <dt class="text-sm text-gray-500">Lương theo giờ</dt>
                    <dd class="text-base font-medium text-green-600">${formatCurrency(staff.hourly_rate)}</dd>
                  </div>
                ` : ''}
              </dl>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Thống kê</h4>
              <div class="space-y-3">
                <div class="bg-blue-50 p-3 rounded-lg">
                  <p class="text-sm text-gray-600">Dự án tham gia</p>
                  <p class="text-2xl font-bold text-blue-600">${staff.projects?.length || 0}</p>
                </div>
                <div class="bg-green-50 p-3 rounded-lg">
                  <p class="text-sm text-gray-600">Tổng giờ làm việc</p>
                  <p class="text-2xl font-bold text-green-600">${staff.total_hours || 0}h</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Projects -->
          ${staff.projects && staff.projects.length > 0 ? `
            <div>
              <h4 class="text-lg font-semibold mb-3">Dự án đang tham gia</h4>
              <div class="space-y-2">
                ${staff.projects.map(p => `
                  <div class="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p class="font-medium">${p.name}</p>
                      <p class="text-sm text-gray-500">Vai trò: ${p.role || 'N/A'}</p>
                    </div>
                    <span class="text-xs text-gray-500">${p.assigned_date || ''}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <!-- Recent Timesheets -->
          ${staff.timesheets && staff.timesheets.length > 0 ? `
            <div>
              <h4 class="text-lg font-semibold mb-3">Timesheet gần đây</h4>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Ngày</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Dự án</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Nhiệm vụ</th>
                      <th class="px-4 py-2 text-right text-xs font-medium text-gray-500">Giờ</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    ${staff.timesheets.slice(0, 5).map(ts => `
                      <tr>
                        <td class="px-4 py-2 text-sm">${ts.work_date}</td>
                        <td class="px-4 py-2 text-sm">${ts.project_name}</td>
                        <td class="px-4 py-2 text-sm">${ts.task_title}</td>
                        <td class="px-4 py-2 text-sm text-right font-medium">${ts.hours}h</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}
          
          <!-- Close Button -->
          <div class="flex justify-end pt-4 border-t">
            <button onclick="closeStaffDetailModal()" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Đóng
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Create modal if not exists
    let modal = document.getElementById('staffDetailModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'staffDetailModal';
      modal.className = 'modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50';
      document.body.appendChild(modal);
    }
    
    modal.innerHTML = modalHTML;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
  } catch (error) {
    alert('Lỗi: ' + (error.response?.data?.error || 'Không thể tải thông tin nhân sự'));
  }
}

// Close staff detail modal
function closeStaffDetailModal() {
  const modal = document.getElementById('staffDetailModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  currentStaff = null;
}

// Make functions globally available
window.showStaffDetail = showStaffDetail;
window.closeStaffDetailModal = closeStaffDetailModal;
