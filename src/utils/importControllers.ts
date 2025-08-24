import fs from "fs";
import path from "path";

const importDynamic = () => {
  const folders = ["../controllers", "../gateways"];
  const allModules: any[] = [];
  folders.forEach((folder) => {
    const dir = path.resolve(__dirname, folder);
    if (!fs.existsSync(dir)) {
      console.warn(`📁 Folder không tồn tại: ${dir}`);
      return;
    }
    const files = fs
      .readdirSync(dir)
      .filter(
        (file) =>
          file.endsWith(".controller.ts") || file.endsWith(".gateway.ts")
      );
    files.forEach((file) => {
      const filePath = path.resolve(dir, file);
      try {
        const module = require(filePath);
        const mod = module.default || module;
        allModules.push(mod);
      } catch (err: any) {
        console.error(`❌ Lỗi import ${filePath}:`, err.message);
      }
    });
  });

  return allModules;
};
export default importDynamic;
