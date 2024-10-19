/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        localPatterns: [
            {
                pathname: '/icon/**',
                search: '',
            },
        ]
    }
};

export default nextConfig;
