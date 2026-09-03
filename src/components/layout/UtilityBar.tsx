export default function UtilityBar() {
  return (
    <div className="relative z-40 w-full h-[38px] bg-white border-b border-grey-200 text-black shadow-sm">
      <div className="mx-auto flex h-full max-w-[1672px] items-center justify-center gap-x-6 px-4 font-mono text-[12px] sm:text-[13px] tracking-wide lg:px-10">
        {/* Email */}
        <a
          href="mailto:solvoka@gmail.com"
          className="flex items-center gap-2 text-black transition-colors hover:text-amber-600"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-600 shrink-0"
            aria-hidden="true"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="font-semibold text-black">solvoka@gmail.com</span>
        </a>

        <span className="hidden sm:inline text-grey-300" aria-hidden="true">|</span>

        {/* Phone */}
        <a
          href="tel:+917087086696"
          className="flex items-center gap-2 text-black transition-colors hover:text-amber-600"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-600 shrink-0"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="font-semibold text-black">+91 70870-86696</span>
        </a>

        <span className="hidden sm:inline text-grey-300" aria-hidden="true">|</span>

        {/* WhatsApp */}
        <a
          href="https://wa.me/917087086696"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-black transition-colors hover:text-emerald-600"
          aria-label="WhatsApp Business +91 70870-86696"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-emerald-600 shrink-0"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 2.159.685 4.155 1.854 5.794L2.5 22l4.331-1.328A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.777 0-3.428-.464-4.862-1.277l-.348-.198-2.58.791.808-2.493-.223-.357A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
          </svg>
          <span className="font-semibold text-black">WhatsApp Business</span>
        </a>
      </div>
    </div>
  );
}
