/** @type {import('next').NextConfig} **/
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "ik.imagekit.io"],
  },
  api: {
    bodyParser: false,
  },
};

module.exports = nextConfig;
