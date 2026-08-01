/** New Zealand Government lockup mark — silver fern with the Southern Cross. */
export default function NzGovLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="New Zealand Government"
    >
      <circle cx="32" cy="32" r="32" fill="#006272" />
      <path
        d="M32 56C32 56 22 42 20.5 30C19 18 25 8 32 8C39 8 45 18 43.5 30C42 42 32 56 32 56Z"
        fill="#ffffff"
        opacity="0.95"
      />
      <g stroke="#006272" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d="M32 52V14" />
        <path d="M32 46C28 43 25 39 23.5 34" />
        <path d="M32 46c4-3 7-7 8.5-12" />
        <path d="M32 38c-3-2.5-5.5-6-6.5-10" />
        <path d="M32 38c3-2.5 5.5-6 6.5-10" />
        <path d="M32 29c-2-2-3.5-4.5-4-7.5" />
        <path d="M32 29c2-2 3.5-4.5 4-7.5" />
      </g>
      <g fill="#c8102e">
        <circle cx="14" cy="20" r="1.9" />
        <circle cx="12" cy="34" r="1.6" />
        <circle cx="18" cy="46" r="1.6" />
        <circle cx="50" cy="26" r="1.9" />
      </g>
    </svg>
  );
}
