/** @type {import('next').NextConfig} **/
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "ik.imagekit.io"],
  },
  api: {
    bodyParser: false,
  },
  eslint: {
    // ❗Ini yang penting: lewati error ESLint saat build (misal di Vercel)
    ignoreDuringBuilds: true,
  },
  //output: "export",
  // tambahkan opsi lain kalau perlu
};

module.exports = nextConfig;
