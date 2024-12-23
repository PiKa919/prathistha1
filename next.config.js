// // Next.js config file: next.config.js 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['your-domain.com'],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     minimumCacheTTL: 60
//   },
//   webpack: (config, { dev, isServer }) => {
//     // Split chunks more aggressively for better caching
//     config.optimization.splitChunks = {
//       chunks: 'all',
//       minSize: 20000,
//       maxSize: 244000,
//       cacheGroups: {
//         vendors: {
//           test: /[\\/]node_modules[\\/]/,
//           priority: -10,
//           reuseExistingChunk: true
//         },
//         default: {
//           minChunks: 2,
//           priority: -20,
//           reuseExistingChunk: true 
//         }
//       }
//     }
//     return config
//   },
//   // Enable production source maps 
//   productionBrowserSourceMaps: true
// }

// module.exports = nextConfig