import config from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'

const payload = await getPayload({ config })

const projects: RequiredDataFromCollectionSlug<'projects'>[] = [
  {
    category: 'Featured',
    featured: true,
    number: '01',
    order: 1,
    slug: 'gravitate-agency-seo-campaign',
    stack: ['Google Analytics 4', 'GTM', 'Ahrefs', 'Semrush', 'Google Ads', 'AI Tools'].map(
      (tool) => ({ tool }),
    ),
    summary:
      'Leading full-scale technical SEO strategy for US-based digital agency Gravitate since 2023. Custom event tracking, PPC optimization and AI-integrated workflows that moved organic rankings.',
    title: 'Gravitate Agency SEO Campaign',
  },
  {
    category: 'Shopify',
    featured: false,
    number: '02',
    order: 2,
    slug: 'shopify-store-optimization',
    summary:
      'Developed and maintained Shopify stores for Orka Socials clients, improving user experience, performance and organic visibility.',
    title: 'Shopify Store Optimization',
  },
  {
    category: 'SEO',
    featured: false,
    number: '03',
    order: 3,
    slug: 'ecommerce-seo-strategy',
    summary:
      'End-to-end eCommerce SEO—from technical audits and on-page optimization to structured data and Core Web Vitals improvements.',
    title: 'E-Commerce SEO Strategy',
  },
  {
    category: 'Analytics',
    featured: false,
    number: '04',
    order: 4,
    slug: 'gtm-analytics-implementation',
    summary:
      'Custom Google Tag Manager setups with conversion tracking, scroll-depth events and enhanced eCommerce data layers.',
    title: 'GTM & Analytics Implementation',
  },
  {
    category: 'AI',
    featured: false,
    number: '05',
    order: 5,
    slug: 'ai-powered-seo-workflows',
    summary:
      'Integrating AI into SEO workflows to automate content briefs, keyword clustering and SERP analysis without losing editorial judgment.',
    title: 'AI-Powered SEO Workflows',
  },
]

const experiences: RequiredDataFromCollectionSlug<'experiences'>[] = [
  {
    company: 'Gravitate',
    location: 'Portland, USA',
    order: 1,
    period: '2023 — Present',
    role: 'Technical SEO & Web Analyst',
    slug: 'gravitate-technical-seo',
    summary:
      'Managing GA4, GTM custom tracking, technical SEO with Ahrefs and Semrush, AI-integrated workflows and Google Ads campaigns for US clients.',
  },
  {
    company: 'Orka Socials',
    location: 'Lalitpur, Nepal',
    order: 2,
    period: '2020 — 2023',
    role: 'Technical SEO & eCommerce Specialist',
    slug: 'orka-ecommerce-specialist',
    summary:
      'Promoted from intern to full ownership of technical SEO, web analytics and Shopify development, driving search growth and site performance.',
  },
  {
    company: 'Orka Socials',
    location: 'Lalitpur, Nepal',
    order: 3,
    period: '2019 — 2020',
    role: 'Technical SEO Intern',
    slug: 'orka-seo-intern',
    summary:
      'Began a professional career applying self-taught coding to real projects across SEO, web development and data analysis.',
  },
]

const services: RequiredDataFromCollectionSlug<'services'>[] = [
  {
    ctaLabel: 'Get a quote',
    description:
      'Full-site crawl, Core Web Vitals analysis, structured data, indexing fixes and a prioritized action plan.',
    icon: '🔍',
    order: 1,
    slug: 'technical-seo-audit',
    title: 'Technical SEO Audit',
  },
  {
    ctaLabel: 'Get a quote',
    description:
      'Custom Shopify theme development, performance optimization and UX improvements built for conversion and organic visibility.',
    icon: '🛒',
    order: 2,
    slug: 'shopify-development',
    title: 'Shopify Development',
  },
  {
    ctaLabel: 'Get a quote',
    description:
      'GA4 and GTM implementation, custom events, conversion goals and dashboards that explain what visitors actually do.',
    icon: '📊',
    order: 3,
    slug: 'analytics-setup',
    title: 'Analytics Setup',
  },
]

const posts = [
  {
    category: 'SEO Deep Dive',
    description:
      'How modern SEO teams use AI for keyword clustering, content gaps and faster—but still human-led—analysis.',
    slug: 'how-ai-is-changing-technical-seo',
    title: 'How AI is Changing Technical SEO in 2026 — And What You Must Do Now',
  },
  {
    category: 'Analytics',
    description:
      'Move beyond default tracking and build GA4 custom events that reveal meaningful visitor behavior.',
    slug: 'ga4-custom-events-field-guide',
    title: 'GA4 Custom Events: A Field Guide',
  },
  {
    category: 'Shopify',
    description:
      'Canonical tags, faceted navigation and structured data: a practical Shopify SEO checklist.',
    slug: 'shopify-seo-what-actually-works',
    title: 'Shopify SEO in 2026: What Actually Works',
  },
]

