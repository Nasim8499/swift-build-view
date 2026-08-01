import { Link } from '@tanstack/react-router';

export default function SupportContact() {
  return (
    <section className="bg-[#004f5c] py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <h2 className="mb-2 text-2xl font-bold text-white md:text-[1.75rem]">Get help and support</h2>
          <p className="text-sm leading-relaxed text-[#b2d8de] md:text-base">
            Free, confidential help for employers and employees. Every service below is provided at no cost.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col rounded-lg bg-white/10 p-5 ring-1 ring-white/15">
            <h3 className="text-[15px] font-bold text-white">Call the contact centre</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#b2d8de]">
              0800 20 90 20 — Monday to Friday, 8am to 5pm. Interpreters available on request.
            </p>
            <a href="tel:0800209020" className="mt-4 text-sm font-semibold text-white hover:underline">
              Call 0800 20 90 20 →
            </a>
          </div>

          <div className="flex flex-col rounded-lg bg-white/10 p-5 ring-1 ring-white/15">
            <h3 className="text-[15px] font-bold text-white">Report exploitation</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#b2d8de]">
              Report migrant worker exploitation or breaches of minimum employment standards, anonymously if you prefer.
            </p>
            <Link
              to="/topics/$topic"
              params={{ topic: 'resolving-problems' }}
              className="mt-4 text-sm font-semibold text-white hover:underline"
            >
              How to report a concern →
            </Link>
          </div>

          <div className="flex flex-col rounded-lg bg-white/10 p-5 ring-1 ring-white/15">
            <h3 className="text-[15px] font-bold text-white">Run a WP Check</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#b2d8de]">
              Confirm a worker&apos;s entitlement before employment starts and keep the reference number on file.
            </p>
            <Link to="/wp-check" className="mt-4 text-sm font-semibold text-white hover:underline">
              Start a WP Check →
            </Link>
          </div>

          <div className="flex flex-col rounded-lg bg-white/10 p-5 ring-1 ring-white/15">
            <h3 className="text-[15px] font-bold text-white">Browse topics</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#b2d8de]">
              Guidance on pay, hours, leave, workplace policies, resolving problems and ending employment.
            </p>
            <Link to="/topics" className="mt-4 text-sm font-semibold text-white hover:underline">
              Browse all topics →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
