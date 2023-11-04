/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
      
        domains: ['links.papareact.com', 'cloud.appwrite.io'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'links.papareact.com',
              port: '',
              pathname: '/*',
            },
            {
              protocol: 'https',
              hostname: 'cloud.appwrite.io',
              port: '',
              pathname: '/*',
            },
          ]
    },
    reactStrictMode:false
}

module.exports = nextConfig
