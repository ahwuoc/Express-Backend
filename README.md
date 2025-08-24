# Mini-Fw - Express TypeScript Framework

A modern, lightweight Express.js framework built with TypeScript, featuring Dependency Injection, Decorators, and WebSocket support for building scalable backend applications.

## 🚀 Features

- **TypeScript First**: Built with TypeScript for better type safety and developer experience
- **Dependency Injection**: Clean architecture with automatic dependency injection
- **Decorator-based**: Intuitive decorators for controllers, services, and routes
- **WebSocket Support**: Built-in Socket.IO integration with custom namespaces
- **Validation**: Class-validator integration for request validation
- **Authentication**: JWT-based authentication with Passport.js
- **CLI Tools**: Built-in generators for controllers, services, and gateways
- **MongoDB Integration**: Mongoose ODM with connection management
- **Error Handling**: Centralized error handling with custom exceptions
- **Middleware Support**: Flexible middleware system with route-specific application

## 📋 Requirements

- Node.js >= 18
- TypeScript >= 5.0
- MongoDB (for database operations)

## 🛠️ Installation

### Option 1: Create New Project
```bash
# Create a new project using the CLI
npx create-fw my-app
cd my-app
npm install
```

### Option 2: Manual Setup
```bash
# Clone the repository
git clone <repository-url>
cd Mini-Fw/Express-Backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/your-database
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
```

## 🏃‍♂️ Quick Start

### 1. Start Development Server
```bash
npm run dev
```

### 2. Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── cli/                    # CLI generators
│   ├── make-controller.ts
│   ├── make-service.ts
│   └── make-gateway.ts
├── controllers/            # HTTP controllers
├── core/                   # Framework core
│   ├── base/              # Base classes
│   ├── decorators/        # Custom decorators
│   ├── dependency-manager/ # DI container
│   ├── middleware/        # Core middleware
│   └── routes/            # Route registration
├── db/                    # Database configuration
├── dto/                   # Data Transfer Objects
├── gateways/              # WebSocket gateways
├── guards/                # Authentication guards
├── interceptors/          # Request/Response interceptors
├── middlewares/           # Custom middleware
├── models/                # Database models
├── pipes/                 # Validation pipes
├── services/              # Business logic services
├── strategies/            # Passport strategies
└── utils/                 # Utility functions
```

## 🎯 Core Concepts

### Controllers
Controllers handle HTTP requests and responses using decorators:

```typescript
import { Controller, Get, Post, Body, Param } from '@/decorators';
import { Injectable } from '@/decorators/injectable.decorator';
import { UserService } from '@/services/user.service';

@Controller('/users')
@Injectable()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('/')
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }
}
```

### Services
Services contain business logic and are automatically injected:

```typescript
import { Injectable } from '@/decorators/injectable.decorator';
import { User } from '@/models/user.model';

@Injectable()
export class UserService {
  async findAll(): Promise<User[]> {
    return User.find();
  }

  async findById(id: string): Promise<User | null> {
    return User.findById(id);
  }

  async create(userData: CreateUserDto): Promise<User> {
    const user = new User(userData);
    return user.save();
  }
}
```

### WebSocket Gateways
Handle real-time communication:

```typescript
import { SocketGateway, SubscribeMessage } from '@/decorators';
import { Socket } from 'socket.io';
import { AppGateway } from '@/core/base/gateway.base';

@SocketGateway({
  namespace: '/chat',
  port: 3000,
})
export class ChatGateway implements AppGateway {
  handleHandshake(socket: Socket): boolean {
    // Authentication logic
    return true;
  }

  @SubscribeMessage('message')
  async handleMessage(socket: Socket, message: string) {
    socket.emit('reply', `Received: ${message}`);
  }
}
```

## 🔧 CLI Commands

### Generate Controllers
```bash
npm run make:controller User
# Creates: src/controllers/user.controller.ts
```

### Generate Services
```bash
npm run make:service User
# Creates: src/services/user.service.ts
```

### Generate Gateways
```bash
npm run make:gateway Chat
# Creates: src/gateways/chat.gateway.ts
```

## 🎨 Decorators Reference

### Controller Decorators
- `@Controller(path?)` - Define controller with optional base path
- `@Get(path?)` - HTTP GET method
- `@Post(path?)` - HTTP POST method
- `@Put(path?)` - HTTP PUT method
- `@Patch(path?)` - HTTP PATCH method
- `@Delete(path?)` - HTTP DELETE method

### Parameter Decorators
- `@Param(key?)` - Extract route parameters
- `@Body()` - Extract request body
- `@Query(key?)` - Extract query parameters
- `@Req()` - Access Express request object
- `@Res()` - Access Express response object

### Service Decorators
- `@Injectable()` - Mark class as injectable service
- `@Inject(ServiceClass)` - Manual dependency injection

### WebSocket Decorators
- `@SocketGateway(options)` - Define WebSocket gateway
- `@SubscribeMessage(event)` - Handle WebSocket events

### Validation Decorators
- `@UsePipes(ValidationPipe)` - Apply validation pipes
- `@Protected()` - Require authentication

## 🔐 Authentication

### JWT Strategy
```typescript
import { Injectable } from '@/decorators/injectable.decorator';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

### Protected Routes
```typescript
@Controller('/protected')
export class ProtectedController {
  @Get('/')
  @Protected()
  async getProtectedData() {
    return { message: 'This is protected data' };
  }
}
```

## 📊 Database Integration

### MongoDB Connection
```typescript
import mongoose from 'mongoose';
import connectMongo from '@/db/connect.db';

// Connect to MongoDB
await connectMongo();
```

### Model Example
```typescript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
```

## 🛡️ Validation

### DTO with Validation
```typescript
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
```

### Using Validation Pipe
```typescript
@Post('/')
@UsePipes(ValidationPipe)
async createUser(@Body() userData: CreateUserDto) {
  return this.userService.create(userData);
}
```

## 🔄 Middleware

### Custom Middleware
```typescript
import { Injectable } from '@/decorators/injectable.decorator';

@Injectable()
export class LoggerMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.path}`);
    next();
  }
}
```

### Global Middleware
```typescript
// In your main.ts
app.use(LoggerMiddleware);
```

## 🚨 Error Handling

### Custom Exceptions
```typescript
import { BadRequestException } from '@/core/base/error.base';

@Injectable()
export class UserService {
  async findById(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGODB_URL` | MongoDB connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `NODE_ENV` | Environment mode | `development` |

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Build & Deploy

### Build
```bash
npm run build
```

### Production
```bash
NODE_ENV=production npm start
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

- **Documentation**: Check the inline code comments and examples
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join community discussions for help and ideas

## 🔗 Related Links

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Socket.IO](https://socket.io/)
- [Mongoose](https://mongoosejs.com/)
- [Class Validator](https://github.com/typestack/class-validator)

---

**Mini-Fw** - Building better backends with TypeScript and Express! 🚀
