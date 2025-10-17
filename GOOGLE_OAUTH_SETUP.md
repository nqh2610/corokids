# Hướng Dẫn Cấu Hình Google OAuth

## Bước 1: Tạo Google Cloud Project

1. Truy cập: https://console.cloud.google.com/
2. Tạo project mới hoặc chọn project có sẵn
3. Enable Google+ API

## Bước 2: Tạo OAuth Credentials

1. Vào **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Chọn **Application type**: Web application
4. **Name**: SoroKids
5. **Authorized redirect URIs**:
   - http://localhost:3000/api/auth/callback/google
   - http://localhost:3000
6. Click **Create**

## Bước 3: Copy Credentials

Sau khi tạo, bạn sẽ nhận được:
- **Client ID** (dạng: xxx.apps.googleusercontent.com)
- **Client Secret**

## Bước 4: Cập nhật .env.local

Mở file `.env.local` và thay:

```env
GOOGLE_CLIENT_ID="paste-your-client-id-here"
GOOGLE_CLIENT_SECRET="paste-your-client-secret-here"
```

## Bước 5: Restart Server

```bash
npm run dev
```

## Test Gmail Login

1. Truy cập: http://localhost:3000/login
2. Click "Đăng nhập bằng Google"
3. Chọn tài khoản Google
4. Tự động tạo account và redirect về dashboard

## Lưu ý

- Trong development, chỉ email được thêm vào test users mới login được
- Production: cần verify app với Google

---

**Không có Google OAuth?** Vẫn dùng được email/password bình thường!
