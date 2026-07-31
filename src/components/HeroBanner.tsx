export default function HeroBanner() {
  return (
    <section className="bg-[#00707f] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M60 100 C60 100 40 70 35 50 C30 30 40 10 60 10 C80 10 90 30 85 50 C80 70 60 100 60 100Z" fill="white"/>
              <path d="M60 80 C60 80 45 65 40 55" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M60 65 C60 65 45 52 38 42" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M60 50 C60 50 72 40 80 35" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M60 35 C60 35 70 28 78 22" stroke="white" strokeWidth="1.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fern)"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4">
            Employment information for employers and employees
          </h1>
          <p className="text-lg text-[#c2e4ea] mb-10 leading-relaxed max-w-2xl">
            Find guidance on employment rights and responsibilities, including pay, leave, 
            workplace policies, and how to resolve employment problems.
          </p>

          {/* I am a... card */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg">
            <p className="text-gray-700 font-semibold text-sm mb-4 uppercase tracking-wide">
              I am looking for information as an:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-2 bg-[#00707f] text-white font-semibold py-4 px-4 rounded-lg hover:bg-[#005f6c] transition-colors text-center"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Employee
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center gap-2 border-2 border-[#00707f] text-[#00707f] font-semibold py-4 px-4 rounded-lg hover:bg-[#e6f4f6] transition-colors text-center"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.46 0 13 0c-1.36 0-2.66.56-3.59 1.56L12 4.59l2.59-2.59C15.08 1.38 15.79 1 16.5 1C17.88 1 19 2.12 19 3.5c0 1.38-1.12 2.5-2.5 2.5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 10H7v-2h8v2zm2-4H7v-2h10v2z"/>
                </svg>
                Employer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
