/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Αγνοεί τα TypeScript errors κατά το build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Αγνοεί τα ESLint errors κατά το build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;