// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // styled-components SSR / className 안정화
  compiler: {
    styledComponents: true,
  },

  // Next/Image 외부 도메인 허용 (필요한 것만 남기세요)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      // { protocol: 'https', hostname: 'your-cdn.example.com' },
    ],
  },

  // Vercel 배포 시 추천 (서버 런타임 분리)
  output: 'standalone',

  // 필요시 Webpack 커스터마이즈
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   });
  //   return config;
  // },
};

export default nextConfig;
