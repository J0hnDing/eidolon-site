import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Database,
  GitBranch,
  Github,
  KeyRound,
  Layers3,
  LockKeyhole,
  Mail,
  Menu,
  Network,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { InView, TextReveal, TraceLine } from './components/MotionPrimitives'

const EIDOLON_GITHUB = 'https://github.com/J0hnDing/Personal-self-evolving-assistant'
const ATLAS_GITHUB = 'https://github.com/J0hnDing/eidolon-atlas'
const CONTACT_EMAIL = 'dingjh0602@gmail.com'

function Logo() {
  return (
    <Link className="brand" to="/" aria-label="Eidolon home">
      <img src="/logo/eidolon_logo_exact.svg" alt="" />
      <span>Eidolon</span>
    </Link>
  )
}

function SectionLink({ id, children, className, onSelect }: { id: string; children: ReactNode; className?: string; onSelect?: () => void }) {
  const location = useLocation()

  if (location.pathname !== '/') {
    return <Link className={className} to={`/#${id}`} onClick={onSelect}>{children}</Link>
  }

  return <a className={className} href={`#${id}`} onClick={onSelect}>{children}</a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <button className="menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <SectionLink id="top" onSelect={() => setOpen(false)}>Home</SectionLink>
          <SectionLink id="how-it-works" onSelect={() => setOpen(false)}>How it works</SectionLink>
          <SectionLink id="atlas" onSelect={() => setOpen(false)}>Atlas</SectionLink>
          <SectionLink id="contact" onSelect={() => setOpen(false)}>Contact</SectionLink>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <a className="nav-source" href={EIDOLON_GITHUB} target="_blank" rel="noreferrer">
            Source <ArrowUpRight size={14} />
          </a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Logo />
          <p>Capability may compound.<br />Authority stays explicit.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Product</span>
            <SectionLink id="how-it-works">How it works</SectionLink>
            <SectionLink id="atlas">Eidolon Atlas</SectionLink>
            <a href={EIDOLON_GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div>
            <span>Connect</span>
            <SectionLink id="contact">Contact</SectionLink>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <div>
            <span>Legal</span>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms of service</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Open source · Active development</span>
        <span>© 2026 Eidolon</span>
      </div>
    </footer>
  )
}

const runSteps = [
  { icon: Sparkles, label: 'Project', detail: 'Clarify the capability' },
  { icon: Braces, label: 'Build', detail: 'Generate and validate' },
  { icon: ShieldCheck, label: 'Approve', detail: 'Review exact permissions' },
  { icon: CircleDot, label: 'Run', detail: 'Execute within bounds' },
]

