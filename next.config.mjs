import createNextIntlPlugin from 'next-intl/plugin';
import nextra from 'nextra';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const withNextra = nextra({
  // Remove theme and themeConfig - these are not valid in Nextra 4.0
  // The theme is now handled differently
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default withNextra(withNextIntl(nextConfig));
