# 🚀 Express DI Decorator Framework

Một hệ thống backend xây dựng trên nền **Express** sử dụng **TypeScript**, kết hợp **Dependency Injection** và **Decorator** để tạo kiến trúc sạch, dễ mở rộng.

---

## 📚 Mục lục

- [🔧 Tính năng](#-tính-năng)
- [💡 Yêu cầu](#-yêu-cầu)
- [📦 Cài đặt](#-cài-đặt)
- [🚀 Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)

---

## 🔧 Tính năng

- ✅ Routing dựa trên Express  
- ♻️ Hệ thống Dependency Injection gọn nhẹ  
- ✨ Decorator cho controller, service  
- 🧼 Code tách biệt rõ ràng, dễ test, dễ maintain  

---

## 💡 Yêu cầu

- Node.js >= 18  
- TypeScript >= 5.0  

---

## 📦 Cài đặt

```bash
# Clone repo
git clone <your-repo-url>
cd <project-folder>

# Cài dependencies
npm install
# hoặc dùng pnpm
pnpm install
```

---

## 🚀 Hướng dẫn sử dụng

### Các Decorator phổ biến:

- `@Controller()` – Định nghĩa controller
- `@Injectable()` – Đánh dấu service có thể inject
- `@Get()`, `@Post()` – Định nghĩa HTTP method
- `@Inject()` – Inject thủ công nếu cần
- `@Param()`, `@Body()` – Lấy dữ liệu từ request
- `@Req()`, `@Res()` – Truy cập request/response
- `@UsePipes()` – Gắn middleware validation

<details> 
  <summary>📖 Xem chi tiết hướng dẫn</summary>

### 🧩 Các Decorator hỗ trợ

#### 📁 Controller & Gateway

- `@Controller()` - Định nghĩa controller
- `@Controller("users")` - Định nghĩa route base
- `@SocketGateway({ namespace: "/chat", port: 3002 })` - Định nghĩa socket server riêng

#### 🧪 Service & Inject

- `@Injectable()` - Dùng cho service, cho phép inject
- `@Inject(UserService)` - Inject thủ công nếu cần

**Ví dụ về Service & Controller:**

```typescript
@Injectable()
export class UserService {
  getUsers() {
    return ["user1", "user2"];
  }
}

@Controller("users")
export class UserController {
  constructor(
    @Inject(UserService) private userService: UserService
  ) {}

  @Get()
  getAll() {
    return this.userService.getUsers();
  }
}
```

#### 🌐 Method Decorators (HTTP)

- `@Get()` - Định nghĩa method GET
- `@Post()` - Định nghĩa method POST
- `@Patch()` - Định nghĩa method PATCH
- `@Delete()` - Định nghĩa method DELETE

#### 📦 Param & Body

Lấy tham số và dữ liệu body:

```typescript
@Get(":id")
getUser(@Param("id") id: string) {
  return `User ID: ${id}`;
}

@Post()
create(@Body() body: any) {
  return `Creating user with data: ${JSON.stringify(body)}`;
}
```

</details>

---

## 🛠️ Dev Commands

Chạy các lệnh phát triển ứng dụng:

```bash
npm run dev  
npm run build
```