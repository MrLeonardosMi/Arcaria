import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/arcadia",
};

export default withNextIntl(nextConfig);