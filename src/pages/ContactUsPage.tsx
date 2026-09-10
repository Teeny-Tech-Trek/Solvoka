import { useState } from "react";
import {
    MessageCircle,
    Users,
    Handshake,
    User,
    Building2,
    Mail,
    Phone,
    SlidersHorizontal,
    MessageSquare,
    ArrowRight,
    MapPin,
    ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const trustPoints = [
    {
        icon: MessageCircle,
        title: "Quick Response",
        description: "We typically reply within 1 business day.",
    },
    {
        icon: Users,
        title: "Direct Access",
        description: "Speak with people who understand your project.",
    },
    {
        icon: Handshake,
        title: "Build What's Next",
        description: "From parts to complete assemblies.",
    },
];

const contactDetails = [
    {
        icon: MapPin,
        title: "Our Location",
        lines: ["Focal Point, Ludhiana", "Punjab, India"],
    },
    {
        icon: Mail,
        title: "Email Us",
        lines: ["solvoka@gmail.com"],
    },
    {
        icon: Phone,
        title: "Call Us",
        lines: ["+91 70870-86696"],
    },
];

const projectTypes = [
    "CNC Machining",
    "Forging",
    "Casting",
    "Sheet Metal Fabrication",
    "3D Printing",
    "Complete Sub-Assembly",
    "Other / Custom Inquiry",
];

/* ------------------------------------------------------------------ */
/* Shared Form Field Component                                        */
/* ------------------------------------------------------------------ */

function FieldShell({
    icon: Icon,
    children,
    className = "",
}: {
    icon: React.ElementType;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-3 transition-all focus-within:border-[#0265DC] focus-within:ring-2 focus-within:ring-[#0265DC]/10 ${className}`}
        >
            <Icon className="h-4 w-4 flex-none text-slate-400" strokeWidth={1.75} />
            {children}
        </div>
    );
}

function DotGrid() {
    const rows = 4;
    const cols = 8;
    return (
        <div className="grid grid-cols-8 gap-3" aria-hidden="true">
            {Array.from({ length: rows * cols }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#C8DBF8]/80" />
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page / Section Component (50% - 50% Screen Split)                  */
/* ------------------------------------------------------------------ */

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section className="relative w-full overflow-hidden bg-white py-16 lg:py-24">
            {/* ========================================================== */}
            {/* 50% DIAGONAL SPLIT BACKGROUND                              */}
            {/* Left 50%: Luminous off-white gradient                     */}
            {/* Right 50%: /cnc/grinding-sparks.jpg with dark overlay      */}
            {/* ========================================================== */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Left 50% Pane */}
                <div
                    className="absolute inset-0"
                    style={{ clipPath: "polygon(0 0, 52% 0, 48% 100%, 0 100%)" }}
                >
                    <div className="h-full w-full bg-gradient-to-br from-white via-[#F8FAFC] to-[#EFF5FF]/40" />
                </div>

                {/* Right 50% Pane with grinding-sparks.jpg */}
                <div
                    className="absolute inset-0"
                    style={{ clipPath: "polygon(52% 0, 100% 0, 100% 100%, 48% 100%)" }}
                >
                    <img
                        src="/cnc/grinding-sparks.jpg"
                        alt="Precision CNC machinery and sparks"
                        className="h-full w-full object-cover object-center brightness-[0.72] contrast-[1.15] grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-slate-950/60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/30 to-transparent" />
                </div>
            </div>

            {/* ========================================================== */}
            {/* MAIN CONTENT: EXACT 50% - 50% SPLIT                        */}
            {/* ========================================================== */}
            <div className="relative z-10 mx-auto max-w-[1560px] px-6 lg:px-12 xl:px-16">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-14">
                    {/* -------------------------------------------------- */}
                    {/* LEFT 50%: Heading, Copy, Trust Points & DotGrid    */}
                    {/* -------------------------------------------------- */}
                    <div className="flex flex-col justify-between pt-2 lg:pr-6">
                        <div>
                            {/* Eyebrow: blue bar + CONTACT */}
                            <div className="flex items-center gap-2.5">
                                <span className="h-[2px] w-6 bg-[#0265DC]" />
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#0265DC]">
                                    CONTACT
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-[60px] xl:text-[64px]">
                                Talk to Us
                                <br />
                                <span className="text-[#0265DC]">Directly</span>
                            </h1>

                            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-slate-500 sm:text-lg">
                                Share your requirements and get a response from our team.
                            </p>

                            {/* 3 Trust Points */}
                            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
                                {trustPoints.map((point) => {
                                    const IconComponent = point.icon;
                                    return (
                                        <div key={point.title} className="flex flex-col items-start">
                                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF3FE] text-[#0265DC]">
                                                <IconComponent className="h-5 w-5" strokeWidth={1.8} />
                                            </span>
                                            <h2 className="mt-3.5 font-display text-sm font-bold text-slate-900 leading-tight">
                                                {point.title}
                                            </h2>
                                            <p className="mt-1 text-xs leading-relaxed text-slate-500">
                                                {point.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Hairline + Tagline */}
                            <div className="mt-12 flex items-center gap-3">
                                <span className="h-px w-8 bg-slate-300" />
                                <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-slate-400">
                                    REAL CONVERSATIONS. REAL SOLUTIONS.
                                </span>
                            </div>
                        </div>

                        {/* Dot Grid at Bottom-Left */}
                        <div className="mt-12 hidden lg:block">
                            <DotGrid />
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* RIGHT 50%: Both Containers Joined With 1px Space   */}
                    {/* -------------------------------------------------- */}
                    <div className="w-full">
                        <div className="flex flex-col sm:flex-row items-stretch gap-[1px]">
                            {/* CONTAINER 1: Send Us a Message (White Card) */}
                            <div className="flex-1 rounded-2xl sm:rounded-l-[26px] sm:rounded-r-none bg-white p-6 sm:p-7 xl:p-9 shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-slate-100">
                                <h2 className="font-display text-2xl font-extrabold text-slate-900">
                                    Send Us a Message
                                </h2>
                                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                                    Tell us about your project. We&rsquo;ll get back to you soon.
                                </p>

                                {submitted ? (
                                    <div className="mt-6 rounded-xl bg-blue-50/80 p-6 text-center border border-blue-100">
                                        <h4 className="font-display text-lg font-bold text-slate-900">
                                            Message Received!
                                        </h4>
                                        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                                            Thank you for reaching out. A dedicated engineering specialist
                                            will review your project details and follow up within 24 hours.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setSubmitted(false)}
                                            className="mt-4 inline-flex font-mono text-xs font-bold text-[#0265DC] hover:underline"
                                        >
                                            Send another inquiry →
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                                        {/* Row 1: Name & Company */}
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            <FieldShell icon={User}>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Your Name *"
                                                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                                                />
                                            </FieldShell>

                                            <FieldShell icon={Building2}>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder="Company Name *"
                                                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                                                />
                                            </FieldShell>
                                        </div>

                                        {/* Row 2: Email & Phone */}
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            <FieldShell icon={Mail}>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="Email Address *"
                                                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                                                />
                                            </FieldShell>

                                            <FieldShell icon={Phone}>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="Phone Number"
                                                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                                                />
                                            </FieldShell>
                                        </div>

                                        {/* Row 3: Project Type */}
                                        <FieldShell icon={SlidersHorizontal}>
                                            <select
                                                value={formData.projectType}
                                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                                className="w-full appearance-none bg-transparent text-xs sm:text-sm text-slate-700 focus:outline-none cursor-pointer"
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
                                            <ChevronDown className="h-4 w-4 flex-none text-slate-400 pointer-events-none" />
                                        </FieldShell>

                                        {/* Row 4: Message */}
                                        <div className="flex items-start gap-2.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-3 transition-all focus-within:border-[#0265DC] focus-within:ring-2 focus-within:ring-[#0265DC]/10">
                                            <MessageSquare className="mt-0.5 h-4 w-4 flex-none text-slate-400" strokeWidth={1.75} />
                                            <textarea
                                                rows={4}
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Your Message *"
                                                className="w-full resize-none bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                                            />
                                        </div>

                                        {/* Row 5: Submit Button & Privacy */}
                                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0265DC] px-6 py-3 font-sans text-xs sm:text-sm font-bold text-white shadow-md shadow-[#0265DC]/25 transition-all duration-200 hover:bg-[#0054B8] active:scale-[0.98]"
                                            >
                                                <span>Send Message</span>
                                                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                                            </button>

                                            <p className="text-xs text-slate-500 leading-snug">
                                                By submitting, you agree to our{" "}
                                                <a href="#" className="font-semibold text-[#0265DC] hover:underline">
                                                    Privacy Policy.
                                                </a>
                                            </p>
                                        </div>
                                    </form>
                                )}
                            </div>

                            {/* CONTAINER 2: Get in Touch (Dark Card) */}
                            <div className="w-full sm:w-[270px] xl:w-[310px] flex-none rounded-2xl sm:rounded-r-[26px] sm:rounded-l-none bg-[#0C1628] p-6 sm:p-7 xl:p-9 text-white shadow-2xl border border-slate-800/80 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-display text-2xl font-extrabold text-white">
                                        Get in Touch
                                    </h3>
                                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                                        We&rsquo;re based in Ludhiana, India, and work with customers around the world.
                                    </p>

                                    <div className="mt-6 border-t border-slate-700/60 pt-6">
                                        <div className="space-y-5">
                                            {contactDetails.map((detail) => {
                                                const DetailIcon = detail.icon;
                                                return (
                                                    <div key={detail.title} className="flex items-start gap-3.5">
                                                        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#1B273E] text-slate-200">
                                                            <DetailIcon className="h-4 w-4" strokeWidth={1.75} />
                                                        </span>
                                                        <div>
                                                            <h4 className="font-display text-sm font-bold text-white">
                                                                {detail.title}
                                                            </h4>
                                                            {detail.lines.map((line) => (
                                                                <p key={line} className="text-xs sm:text-sm leading-relaxed text-slate-300">
                                                                    {line}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-slate-800 pt-4 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                                    <span>LUDHIANA HUB</span>
                                    <span className="text-[#0265DC] font-semibold">24H DFM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}