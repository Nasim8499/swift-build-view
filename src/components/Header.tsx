import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import AccountLink from '@/components/AccountLink';


export const navItems = [
  {
    label: 'Starting employment',
    slug: 'starting-employment',
    children: [
      'Employment agreements',
      'Types of employment',
      'Rights and responsibilities',
      'Hiring employees',
      'Minimum rights of employees',
      'Employing people with disabilities',
      'Employer obligations to migrants',
    ],
  },
  {
    label: 'Pay and hours',
    slug: 'pay-and-hours',
    children: [
      'Minimum wage',
      'Pay and wages',
      'Hours of work',
      'Rest and meal breaks',
      'Trial and probationary periods',
      'Record keeping',
    ],
  },
  {
    label: 'Leave and holidays',
    slug: 'leave-and-holidays',
    children: [
      'Annual holidays',
      'Public holidays',
      'Sick leave',
      'Bereavement leave',
      'Parental leave',
      'Family violence leave',
      'Leave without pay',
    ],
  },
  {
    label: 'Workplace policies',
    slug: 'workplace-policies',
    children: [
      'Workplace policies and procedures',
      'Flexible working',
      'Health and safety',
      'Harassment and bullying',
      'Drug and alcohol testing',
      'Social media in the workplace',
      'Privacy in the workplace',
    ],
  },
  {
    label: 'Resolving problems',
    slug: 'resolving-problems',
    children: [
      'Steps to resolve',
      'Early resolution',
      'Mediation',
      'Employment Relations Authority',
      'Employment Court',
      'Labour Inspectorate',
      'Personal grievance',
    ],
  },
  {
    label: 'Ending employment',
    slug: 'ending-employment',
    children: ['Resignation', 'Dismissal', 'Redundancy', 'Retirement', 'Final pay'],
  },
] as const;

