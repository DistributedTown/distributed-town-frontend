// TODO: Mike - breaking the prod build, no idea what's that, look into it.
// const assetPrefix = process.env.NODE_ENV === "production" 
//     ? "https://cdn.mydomain.com" 
//     : "";

module.exports = {
  reactStrictMode: true,
  assetPrefix: '',
  distDir: 'out',
  images: {
    loader: "imgix",
    path: "",
  } 
}