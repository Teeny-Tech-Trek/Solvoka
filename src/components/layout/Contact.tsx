import { useState, type FormEvent } from "react";
import {
  User,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  MapPin,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Trust feature items on the left                                    */
/* ------------------------------------------------------------------ */

const trustPoints = [
  {
    title: "Quick Response",
    description: "We typically reply within 1 business day.",
    // Chat bubble with inner message lines matching reference image
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6 text-[#0062d2]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="M8 10h8" />
        <path d="M8 14h5" />
      </svg>
    ),
  },
  {
    title: "Direct Access",
    description: "Speak with people who understand your project.",
    // Team / group icon matching reference image
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6 text-[#0062d2]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Build What's Next",
    description: "From parts to complete assemblies.",
    // Handshake icon matching reference image
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6 text-[#0062d2]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.3 1.3" />
        <path d="m14 7.5 2.5 2.5" />
        <path d="M8.5 13 4 17.5a1 1 0 0 0 0 1.4l1.1 1.1a1 1 0 0 0 1.4 0L11 15.5" />
        <path d="m2 11 4.5-4.5a2 2 0 0 1 2.8 0L11 8.2" />
        <path d="m18 10 3.5-3.5a2 2 0 0 0 0-2.8l-.2-.2a2 2 0 0 0-2.8 0L15 7" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Right dark card contact details                                    */
/* ------------------------------------------------------------------ */

const contactInfo = [
  {
    title: "Our Location",
    lines: ["Focal Point, Ludhiana", "Punjab, India"],
    icon: MapPin,
  },
  {
    title: "Email Us",
    lines: ["solvoka@gmail.com "],
    href: "mailto:solvoka@gmail.com ",
    icon: Mail,
  },
  {
    title: "Call Us",
    lines: ["+91 70870-86696"],
    href: "tel:+917087086696",
    icon: Phone,
  },
];

const projectTypes = [
  "CNC Machining",
  "Forging",
  "Casting",
  "Sheet Metal Fabrication",
  "3D Printing",
  "Complete Assemblies",
  "Other / Custom Inquiry",
];

/* ------------------------------------------------------------------ */
/* 4 rows x 8 columns Dot Grid at bottom-left (Desktop Only)         */
/* ------------------------------------------------------------------ */

function DotGrid() {
  return (
    <div className="grid grid-cols-8 gap-x-4 gap-y-3.5" aria-hidden="true">
      {Array.from({ length: 32 }).map((_, i) => (
        <span
          key={i}
          className="h-[5px] w-[5px] rounded-full bg-[#bfd7f7]/90"
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project Type list bullet icon                                      */
/* ------------------------------------------------------------------ */

function ListBulletsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
      <circle cx="4" cy="6" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="4" cy="18" r="1.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Main Contact Component                                             */
/* ------------------------------------------------------------------ */

export default function Contact({ id = "contact" }: { id?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden bg-[#fafbfc] sm:bg-white pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16"
    >
      {/* ============================================================ */}
      {/* BACKGROUND: Shown ON DESKTOP (lg:) ONLY, hidden on mobile & tab */}
      {/* ============================================================ */}
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden hidden lg:block"
        aria-hidden="true"
      >
        {/* Right side CNC Machined metal parts backdrop */}
        <div className="absolute inset-0">
          <img
            src="/images/contact-cnc-bg.jpg"
            alt=""
            className="h-full w-full object-cover object-[78%_center] brightness-[0.76] contrast-[1.14] grayscale-[0.2]"
          />
          {/* Cool dark industrial slate overlay */}
          <div className="absolute inset-0 bg-[#0a1524]/45" />
        </div>

        {/* Clean white polygon covering left 70% sloping to 54% */}
        <div
          className="absolute inset-0 bg-white"
          style={{
            clipPath: "polygon(0 0, 72% 0, 56% 100%, 0 100%)",
          }}
        />

        {/* Subtle diagonal transition wash */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"
          style={{
            clipPath: "polygon(68% 0, 75% 0, 59% 100%, 52% 100%)",
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* MAIN CONTAINER: Responsive Layout for Mobile, Tab, & Desktop */}
      {/* ============================================================ */}
      <div className="relative z-10 mx-auto max-w-[1560px] px-4 sm:px-8 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 items-start lg:items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-14">
          {/* -------------------------------------------------------- */}
          {/* LEFT COLUMN: Talk to Us Directly                         */}
          {/* -------------------------------------------------------- */}
          <div className="flex flex-col justify-between lg:col-span-5 xl:col-span-5">
            <div>
              {/* Blue accent line + CONTACT */}
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-5 sm:w-6 bg-[#0062d2]" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#0062d2]">
                  CONTACT
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-3.5 sm:mt-4 font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-tight text-[#0f172a] leading-[1.06]">
                Talk to Us
                <br />
                <span className="text-[#0062d2]">Directly</span>
              </h1>

              {/* Subheading */}
              <p className="mt-3 sm:mt-4 max-w-md font-sans text-sm sm:text-base text-[#475569] leading-relaxed">
                Share your requirements and get a response from our team.
              </p>

              {/* 3 Trust Feature Items */}
              {/* Responsive: On mobile, horizontal feature list; on desktop, 3 clean columns */}
              <div className="mt-7 sm:mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
                {trustPoints.map((point) => (
                  <div
                    key={point.title}
                    className="flex sm:flex-col items-center sm:items-start gap-3.5 sm:gap-0 bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border border-slate-200/70 sm:border-0 shadow-xs sm:shadow-none"
                  >
                    <span className="flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-full bg-[#e6f1fe]">
                      {point.icon}
                    </span>
                    <div className="sm:mt-3.5">
                      <h3 className="font-display text-[13.5px] font-bold leading-tight text-[#0f172a]">
                        {point.title}
                      </h3>
                      <p className="mt-0.5 sm:mt-1 text-[11.5px] leading-relaxed text-[#64748b]">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tagline bar */}
              <div className="mt-8 sm:mt-9 flex items-center gap-2.5 sm:gap-3">
                <span className="h-[1.5px] w-6 sm:w-7 bg-slate-300" />
                <span className="font-mono text-[9.5px] sm:text-[10.5px] font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                  REAL CONVERSATIONS. REAL SOLUTIONS.
                </span>
              </div>
            </div>

            {/* Bottom-left Dot Grid (Desktop Only) */}
            <div className="mt-8 hidden lg:block">
              <DotGrid />
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* RIGHT COLUMN: Composite Two-Tone Card                    */}
          {/* -------------------------------------------------------- */}
          <div className="w-full lg:col-span-7 xl:col-span-7">
            <div className="flex flex-col md:flex-row overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.1)] lg:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)]">
              {/* ==================================================== */}
              {/* LEFT SUB-CARD: Send Us a Message (White)             */}
              {/* ==================================================== */}
              <div className="flex-1 p-5 sm:p-7 xl:p-8">
                <h2 className="font-display text-xl sm:text-[22px] font-bold text-[#0f172a] leading-tight">
                  Send Us a Message
                </h2>
                <p className="mt-1 text-xs sm:text-[13px] text-[#64748b]">
                  Tell us about your project. We&rsquo;ll get back to you soon.
                </p>

                {isSubmitted ? (
                  <div className="mt-6 sm:mt-8 rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 font-display text-base sm:text-lg font-bold text-slate-900">
                      Message Sent Successfully!
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                      Thank you for reaching out. Our engineering and sales team will review your requirements and respond within 1 business day.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#0062d2] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0051b0] transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-3 sm:space-y-3.5">
                    {/* Row 1: Name & Company */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2.5 rounded-lg border border-slate-200/90 bg-white px-3 sm:px-3.5 py-2.5 transition-all focus-within:border-[#0062d2] focus-within:ring-2 focus-within:ring-[#0062d2]/10">
                        <User className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.8} />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name *"
                          className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2.5 rounded-lg border border-slate-200/90 bg-white px-3 sm:px-3.5 py-2.5 transition-all focus-within:border-[#0062d2] focus-within:ring-2 focus-within:ring-[#0062d2]/10">
                        <Building2 className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.8} />
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Company Name *"
                          className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2.5 rounded-lg border border-slate-200/90 bg-white px-3 sm:px-3.5 py-2.5 transition-all focus-within:border-[#0062d2] focus-within:ring-2 focus-within:ring-[#0062d2]/10">
                        <Mail className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.8} />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Email Address *"
                          className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2.5 rounded-lg border border-slate-200/90 bg-white px-3 sm:px-3.5 py-2.5 transition-all focus-within:border-[#0062d2] focus-within:ring-2 focus-within:ring-[#0062d2]/10">
                        <Phone className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.8} />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Phone Number"
                          className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 3: Project Type dropdown */}
                    <div className="relative flex items-center gap-2.5 rounded-lg border border-slate-200/90 bg-white px-3 sm:px-3.5 py-2.5 transition-all focus-within:border-[#0062d2] focus-within:ring-2 focus-within:ring-[#0062d2]/10">
                      <ListBulletsIcon className="h-4 w-4 shrink-0 text-slate-400" />
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full cursor-pointer appearance-none bg-transparent pr-7 text-sm text-slate-700 focus:outline-none"
                      >
                        <option value="" disabled className="text-slate-400">
                          Project Type
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type} className="text-slate-800">
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 shrink-0 text-slate-400" />
                    </div>

                    {/* Row 4: Message */}
                    <div className="flex items-start gap-2.5 rounded-lg border border-slate-200/90 bg-white px-3 sm:px-3.5 py-2.5 transition-all focus-within:border-[#0062d2] focus-within:ring-2 focus-within:ring-[#0062d2]/10">
                      <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.8} />
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Your Message *"
                        className="w-full resize-y bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>

                    {/* Row 5: Action Button & Privacy Notice */}
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0062d2] px-6 sm:px-7 py-3 font-sans text-sm font-semibold text-white shadow-sm shadow-[#0062d2]/25 transition-all hover:bg-[#0051b0] active:scale-[0.98] disabled:opacity-70 cursor-pointer whitespace-nowrap w-full sm:w-auto"
                      >
                        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        <ArrowRight className="h-4 w-4" strokeWidth={2} />
                      </button>

                      <p className="text-[11.5px] text-[#64748b] text-center sm:text-left">
                        By submitting, you agree to our{" "}
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="font-medium text-[#0062d2] hover:underline"
                        >
                          Privacy Policy.
                        </a>
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* ==================================================== */}
              {/* RIGHT SUB-CARD: Get in Touch (Dark Navy)             */}
              {/* ==================================================== */}
              <div className="w-full flex-none bg-[#0c1828] p-5 sm:p-7 md:w-[260px] xl:w-[290px] xl:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800/80">
                <div>
                  <h3 className="font-display text-xl sm:text-[22px] font-bold text-white leading-tight">
                    Get in Touch
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs text-slate-300 leading-relaxed sm:text-[12.5px]">
                    We&rsquo;re based in Ludhiana, India, and work with customers around the world.
                  </p>

                  {/* 3 Contact Info Details */}
                  <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                    {contactInfo.map((info) => {
                      const Icon = info.icon;
                      return (
                        <div key={info.title} className="flex items-start gap-3 sm:gap-3.5">
                          <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#18293d] border border-slate-700/50 text-slate-200">
                            <Icon className="h-4 w-4" strokeWidth={1.8} />
                          </span>
                          <div className="pt-0.5">
                            <h4 className="font-display text-xs sm:text-[13px] font-bold text-white leading-tight">
                              {info.title}
                            </h4>
                            {info.href ? (
                              <a
                                href={info.href}
                                className="mt-0.5 block text-xs sm:text-[12.5px] text-slate-300 transition-colors hover:text-white"
                              >
                                {info.lines[0]}
                              </a>
                            ) : (
                              info.lines.map((line) => (
                                <p key={line} className="mt-0.5 text-xs sm:text-[12.5px] text-slate-300 leading-relaxed">
                                  {line}
                                </p>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom spacing */}
                <div className="pt-4 sm:pt-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
