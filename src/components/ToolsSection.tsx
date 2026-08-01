function ArrowIcon({ white = false, className = 'w-4 h-4' }: { white?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 32 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke={white ? 'white' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round">
        <path d="M20 3L29 12L20 21" />
        <path d="M3 12L27 12" strokeDasharray="24" />
      </g>
    </svg>
  );
}

const earlyResolutionFeatures = [
  'Speak with an Employment Mediator',
  'Free for both employers and employees',
  'Informal and confidential',
  'Available by phone',
];

export default function ToolsSection() {
  return (
    <>

      {/* Early Resolution Banner */}
      <section className="bg-[#e6f4f6] border-y border-[#b2d8de] py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#006272] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                Free service
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Early resolution — resolve issues quickly
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 max-w-xl">
                Early resolution is a free, impartial phone-based service that helps employers and employees 
                resolve a workplace issue quickly and informally, before it becomes a larger problem.
              </p>
              <ul className="space-y-1.5">
                {earlyResolutionFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#006272">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a
                href="tel:0800209020"
                className="inline-flex items-center justify-center gap-3 bg-[#006272] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#004f5c] transition-colors text-base"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                0800 20 90 20
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#006272] text-[#006272] font-semibold px-6 py-2.5 rounded-lg hover:bg-white transition-colors text-sm"
              >
                Learn about early resolution
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
