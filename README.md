[![UIT Logo](https://i.imgur.com/WmMnSRt.png)](https://www.uit.edu.vn/ "Trường Đại học Công nghệ Thông tin")

# **QUẢN LÝ DỰ ÁN CÔNG NGHỆ THÔNG TIN**

## Hệ thống REST API Tuyển dụng Việc làm IT

![Node.js](https://img.shields.io/badge/Runtime-Node.js%2020.x-339933?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Framework-Express.js-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT%20Bearer-EB5424?style=flat-square&logo=auth0)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?style=flat-square&logo=cloudinary)
![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-010101?style=flat-square&logo=socketdotio)
![Nodemailer](https://img.shields.io/badge/Mail-Nodemailer-22B573?style=flat-square&logo=gmail)
![Babel](https://img.shields.io/badge/Transpiler-Babel-F9DC3E?style=flat-square&logo=babel)
![ESLint](https://img.shields.io/badge/Linter-ESLint-4B32C3?style=flat-square&logo=eslint)

---

## Thông tin đồ án

| Mục | Nội dung |
| --- | --- |
| **Tên đồ án** | Hệ thống REST API Tuyển dụng Việc làm IT |
| **Môn học** | Quản lý dự án Công nghệ Thông tin |
| **Trường** | Đại học Công nghệ Thông tin – ĐHQG TP.HCM |
| **Năm học** | 2025 – 2026 |

---

## Thành viên thực hiện

| Họ và tên | MSSV | Vai trò |
| --- | --- | --- |
| Phạm Thái Sơn | 23521361 | Team Lead |
| Lê Minh Năng | 23521299 | Member |
| Lê Gia Quyền | 23521323 | Member |

---

## Mục tiêu đồ án

Đồ án xây dựng hệ thống **REST API chuẩn** cho nền tảng tuyển dụng việc làm IT, với các mục tiêu chính:

- Thiết kế và triển khai RESTful API theo kiến trúc **phân tầng** rõ ràng (routes → controllers → services → models)
- Xác thực và phân quyền riêng biệt cho **Ứng viên (Employee)** và **Nhà tuyển dụng (Employer)** bằng JWT Bearer
- Upload CV (PDF) và ảnh lên **Cloudinary**, quản lý file tập trung qua `uploadMiddleware`
- Gửi email thông báo tự động (xác nhận ứng tuyển, lịch phỏng vấn...) qua **Nodemailer**
- Thông báo real-time bằng **Socket.io** khi có đơn ứng tuyển, kết quả phỏng vấn
- Hỗ trợ **phân trang** cho danh sách tin tuyển dụng, đơn ứng tuyển, ứng viên
- Quản lý toàn bộ quy trình tuyển dụng: đăng tin → ứng tuyển → phỏng vấn → kết quả
- Validate dữ liệu đầu vào với **Joi**, xử lý lỗi tập trung qua `errorHandlingMiddleware`
- Codebase ES Module với **Babel**, đảm bảo chất lượng code bằng **ESLint**

---

## Công nghệ sử dụng

### Backend

| Công nghệ | Phiên bản | Vai trò |
| --- | --- | --- |
| Node.js | `>=20.x` | Runtime environment |
| Express.js | `^4.18.2` | Web framework |
| MongoDB (native driver) | `6.0.0` | Cơ sở dữ liệu NoSQL |
| express-oauth2-jwt-bearer | `^1.6.1` | Xác thực JWT Bearer |
| Socket.io | — | Thông báo real-time |
| Cloudinary SDK | — | Upload & quản lý CV, ảnh |
| Nodemailer | — | Gửi email tự động |
| Multer | — | Xử lý multipart/form-data (upload file) |
| Joi | `^17.13.3` | Validation dữ liệu đầu vào |
| cookie-parser | `^1.4.7` | Parse cookie trong request |
| cors | `^2.8.5` | Cấu hình Cross-Origin Resource Sharing |
| dotenv | `^16.4.7` | Quản lý biến môi trường |
| http-status-codes | `^2.3.0` | Hằng số HTTP status code |

### Dev Tools

| Công nghệ | Vai trò |
| --- | --- |
| Babel (`@babel/core`, `@babel/node`, `@babel/preset-env`) | Transpile ES Module |
| `babel-plugin-module-resolver` | Alias import path |
| ESLint `^8.47.0` | Kiểm tra & chuẩn hóa code |
| Nodemon `^3.0.1` | Auto-reload khi phát triển |
| cross-env | Thiết lập biến môi trường đa nền tảng |

---

## Kiến trúc hệ thống

Dự án tổ chức theo kiến trúc **phân tầng** rõ ràng:

```
HTTP Request
    └─► Routes (v1)
            └─► Controllers        ← Nhận request, gọi service, trả response
                    └─► Services   ← Business logic toàn bộ
                            └─► Models  ← Truy cập MongoDB trực tiếp

Middlewares ──► authEmployee / authEmployer  (Xác thực JWT)
            ──► uploadMiddleware              (Multer + Cloudinary)
            ──► errorHandlingMiddleware       (Xử lý lỗi tập trung)
            ──► Joi Validations               (Kiểm tra dữ liệu đầu vào)

Providers   ──► cloudinaryProvider           (Upload file)
            ──► mailProvider                 (Gửi email)

Sockets     ──► Socket.io                    (Notification real-time)
```

---

## Chức năng chi tiết

### 🔐 Xác thực & Phân quyền

Hệ thống có **2 vai trò độc lập** với middleware xác thực riêng:

| Middleware | Bảo vệ |
| --- | --- |
| `authEmployee.js` | Các route dành cho Ứng viên |
| `authEmployer.js` | Các route dành cho Nhà tuyển dụng |

---

### 👤 Quản lý Người dùng — `userService.js`

- Đăng ký tài khoản ứng viên
- Đăng nhập / đăng xuất, làm mới token
- Xem & cập nhật hồ sơ cá nhân
- Upload ảnh đại diện lên **Cloudinary**
- Upload **CV (PDF)** lên Cloudinary, lấy URL công khai
- Quản lý danh sách CV đã tải lên
- Phân trang danh sách người dùng

---

### 🏢 Quản lý Nhà tuyển dụng — `employerService.js`

- Đăng ký / đăng nhập tài khoản nhà tuyển dụng
- Xem & cập nhật thông tin công ty
- Upload logo công ty lên **Cloudinary**
- Quản lý danh sách tin tuyển dụng đã đăng
- Xem danh sách ứng viên đã ứng tuyển (có **phân trang**)
- Thống kê tình hình tuyển dụng

---

### 💼 Quản lý Tin tuyển dụng — `jobService.js`

- Tạo / cập nhật / xoá tin tuyển dụng
- Lấy danh sách tin tuyển dụng có **phân trang**, lọc theo kỹ năng / vị trí / mức lương
- Tìm kiếm tin tuyển dụng theo từ khoá
- Xem chi tiết tin tuyển dụng
- Đánh dấu tin hết hạn, ẩn/hiện tin tuyển dụng

---

### 📄 Quản lý Đơn ứng tuyển — `applyService.js`

- Ứng viên nộp đơn kèm CV từ Cloudinary
- Xem trạng thái đơn ứng tuyển
- Nhà tuyển dụng duyệt / từ chối đơn
- Gửi **email thông báo** kết quả tự động qua Nodemailer
- Lịch sử ứng tuyển của ứng viên (có **phân trang**)
- Danh sách ứng viên theo từng tin tuyển dụng (có **phân trang**)

---

### 📅 Quản lý Lịch phỏng vấn — `interviewService.js`

- Nhà tuyển dụng tạo lịch phỏng vấn cho ứng viên
- Ứng viên xác nhận / từ chối lịch phỏng vấn
- Gửi **email nhắc nhở** lịch phỏng vấn tự động
- Xem danh sách lịch phỏng vấn sắp tới

---

### 🗂️ Quản lý Kết quả phỏng vấn — `interviewManagementService.js`

- Cập nhật kết quả buổi phỏng vấn
- Ghi chú đánh giá ứng viên sau phỏng vấn
- Chuyển trạng thái ứng viên: `pending` → `passed` / `failed`
- Thống kê kết quả phỏng vấn theo từng tin tuyển dụng

---

### 📝 Quản lý Bài kiểm tra — `testService.js`

- Nhà tuyển dụng tạo bài kiểm tra kỹ năng
- Ứng viên làm bài kiểm tra trực tuyến
- Chấm điểm và trả kết quả tự động
- Xem lịch sử làm bài kiểm tra

---

### 🔔 Thông báo real-time — `notificationService.js` + `sockets/`

- Gửi thông báo real-time qua **Socket.io** khi có đơn ứng tuyển mới
- Thông báo khi lịch phỏng vấn được xác nhận / thay đổi
- Thông báo kết quả duyệt hồ sơ cho ứng viên
- Lưu lịch sử thông báo, đánh dấu đã đọc

---

### 📧 Tích hợp Email — `providers/mailProvider.js`

Gửi email tự động qua **Nodemailer** trong các trường hợp:

- Xác nhận đăng ký tài khoản
- Thông báo đơn ứng tuyển được nhận / từ chối
- Nhắc nhở lịch phỏng vấn
- Thông báo kết quả phỏng vấn / bài kiểm tra

---

### ☁️ Upload File — `providers/cloudinaryProvider.js` + `uploadMiddleware.js`

- Upload **CV (PDF)** lên Cloudinary, trả về URL công khai
- Upload **ảnh đại diện / logo công ty** lên Cloudinary
- Giới hạn dung lượng và loại file qua **Multer**
- Xoá file cũ trên Cloudinary khi cập nhật

---

## Cấu trúc thư mục

```
IT_Jobs_api/
├── src/
│   ├── config/
│   │   └── mongodb.js                       # Kết nối & quản lý MongoDB
│   ├── controllers/                         # Nhận request, trả response
│   │   ├── userController.js
│   │   ├── employerController.js
│   │   ├── jobController.js
│   │   ├── applyController.js
│   │   ├── interviewController.js
│   │   ├── interviewManagementController.js
│   │   ├── testController.js
│   │   └── notificationController.js
│   ├── services/                            # Business logic
│   │   ├── userService.js
│   │   ├── employerService.js
│   │   ├── jobService.js
│   │   ├── applyService.js
│   │   ├── interviewService.js
│   │   ├── interviewManagementService.js
│   │   ├── testService.js
│   │   └── notificationService.js
│   ├── models/                              # Truy cập MongoDB (native driver)
│   ├── routes/                              # Định nghĩa API routes (v1)
│   ├── middlewares/
│   │   ├── authEmployee.js                  # Xác thực JWT — Ứng viên
│   │   ├── authEmployer.js                  # Xác thực JWT — Nhà tuyển dụng
│   │   ├── errorHandlingMiddleware.js        # Xử lý lỗi tập trung
│   │   └── uploadMiddleware.js              # Multer + Cloudinary upload
│   ├── providers/
│   │   ├── cloudinaryProvider.js            # Cloudinary SDK config & upload
│   │   └── mailProvider.js                  # Nodemailer config & send mail
│   ├── sockets/                             # Socket.io event handlers
│   ├── validations/                         # Joi validation schemas
│   ├── utils/                               # Tiện ích dùng chung (ApiError...)
│   └── server.js                            # Entry point — khởi động server
├── .env.example
├── .babelrc
├── .eslintrc.cjs
├── jsconfig.json
├── package.json
└── README.md
```

---

## Yêu cầu hệ thống

```
Node.js  >= 20.x
npm      >= 9.x  (hoặc yarn >= 1.22.x)
MongoDB  >= 6.x  (local hoặc MongoDB Atlas)
```

---

## Hướng dẫn cài đặt & chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/sonpham811z/IT_Jobs_api.git
cd IT_Jobs_api
```

### 2. Cài đặt dependencies

```bash
yarn install
# hoặc
npm install
```

### 3. Cấu hình biến môi trường

```bash
cp .env.example .env
```

Chỉnh sửa file `.env`:

```env
# MongoDB
MONGODB_URI=''
DATABASE_NAME=''

# Server
APP_HOST='localhost'
APP_PORT=8017

# JWT / Auth0
AUTH0_ISSUER_BASE_URL=''
AUTH0_AUDIENCE=''

# Cloudinary
CLOUDINARY_CLOUD_NAME=''
CLOUDINARY_API_KEY=''
CLOUDINARY_API_SECRET=''

# Nodemailer
MAIL_HOST=''
MAIL_PORT=587
MAIL_USER=''
MAIL_PASSWORD=''
```

### 4. Chạy Development

```bash
yarn dev
```

Server khởi động tại: `http://localhost:8017`

### 5. Build & chạy Production

```bash
yarn build
yarn production
```

---

## Ví dụ gọi API

**Lấy danh sách tin tuyển dụng (có phân trang):**
```bash
curl "http://localhost:8017/api/v1/jobs?page=1&limit=10"
```

**Nộp đơn ứng tuyển (cần JWT):**
```bash
curl -X POST http://localhost:8017/api/v1/apply \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ "jobId": "...", "cvUrl": "https://res.cloudinary.com/..." }'
```

**Upload CV:**
```bash
curl -X POST http://localhost:8017/api/v1/users/upload-cv \
  -H "Authorization: Bearer <token>" \
  -F "cv=@/path/to/cv.pdf"
```

---

## Linting

```bash
yarn lint
```

---

## Hướng phát triển

- [ ] Tích hợp **Swagger / OpenAPI** để tự động sinh tài liệu API
- [ ] Thêm **Redis** để cache danh sách tin tuyển dụng
- [ ] Triển khai **Docker** + **CI/CD pipeline**
- [ ] Tích hợp **AI gợi ý việc làm** theo kỹ năng ứng viên
- [ ] Thêm tính năng **video phỏng vấn** trực tuyến

---

## Liên hệ

Mọi thắc mắc vui lòng liên hệ nhóm thực hiện qua Issues của repository.

---

**© 2025–2026 – UIT · Quản lý dự án CNTT · ĐHQG TP.HCM**
