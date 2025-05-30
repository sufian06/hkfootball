/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.britannica.com/**")],
  },
};

export default nextConfig;
