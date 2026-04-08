 import type { NextConfig } from "next"

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://medicareshope.vercel.app/:path*",
        // https://medicareshope.vercel.app/
        // http://localhost:5000/api/
      },
    ]
  },
}

export default config
