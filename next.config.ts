import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // La foto del hero es el LCP de /home. AVIF primero reduce el peso
    // aproximadamente a la mitad frente al WebP que Next sirve por defecto.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
