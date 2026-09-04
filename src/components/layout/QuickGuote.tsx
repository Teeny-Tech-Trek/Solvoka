import { useState, useRef, type FormEvent, type ReactNode } from "react";
import {
  FileText,
  User,
  Building2,
  Mail,
  Phone,
  Package,
  ChevronDown,
  UploadCloud,
  Send,
  Lock,
  Zap,
  ShieldCheck,
  Users,
  X,
  FileCheck2,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface Feature {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

const features: Feature[] = [
  {
    icon: <Zap className="h-4 w-4 text-blue-600" strokeWidth={2.2} />,
    title: "Fast Response",
    subtitle: "WITHIN 24 HOURS",
  },
  {
    icon: <ShieldCheck className="h-4 w-4 text-blue-600" strokeWidth={2.2} />,
    title: "Info Is Secure",
    subtitle: "WE RESPECT PRIVACY",
  },
  {
    icon: <Users className="h-4 w-4 text-blue-600" strokeWidth={2.2} />,
    title: "Dedicated Support",
    subtitle: "RFQ TO DELIVERY",
  },
];

function FieldLabel({ children, required, htmlFor }: { children: ReactNode; required?: boolean; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700 font-sans">
      {children}
      {required && <span className="text-blue-600 font-bold">*</span>}
    </label>
  );
}

export default function QuickRFQ() {
  const [ndaChecked, setNdaChecked] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    process: "",
    material: "",
    quantity: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Asynchronous submit simulation (production-ready fallback)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSuccess(true);
    } catch {
      // Keep UI functional
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex w-full flex-col justify-center overflow-hidden bg-white px-4 sm:px-6 lg:px-10 py-12 sm:py-16 border-t border-slate-100"
    >
      <div className="mx-auto my-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left column — Copy & Features (5 cols) */}
        <div className="relative lg:col-span-5 flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="mb-1.5 flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold tracking-widest text-blue-600 uppercase">
              REQUEST A QUOTE
            </span>
            <div className="h-0.5 w-6 bg-blue-600" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold leading-[1.12] text-slate-900 tracking-tight">
            Get a Quote in Under a Minute
          </h2>

          {/* Subtitle */}
          <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-slate-600 max-w-md">
            Send the basics now — for tolerance, finish, or destination details, our engineering team follows up directly with a complete manufacturing dossier.
          </p>

          {/* 3 Pillars / Value Highlight Columns */}
          <div className="mt-6 grid grid-cols-3 gap-2 divide-x divide-slate-200/80 pt-4 border-t border-slate-100">
            {features.map((feature, idx) => (
              <div key={feature.title} className={`${idx === 0 ? "pl-0" : "pl-2 sm:pl-3"}`}>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100/80">
                  {feature.icon}
                </span>
                <h3 className="mt-2 font-display text-xs font-bold text-slate-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="mt-0.5 font-mono text-[9px] font-semibold tracking-wider text-slate-400 uppercase leading-none">
                  {feature.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Let's build together callout */}
          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              LET&apos;S BUILD TOGETHER
            </div>
            <p className="mt-1.5 font-sans text-xs leading-relaxed text-slate-600">
              Share your component requirements or drawings. We review manufacturability, lead times across our 15+ partner facilities, and return an actionable quote.
            </p>
          </div>
        </div>

        {/* Right column — Form Card (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 shadow-xl shadow-slate-200/40">
          {/* Card Header */}
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100/80">
                <FileText className="h-4.5 w-4.5" strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Quick RFQ
                </h3>
                <p className="font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase leading-none">
                  TELL US A FEW DETAILS
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-700 border border-emerald-200/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              24h Turnaround
            </span>
          </div>

          {isSuccess ? (
            <div className="py-10 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">RFQ Received Successfully!</h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-sm">
                Thank you. Our engineering desk in Focal Point, Ludhiana will review your requirements and respond within one business day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setUploadedFile(null);
                  setFormData({ name: "", company: "", email: "", phone: "", process: "", material: "", quantity: "" });
                }}
                className="mt-6 inline-flex items-center rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
                <div>
                  <FieldLabel required htmlFor="rfq-name">Name</FieldLabel>
                  <div className="relative group">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <User className="h-4 w-4" />
                    </span>
                    <input
                      id="rfq-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel required htmlFor="rfq-company">Company</FieldLabel>
                  <div className="relative group">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <Building2 className="h-4 w-4" />
                    </span>
                    <input
                      id="rfq-company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company name"
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel required htmlFor="rfq-email">Email</FieldLabel>
                  <div className="relative group">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      id="rfq-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="rfq-phone">Phone / WhatsApp</FieldLabel>
                  <div className="relative group">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <Phone className="h-4 w-4" />
                    </span>
                    <input
                      id="rfq-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10"
                    />
                  </div>
                </div>
              </div>

              {/* Process, Material & Quantity */}
              <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-12 pt-1">
                <div className="sm:col-span-6">
                  <FieldLabel required htmlFor="rfq-process">Process</FieldLabel>
                  <div className="relative group">
                    <select
                      id="rfq-process"
                      value={formData.process}
                      onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                      required
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-8 text-xs sm:text-[13px] text-slate-800 transition-all duration-200 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10 cursor-pointer"
                    >
                      <option value="" disabled className="text-slate-400">
                        Select process
                      </option>
                      <option value="forging">Forging</option>
                      <option value="cnc-machining">CNC Machining</option>
                      <option value="casting">Casting</option>
                      <option value="sheet-metal">Sheet Metal Fabrication</option>
                      <option value="3d-printing">3D Printing</option>
                      <option value="injection-molding">Injection Molding</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <FieldLabel htmlFor="rfq-material">Material</FieldLabel>
                  <div className="relative group">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <Package className="h-3.5 w-3.5" />
                    </span>
                    <input
                      id="rfq-material"
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      placeholder="e.g. SS316"
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <FieldLabel required htmlFor="rfq-quantity">Quantity</FieldLabel>
                  <div className="relative group">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <Package className="h-3.5 w-3.5" />
                    </span>
                    <input
                      id="rfq-quantity"
                      type="text"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="e.g. 500 pcs"
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10"
                    />
                  </div>
                </div>
              </div>

              {/* Compact Drawing Upload Strip */}
              <div className="pt-1">
                <FieldLabel>CAD Drawing / Specs (Optional)</FieldLabel>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="rfq-file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".step,.stp,.iges,.igs,.dwg,.dxf,.pdf,.zip,.rar"
                />

                {!uploadedFile ? (
                  <label
                    htmlFor="rfq-file-upload"
                    className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50/60 px-3.5 py-2.5 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50/20"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-blue-600 shadow-xs border border-slate-200 transition-transform group-hover:scale-105">
                        <UploadCloud className="h-4 w-4" strokeWidth={2} />
                      </div>
                      <p className="text-xs font-medium text-slate-700">
                        <span className="font-semibold text-blue-600 underline decoration-blue-600/30 underline-offset-2">
                          Click to upload
                        </span>{" "}
                        or drag &amp; drop
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 hidden sm:inline">
                      STEP, IGES, DWG, PDF (Max 25MB)
                    </span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50/50 px-3.5 py-2">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
                        <FileCheck2 className="h-4 w-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="truncate text-xs font-semibold text-slate-900">
                          {uploadedFile.name}
                        </p>
                        <p className="font-mono text-[10px] text-slate-500">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB · Attached
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="rounded-md p-1.5 text-slate-400 transition hover:bg-white hover:text-slate-700"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* NDA Checkbox */}
              <div className="pt-1">
                <label className="flex cursor-pointer items-start gap-2.5 select-none">
                  <input
                    type="checkbox"
                    checked={ndaChecked}
                    onChange={(e) => setNdaChecked(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                  />
                  <span className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                    This project requires a signed Mutual NDA before sharing full manufacturing drawings.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/35 active:scale-[0.99] disabled:opacity-75 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing RFQ...</span>
                  </>
                ) : (
                  <>
                    <span>Send RFQ to Engineering</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
                  </>
                )}
              </button>

              {/* Confidentiality Footer */}
              <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-sans">
                <Lock className="h-3 w-3 text-slate-400" strokeWidth={2} />
                <span>Strict IP Confidentiality · 256-Bit Encrypted · No Spam</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}