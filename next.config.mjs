import bundleAnalyzer from '@next/bundle-analyzer';

/**
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isStaticExport = 'false';

const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
  },
  compiler: {
    emotion: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['re2', 'url-regex-safe'],
    optimizePackageImports: [
      '@mui/material',
      '@mui/lab',
      '@mui/icons-material',
      '@mui/x-data-grid',
      '@mui/x-date-pickers',
      '@mui/x-tree-view',
      'framer-motion',
      '@iconify/react',
      '@tanstack/react-query',
      'embla-carousel-react',
      'sonner',
      'react-i18next',
      'lodash',
      'date-fns',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  compress: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });

    return config;
  },
  ...(isStaticExport === 'true' && {
    output: 'export',
  }),
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/envy',
          destination: 'https://envy2.onama.io/envy',
        },
        {
          source: '/envy/:path*',
          destination: 'https://envy2.onama.io/envy/:path*',
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          // Two responsive variants for the hero LCP image. Listing both
          // lets the browser start fetching the right size at TTFB —
          // before the HTML even arrives — based on the matching
          // `imagesrcset` + `imagesizes` on the corresponding
          // `<link rel="preload">` in the document head and the
          // `srcset` on `<HeroBackgroundImage />`.
          {
            key: 'Link',
            value:
              '</assets/background/background-3-mobile.webp>; rel=preload; as=image; ' +
              'imagesrcset="/assets/background/background-3-mobile.webp 750w, ' +
              '/assets/background/background-3.webp 1440w"; ' +
              'imagesizes="(max-width: 900px) 100vw, 1440px"',
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
