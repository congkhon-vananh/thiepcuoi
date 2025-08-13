# 💕 Thiệp Cưới Online - Công Khôn & Vân Anh

Trang web thiệp cưới online đẹp mắt được thiết kế theo phong cách Material Design và lấy cảm hứng từ Airbnb, dành cho đám cưới của Công Khôn và Vân Anh.

## 🚀 Tính Năng

- 🎥 **Video Cưới**: Embed video từ Dailymotion với giao diện đẹp
- 📸 **Album Ảnh**: Gallery ảnh cưới với lightbox và navigation
- 📅 **Chi Tiết Sự Kiện**: Thông tin lịch cưới với Google Maps
- 💝 **Hộp Quà Cưới**: QR code và thông tin chuyển khoản
- 📖 **Sổ Lời Chúc**: Guestbook tích hợp Supabase với real-time updates
- 💌 **Lời Cảm Ơn**: Thông điệp cảm ơn chân thành
- 📱 **Responsive design** tương thích mọi thiết bị
- 🎨 **Material Design** với animations mượt mà

## 🚀 Cách Khởi Chạy

### Yêu Cầu Hệ Thống
- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn
- Tài khoản Supabase (cho Guestbook)

### Cài Đặt Dependencies
```bash
npm install
```

### Cấu Hình Supabase (Bắt Buộc)

1. **Tạo project Supabase:**
   - Đăng nhập vào [Supabase](https://supabase.com)
   - Tạo project mới

2. **Setup Database:**
   - Làm theo hướng dẫn trong `SUPABASE_SETUP.md`
   - Chạy SQL commands để tạo table và policies

3. **Cấu hình Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Cập nhật `.env.local` với thông tin Supabase của bạn:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Chạy Development Server
```bash
npm start
```

Website sẽ chạy tại http://localhost:3000

### Dừng Development Server
```bash
npm stop
```

### Mở trình duyệt và truy cập:
```
http://localhost:3000
```

### Build Production

```bash
npm run build
```

Thư mục `build` sẽ chứa các file đã được tối ưu hóa để deploy.

## 🌐 Deploy lên GitHub Pages

### Phương Pháp 1: Tự Động (Khuyến Nghị)

1. **Push code lên GitHub:**
```bash
git add .
git commit -m "Initial wedding invitation website"
git push origin main
```

2. **GitHub Actions sẽ tự động deploy** khi có thay đổi trên branch `main`

3. **Truy cập website tại:**
```
https://congkhon-vananh.github.io/thiepcuoi
```

### Phương Pháp 2: Manual Deploy

1. **Cài đặt gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Deploy manual:**
```bash
npm run deploy
```

## 🛠️ Cấu Trúc Dự Án

```
thiepcuoi/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js          # Navigation header
│   │   ├── HeroSection.js     # Trang chủ với tên cô dâu chú rể
│   │   ├── VideoSection.js    # Video cưới
│   │   ├── PhotoGallery.js    # Album ảnh cưới
│   │   ├── EventDetails.js    # Lịch và địa điểm cưới
│   │   ├── ThankYouMessage.js # Lời cảm ơn
│   │   ├── GiftBox.js         # Hộp mừng cưới
│   │   ├── Guestbook.js       # Sổ lời chúc
│   │   └── Footer.js          # Footer
│   ├── App.js                 # Main app component
│   └── index.js              # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow
└── package.json
```

## 🎨 Công Nghệ Sử Dụng

- **React 18** - Frontend framework
- **Material-UI (MUI)** - Component library
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Google Fonts** - Typography (Dancing Script, Playfair Display, Inter)

## 📝 Tùy Chỉnh Nội Dung

### Thay Đổi Thông Tin Cơ Bản
Chỉnh sửa các file component trong `src/components/` để cập nhật:
- Tên cô dâu chú rể
- Ngày giờ cưới
- Địa chỉ và bản đồ
- Thông tin chuyển khoản
- Video cưới (thay đổi link Google Drive)

### Thay Đổi Ảnh Cưới
Trong `PhotoGallery.js`, thay thế các URL ảnh mẫu bằng ảnh thật của bạn.

### Cập Nhật Video Cưới
Trong `VideoSection.js`, thay đổi `videoId` bằng ID video Google Drive của bạn.

## 🚨 Lưu Ý Quan Trọng

1. **Video Google Drive:** Đảm bảo video được set quyền "Anyone with the link can view"
2. **Ảnh cưới:** Upload ảnh lên cloud storage (Google Drive, Cloudinary, etc.) và cập nhật URL
3. **Thông tin chuyển khoản:** Cập nhật thông tin ngân hàng thật trong `GiftBox.js`
4. **Google Maps:** Thay thế URL bản đồ mẫu bằng địa chỉ thật

## 📞 Hỗ Trợ

Nếu gặp vấn đề khi setup hoặc deploy, hãy:
1. Kiểm tra console browser để xem lỗi
2. Đảm bảo Node.js và npm đã được cài đặt đúng cách
3. Kiểm tra GitHub Actions logs nếu auto-deploy thất bại

## 💝 Chúc Mừng Hạnh Phúc!

Chúc Công Khôn và Vân Anh có một đám cưới thật đẹp và hạnh phúc! 🎉👰🤵💕
