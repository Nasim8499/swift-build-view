import { Link } from '@tanstack/react-router';

const rights = [
  { title: 'A written employment agreement', text: 'Every employee must be given a written agreement before they start work, and the employer must keep a signed copy.' },
  { title: 'At least the minimum wage', text: 'Pay must meet the minimum wage for every hour worked, including training and trial periods.' },
  { title: 'Paid annual holidays', text: 'Four weeks of paid annual holidays after 12 months of continuous employment.' },
  { title: 'Paid public holidays', text: 'Paid days off on public holidays that fall on days the employee would normally work.' },
  { title: 'Sick and bereavement leave', text: 'Ten days of sick leave a year after six months, plus bereavement and family violence leave.' },
  { title: 'Rest and meal breaks', text: 'Paid rest breaks and unpaid meal breaks based on the length of the work period.' },
  { title: 'A safe workplace', text: 'Employers must manage risks to health and safety, and workers can raise concerns without penalty.' },
  { title: 'Freedom from discrimination', text: 'Protection from discrimination, harassment and bullying at every stage of employment.' },
];

export default function MinimumRights() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="mb-3 inline-block rounded-full bg-[#e6f4f6] px-3 py-1 text-xs font-bold text-[#006272]">
            Minimum rights
          </span>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-[1.75rem]">
            Minimum employment rights that always apply
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-600 md:text-base">
            These rights apply to every employee in New Zealand — full time, part time, casual, fixed term and
            migrant workers. They cannot be traded away in an employment agreement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {rights.map((r, i) => (
            <div key={r.title}>
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#006272] text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="text-[15px] font-bold leading-snug text-gray-900">{r.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{r.text}</p>
            </div>
          ))}
        </div>

        <Link
          to="/topics"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#006272] hover:underline"
        >
          Browse all employment topics →
        </Link>
      </div>
    </section>
  );
}
