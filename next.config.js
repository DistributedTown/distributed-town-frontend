const assetPrefix = process.env.NODE_ENV === "production" 
    ? "https://cdn.mydomain.com" 
    : "";

module.exports = {
  reactStrictMode: true,
  assetPrefix: assetPrefix,
  distDir: 'out',
  images: {
    loader: "imgix",
    path: "",
  } 
}