function ChildArrow() {
  return (
    <svg viewBox="0 0 32 24" fill="none" className="w-3.5 h-3 shrink-0 text-[#006272]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M20 3L29 12L20 21" />
        <path d="M3 12L27 12" strokeDasharray="24" />
      </g>
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-[#f2f2f2] border-b border-gray-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 min-h-9 py-1">
          <a href="https://www.mbie.govt.nz" target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-1.5 text-xs text-[#006272] hover:underline font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="truncate">Part of MBIE</span>
          </a>

          <nav className="flex items-center gap-2 text-xs shrink-0" aria-label="Utility navigation">
            {['About us', 'Online learning', 'Contact us'].map((label) => (
              <span key={label} className="hidden lg:flex items-center gap-2">
                <a href="https://www.mbie.govt.nz" target="_blank" rel="noreferrer" className="text-[#006272] hover:underline">
                  {label}
                </a>
                <span className="text-gray-400">|</span>
              </span>
            ))}
            <Link to="/topics" className="hidden sm:inline text-[#006272] hover:underline">
              Topics
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link to="/news" className="hidden sm:inline text-[#006272] hover:underline">
              News and updates
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <AccountLink />
            <span className="hidden sm:inline text-gray-400">|</span>

            {/* WP Check — the single primary action, top utility bar only */}
            <Link
              to="/wp-check"
              className="inline-flex items-center gap-1.5 rounded bg-[#006272] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#004f5c] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
              WP Check
            </Link>
          </nav>


        </div>
      </div>

      {/* Main header row */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[72px] gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full bg-[#006272] flex items-center justify-center shrink-0 overflow-hidden">
              <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
                <circle cx="26" cy="26" r="26" fill="#006272" />
                <path d="M26 44 C26 44 18 33 17 24 C16 15 21 8 26 8 C31 8 37 15 36 24 C35 33 26 44 26 44Z" fill="white" opacity="0.9" />
                <path d="M26 36 C26 36 20 28 19 22" stroke="#006272" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M26 30 C26 30 20 24 18 18" stroke="#006272" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M26 24 C26 24 31 19 34 16" stroke="#006272" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-[#006272] font-extrabold text-base sm:text-[1.1rem] leading-tight tracking-tight group-hover:underline">
                Employment
              </div>
              <div className="text-[#006272] font-bold text-base sm:text-[1.1rem] leading-tight tracking-tight">
                New Zealand
              </div>
              <div className="text-gray-500 text-[10px] leading-none mt-0.5 font-medium">Toi Mai Whakaaro</div>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-[480px]">
            <div className="relative w-full">
              <label htmlFor="site-search" className="sr-only">Search</label>
              <input
                id="site-search"
                type="search"
                placeholder="Search"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full h-[42px] border-2 border-[#006272] rounded pl-4 pr-12 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#006272] focus:ring-offset-1 bg-white"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-[42px] w-[46px] bg-[#006272] text-white rounded-r flex items-center justify-center hover:bg-[#004f5c] transition-colors"
                aria-label="Search"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              className="p-2 text-[#006272]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop navigation bar */}
      <nav className="hidden md:block border-t border-gray-200 bg-white" aria-label="Main navigation">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <ul className="flex items-stretch flex-wrap -mb-px">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to="/topics/$topic"
                  params={{ topic: item.slug }}
                  className={`flex items-center gap-1 px-2.5 lg:px-3 py-3.5 text-[12px] lg:text-[13px] font-semibold border-b-[3px] transition-colors whitespace-nowrap ${
                    openDropdown === item.label
                      ? 'text-[#006272] border-[#006272]'
                      : 'text-gray-700 border-transparent hover:text-[#006272] hover:border-[#006272]'
                  }`}
                >
                  {item.label}
                  <svg
                    width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </Link>

                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 z-50 bg-white shadow-xl border border-gray-200 rounded-b-lg min-w-[240px] py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child}
                        to="/topics/$topic"
                        params={{ topic: item.slug }}
                        className="flex items-center gap-2 px-5 py-2.5 text-[13px] text-gray-700 hover:bg-[#f0f9fa] hover:text-[#006272] transition-colors"
                      >
                        <ChildArrow />
                        {child}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="relative">
              <label htmlFor="mobile-search" className="sr-only">Search</label>
              <input
                id="mobile-search"
                type="search"
                placeholder="Search"
                className="w-full h-[40px] border-2 border-[#006272] rounded pl-4 pr-12 text-sm focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-[40px] w-[42px] bg-[#006272] text-white rounded-r flex items-center justify-center" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </div>
          </div>

          <nav aria-label="Mobile navigation">
            <ul>
              {navItems.map((item) => (
                <li key={item.label} className="border-b border-gray-100">
                  <div className="flex items-center">
                    <Link
                      to="/topics/$topic"
                      params={{ topic: item.slug }}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 px-5 py-3.5 text-sm font-semibold text-gray-800"
                    >
                      {item.label}
                    </Link>
                    <button
                      className="px-4 py-3.5"
                      aria-label={`Toggle ${item.label} subpages`}
                      aria-expanded={mobileExpanded === item.label}
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    >
                      <svg
                        width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        className={`text-[#006272] transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                      >
                        <path d="M7 10l5 5 5-5z" />
                      </svg>
                    </button>
                  </div>
                  {mobileExpanded === item.label && (
                    <ul className="bg-[#f5fbfc] border-t border-gray-100">
                      {item.children.map((child) => (
                        <li key={child}>
                          <Link
                            to="/topics/$topic"
                            params={{ topic: item.slug }}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-7 py-2.5 text-[13px] text-gray-700 hover:text-[#006272] hover:underline"
                          >
                            <ChildArrow />
                            {child}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="border-b border-gray-100">
                <Link to="/topics" onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 text-sm font-semibold text-gray-800">
                  Browse all topics
                </Link>
              </li>
              <li className="border-b border-gray-100">
                <Link to="/news" onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 text-sm font-semibold text-gray-800">
                  News and updates
                </Link>
              </li>

              <li className="p-4">
                <Link
                  to="/wp-check"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded bg-[#006272] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  WP Check
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
