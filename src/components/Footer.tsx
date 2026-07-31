const footerSections = [
  {
    heading: 'Starting employment',
    links: [
      'Employment agreements',
      'Types of employment',
      'Rights and responsibilities',
      'Hiring employees',
      'Minimum rights of employees',
    ],
  },
  {
    heading: 'Pay and hours',
    links: [
      'Minimum wage',
      'Pay and wages',
      'Hours of work',
      'Rest and meal breaks',
      'Record keeping',
    ],
  },
  {
    heading: 'Leave and holidays',
    links: [
      'Annual holidays',
      'Public holidays',
      'Sick leave',
      'Parental leave',
      'Bereavement leave',
      'Family violence leave',
    ],
  },
  {
    heading: 'Workplace policies',
    links: [
      'Workplace policies',
      'Flexible working',
      'Health and safety',
      'Harassment and bullying',
      'Drug and alcohol testing',
    ],
  },
  {
    heading: 'Resolving problems',
    links: [
      'Steps to resolve',
      'Early resolution',
      'Mediation',
      'Employment Relations Authority',
      'Labour Inspectorate',
    ],
  },
  {
    heading: 'Ending employment',
    links: [
      'Resignation',
      'Dismissal',
      'Redundancy',
      'Retirement',
      'Final pay',
    ],
  },
];

const relatedSites = [
  { label: 'business.govt.nz', href: '#' },
  { label: 'careers.govt.nz', href: '#' },
  { label: 'worksafe.govt.nz', href: '#' },
  { label: 'Work and Income', href: '#' },
  { label: 'immigration.govt.nz', href: '#' },
  { label: 'mbie.govt.nz', href: '#' },
];

const legalLinks = [
  'About us',
  'Contact us',
  'News and updates',
  'Privacy statement',
  'Disclaimer',
  'Copyright',
  'Accessibility',
  'Sitemap',
];

export default function Footer() {
  return (
    <footer>
      {/* Related sites bar */}
      <div className="bg-[#004f5c] py-5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[#9fd4db] text-sm font-semibold mr-2 flex-shrink-0">Related sites:</span>
            {relatedSites.map((site, idx) => (
              <span key={site.label} className="flex items-center gap-4">
                {idx > 0 && <span className="text-[#9fd4db]/40 text-sm">|</span>}
                <a href={site.href} className="text-white text-sm hover:text-[#9fd4db] hover:underline transition-colors">
                  {site.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#1f1f1f] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-8">

          {/* Logo + description + social */}
          <div className="flex flex-col md:flex-row gap-8 justify-between mb-10 pb-10 border-b border-gray-700">
            <div className="flex items-start gap-4 max-w-md">
              {/* Logo circle */}
              <div className="w-14 h-14 rounded-full bg-[#006272] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                  <path d="M26 44 C26 44 18 33 17 24 C16 15 21 8 26 8 C31 8 37 15 36 24 C35 33 26 44 26 44Z" fill="white" opacity="0.9"/>
                  <path d="M26 36 C26 36 20 28 19 22" stroke="#006272" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M26 30 C26 30 20 24 18 18" stroke="#006272" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  <path d="M26 24 C26 24 31 19 34 16" stroke="#006272" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">Employment New Zealand</div>
                <p className="text-gray-400 text-xs leading-relaxed mt-2">
                  Employment New Zealand is part of the Ministry of Business, Innovation and Employment (MBIE). 
                  We provide best practice employment information to help employers and employees understand their rights and responsibilities.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Phone: <a href="tel:0800209020" className="text-[#9fd4db] hover:underline">0800 20 90 20</a>
                </p>
              </div>
            </div>

            {/* Social + Newsletter */}
            <div className="flex flex-col gap-4">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Follow us</p>
              <div className="flex gap-2">
                {[
                  {
                    label: 'Facebook',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'LinkedIn',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Twitter/X',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'YouTube',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 bg-gray-700 hover:bg-[#006272] rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <div className="mt-2">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Subscribe to updates</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-gray-800 border border-gray-600 text-white text-sm px-3 py-2 rounded-l focus:outline-none focus:border-[#006272] placeholder-gray-500 min-w-0"
                  />
                  <button className="bg-[#006272] hover:bg-[#004f5c] text-white text-xs font-semibold px-3 py-2 rounded-r transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer nav links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
            {footerSections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-white text-xs font-bold uppercase tracking-wide mb-3 pb-2 border-b border-gray-700">
                  {section.heading}
                </h3>
                <ul className="space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 text-xs hover:text-white hover:underline transition-colors leading-relaxed">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom strip */}
          <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-x-1 gap-y-1 items-center">
              {legalLinks.map((link, idx) => (
                <span key={link} className="flex items-center">
                  {idx > 0 && <span className="text-gray-600 text-xs mx-2">|</span>}
                  <a href="#" className="text-gray-500 text-xs hover:text-gray-300 hover:underline transition-colors">
                    {link}
                  </a>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                to="/admin"
                aria-label="Administrator portal"
                title="Administrator portal"
                className="inline-flex h-5 w-6 items-center justify-center rounded border border-gray-700 text-[10px] font-semibold tracking-wide text-gray-500 opacity-40 hover:opacity-100 transition-opacity"
              >
                AD
              </Link>
              <span className="text-gray-600 text-xs">© Crown copyright {new Date().getFullYear()}</span>

              {/* NZ Govt logo */}
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-[#006272] rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
                    <path d="M10 2C6.69 2 4 4.69 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.31-2.69-6-6-6zm0 8.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <span className="text-gray-500 text-[11px] font-medium">New Zealand<br/>Government</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
