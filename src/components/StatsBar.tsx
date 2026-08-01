const stats = [
  { value: '2.9m', label: 'People employed in New Zealand', detail: 'Across all industries and regions' },
  { value: '$23.50', label: 'Adult minimum wage per hour', detail: 'Before tax, for most employees aged 16+' },
  { value: '4 weeks', label: 'Minimum annual holidays', detail: 'After 12 months of continuous employment' },
  { value: '10 days', label: 'Minimum sick leave a year', detail: 'Available after 6 months of employment' },
];

export default function StatsBar() {
  return (
    <section aria-label="Employment at a glance" className="bg-[#004f5c] py-8">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-l-2 border-[#9fd4db]/50 pl-3 sm:pl-4">
            <p className="text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs font-semibold text-[#9fd4db] sm:text-sm">{s.label}</p>
            <p className="mt-1 hidden text-xs leading-relaxed text-white/70 sm:block">{s.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
