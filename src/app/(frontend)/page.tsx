import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

import { ContactForm } from '@/components/Gazette/ContactForm'
import type { Media, Portfolio } from '@/payload-types'

export const dynamic = 'force-dynamic'

const navItems = [
  ['About', '#about'],
  ['Portfolio', '#portfolio'],
  ['Services', '#services'],
  ['Blog', '#blog'],
  ['Contact', '#contact'],
]

function getImageURL(image: number | Media | null | undefined) {
  return image && typeof image === 'object' && image.url ? image.url : null
}

function SectionDivider({ children }: { children: string }) {
  return (
    <div className="section-divider">
      <div className="section-divider-line" />
      <h2 className="section-divider-label">{children}</h2>
      <div className="section-divider-line" />
    </div>
  )
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const [portfolio, projects, experiences, services, posts] = await Promise.all([
    payload.findGlobal({ slug: 'portfolio', depth: 1 }),
    payload.find({ collection: 'projects', limit: 20, overrideAccess: false, sort: 'order' }),
    payload.find({ collection: 'experiences', limit: 20, overrideAccess: false, sort: 'order' }),
    payload.find({ collection: 'services', limit: 20, overrideAccess: false, sort: 'order' }),
    payload.find({ collection: 'posts', limit: 3, overrideAccess: false, sort: '-publishedAt' }),
  ])

  const profile = portfolio as Portfolio
  const profileImageURL = getImageURL(profile.profileImage)

  return (
    <>
      <nav className="top-nav">
        <div className="nav-inner">
          <a className="nav-logo" href="#top">
            W.H. Gazette
          </a>
          <div className="nav-links">
            {navItems.map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="ticker-bar">
        <div className="ticker-inner">
          ★ Breaking: Local SEO expert dominating Google rankings — Kathmandu, Nepal ★ &nbsp;
          William Hamal joins Portland-based Gravitate as lead SEO analyst ★ &nbsp; Ahrefs &amp;
          Semrush confirm: website traffic up 300% after Hamal intervention ★ &nbsp; Google Tag
          Manager certified specialist available for hire ★
        </div>
      </div>

      <main className="site-wrap" id="top">
        <header className="masthead">
          <p className="masthead-tagline">
            Est. 2019 — Nepal&apos;s Premier SEO &amp; Analytics Expert
          </p>
          <h1 className="masthead-title">{profile.masthead}</h1>
          <p className="masthead-sub">{profile.tagline}</p>
          <div className="masthead-meta">
            <span>Kathmandu, Nepal | June 2026</span>
            <span>{profile.website}</span>
            <span>Vol. VII, No. 1</span>
          </div>
        </header>

        <section id="about">
          <SectionDivider>Front Page</SectionDivider>
          <div className="hero-layout">
            <article className="hero-main">
              <h2 className="hero-headline">
                SEO
                <br />
                <span>Mastermind</span>
                <br />
                Strikes Again!
              </h2>
              <p className="byline">{profile.byline}</p>
              <p className="hero-deck">{profile.introduction}</p>
              <p className="hero-copy">
                Armed with a formidable arsenal of tools — Ahrefs, Semrush, Google Search Console,
                and Google Tag Manager — Hamal has built a reputation spanning from Lalitpur to the
                tech corridors of Portland, USA. His specialty? Merging technical SEO with
                cutting-edge AI workflows.
              </p>
              <blockquote className="quote-box">
                “{profile.missionQuote}”<cite>— William Hamal</cite>
              </blockquote>

              <div className="double-rule" />
              <div className="stats-row">
                {profile.stats?.map((stat) => (
                  <div key={stat.id}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="tools-box">
                <h3>Weapons of Choice</h3>
                <div>
                  {profile.tools?.map((tool) => (
                    <span key={tool.id}>{tool.name}</span>
                  ))}
                </div>
              </div>

              <aside className="hire-box">
                <h3>{profile.availabilityHeading}</h3>
                <p>{profile.availabilityText}</p>
                <a href="#contact">Send a Dispatch →</a>
              </aside>
            </article>

            <aside className="hero-sidebar">
              <div className="mugshot-card">
                <div className="mugshot-header">
                  <span>Kathmandu Digital Crimes Division</span>
                  <strong>Official Mugshot</strong>
                  <small>Nepal Internet Bureau — Case File</small>
                </div>
                <div className="mugshot-image-wrap">
                  {profileImageURL ? (
                    <Image
                      alt={profile.profileImageAlt || 'William Hamal'}
                      className="mugshot-image"
                      height={1000}
                      priority
                      src={profileImageURL}
                      width={760}
                    />
                  ) : (
                    <div className="photo-placeholder">
                      <strong>W.H.</strong>
                      <span>Upload portrait in Payload → Portfolio</span>
                    </div>
                  )}
                  <div className="halftone-overlay" />
                  <div className="suspect-stamp">Suspect</div>
                  <div className="height-ruler">
                    <span>6&apos;</span>
                    <span>5&apos;9</span>
                    <span>5&apos;6</span>
                    <span>5&apos;3</span>
                    <span>5&apos;</span>
                  </div>
                  <div className="mugshot-id">
                    <strong>W. Hamal</strong>
                    <span>Case #SEO-2026 · KTM</span>
                  </div>
                </div>
                <dl className="case-details">
                  <div>
                    <dt>Alias</dt>
                    <dd>The Shopify Whisperer</dd>
                  </div>
                  <div>
                    <dt>Occupation</dt>
                    <dd>Technical SEO Specialist</dd>
                  </div>
                  <div>
                    <dt>Last Seen</dt>
                    <dd>Gravitate HQ, Portland</dd>
                  </div>
                </dl>
                <div className="charges-box">
                  <h3>Charges Filed</h3>
                  <p>▸ Driving Organic Traffic Without A License</p>
                  <p>▸ Unlawful Domination of Google Page One</p>
                  <p>▸ Possession of AI-Powered SEO Workflows</p>
                </div>
                <div className="fingerprint-row">
                  <span>Fingerprints on file</span>
                  <span>WH-2026</span>
                </div>
              </div>
              <p className="photo-caption">William Hamal — Suspect #SEO-2026</p>
              <div className="sidebar-fact">
                <h3>🔥 Fast Facts</h3>
                {profile.fastFacts?.map((fact) => (
                  <p key={fact.id}>
                    {fact.icon} {fact.text}
                  </p>
                ))}
              </div>
              <div className="languages-box">
                <h3>Languages</h3>
                <p>✓ English — Fluent</p>
                <p>✓ Nepali — Fluent (Native)</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="portfolio">
          <SectionDivider>Portfolio Chronicles</SectionDivider>
          <div className="comic-grid">
            {projects.docs.map((project) => (
              <article
                className={`comic-panel${project.featured ? ' featured' : ''}`}
                key={project.id}
              >
                <span className="panel-number">{project.number}</span>
                <h3 className="panel-title">{project.title}</h3>
                <p className="panel-body">{project.summary}</p>
                {!!project.stack?.length && (
                  <div className="stack-box">
                    <strong>Stack Used</strong>
                    <p>{project.stack.map((item) => item.tool).join(' · ')}</p>
                  </div>
                )}
                <span className="panel-badge">{project.category}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="experience">
          <SectionDivider>Career Timeline</SectionDivider>
          <div className="experience-cols">
            <div className="exp-col">
              <h3 className="exp-col-header">Work Experience</h3>
              {experiences.docs.map((experience) => (
                <article className="exp-item" key={experience.id}>
                  <h4 className="exp-company">{experience.company}</h4>
                  <p className="exp-role">{experience.role}</p>
                  <p className="exp-date">
                    📍 {experience.location} · {experience.period}
                  </p>
                  <p className="exp-desc">{experience.summary}</p>
                </article>
              ))}
            </div>
            <div className="exp-col">
              <h3 className="exp-col-header">Skills Arsenal</h3>
              <div className="skills-wrap">
                {profile.skills?.map((skill, index) => (
                  <div className="skill-card" key={skill.id}>
                    <span className="skill-icon">{skill.icon}</span>
                    <strong className="skill-name">{skill.name}</strong>
                    <div className="skill-bar-wrap">
                      <span style={{ width: `${95 - index * 2}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="certifications-box">
                <h3>Certifications</h3>
                {profile.certifications?.map((certificate) => (
                  <p key={certificate.id}>✓ {certificate.name}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <SectionDivider>Services Offered</SectionDivider>
          <div className="services-grid">
            {services.docs.map((service) => (
              <article className="service-panel" key={service.id}>
                <span className="service-burst">{service.icon}</span>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <a className="service-price" href="#contact">
                  {service.ctaLabel || 'Get a Quote'} ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="blog">
          <SectionDivider>The Blog — Latest Dispatches</SectionDivider>
          <div className="blog-grid">
            {posts.docs.map((post, index) => (
              <article className={`blog-card${index === 0 ? ' featured' : ''}`} key={post.id}>
                <span className="blog-tag">
                  {post.categories?.[0] && typeof post.categories[0] === 'object'
                    ? post.categories[0].title
                    : 'Field Notes'}
                </span>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.meta?.description}</p>
                <p className="blog-date">Coming Soon · Written by William Hamal</p>
                <Link className="read-more" href={`/posts/${post.slug}`}>
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="contact">
          <SectionDivider>Send a Dispatch</SectionDivider>
          <div className="contact-layout">
            <div className="contact-left">
              <h2>Let&apos;s Work Together!</h2>
              <div className="contact-info">
                <p>
                  📧 <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </p>
                <p>
                  📞 <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                </p>
                <p>📍 {profile.location}</p>
                <p>🌐 {profile.website}</p>
              </div>
              {profile.referenceName && (
                <div className="reference-box">
                  <h3>Reference</h3>
                  <p>{profile.referenceName}</p>
                  <p>{profile.referenceRole}</p>
                  <a href={`mailto:${profile.referenceEmail}`}>{profile.referenceEmail}</a>
                </div>
              )}
            </div>
            <div className="contact-right">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <strong className="footer-logo">William Hamal</strong>
          <span className="footer-copy">
            © {new Date().getFullYear()} William Hamal · Technical SEO &amp; Web Analytics ·
            Kathmandu, Nepal
          </span>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#portfolio">Work</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
            <Link href="/admin">Editor</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
