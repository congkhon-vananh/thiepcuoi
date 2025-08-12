# Hướng Dẫn Tích Hợp Google Sheets cho Sổ Lời Chúc

## 📋 Tổng Quan
Phần "Sổ Lời Chúc" đã được cải thiện để lưu trữ và hiển thị lời chúc từ Google Sheets thay vì chỉ lưu trữ cục bộ. Điều này cho phép:

- ✅ Lưu trữ lời chúc vĩnh viễn
- ✅ Quản lý và kiểm duyệt lời chúc dễ dàng
- ✅ Chỉ hiển thị những lời chúc đã được approve

## 🔧 Các Bước Setup

### Bước 1: Chuẩn Bị Google Sheet

1. **Truy cập Google Sheet đã có:**
   ```
   https://docs.google.com/spreadsheets/d/12pUSOXZT1j5Y0PewAHlAAfsSOcQalALrH287cQq4-fs/edit?usp=sharing
   ```

2. **Đảm bảo có các cột sau:**
   - **A: name** - Tên người gửi lời chúc
   - **B: content** - Nội dung lời chúc
   - **C: show** - Checkbox để hiển thị (TRUE/FALSE)
   - **D: timestamp** - Ngày gửi (tự động)

3. **Thêm header row nếu chưa có:**
   ```
   | name | content | show | timestamp |
   ```

### Bước 2: Tạo Google Apps Script

1. **Truy cập Google Apps Script:**
   ```
   https://script.google.com/
   ```

2. **Tạo project mới:**
   - Click "New Project"
   - Đặt tên: "Wedding Guestbook API"

3. **Copy code từ file `google-apps-script.js`:**
   - Mở file `google-apps-script.js` trong project
   - Copy toàn bộ code
   - Paste vào Code.gs trong Google Apps Script

4. **Cấu hình Sheet ID:**
   ```javascript
   const SHEET_ID = '12pUSOXZT1j5Y0PewAHlAAfsSOcQalALrH287cQq4-fs';
   ```

### Bước 3: Deploy Web App

1. **Deploy as Web App:**
   - Click "Deploy" > "New deployment"
   - Type: "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Click "Deploy"

2. **Copy Web App URL:**
   - Sẽ có dạng: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
   - Lưu URL này để sử dụng ở bước tiếp theo

### Bước 4: Cập Nhật React App

1. **Mở file `src/components/Guestbook.js`**

2. **Thay thế URL trong dòng 39:**
   ```javascript
   // Thay thế YOUR_SCRIPT_ID bằng ID thực tế từ bước 3
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```

### Bước 5: Test Kết Nối

1. **Test trong Google Apps Script:**
   - Chạy function `testConnection()` trong Apps Script
   - Kiểm tra logs để đảm bảo kết nối thành công

2. **Test trên website:**
   - Chạy `npm start`
   - Truy cập phần "Sổ Lời Chúc"
   - Thử gửi một lời chúc test
   - Kiểm tra Google Sheet xem có dữ liệu mới không

## 📊 Cách Quản Lý Lời Chúc

### Approve Lời Chúc
1. Mở Google Sheet
2. Tìm lời chúc mới (cột `show` sẽ là `FALSE`)
3. Tick checkbox ở cột `show` để approve
4. Lời chúc sẽ hiển thị trên website ngay lập tức

### Ẩn Lời Chúc Không Phù Hợp
1. Untick checkbox ở cột `show`
2. Lời chúc sẽ bị ẩn khỏi website

### Xóa Lời Chúc
1. Xóa toàn bộ row trong Google Sheet
2. Lời chúc sẽ biến mất hoàn toàn

## 🔒 Bảo Mật

- **Google Apps Script** chạy dưới tài khoản của bạn
- **Chỉ bạn** có quyền chỉnh sửa Google Sheet
- **Khách** chỉ có thể gửi lời chúc, không thể xem/sửa
- **Lời chúc** mặc định bị ẩn cho đến khi được approve

## 🚨 Troubleshooting

### Lỗi CORS
- Đảm bảo deploy Web App với "Anyone" access
- Kiểm tra URL có đúng định dạng không

### Không load được lời chúc
- Kiểm tra Google Sheet có public không
- Verify Sheet ID trong Apps Script
- Check console logs trong browser

### Không gửi được lời chúc
- Kiểm tra Web App URL
- Verify POST permissions trong Apps Script
- Check network tab trong browser dev tools

## 📱 Tính Năng

### Cho Khách Mời:
- ✅ Gửi lời chúc dễ dàng
- ✅ Xem lời chúc đã được approve
- ✅ Giao diện đẹp và responsive

### Cho Chủ Nhân:
- ✅ Quản lý lời chúc trong Google Sheet
- ✅ Approve/reject lời chúc bằng checkbox
- ✅ Backup tự động trên Google Drive
- ✅ Export dữ liệu dễ dàng

## 🎯 Lưu Ý Quan Trọng

1. **Backup dữ liệu:** Google Sheet tự động backup, nhưng nên tạo copy định kỳ
2. **Giới hạn:** Google Apps Script có giới hạn 6 phút/request và 20,000 triggers/ngày
3. **Performance:** Với >1000 lời chúc, nên implement pagination
4. **Monitoring:** Check Google Apps Script logs định kỳ để phát hiện lỗi

---

🎉 **Chúc mừng!** Bây giờ website cưới của bạn đã có hệ thống quản lý lời chúc chuyên nghiệp!
