# 🔄 HƯỚNG DẪN XÓA CACHE BROWSER

## Vấn đề: Menu và cột tài chính vẫn hiển thị sau khi cập nhật

**Nguyên nhân**: Browser đang cache các file JavaScript cũ.

## ✅ Giải pháp: HARD REFRESH

### Chrome / Edge (Windows/Linux)
```
Ctrl + Shift + R
hoặc
Ctrl + F5
```

### Chrome / Edge (Mac)
```
Cmd + Shift + R
```

### Firefox (Windows/Linux)
```
Ctrl + Shift + R
hoặc
Ctrl + F5
```

### Firefox (Mac)
```
Cmd + Shift + R
```

### Safari (Mac)
```
Cmd + Option + R
```

---

## 🧹 Hoặc Xóa Cache Hoàn Toàn

### Chrome / Edge
1. Nhấn `Ctrl + Shift + Delete` (Windows) hoặc `Cmd + Shift + Delete` (Mac)
2. Chọn "Cached images and files"
3. Time range: "All time"
4. Nhấn "Clear data"

### Firefox
1. Nhấn `Ctrl + Shift + Delete` (Windows) hoặc `Cmd + Shift + Delete` (Mac)
2. Chọn "Cache"
3. Time range: "Everything"
4. Nhấn "Clear Now"

### Safari
1. Mở Safari > Preferences
2. Advanced tab
3. Check "Show Develop menu"
4. Menu Develop > Empty Caches

---

## 🔍 Kiểm tra đã cập nhật chưa

Sau khi refresh, mở **Developer Console** (F12) và check:

### 1. Version Scripts
Trong tab **Network**, reload page và xem scripts:
```
✅ Phải thấy: auth.js?v=2.5.1
✅ Phải thấy: app.js?v=2.5.1
✅ Phải thấy: modals.js?v=2.5.1
```

### 2. Console Logs
Trong tab **Console**, khi login phải thấy:
```
🔐 Applying permissions for role: BIM Manager
✅ Hidden menu: .menu-finances
✅ Hidden menu: .menu-expense-types
✅ Hidden contract columns: 2
```

### 3. Test Menu
- Login với `manager/manager123`
- **KHÔNG được thấy**: Quản lý thu chi, Loại chi phí
- **KHÔNG được thấy**: Cột "Giá trị HĐ", "Lương/giờ"

---

## 🚀 Đã Cập Nhật Cache Busting

System bây giờ tự động thêm version vào tất cả scripts:
```javascript
/static/auth.js?v=2.5.1
/static/app.js?v=2.5.1
/static/modals.js?v=2.5.1
```

Khi có update mới, version sẽ tăng (v=2.5.2, v=2.5.3...) để force browser load file mới.

---

## ⚠️ Nếu vẫn không work

1. **Logout khỏi hệ thống**
2. **Clear localStorage**:
   - Mở Developer Console (F12)
   - Tab Console, gõ: `localStorage.clear()`
   - Enter
3. **Hard Refresh** (Ctrl+Shift+R)
4. **Login lại**

---

## 📝 Technical Notes

### Cache Busting đã được implement:
- File: `src/index.tsx` line 1164-1170
- Version: `v=2.5.1`
- Applies to: All static JS files

### Permission Logging đã được thêm:
- File: `public/static/app.js` - applyRolePermissions()
- Shows in Console what's being hidden
- Helps debug permission issues

---

**Lần sau có update, nhớ làm Hard Refresh!** 🔄
