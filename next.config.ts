import type { NextConfig } from "next";
import os from "os";

// Funcție care extrage automat IP-ul tău local (ex: 192.168.x.x)
const getLocalIp = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
};

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.trycloudflare.com", // Permite orice tunel Cloudflare generat
    "localhost:3000",
    ".ngrok-free.app",
    'lurk-prewashed-given.ngrok-free.dev',      // Permite dezvoltarea pe PC
    getLocalIp(),          // Detectează și permite automat IP-ul tău (192.168.0.178 etc.)
  ],
};

export default nextConfig;