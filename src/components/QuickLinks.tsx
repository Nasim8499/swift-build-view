const quickLinks = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <rect x="8" y="6" width="28" height="36" rx="2" stroke="#006272" strokeWidth="2.5" fill="none"/>
        <path d="M15 15h14M15 21h14M15 27h10M15 33h8" stroke="#006272" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="34" cy="36" r="8" fill="#006272"/>
        <path d="M31 36l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Employment agreements',
    href: '#',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <circle cx="24" cy="24" r="14" stroke="#006272" strokeWidth="2.5" fill="none"/>
        <path d="M24 14v2M24 32v2M16 20l1.73 1M30.27 27l1.73 1M16 28l1.73-1M30.27 21l1.73-1" stroke="#006272" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 22h4a2 2 0 010 4h-2a2 2 0 000 4h5" stroke="#006272" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Minimum wage',
    href: '#',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <rect x="8" y="10" width="32" height="30" rx="2" stroke="#006272" strokeWidth="2.5" fill="none"/>
        <path d="M17 10V6M31 10V6" stroke="#006272" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M8 18h32" stroke="#006272" strokeWidth="2.5"/>
        <rect x="15" y="23" width="5" height="5" rx="1" fill="#006272"/>
        <rect x="21.5" y="23" width="5" height="5" rx="1" fill="#b2d8de"/>
        <rect x="28" y="23" width="5" height="5" rx="1" fill="#b2d8de"/>
        <rect x="15" y="30" width="5" height="5" rx="1" fill="#b2d8de"/>
        <rect x="21.5" y="30" width="5" height="5" rx="1" fill="#b2d8de"/>
      </svg>
    ),
    title: 'Leave and holidays',
    href: '#',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <circle cx="24" cy="24" r="14" stroke="#006272" strokeWidth="2.5" fill="none"/>
        <path d="M24 14v10l6 4" stroke="#006272" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Hours of work',
    href: '#',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <circle cx="16" cy="18" r="6" stroke="#006272" strokeWidth="2.5" fill="none"/>
        <circle cx="32" cy="18" r="6" stroke="#006272" strokeWidth="2.5" fill="none"/>
        <path d="M24 32c-5 0-12 2.5-12 7v2h24v-2c0-4.5-7-7-12-7z" stroke="#006272" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Resolving problems',
    href: '#',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <circle cx="20" cy="18" r="7" stroke="#006272" strokeWidth="2.5" fill="none"/>
        <path d="M9 40c0-6.075 4.925-11 11-11" stroke="#006272" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M31 30l2 2 2-2M31 36l2 2 2-2" stroke="#006272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29 26h8a2 2 0 012 2v12a2 2 0 01-2 2h-8a2 2 0 01-2-2V28a2 2 0 012-2z" stroke="#006272" strokeWidth="2" fill="none"/>
      </svg>
    ),
    title: 'Parental leave',
    href: '#',
  },
];

export default function QuickLinks() {
  return (
    <section className="py-10 bg-[#f5f7f8] border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5">Common topics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="group flex flex-col items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#006272] hover:shadow-sm transition-all text-center"
            >
              <div className="p-2 bg-[#e6f4f6] rounded-full group-hover:bg-[#c8e9ee] transition-colors">
                {link.icon}
              </div>
              <span className="text-[13px] font-semibold text-gray-800 group-hover:text-[#006272] transition-colors leading-snug">
                {link.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
