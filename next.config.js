/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
    FACEBOOK_ACCESS_TOKEN: process.env.FACEBOOK_ACCESS_TOKEN,
  },
  images: {
    domains: ['pakhtunleather.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Optimize images
    config.module.rules.push({
      test: /\.(jpe?g|png|webp|avif|gif)$/i,
      use: [
        {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            outputPath: 'static/images/',
            publicPath: '/_next/static/images/',
            name: '[name]-[hash]-[width].[ext]',
            sizes: [640, 750, 828, 1080, 1200, 1920],
            placeholder: true,
            placeholderSize: 20,
            quality: 75,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
