/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // ffmpeg-static contains a 43MB native binary — keep it external so Next.js
  // doesn't bundle it into the serverless function (Vercel Hobby = 50MB limit).
  // Loaded at runtime from node_modules/ffmpeg-static/ffmpeg.
  serverExternalPackages: ["ffmpeg-static", "@deepgram/sdk"],
};

module.exports = nextConfig;
