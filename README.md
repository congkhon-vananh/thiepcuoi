# 💕 Thiệp Cưới Online - Công Khôn & Vân Anh

Trang web thiệp cưới online đẹp mắt được thiết kế theo phong cách Material Design và lấy cảm hứng từ Airbnb, dành cho đám cưới của Công Khôn và Vân Anh.

## 🌟 Tính Năng

- ✨ **Trang chủ đẹp mắt** với tên cô dâu chú rể
- 🎥 **Video cưới** nhúng từ Google Drive
- 📸 **Album ảnh cưới** với gallery tương tác
- 📅 **Lịch cưới** với thông tin 2 buổi tiệc:
  - Nhà cô dâu: 16/8/2025
  - Nhà chú rể: 17/8/2025
- 🗺️ **Bản đồ Google Maps** cho từng địa điểm
- 💌 **Lời cảm ơn** từ cô dâu chú rể
- 🎁 **Hộp mừng cưới** với thông tin chuyển khoản
- 📝 **Sổ lời chúc** cho khách mời gửi lời chúc phúc
- 📱 **Responsive design** tương thích mọi thiết bị
- 🎨 **Material Design** với animations mượt mà

## 🚀 Cách Khởi Chạy

### Yêu Cầu Hệ Thống
- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn

### Cài Đặt và Chạy Local

1. **Clone repository:**
```bash
git clone https://github.com/congkhon/thiepcuoi.git
cd thiepcuoi
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Khởi chạy development server:**
```bash
npm start
```

4. **Dừng development server:**
```bash
npm stop
```

5. **Mở trình duyệt và truy cập:**
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
https://congkhon.github.io/thiepcuoi
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
