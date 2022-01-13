const NEXT_PUBLIC_API_ENDPOINT = 'https://api.trace.moe';
const NEXT_PUBLIC_MEDIA_ENDPOINT = 'https://media.trace.moe/';
const NEXT_PUBLIC_ANILIST_ENDPOINT = "https://graphql.anilist.co";

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, x-trace-secret",
          },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Content-Security-Policy",
            value: [
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' www.google-analytics.com static.cloudflareinsights.com sora.yue.sh",
              "style-src * 'self' 'unsafe-inline'",
              `img-src * 'self' data: blob: ${NEXT_PUBLIC_MEDIA_ENDPOINT}`,
              "frame-src www.youtube-nocookie.com www.youtube.com www.google.com",
              `media-src blob: 'self' ${NEXT_PUBLIC_MEDIA_ENDPOINT}`,
              "form-action 'self' sora.yue.sh",
              "base-uri 'none'",
              "frame-ancestors 'none'",
              "manifest-src 'self'",
              "block-all-mixed-content",
              `connect-src blob: 'self' ${NEXT_PUBLIC_API_ENDPOINT} ${NEXT_PUBLIC_MEDIA_ENDPOINT} ${NEXT_PUBLIC_ANILIST_ENDPOINT} www.google-analytics.com stats.g.doubleclick.net sora.yue.sh`,
            ].join("; "),
          },
        ],
      },
    ];
  },
};
