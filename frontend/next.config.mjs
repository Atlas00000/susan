/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Fast Refresh and hot reloading
  reactStrictMode: true,
  swcMinify: true,
  
  // Development settings for hot reloading
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      // period (in ms) where the server will keep pages in the buffer
      maxInactiveAge: 25 * 1000,
      // number of pages that should be kept simultaneously without being disposed
      pagesBufferLength: 2,
    },
    // Enable webpack 5 for better performance
    webpack5: true,
    // Enable fast refresh
    fastRefresh: true,
  }),
  
  // Enable experimental features for better development experience
  experimental: {
    // Turbo mode is already enabled via --turbo flag
    esmExternals: true,
  },
  
  // Optimize for development
  ...(process.env.NODE_ENV === 'development' && {
    // Disable telemetry for faster startup
    telemetry: false,
  }),
};

export default nextConfig;


