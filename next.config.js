module.exports = {
  // reactStrictMode: true,
  serverless: false,
  assetPrefix: "./",
  presets: ['@next/babel'],
  distDir: 'out',
  images: {
    loader: "imgix",
    path: "",
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}