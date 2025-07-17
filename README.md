# Giới thiệu sản phẩm

**EduMart** là nền tảng thương mại điện tử các khóa học trực tuyến, giúp người dùng dễ dàng tìm kiếm, lựa chọn và đăng ký các khóa học phù hợp với nhu cầu cá nhân. Sản phẩm tích hợp AI để đề xuất khóa học thông minh và hỗ trợ tư vấn học tập qua chat.

## Tính năng nổi bật
- **Tìm kiếm & lọc khóa học:** Dễ dàng tìm kiếm, lọc theo danh mục, mức giá, từ khóa.
- **Đề xuất AI:** Nhận gợi ý khóa học cá nhân hóa dựa trên hành vi và sở thích.
- **Chat với AI:** Trò chuyện với trợ lý AI để được tư vấn chọn khóa học phù hợp.
- **Giỏ hàng:** Thêm, xóa, cập nhật số lượng khóa học, xem tổng tiền.
- **Yêu thích:** Lưu lại các khóa học quan tâm để xem sau.
- **Lịch sử:** Xem lại các khóa học đã xem.
- **Xác thực người dùng:** Đăng ký, đăng nhập, bảo mật thông tin cá nhân.

---

# Hướng dẫn Build & Run

## Chạy local

1. Cài đặt dependencies:

```bash
npm install
```

2. Chạy development server:

```bash
npm run dev
```

3. Build production:

```bash
npm run build
```

4. Xem thử bản build production:

```bash
npm run preview
```

## Deploy trên Vercel

1. Đăng nhập hoặc đăng ký tài khoản tại [https://vercel.com/](https://vercel.com/).
2. Kết nối repository này với Vercel.
3. Khi được hỏi thiết lập build, chọn:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Nhấn Deploy và chờ Vercel build xong.

Sau khi deploy thành công, Vercel sẽ cung cấp link truy cập website của bạn.

---
