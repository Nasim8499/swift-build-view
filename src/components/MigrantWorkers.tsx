import { Link } from '@tanstack/react-router';

function ArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M20 3L29 12L20 21" />
        <path d="M3 12L27 12" strokeDasharray="24" />
      </g>
    </svg>
  );
}

export default function MigrantWorkers() {
  return (
    <section className="bg-[#f0f9fa] border-y border-[#c8e8ec] py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          {/* Left side */}
          <div className="flex items-start gap-4 flex-1">
            <div className="flex-shrink-0 w-14 h-14 bg-[#006272] rounded-full flex items-center justify-center">
              <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="48" r="20" fill="none"/>
                <circle cx="24" cy="17" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
                <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <path d="M34 6l6 4-6 4" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                Migrant workers
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed max-w-xl">
                Migrant workers have the same minimum employment rights as New Zealand workers. 
                If you, or someone you know, is being exploited in the workplace, you can report it to us.
              </p>
            </div>
          </div>

          {/* Right side links */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#006272] text-white font-semibold px-5 py-2.5 rounded hover:bg-[#004f5c] transition-colors text-sm"
            >
              Migrant worker rights
              <ArrowIcon />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border-2 border-[#006272] text-[#006272] font-semibold px-5 py-2.5 rounded hover:bg-[#e6f4f6] transition-colors text-sm"
            >
              Report exploitation
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
