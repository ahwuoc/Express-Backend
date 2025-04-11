# 🚀 Express DI Decorator Framework

Một hệ thống backend xây dựng trên nền **Express** sử dụng **TypeScript**, kết hợp **Dependency Injection** và **Decorator** để tạo kiến trúc sạch, dễ mở rộng.

---

## 📚 Mục lục

- [🔧 Tính năng](#-tính-năng)
- [💡 Yêu cầu](#-yêu-cầu)
- [📦 Cài đặt](#-cài-đặt)
- [🚀 Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)

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
🚀 Hướng dẫn sử dụng
Một số decorator phổ biến:

@Controller() – định nghĩa controller

@Injectable() – đánh dấu service có thể inject

@Get(), @Post()   – định nghĩa method

@Param(), @Body() – lấy dữ liệu từ request

<details> <summary>📖 Xem chi tiết hướng dẫn</summary>
🧩 Các decorator hỗ trợ
📁 Controller & Gateway
@Controller()

@Controller("users") – định nghĩa route base

@SocketGateway({ namespace: "/chat", port: 3002 }) – cho socket server riêng

🧪 Service & Inject
@Injectable() – dùng cho service (cho phép inject)

@Inject(UserService) – inject thủ công nếu cần

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
🌐 Method Decorators (HTTP)
@Get() – GET method

@Post() – POST method

@Patch() – PATCH method

@Delete() – DELETE method

📦 Param & Body
@Param("id") id: string – lấy params từ URL

@Body() body: any – lấy body từ request

ts
Sao chép
Chỉnh sửa
@Get(":id")
getUser(@Param("id") id: string) {
  return `User ID: ${id}`;
}

@Post()
create(@Body() body: any) {
  return `Creating user with data: ${JSON.stringify(body)}`;
}
🛠️ Dev command
bash
Sao chép
Chỉnh sửa
npm run dev   
npm run build  
</details> ```