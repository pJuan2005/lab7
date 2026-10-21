# BÀI THỰC HÀNH BUỔI 7: FLATLIST, SAFEAREAVIEW & RESPONSIVE UI

## 👤 Thông tin sinh viên
- **Họ và tên:** Phạm Xuân Chuẩn
- **Mã sinh viên:** 10123045
- **Lớp:** 12523W.3
- **Môn học:** Lập trình React Native
- **Repository:** [https://github.com/pjuan2005/lab7.git](https://github.com/pjuan2005/lab7.git)
- **Git Tag:** `buoi7`

---

## 🎯 Mục tiêu & Yêu cầu bài thực hành (Buổi 7)
1. **Clone UI theo Spacing rõ ràng:** Áp dụng hệ thống Spacing chuẩn hệ 4 (`4, 8, 12, 16, 20, 24, 32`) giúp giao diện đồng nhất, cân đối, hiện đại.
2. **SafeAreaView / SafeAreaProvider:** Áp dụng `useSafeAreaInsets` và `SafeAreaProvider` từ `react-native-safe-area-context` để tránh nội dung bị che khuất bởi notch (tai thỏ), Dynamic Island, status bar và home indicator.
3. **Header cố định bằng Position:** Tạo `FixedHeader` với `position: 'absolute'`, `top: 0`, `left: 0`, `right: 0`, `zIndex: 1000`. Nội dung `FlatList` được bù trừ `paddingTop` bằng chiều cao header thực tế để cuộn mượt mà không bị che lấp.
4. **Tối ưu FlatList:**
   - Sử dụng `keyExtractor={(item) => item.id}` đảm bảo mỗi item có key duy nhất, không trùng lặp, không warning.
   - Tách `renderItem` thành component riêng biệt (`ProductCard.js`), bọc trong `React.memo` để tránh re-render thừa khi cuộn.
   - Cấu hình các props tối ưu hóa hiệu năng danh sách lớn: `initialNumToRender={6}`, `maxToRenderPerBatch={6}`, `windowSize={5}`, `removeClippedSubviews={Platform.OS === 'android'}`.
   - Tách `ListHeaderComponent` (Banner khuyến mãi, danh mục ngang) và `ListEmptyComponent` (trạng thái khi không tìm thấy kết quả).
5. **Responsive trên ít nhất 2 kích thước màn hình & xoay ngang/dọc:**
   - Dùng hook `useWindowDimensions()` để lắng nghe thay đổi kích thước và góc xoay thiết bị trong thời gian thực.
   - Tự động chuyển đổi: Màn hình dọc điện thoại hiển thị **2 cột** (`numColumns = 2`); khi xoay ngang (Landscape) hoặc trên Tablet tự động chuyển thành **3 đến 4 cột** (`numColumns = 3` hoặc `4`).
   - Sử dụng kỹ thuật `key={`grid-${numColumns}`}` trên `FlatList` để re-mount an toàn khi đổi số cột, khắc phục triệt để lỗi crash *"Changing numColumns on the fly is not supported"* của React Native.
6. **Màn hình chi tiết sản phẩm (Detail Screen / Modal):** Cho phép xem hình ảnh lớn, đánh giá, mô tả, chọn màu sắc, chọn số lượng, xem thông số kỹ thuật và thêm vào giỏ hàng.

---

## 📁 Cấu trúc thư mục dự án

```text
Lab7/
├── src/
│   ├── components/
│   │   ├── BannerSlider.js          # Banner quảng cáo khuyến mãi
│   │   ├── CategoryItem.js          # Item từng danh mục (React.memo)
│   │   ├── CategoryList.js          # FlatList danh mục cuộn ngang
│   │   ├── FixedHeader.js           # Header cố định bằng position absolute + insets
│   │   ├── ProductCard.js           # Card sản phẩm tối ưu (React.memo)
│   │   └── ProductDetailModal.js    # Màn hình chi tiết sản phẩm đầy đủ tính năng
│   ├── constants/
│   │   └── (hoặc theme/)
│   ├── data/
│   │   └── mockData.js              # Mock data danh mục, sản phẩm, banner
│   ├── screens/
│   │   └── HomeScreen.js            # Màn hình chính xử lý FlatList & Responsive
│   └── theme/
│       └── index.js                 # COLORS, SPACING, RADIUS, SHADOWS
├── App.js                           # Root component bọc SafeAreaProvider
├── app.json                         # Cấu hình Expo (orientation: "default")
├── index.js                         # Entry point registerRootComponent
├── package.json                     # Dependencies dự án
├── .gitignore                       # Git ignore node_modules & build
└── README.md                        # Tài liệu báo cáo chi tiết
```

---

## 🚀 Hướng dẫn cài đặt và chạy ứng dụng

### 1. Cài đặt các gói phụ thuộc (Dependencies)
```bash
npm install
```

### 2. Chạy ứng dụng với Expo
```bash
# Khởi động Expo Metro Bundler
npx expo start

# Hoặc dùng npm script
npm start
```

### 3. Trải nghiệm trên thiết bị
- **Quét mã QR bằng Expo Go:** Mở app **Expo Go** trên điện thoại Android hoặc iOS để quét mã QR từ terminal.
- **Phím `w`:** Mở ứng dụng trực tiếp trên trình duyệt Web để test responsive co giãn cửa sổ hoặc F12 kích hoạt chế độ giả lập thiết bị (iPhone, iPad, xoay ngang/dọc).
- **Phím `a`:** Mở trên máy ảo Android (nếu đã cài Android Studio).

---

## 📝 Minh chứng kỹ thuật theo tiêu chí chấm điểm

| Tiêu chí | Cách thức hiện thực trong mã nguồn |
| :--- | :--- |
| **SafeAreaView** | `App.js` bọc `SafeAreaProvider`. `FixedHeader.js` và `ProductDetailModal.js` dùng hook `useSafeAreaInsets` để cộng dồn `insets.top` và `insets.bottom` chính xác trên iPhone tai thỏ / Dynamic Island và Android. |
| **Fixed Header** | `FixedHeader.js` thiết lập `position: 'absolute'`, `top: 0`, `left: 0`, `right: 0`, `zIndex: 1000`. FlatList được set `contentContainerStyle` có `paddingTop: headerHeight` đo lường động. |
| **FlatList mượt & Tách component** | `ProductCard.js` và `CategoryItem.js` được tách thành file riêng và bọc trong `React.memo`. Không re-render các card khác khi người dùng thao tác. |
| **Không warning key** | `keyExtractor={(item) => item.id}` trả về ID duy nhất dạng chuỗi của mỗi item (`prod-1`, `prod-2`...). |
| **Responsive & Xoay ngang/dọc** | Dùng `useWindowDimensions()`. Khi `width >= 600` (hoặc xoay ngang), số cột tự chuyển từ 2 sang 3 hoặc 4. Chiều rộng card tính động theo công thức `(width - totalPadding - gap) / numColumns`. |
| **Git tag** | Đã tạo và push tag `buoi7` lên repository GitHub theo đúng yêu cầu. |

---

## 🏷️ Lệnh Git đã thực hiện
```bash
git init
git add .
git commit -m "feat: complete Lab 7 FlatList Responsive UI with SafeAreaView and Fixed Header"
git branch -M main
git remote add origin https://github.com/pjuan2005/lab7.git
git tag buoi7
git push -u origin main --tags
```
