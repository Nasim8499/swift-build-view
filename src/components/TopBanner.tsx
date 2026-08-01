import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';

export default function TopBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{ backgroundColor: '#1a3a4a' }} className="text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-start gap-3">
          {/* Info icon */}
          <div className="flex-shrink-0 mt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#9fd4db">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-relaxed text-white">
              <strong className="font-bold">Employment Leave Bill</strong>
              {' '}— A new Employment Leave Bill has been introduced to replace the Holidays Act. Until the new Bill takes effect, employers must continue to follow the current law.{' '}
              <Link
                to="/news"
                search={{ q: '', category: 'Law change' }}
                className="inline-flex items-center gap-1 text-[#9fd4db] hover:text-white underline font-medium"
              >
                Employment Leave Bill 2026
                <svg viewBox="0 0 32 24" fill="none" className="w-4 h-3.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 3L29 12L20 21" />
                    <path d="M3 12L27 12" strokeDasharray="24" />
                  </g>
                </svg>
              </Link>

            </p>
          </div>

          {/* Close button */}
          <button
            onClick={() => setVisible(false)}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors mt-0.5 ml-2"
            aria-label="Dismiss notification"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
