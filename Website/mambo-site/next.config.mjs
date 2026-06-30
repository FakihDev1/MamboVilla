/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // TODO(cdn): Point this loader at the production image CDN when ready.
    // For now it returns the local /public image paths unchanged.
    loader: 'custom',
    loaderFile: './src/imageLoader.js',
  },
};

export default nextConfig;