function ControlPlaneVisual() {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className="control-visual"
      initial={reducedMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="visual-glow" />
      <div className="visual-topbar">
        <div className="visual-title"><img src="/logo/eidolon_logo_exact.svg" alt="" /> Eidolon</div>
        <div className="visual-state"><span /> Local control plane</div>
      </div>
      <div className="visual-body">
        <aside className="visual-sidebar">
          <div className="sidebar-group">WORKSPACE</div>
          {['Project', 'Act', 'Memory'].map((item, index) => (
            <div className={index === 0 ? 'sidebar-row active' : 'sidebar-row'} key={item}>
              <span className="sidebar-glyph">{index === 0 ? '⌁' : index === 1 ? '↳' : '◇'}</span>{item}
            </div>
          ))}
          <div className="sidebar-group">SYSTEM</div>
          {['Skills', 'Schedules', 'Approvals'].map((item) => (
            <div className="sidebar-row" key={item}><span className="sidebar-glyph">·</span>{item}</div>
          ))}
        </aside>
        <div className="visual-content">
          <div className="visual-heading">
            <div>
              <div className="mono-kicker">CAPABILITY / WEEKLY REVIEW</div>
              <h3>Prepare a weekly review</h3>
            </div>
            <div className="review-state"><span /> Ready to review</div>
          </div>
          <div className="build-route">
            {runSteps.map(({ icon: Icon, label, detail }, index) => (
              <div className="route-step" key={label}>
                <div className="route-icon"><Icon size={15} /></div>
                <div><strong>{label}</strong><span>{detail}</span></div>
                {index < runSteps.length - 1 && <TraceLine delay={0.65 + index * 0.12} />}
              </div>
            ))}
          </div>
          <div className="permission-panel">
            <div className="permission-head">
              <div><ShieldCheck size={16} /><span>Runtime approval</span></div>
              <span className="risk-label">REVIEW REQUIRED</span>
            </div>
            <div className="permission-copy">
              <p>This skill is asking to run every Friday and read from two approved sources.</p>
              <div className="scope-grid">
                <div><Clock3 size={14} /><span><small>SCHEDULE</small>Friday · 16:00</span></div>
                <div><KeyRound size={14} /><span><small>ACCESS</small>Read-only · 2 functions</span></div>
              </div>
            </div>
            <div className="permission-actions">
              <span>Nothing runs until you approve.</span>
              <div><button type="button">Deny</button><button type="button" className="approve">Approve</button></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Principle({ number, title, children }: { number: string; title: string; children: string }) {
  return (
    <InView className="principle">
      <div className="principle-number">{number}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </InView>
  )
}

function AtlasVisual() {
  const nodes = [
    { label: 'People', className: 'node-people' },
    { label: 'Goals', className: 'node-goals' },
    { label: 'Projects', className: 'node-projects' },
    { label: 'Knowledge', className: 'node-knowledge' },
    { label: 'Experiences', className: 'node-experiences' },
  ]
  return (
    <div className="atlas-visual" aria-label="Illustration of connected Atlas records">
      <div className="atlas-rings"><span /><span /><span /><span /></div>
      <motion.div
        className="atlas-core"
        animate={{ boxShadow: ['0 0 0 0 rgba(91,130,196,.2)', '0 0 0 14px rgba(91,130,196,0)', '0 0 0 0 rgba(91,130,196,0)'] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut' }}
      >
        <img src="/logo/eidolon_logo_exact.svg" alt="" />
        <span>Atlas</span>
        <small>ENCRYPTED · LOCAL</small>
      </motion.div>
      {nodes.map((node, index) => (
        <motion.div
          className={`atlas-node ${node.className}`}
          key={node.label}
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12 * index, duration: 0.55 }}
        >
          <span />{node.label}
        </motion.div>
      ))}
    </div>
  )
}

function HomePage() {
  return (
    <main id="top">
      <section className="hero section-shell">
        <div className="ambient-rings" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="hero-copy">
          <motion.div className="status-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
            <span className="status-dot" /> Open source · Active development
          </motion.div>
          <TextReveal as="h1" className="hero-title">An AI that grows more useful—without becoming less yours.</TextReveal>
          <motion.p className="hero-lede" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.46 }}>
            Eidolon is a local-first personal agent that remembers deliberately, builds reusable skills, and keeps meaningful action behind your approval.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.62 }}>
            <SectionLink className="button primary" id="how-it-works">See how it works <ArrowRight size={16} /></SectionLink>
            <a className="button secondary" href={EIDOLON_GITHUB} target="_blank" rel="noreferrer"><Github size={16} /> View source</a>
          </motion.div>
        </div>
        <ControlPlaneVisual />
      </section>

      <section className="statement section-shell">
        <InView>
          <p className="section-label">A DIFFERENT KIND OF PERSONAL AI</p>
          <h2>Most assistants reset. Eidolon compounds.</h2>
          <p className="statement-copy">Not by quietly taking more control, but by turning the things you choose to keep into inspectable memory and the things you repeat into bounded, reusable capabilities.</p>
        </InView>
        <div className="principles-grid">
          <Principle number="01" title="Remember deliberately">Memory is explicit, local, and editable. Eidolon does not treat every conversation as something it should keep.</Principle>
          <Principle number="02" title="Build what repeats">A recurring need can become a tested, versioned skill—not another prompt you have to reconstruct.</Principle>
          <Principle number="03" title="Keep authority legible">Generation, installation, and permission to run are separate decisions. You stay in the loop where it matters.</Principle>
        </div>
      </section>

      <section className="how section-shell" id="how-it-works">
        <div className="section-heading">
          <div>
            <p className="section-label">HOW IT WORKS</p>
            <h2>From an idea to a trusted capability.</h2>
          </div>
          <p>Eidolon separates making a skill from trusting it. Every stage has a clear boundary, visible state, and a way back.</p>
        </div>
        <div className="workflow">
          <div className="workflow-line" />
          {[
            ['01', 'Describe the need', 'Start with plain language. Project mode clarifies the outcome and defines a bounded blueprint.'],
            ['02', 'Build and verify', 'Builder and Tester create the package. Eidolon checks its files, tests, manifest, and requested permissions.'],
            ['03', 'Review the boundary', 'See what the skill can access, how it runs, and what approval does—and does not—allow.'],
            ['04', 'Run, inspect, evolve', 'Use it as a function, an isolated app, or a paused-by-default scheduled service. Runs and versions stay visible.'],
          ].map(([number, title, description]) => (
            <div className="workflow-row" key={number}>
              <span className="workflow-number">{number}</span>
              <div className="workflow-dot"><Check size={13} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="boundary-section section-shell">
        <InView className="boundary-intro">
          <p className="section-label">THE CONTROL PLANE</p>
          <h2>Power with a visible edge.</h2>
          <p>Eidolon treats its backend as the safety boundary. Generated code proposes; the control plane validates, authorizes, and records.</p>
        </InView>
        <InView className="boundary-diagram">
          <div className="boundary-user">
            <span className="diagram-icon"><CircleDot size={18} /></span>
            <div><small>YOU</small><strong>Intent & approval</strong></div>
          </div>
          <div className="diagram-arrow"><span>TRUSTED</span><ArrowRight size={16} /></div>
          <div className="boundary-core">
            <img src="/logo/eidolon_logo_exact.svg" alt="" />
            <div><small>CONTROL PLANE</small><strong>Eidolon</strong></div>
            <div className="core-list"><span><ShieldCheck size={13} /> Permissions</span><span><GitBranch size={13} /> Versions</span><span><Clock3 size={13} /> Run history</span></div>
          </div>
          <div className="diagram-arrow restricted"><span>BOUNDED</span><ArrowRight size={16} /></div>
          <div className="boundary-targets">
            <div><Braces size={16} /><span>Functions</span></div>
            <div><Layers3 size={16} /><span>Applications</span></div>
            <div><Clock3 size={16} /><span>Services</span></div>
          </div>
          <div className="trust-outline"><span>TRUST BOUNDARY</span></div>
        </InView>
      </section>

      <section className="atlas-section section-shell" id="atlas">
        <div className="atlas-copy">
          <div>
            <p className="section-label">EIDOLON ATLAS</p>
            <h2>A private map of the life behind the work.</h2>
            <p>Atlas keeps people, experiences, goals, projects, resources, relationships, preferences, and knowledge connected in one encrypted local system.</p>
          </div>
          <div className="atlas-facts">
            <div><LockKeyhole size={17} /><span><strong>Encrypted at rest</strong><small>Personal content is protected with a passphrase-derived key.</small></span></div>
            <div><Database size={17} /><span><strong>Local by design</strong><small>It runs on loopback and remains the authority for its own data.</small></span></div>
            <div><Network size={17} /><span><strong>Connected, not flattened</strong><small>Typed records preserve the shape and context of your information.</small></span></div>
          </div>
          <div><a className="text-link" href={ATLAS_GITHUB} target="_blank" rel="noreferrer">Explore Atlas on GitHub <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="atlas-visual-wrap"><AtlasVisual /></div>
      </section>

      <section className="open-source section-shell">
        <InView>
          <p className="section-label">OPEN BY CONSTRUCTION</p>
          <h2>Inspect the system that acts for you.</h2>
          <p>Eidolon and Atlas are open source and under active development. Read the code, examine the permission model, and help make personal AI more capable without making it less accountable.</p>
          <div className="source-links">
            <a href={EIDOLON_GITHUB} target="_blank" rel="noreferrer"><Github size={16} /> Eidolon <ChevronRight size={15} /></a>
            <a href={ATLAS_GITHUB} target="_blank" rel="noreferrer"><Github size={16} /> Eidolon Atlas <ChevronRight size={15} /></a>
          </div>
        </InView>
      </section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-layout">
          <div>
            <p className="section-label">CONTACT</p>
            <h2>Ideas, questions, or a thoughtful critique.</h2>
          </div>
          <div className="contact-copy">
            <p>Eidolon is an open-source project in active development. For project questions, collaboration, or responsible disclosure, reach out directly or start a discussion on GitHub.</p>
            <div className="contact-links">
              <a href={`mailto:${CONTACT_EMAIL}`}><Mail size={16} />{CONTACT_EMAIL}<ArrowUpRight size={14} /></a>
              <a href={`${EIDOLON_GITHUB}/issues`} target="_blank" rel="noreferrer"><Github size={16} />GitHub issues<ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const privacySections = [
  ['Overview', 'This policy applies to the Eidolon website and the open-source Eidolon and Eidolon Atlas applications. The website is informational and does not provide hosted Eidolon accounts. Eidolon is designed to run locally on infrastructure you control; using the open-source software does not by itself send your local project or Atlas data to us.'],
  ['Google account data accessed', 'If you choose to connect Google, Eidolon requests OpenID identity and email information to identify the authorized account. Calendar separately requests the calendar.events.owned scope. Gmail separately requests the restricted gmail.modify scope. Calendar and Gmail use independent grants and may be connected to different Google accounts. Eidolon does not access Google data until you initiate a connection and approve the requested Google consent screen.'],
  ['Google Calendar data and use', 'Calendar functions are fixed to the connected account’s primary calendar. At your request, Eidolon may list or retrieve events and process event identifiers, status, title, description, location, start and end times, recurrence, related event identifiers, Google Calendar links, and created or updated timestamps. It may also create, update, or delete events when an approved function requests that operation. Eidolon uses this data only to provide the Calendar feature you invoked.'],
  ['Gmail data and use', 'At your request, Eidolon may search Gmail, retrieve a bounded conversation, read new Primary Inbox messages, mark selected messages as read, or send a plain-text email after the required approval. Data processed may include message and conversation identifiers, sender and recipient headers, subject, date, snippet, text body, unread state, and attachment filename, MIME type, and size. Eidolon does not download attachment contents and uses Gmail data only to provide the email feature you invoked.'],
  ['Storage and protection', 'Google OAuth client secrets and refresh tokens are stored in the operating system credential store. The local database stores only opaque secret references, verified account email and identifier, connection status, and timestamps. Access tokens are created for individual provider calls and are not persisted or returned to generated code. The integration layer does not maintain a separate Calendar or Gmail content database or cache. Provider calls pass through a backend-enforced, schema-validated capability boundary, and audit records exclude message bodies, event content, OAuth responses, and tokens.'],
  ['Local outputs', 'Google data is processed locally and returned in bounded, normalized form to the Eidolon function, web application, or Codex tool you explicitly invoke. Eidolon does not automatically mirror Google event or email content. If you choose to include Google data in a generated skill’s output, local run history, project record, or another user-directed artifact, that copy is retained locally under the controls and retention behavior of that feature.'],
  ['Sharing and transfers', 'We do not sell Google user data, use it for advertising, or disclose it to data brokers or information resellers. Google data is transferred only as necessary to provide a feature you request—for example, to Google to perform the selected operation, to the locally running Eidolon component you invoked, or to a model service when an explicitly approved workflow requires that service to complete your request. For an approved email send, if you configured Telegram as the approval channel, the reason, recipients, subject, and complete bounded plain-text body are sent to Telegram’s cloud service before Gmail execution. Third-party processing is governed by your configuration and the applicable provider terms.'],
  ['Google API Limited Use', 'Eidolon’s use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. Google Workspace API data is not used to develop, improve, or train generalized, non-personalized, or other AI or machine-learning models. It is not used for targeted advertising, credit-worthiness, lending, retargeting, or building an unrelated user database.'],
  ['Retention and deletion', 'Calendar and Gmail refresh credentials, account metadata, and connection timestamps are retained locally until you disconnect or replace the relevant connection. Access tokens and OAuth callback state are temporary. Disconnecting Calendar or Gmail deletes Eidolon’s local grant and connection record for that service; it does not disconnect the other service or revoke access at Google. You may also revoke Eidolon from your Google Account’s third-party access settings. Any Google data you deliberately retained in a local skill output or other artifact must be deleted through that feature’s local controls. Sanitized audit records may retain operation identifiers, status, timestamps, and bounded resource identifiers, but not event or message content.'],
  ['Website information', 'This site does not include account registration, payment processing, advertising cookies, contact forms, or client-side analytics. Like most websites, its hosting infrastructure may temporarily process standard request information such as IP address, browser type, requested page, and timestamp for delivery, reliability, and security.'],
  ['Cookies and tracking', 'The current site does not set optional analytics or advertising cookies and does not use cross-site tracking. A hosting provider may use strictly necessary technical mechanisms to deliver and protect the site.'],
  ['Other integrations', 'You may choose to connect Eidolon to services other than Google. Data sent to or received from those services is governed by your configuration, the exact permissions you approve, and each provider’s privacy terms. Review the requested scope before authorizing an integration.'],
  ['Your choices', 'You control whether Google Calendar or Gmail is connected and which Eidolon functions receive approval to use them. You may disconnect either service independently, choose a different account, revoke access through Google, delete locally retained outputs, or stop using the integration. Because the website has no user account database, there is ordinarily no website profile to access, correct, or delete.'],
  ['Changes to this policy', 'We may update this policy when the website, project, integrations, or applicable requirements change. Material changes will be reflected by a new effective date on this page.'],
  ['Contact', 'Privacy questions or deletion concerns can be sent to dingjh0602@gmail.com or raised through the Eidolon project’s public GitHub issue tracker. Do not include OAuth tokens, passphrases, message content, or other sensitive personal data in a public issue.'],
]

const termsSections = [
  ['Acceptance', 'By accessing this website, you agree to these terms. If you do not agree, do not use the website. These terms cover the informational website; use of the source code is governed separately by the license included with each repository.'],
  ['Open-source software', 'Eidolon is distributed under the Apache License 2.0. Eidolon Atlas is distributed under the license included in its repository. Those licenses—not these website terms—grant and limit your rights to copy, modify, and distribute the software. If these terms conflict with an applicable open-source license, the open-source license controls for the software.'],
  ['Active development', 'Eidolon and Atlas are experimental projects under active development. Features may be incomplete, change without notice, or behave differently across environments. You are responsible for reviewing the documentation, source code, permissions, and configuration before relying on the software.'],
  ['Your responsibilities', 'You are responsible for operating your installation lawfully, protecting credentials and passphrases, reviewing proposed permissions and actions, maintaining appropriate backups, and verifying outputs before using them for consequential decisions. Do not use the software to violate rights, laws, or third-party terms.'],
  ['Third-party services', 'Optional integrations, hosting providers, source-code hosts, models, and other third-party services are provided under their own terms. We do not control and are not responsible for their availability, content, security, or practices.'],
  ['Intellectual property', 'The Eidolon name, logo, website design, and original website content remain the property of their respective owners unless a repository license states otherwise. Third-party names and marks belong to their owners. No rights are granted except as expressly stated in these terms or an applicable open-source license.'],
  ['No warranties', 'THE WEBSITE AND SOFTWARE ARE PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. To the extent an open-source license contains its own warranty disclaimer, that disclaimer also applies to the licensed software.'],
  ['Limitation of liability', 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE PROJECT’S AUTHORS AND CONTRIBUTORS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOSS OF DATA, PROFITS, GOODWILL, OR BUSINESS INTERRUPTION, ARISING FROM THE WEBSITE OR SOFTWARE.'],
  ['Changes and availability', 'We may change, suspend, or discontinue any part of this website at any time. We may also update these terms by posting a revised version and effective date. Continued use after an update means you accept the revised terms.'],
  ['General', 'If a provision is unenforceable, the remaining provisions remain in effect. Failure to enforce a provision is not a waiver. Applicable law and mandatory consumer protections may give you rights that these terms cannot limit.'],
  ['Contact', 'Questions about these terms can be raised through the Eidolon project’s public GitHub issue tracker. Do not post confidential or sensitive information in a public issue.'],
]

function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const isPrivacy = type === 'privacy'
  const sections = isPrivacy ? privacySections : termsSections
  return (
    <main className="legal-page section-shell">
      <div className="legal-hero">
        <p className="section-label">LEGAL</p>
        <h1>{isPrivacy ? 'Privacy policy' : 'Terms of service'}</h1>
        <p>{isPrivacy ? 'How the Eidolon website and open-source projects approach information.' : 'The terms for this informational website and its relationship to the open-source licenses.'}</p>
        <span>Effective {isPrivacy ? 'September 2, 2026' : 'September 1, 2026'}</span>
      </div>
      <div className="legal-layout">
        <aside>
          <span>ON THIS PAGE</span>
          {sections.map(([title]) => <a href={`#${title.toLowerCase().replaceAll(' ', '-')}`} key={title}>{title}</a>)}
        </aside>
        <article>
          <div className="legal-note">
            <ShieldCheck size={18} />
            <p>{isPrivacy ? 'Short version: Google data is accessed only after your consent, used only for features you request, protected by local credential storage and scoped controls, and never sold, used for ads, or used to train generalized AI models.' : 'Short version: the website is informational, the software is experimental, and the repository licenses control your open-source rights.'}</p>
          </div>
          {sections.map(([title, content], index) => (
            <section id={title.toLowerCase().replaceAll(' ', '-')} key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{title}</h2>
              <p>{content}</p>
              {title === 'Contact' && <a className="text-link" href={`${EIDOLON_GITHUB}/issues`} target="_blank" rel="noreferrer">Open the issue tracker <ArrowUpRight size={14} /></a>}
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}

function NotFound() {
  return (
    <main className="not-found section-shell">
      <span>404</span><h1>This path is off the map.</h1><p>The page you’re looking for doesn’t exist.</p>
      <Link className="button primary" to="/">Return home <ArrowRight size={16} /></Link>
    </main>
  )
}

function RouteTransition({ pathname, hash, children }: { pathname: string; hash: string; children: ReactNode }) {
  const initialHash = useRef(hash)

  useLayoutEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Eidolon — Your agent, under your control',
      '/privacy': 'Privacy policy — Eidolon',
      '/terms': 'Terms of service — Eidolon',
    }
    document.title = titles[pathname] ?? 'Page not found — Eidolon'

    const root = document.documentElement
    const body = document.body
    const previousRootScrollBehavior = root.style.scrollBehavior
    const previousBodyScrollBehavior = body.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    body.style.scrollBehavior = 'auto'

    const target = initialHash.current ? document.getElementById(initialHash.current.slice(1)) : null
    if (target) target.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })

    const frame = window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousRootScrollBehavior
      body.style.scrollBehavior = previousBodyScrollBehavior
    })

    return () => {
      window.cancelAnimationFrame(frame)
      root.style.scrollBehavior = previousRootScrollBehavior
      body.style.scrollBehavior = previousBodyScrollBehavior
    }
  }, [pathname])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.22 }}>
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()

  useEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  return (
    <div className="app">
      <Header />
      <RouteTransition key={location.pathname} pathname={location.pathname} hash={location.hash}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RouteTransition>
      <Footer />
    </div>
  )
}

export default App
