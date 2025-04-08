export const combinePaths = (...paths: string[]): string => {
  return `/${paths
    .filter((path) => path !== "" && path !== "/") // Loại bỏ các đường dẫn trống
    .map((path) => path.replace(/^\/+|\/+$/g, "")) // Loại bỏ / đầu và / cuối
    .join("/")}`;
};
