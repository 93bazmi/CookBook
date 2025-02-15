import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // ให้ Docker เปิดพอร์ตให้เข้าถึงจากภายนอก
    port: 5173, // ใช้พอร์ตเดียวกับใน docker-compose.yml
    strictPort: true, // ป้องกันการเปลี่ยนพอร์ตอัตโนมัติ
    watch: {
      usePolling: true, // แก้ปัญหาการตรวจจับไฟล์เปลี่ยนแปลงใน Docker
    },
  },
});
