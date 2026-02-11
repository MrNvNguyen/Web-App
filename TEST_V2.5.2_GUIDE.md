# 🔧 HƯỚNG DẪN TEST V2.5.2 - 2 FIX QUAN TRỌNG

## ⚠️ QUAN TRỌNG: PHẢI HARD REFRESH!

**TRƯỚC KHI TEST**, bạn **BẮT BUỘC** phải:

### Windows/Linux:
```
Ctrl + Shift + R
```

### Mac:
```
Cmd + Shift + R
```

**Nếu không Hard Refresh, các fixes sẽ không có tác dụng!**

---

## 🧪 TEST 1: Modal Forms Có Mở Được Không?

### Chuẩn Bị:
1. Hard Refresh (Ctrl+Shift+R)
2. Mở **Developer Console** (F12)
3. Login với `admin` / `admin123`

### Test Thêm Dự Án:

1. Click nút **"Thêm Dự án"**

2. **Trong Console**, phải thấy:
```
🎯 showProjectForm called
✅ Project modal opened
```

3. Modal phải mở ra hiển thị form

4. **Nếu KHÔNG thấy logs**:
   - Cache chưa clear
   - Hard Refresh lại
   - Check version: Phải là `app.js?v=2.5.2`

5. **Nếu thấy logs nhưng modal không mở**:
   - Chụp screenshot console
   - Copy toàn bộ error messages

### Test Thêm Nhân Sự:

1. Click nút **"Thêm Nhân sự"**

2. **Trong Console**, phải thấy:
```
🎯 showStaffForm called
✅ Staff modal opened
```

3. Modal phải mở ra

### Test Thêm Nhiệm Vụ:

1. Click nút **"Thêm Nhiệm vụ"**

2. **Trong Console**, phải thấy:
```
🎯 showTaskForm called
✅ Task modal opened
```

3. Modal phải mở ra

---

## 🧪 TEST 2: Cột Giá Trị HĐ & Lương Hoàn Toàn Ẩn

### Test với BIM Manager:

1. **Logout** (nếu đang login)
2. Hard Refresh (Ctrl+Shift+R)
3. Login với `manager` / `manager123`
4. Mở Console (F12)

#### A. Check Console Logs:

Phải thấy:
```
🔐 Applying permissions for role: BIM Manager
✅ Hidden menu: .menu-finances
✅ Hidden menu: .menu-expense-types
✅ Hidden contract columns: X  (X = số cột)
```

Số `X` phải > 0. Nếu = 0, có vấn đề!

#### B. Test Trang Projects:

1. Go to **"Quản lý Dự án"**
2. Check bảng projects:

**Phải thấy**:
- ✅ Cột "Mã DA"
- ✅ Cột "Tên dự án"
- ✅ Cột "Chủ đầu tư"
- ✅ Cột "Trạng thái"
- ✅ Cột "Thao tác"

**KHÔNG được thấy**:
- ❌ Cột "Giá trị HĐ" (cả header VÀ data)
- ❌ Bất kỳ số tiền nào (VD: "5,000,000,000 VNĐ")

#### C. Test Trang Staff:

1. Go to **"Quản lý Nhân sự"**
2. Check bảng staff:

**Phải thấy**:
- ✅ Cột "Họ tên"
- ✅ Cột "Email"
- ✅ Cột "Chức vụ"
- ✅ Cột "Trạng thái"
- ✅ Cột "Thao tác"

**KHÔNG được thấy**:
- ❌ Cột "Lương/giờ" (cả header VÀ data)
- ❌ Bất kỳ mức lương nào (VD: "150,000 VNĐ/giờ")

### Test với BIM Coordinator:

Làm tương tự với:
- Username: `coordinator`
- Password: `coord123`

Kết quả phải giống BIM Manager.

### Test với BIM Modeler:

Làm tương tự với:
- Username: `modeler`
- Password: `model123`

Kết quả phải giống BIM Manager.

---

## 🐛 Nếu Có Lỗi

### Lỗi 1: Console không có logs gì

**Nguyên nhân**: Cache chưa clear

**Giải pháp**:
1. Logout
2. Clear localStorage: 
   ```javascript
   // Trong Console
   localStorage.clear()
   ```
3. Hard Refresh (Ctrl+Shift+R)
4. Login lại

### Lỗi 2: Logs có nhưng modal không mở

**Check**:
1. Có error màu đỏ trong console không?
2. Copy toàn bộ error và báo cho tôi
3. Check có thấy `❌ Error in showXForm:` không?

### Lỗi 3: Cột vẫn hiển thị data

**Check Console**:
1. Có thấy `✅ Hidden contract columns: X` không?
2. Giá trị X là bao nhiêu?
3. Nếu X = 0 → có vấn đề với selector
4. Nếu X > 0 nhưng vẫn thấy → CSS issue

**Debug**:
Trong Console, gõ:
```javascript
document.querySelectorAll('.contract-value-column').length
```

Phải trả về số lượng > 0.

### Lỗi 4: Version vẫn cũ

**Check**:
1. Mở tab Network trong DevTools
2. Reload page
3. Tìm file `app.js`
4. Check URL có `?v=2.5.2` không?

**Nếu không**:
- Browser đang cache HTML
- Clear cache toàn bộ:
  - Chrome: Ctrl+Shift+Delete → Clear All
  - Firefox: Ctrl+Shift+Delete → Everything

---

## ✅ Kết Quả Mong Đợi

### Console Logs Khi Click Thêm Dự Án:
```
🎯 showProjectForm called
✅ Project modal opened
```

### Console Logs Khi Login BIM Manager:
```
🔐 Applying permissions for role: BIM Manager
✅ Hidden menu: .menu-finances
✅ Hidden menu: .menu-expense-types
✅ Hidden contract columns: 2
```

### UI Khi Login BIM Manager:
- ❌ Menu "Quản lý thu chi" KHÔNG thấy
- ❌ Menu "Loại chi phí" KHÔNG thấy
- ❌ Cột "Giá trị HĐ" KHÔNG thấy (cả header và data)
- ❌ Cột "Lương/giờ" KHÔNG thấy (cả header và data)

---

## 📸 Screenshots Cần Có

Nếu có lỗi, chụp màn hình:

1. **Console logs** - phải thấy đầy đủ
2. **Bảng Projects** - chứng minh cột có/không có
3. **Bảng Staff** - chứng minh cột có/không có
4. **Network tab** - chứng minh version files

---

## 🔗 Links

- **Development**: https://3000-il1ec2okaahgchy9k3855-cbeee0f9.sandbox.novita.ai
- **GitHub**: https://github.com/MrNvNguyen/Web-App
- **Commit**: aa527a6

---

**Hãy test và cho tôi biết kết quả!** 🧪
