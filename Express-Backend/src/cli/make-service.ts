import fs from "fs";
import path from "path";

const serviceName = process.argv[2];

if (!serviceName) {
  console.error("Vui lòng nhập tên service. VD: Common");
  process.exit(1);
}

const className = `${serviceName}Service`;
const fileName = `${serviceName}.service.ts`;
const filePath = path.resolve("src", "services", fileName);

if (fs.existsSync(filePath)) {
  console.error("File service đã tồn tại:", filePath);
  process.exit(1);
}

const serviceContent = `import Injectable from "@/decorators/InjecTable.decorator";

@Injectable()
export default class ${className} {
  create${serviceName}() {
    return "Logic ${serviceName}Services";
  }
}
`;

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, serviceContent);

console.log(`Đã tạo service: src/services/${fileName}`);
