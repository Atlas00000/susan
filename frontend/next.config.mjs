/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Fast Refresh and hot reloading
  reactStrictMode: true,
  swcMinify: true,
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Development settings for hot reloading
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      // period (in ms) where the server will keep pages in the buffer
      maxInactiveAge: 25 * 1000,
      // number of pages that should be kept simultaneously without being disposed
      pagesBufferLength: 2,
    },
  }),

  // Enable experimental features for better development experience
  experimental: {
    // Turbo mode is already enabled via --turbo flag
    esmExternals: true,
    optimizeCss: false,
  },

  productionBrowserSourceMaps: false,
};

export default nextConfig;


