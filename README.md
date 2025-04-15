# 🚀 Express DI Decorator Framework

Một hệ thống backend xây dựng trên nền **Express** sử dụng **TypeScript**, kết hợp **Dependency Injection** và **Decorator** để tạo kiến trúc sạch, dễ mở rộng.  
A backend system built on **Express** using **TypeScript**, combined with **Dependency Injection** and **Decorator** to create a clean, extensible architecture.

---

## 📚 Mục lục

- [🔧 Tính năng](#-tính-năng)
- [💡 Yêu cầu](#-yêu-cầu)
- [📦 Cài đặt](#-cài-đặt)
- [🛠️ Dev Commands](#️-dev-commands)
- [📜 Các lệnh phổ biến](#-các-lệnh-phổ-biến)
- [🏷️ Các Decorator phổ biến](#-các-decorator-phổ-biến)
- [🛠️ Dev Commands](#️-dev-commands)

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
# Cài dependencies
npm install
# hoặc dùng pnpm
pnpm install
pnpm install
# 🚀 Hướng dẫn sử dụng

Để sử dụng framework này, bạn có thể làm theo các bước sau:

1. Tạo một controller mới bằng lệnh:
   ```bash
   npm run make:controller <name>
   ```

2. Tạo một service mới bằng lệnh:
   ```bash
   npm run make:service <name>
   ```

3. Chạy ứng dụng trong chế độ phát triển:
   ```bash
   npm run dev
   ```

4. Build ứng dụng để triển khai:
   ```bash
   npm run build
   ```


## Các lệnh phổ biến:
npm run make:controller name : lệnh tạo controller
npm run make:gateway name : lệnh tạo socket
npm run make:service Common : lệnh tạo service
## Các Decorator phổ biến:

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
 #### 🌐 Method Decorators (HTTP)

@Post() - Định nghĩa method POST

@Patch() - Định nghĩa method PATCH

@Delete() - Định nghĩa method DELETE

#### 📦 Param & Body
Lấy tham số và dữ liệu body:
@Get(":id")
getUser(@Param("id") id: string) {
  return `User ID: ${id}`;
}

@Post()
create(@Body() body: any) {
  return `Creating user with data: ${JSON.stringify(body)}`;
}
🛠️ Dev Commands

Chạy các lệnh phát triển ứng dụng:
</details>npm run dev  
npm run build 
