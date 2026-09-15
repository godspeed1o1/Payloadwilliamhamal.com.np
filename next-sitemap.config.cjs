// Mirror the protocol handling in src/utilities/getURL.ts: VERCEL_PROJECT_PRODUCTION_URL
// is a bare hostname with no scheme, so it must have https:// prepended. Without this,
// every <loc> and Sitemap: line is emitted without a protocol and is invalid.
const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

// Fail closed, same rule as the X-Robots-Tag header in next.config.ts.
const IS_CANONICAL = SITE_URL === 'https://williamhamal.com.np'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/*', '/posts/*'],
  robotsTxtOptions: {
    policies: IS_CANONICAL
      ? [
          {
            userAgent: '*',
            disallow: '/admin/*',
          },
        ]
      : [
          {
            userAgent: '*',
            disallow: '/',
          },
        ],
    additionalSitemaps: IS_CANONICAL
      ? [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`]
      : [],
  },
}
