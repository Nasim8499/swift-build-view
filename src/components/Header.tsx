import { useState } from 'react';

const navItems = [
  {
    label: 'Starting employment',
    href: '#',
    children: [
      { label: 'Employment agreements', href: '#' },
      { label: 'Types of employment', href: '#' },
      { label: 'Rights and responsibilities', href: '#' },
      { label: 'Hiring employees', href: '#' },
      { label: 'Minimum rights of employees', href: '#' },
      { label: 'Employing people with disabilities', href: '#' },
      { label: 'Employer obligations to migrants', href: '#' },
    ],
  },
  {
    label: 'Pay and hours',
    href: '#',
    children: [
      { label: 'Minimum wage', href: '#' },
      { label: 'Pay and wages', href: '#' },
      { label: 'Hours of work', href: '#' },
      { label: 'Rest and meal breaks', href: '#' },
      { label: 'Trial and probationary periods', href: '#' },
      { label: 'Record keeping', href: '#' },
    ],
  },
  {
    label: 'Leave and holidays',
    href: '#',
    children: [
      { label: 'Annual holidays', href: '#' },
      { label: 'Public holidays', href: '#' },
      { label: 'Sick leave', href: '#' },
      { label: 'Bereavement leave', href: '#' },
      { label: 'Parental leave', href: '#' },
      { label: 'Family violence leave', href: '#' },
      { label: 'Leave without pay', href: '#' },
    ],
  },
  {
    label: 'Workplace policies',
    href: '#',
    children: [
      { label: 'Workplace policies and procedures', href: '#' },
      { label: 'Flexible working', href: '#' },
      { label: 'Health and safety', href: '#' },
      { label: 'Harassment and bullying', href: '#' },
      { label: 'Drug and alcohol testing', href: '#' },
      { label: 'Social media in the workplace', href: '#' },
      { label: 'Privacy in the workplace', href: '#' },
    ],
  },
  {
    label: 'Resolving problems',
    href: '#',
    children: [
      { label: 'Steps to resolve', href: '#' },
      { label: 'Early resolution', href: '#' },
      { label: 'Mediation', href: '#' },
      { label: 'Employment Relations Authority', href: '#' },
      { label: 'Employment Court', href: '#' },
      { label: 'Labour Inspectorate', href: '#' },
      { label: 'Personal grievance', href: '#' },
    ],
  },
  {
    label: 'Ending employment',
    href: '#',
    children: [
      { label: 'Resignation', href: '#' },
      { label: 'Dismissal', href: '#' },
      { label: 'Redundancy', href: '#' },
      { label: 'Retirement', href: '#' },
      { label: 'Final pay', href: '#' },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-[#f2f2f2] border-b border-gray-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-9">
          {/* MBIE badge */}
          <a href="#" className="flex items-center gap-1.5 text-xs text-[#006272] hover:underline font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#006272]">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Part of MBIE
          </a>

          <nav className="flex items-center gap-0 text-xs">
            {[
              { label: 'About us', href: '#' },
              { label: 'Online learning', href: '#' },
              { label: 'Contact us', href: '#' },
              { label: 'News and updates', href: '#' },
            ].map((item, i) => (
              <span key={item.label} className="flex items-center">
                {i > 0 && <span className="text-gray-400 mx-2">|</span>}
                <a href={item.href} className="text-[#006272] hover:underline hidden sm:inline">
                  {item.label}
                </a>
              </span>
            ))}
            {/* Language toggle */}
            <span className="text-gray-400 mx-2 hidden sm:inline">|</span>
            <button className="hidden sm:flex items-center gap-1 text-[#006272] hover:underline font-medium">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.9 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.66-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
              </svg>
              Te Reo
            </button>
          </nav>
        </div>
      </div>

      {/* Main header row */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[72px] gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
            {/* Circular teal logo with stylised fern */}
            <div className="w-[52px] h-[52px] rounded-full bg-[#006272] flex items-center justify-center flex-shrink-0 overflow-hidden">
              <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="26" cy="26" r="26" fill="#006272"/>
                {/* Stylised fern koru */}
                <path d="M26 44 C26 44 18 33 17 24 C16 15 21 8 26 8 C31 8 37 15 36 24 C35 33 26 44 26 44Z" fill="white" opacity="0.9"/>
                <path d="M26 36 C26 36 20 28 19 22" stroke="#006272" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M26 30 C26 30 20 24 18 18" stroke="#006272" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <path d="M26 24 C26 24 31 19 34 16" stroke="#006272" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <path d="M26 18 C26 18 30 14 33 12" stroke="#006272" strokeWidth="1" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[#006272] font-extrabold text-[1.1rem] leading-tight tracking-tight group-hover:underline">
                Employment
              </div>
              <div className="text-[#006272] font-bold text-[1.1rem] leading-tight tracking-tight">
                New Zealand
              </div>
              <div className="text-gray-500 text-[10px] leading-none mt-0.5 font-medium">
                Toi Mai Whakaaro
              </div>
            </div>
          </a>

          {/* Desktop search */}
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
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              className="p-2 text-[#006272]"
              aria-label="Search"
              onClick={() => setMobileOpen(false)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
            <button
              className="p-2 text-[#006272]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop navigation bar */}
      <nav className="hidden md:block border-t border-gray-200 bg-white" aria-label="Main navigation">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <ul className="flex items-stretch -mb-px">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-3.5 text-[13px] font-semibold border-b-[3px] transition-colors whitespace-nowrap ${
                    openDropdown === item.label
                      ? 'text-[#006272] border-[#006272]'
                      : 'text-gray-700 border-transparent hover:text-[#006272] hover:border-[#006272]'
                  }`}
                >
                  {item.label}
                  <svg
                    width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
                    className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                  >
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </a>

                {/* Dropdown menu */}
                {openDropdown === item.label && item.children && (
                  <div className="absolute top-full left-0 z-50 bg-white shadow-xl border border-gray-200 rounded-b-lg min-w-[240px] py-1">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="flex items-center gap-2 px-5 py-2.5 text-[13px] text-gray-700 hover:bg-[#f0f9fa] hover:text-[#006272] transition-colors"
                      >
                        <svg viewBox="0 0 32 24" fill="none" className="w-3.5 h-3 flex-shrink-0 text-[#006272]" xmlns="http://www.w3.org/2000/svg">
                          <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M20 3L29 12L20 21" />
                            <path d="M3 12L27 12" strokeDasharray="24" />
                          </g>
                        </svg>
                        {child.label}
                      </a>
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
          {/* Mobile search */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="w-full h-[40px] border-2 border-[#006272] rounded pl-4 pr-12 text-sm focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-[40px] w-[42px] bg-[#006272] text-white rounded-r flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
            </div>
          </div>

          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.label} className="border-b border-gray-100">
                  <button
                    className="w-full text-left px-5 py-3.5 text-sm font-semibold text-gray-800 flex items-center justify-between"
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                  >
                    {item.label}
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
                      className={`text-[#006272] transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                    >
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                  </button>
                  {mobileExpanded === item.label && item.children && (
                    <ul className="bg-[#f5fbfc] border-t border-gray-100">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            className="flex items-center gap-2 px-7 py-2.5 text-[13px] text-gray-700 hover:text-[#006272] hover:underline"
                          >
                            <svg viewBox="0 0 32 24" fill="none" className="w-3.5 h-3 flex-shrink-0 text-[#006272]" xmlns="http://www.w3.org/2000/svg">
                              <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                <path d="M20 3L29 12L20 21" />
                                <path d="M3 12L27 12" strokeDasharray="24" />
                              </g>
                            </svg>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
