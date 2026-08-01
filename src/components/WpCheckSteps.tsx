import { Link } from '@tanstack/react-router';

const steps = [
  {
    step: 'Step 1',
    title: 'Collect the worker details',
    text: 'You need the worker’s full name, date of birth, passport number and the country that issued it, exactly as they appear on their travel document.',
  },
  {
    step: 'Step 2',
    title: 'Confirm the role and employer',
    text: 'Enter your business details, the job title, the work location and the agreed hours and pay rate for the role being offered.',
  },
  {
    step: 'Step 3',
    title: 'Run the official WP Check',
    text: 'The Work Agreement and Entitlement Verification confirms whether the person can legally do that work, for that employer, in that location.',
  },
  {
    step: 'Step 4',
    title: 'Keep the reference number',
    text: 'Every check returns a reference number and date. Store it with the employment agreement — it is your evidence that you checked before work started.',
  },
];

export default function WpCheckSteps() {
  return (
    <section className="border-y border-gray-200 bg-[#f5f7f8] py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <span className="mb-3 inline-block rounded-full bg-[#006272] px-3 py-1 text-xs font-bold text-white">
            WP Check
          </span>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-[1.75rem]">How an official WP Check works</h2>
          <p className="text-sm leading-relaxed text-gray-600 md:text-base">
            Before someone starts work, employers must confirm the person is entitled to do the job. A WP Check takes a
            few minutes and gives you a dated reference number for your records.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.step} className="rounded-lg border border-gray-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-[#006272]">{s.step}</p>
              <h3 className="mt-2 text-[15px] font-bold leading-snug text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/wp-check"
            className="inline-flex items-center justify-center rounded bg-[#006272] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c]"
          >
            Start a WP Check
          </Link>
          <Link
            to="/topics/$topic"
            params={{ topic: 'starting-employment' }}
            className="inline-flex items-center justify-center rounded border-2 border-[#006272] px-5 py-2.5 text-sm font-semibold text-[#006272] hover:bg-white"
          >
            Before you hire someone
          </Link>
        </div>
      </div>
    </section>
  );
}
