# Hướng Dẫn Setup Database

## Lỗi: Authentication failed against database

Lỗi này xảy ra khi:
1. MySQL chưa khởi động
2. Mật khẩu root sai
3. Database chưa tạo

## Giải pháp:

### Cách 1: Sử dụng XAMPP (Dễ nhất)

1. Download XAMPP: https://www.apachefriends.org/
2. Cài đặt và khởi động
3. Click "Start" ở MySQL
4. Sửa `.env.local`:
   ```
   DATABASE_URL="mysql://root@localhost:3306/sorokids"
   ```
   (Không có mật khẩu)

### Cách 2: MySQL Standalone

1. Khởi động MySQL:
   ```
   net start MySQL80
   ```

2. Tạo database:
   ```
   mysql -u root -p
   CREATE DATABASE sorokids;
   exit
   ```

3. Sửa `.env.local`:
   ```
   DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/sorokids"
   ```

### Cách 3: Không có mật khẩu

Nếu root không có password:
```
DATABASE_URL="mysql://root@localhost:3306/sorokids"
```

## Test kết nối:

```bash
# Test MySQL
mysql -u root -p

# Liệt kê databases
SHOW DATABASES;

# Tạo database nếu chưa có
CREATE DATABASE sorokids;
```

## Sau khi setup xong:

```bash
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```