function lexicalParagraph(text: string): RequiredDataFromCollectionSlug<'posts'>['content'] {
  return {
    root: {
      children: [
        {
          children: [
            { detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

async function upsertProject(data: RequiredDataFromCollectionSlug<'projects'>) {
  const existing = await payload.find({
    collection: 'projects',
    limit: 1,
    where: { slug: { equals: data.slug } },
  })
  if (existing.docs[0])
    return payload.update({ collection: 'projects', id: existing.docs[0].id, data })
  return payload.create({ collection: 'projects', data })
}

async function upsertExperience(data: RequiredDataFromCollectionSlug<'experiences'>) {
  const existing = await payload.find({
    collection: 'experiences',
    limit: 1,
    where: { slug: { equals: data.slug } },
  })
  if (existing.docs[0])
    return payload.update({ collection: 'experiences', id: existing.docs[0].id, data })
  return payload.create({ collection: 'experiences', data })
}

async function upsertService(data: RequiredDataFromCollectionSlug<'services'>) {
  const existing = await payload.find({
    collection: 'services',
    limit: 1,
    where: { slug: { equals: data.slug } },
  })
  if (existing.docs[0])
    return payload.update({ collection: 'services', id: existing.docs[0].id, data })
  return payload.create({ collection: 'services', data })
}

payload.logger.info('Importing William Hamal portfolio content…')

await payload.updateGlobal({
  slug: 'portfolio',
  data: {
    availabilityHeading: 'Available for hire',
    availabilityText: 'Open to freelance SEO, Shopify and analytics projects worldwide.',
    byline: 'By the Editorial Desk · Kathmandu, Nepal',
    certifications: [
      'Google Analytics Certified',
      'Google Search Console Certified',
      'Google Tag Manager Certified',
      'Bachelor in Business Studies — TU',
    ].map((name) => ({ name })),
    email: 'hamalwilliam88@gmail.com',
    fastFacts: [
      { icon: '📍', text: 'Kathmandu, Nepal' },
      { icon: '💼', text: 'Gravitate, Portland USA' },
      { icon: '🎓', text: 'BBS, Rolwaling College (TU)' },
      { icon: '📧', text: 'hamalwilliam88@gmail.com' },
      { icon: '📞', text: '9860552591' },
      { icon: '🌐', text: 'williamhamal.com.np' },
    ],
    headline: 'SEO Mastermind Strikes Again!',
    introduction:
      "Local technical SEO specialist and web analytics expert William Hamal has done it again — turning struggling websites into organic traffic machines with surgical precision and a deep command of Google's ever-changing algorithms.",
    issueLine: 'September 2026 · williamhamal.com.np',
    location: 'Kathmandu, Nepal',
    masthead: 'The William Hamal Gazette',
    missionQuote:
      "I'm on a mission to become one of the best Shopify and web analytics experts from Nepal. The rankings don't lie—and neither does the data.",
    phone: '+977 9860552591',
    profileImageAlt: 'William Hamal',
    referenceEmail: 'tara@orkasocials.com',
    referenceName: 'Tara Thapa Magar',
    referenceRole: 'SEO Manager, Orka Socials',
    skills: [
      ['🔍', 'Technical SEO'],
      ['📊', 'Google Analytics'],
      ['🏷️', 'GTM'],
      ['🛒', 'Shopify Dev'],
      ['🤖', 'AI Integration'],
      ['📈', 'Data Analysis'],
      ['🎯', 'Google Ads'],
      ['💻', 'Web Dev'],
    ].map(([icon, name]) => ({ icon, name })),
    stats: [
      { label: 'Years in SEO', value: '7+' },
      { label: 'Projects done', value: '50+' },
      { label: 'Certifications', value: '3' },
    ],
    tagline: 'Technical SEO · Shopify Development · Web Analytics · AI Integration',
    tools: [
      'Ahrefs',
      'Semrush',
      'GA4',
      'GTM',
      'Shopify',
      'Google Ads',
      'Search Console',
      'AI Tools',
      'Screaming Frog',
    ].map((name) => ({ name })),
    website: 'williamhamal.com.np',
  },
})

for (const project of projects) await upsertProject(project)
for (const experience of experiences) await upsertExperience(experience)
for (const service of services) await upsertService(service)

for (const item of posts) {
  const category = await payload.find({
    collection: 'categories',
    limit: 1,
    where: { title: { equals: item.category } },
  })
  const categoryDoc =
    category.docs[0] ??
    (await payload.create({
      collection: 'categories',
      data: { title: item.category, slug: item.category.toLowerCase().replaceAll(' ', '-') },
    }))
  const data: RequiredDataFromCollectionSlug<'posts'> = {
    _status: 'published',
    categories: [categoryDoc.id],
    content: lexicalParagraph(item.description),
    meta: { description: item.description, title: item.title },
    publishedAt: new Date().toISOString(),
    slug: item.slug,
    title: item.title,
  }
  const existing = await payload.find({
    collection: 'posts',
    limit: 1,
    where: { slug: { equals: item.slug } },
  })
  if (existing.docs[0]) {
    await payload.update({
      collection: 'posts',
      context: { disableRevalidate: true },
      id: existing.docs[0].id,
      data,
    })
  } else {
    await payload.create({
      collection: 'posts',
      context: { disableRevalidate: true },
      data,
    })
  }
}

payload.logger.info('Portfolio content imported successfully.')
process.exit(0)
