import React, { useState, useEffect } from "react";
import {
  Printer,
  Copy,
  Check,
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";

interface SectionMeta {
  id: string;
  number: string;
  title: string;
}

const SECTIONS: SectionMeta[] = [
  { id: "section-1", number: "1", title: "Quotations" },
  { id: "section-2", number: "2", title: "Order Acceptance" },
  { id: "section-3", number: "3", title: "Drawings, Specifications & Tolerances" },
  { id: "section-4", number: "4", title: "Pricing & Payment Terms" },
  { id: "section-5", number: "5", title: "Incoterms" },
  { id: "section-6", number: "6", title: "Production & Quality Control" },
  { id: "section-7", number: "7", title: "Inspection & Acceptance" },
  { id: "section-8", number: "8", title: "Warranty" },
  { id: "section-9", number: "9", title: "Confidentiality" },
  { id: "section-10", number: "10", title: "Shipping & Export" },
  { id: "section-11", number: "11", title: "Governing Law & Jurisdiction" },
  { id: "section-contact", number: "12", title: "Contact" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>("section-1");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    document.title = "Terms & Conditions of Sale | Solvoka Industries (Trading)";
  }, []);

  // IntersectionObserver for tracking active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="w-full bg-white text-black min-h-screen">
      {/* Top Header & Breadcrumbs (Simple Clean White with generous top spacing) */}
      <header className="border-b border-slate-200 bg-white pt-28 pb-10 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
            Terms &amp; Conditions of Sale
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700 max-w-3xl">
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern all quotations, orders, and sales between Solvoka Industries (Trading) (&ldquo;Solvoka,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) and any customer (&ldquo;you,&rdquo; &ldquo;Buyer&rdquo;) requesting or placing an order for forging, CNC machining, casting, sheet metal fabrication, or 3D printing services.
          </p>

          <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700 max-w-3xl font-medium">
            By submitting a Request for Quotation (RFQ) or placing an order with Solvoka, you agree to these Terms.
          </p>

          <div className="mt-4 text-xs text-slate-500">
            This is a draft prepared for review by qualified legal counsel and is not legal advice.
          </div>

          {/* Action strip */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4 print:hidden">
            <div className="text-xs text-slate-500">
              Solvoka Industries (Trading) &bull; Ludhiana, Punjab, India &bull; Commercial Sales Agreement
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-black transition"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#2563eb]" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>Share</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-black transition"
              >
                <Printer className="h-3.5 w-3.5 text-slate-500" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout (Table of Contents + Document Body) */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Sticky Table of Contents (Minimalist Clean Text Links) */}
          <aside className="lg:col-span-4 print:hidden">
            <div className="sticky top-32 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Contents
              </div>
              <nav className="space-y-1.5 text-xs">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollTo(sec.id)}
                      className={`block w-full text-left py-1 transition-colors ${
                        isActive
                          ? "text-[#2563eb] font-semibold pl-2 border-l-2 border-[#2563eb]"
                          : "text-slate-600 hover:text-black pl-2 border-l-2 border-transparent"
                      }`}
                    >
                      {sec.number}. {sec.title}
                    </button>
                  );
                })}
              </nav>

              {/* Clean Contact box */}
              <div className="pt-6 border-t border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-semibold text-black">Commercial Desk</div>
                <div>Email: <a href="mailto:solvoka@gmail.com" className="text-[#2563eb] hover:underline">solvoka@gmail.com</a></div>
                <div>WhatsApp: <a href="https://wa.me/917087086696" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] hover:underline">+91 70870-86696</a></div>
              </div>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-black pt-2"
              >
                <ArrowUp className="h-3 w-3" />
                <span>Back to top</span>
              </button>
            </div>
          </aside>

          {/* Right Column: Clean Document Text (Verbatim Copy) */}
          <div className="lg:col-span-8 space-y-12 text-slate-900 leading-relaxed text-sm sm:text-base">

            {/* SECTION 1 */}
            <section id="section-1" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                1. Quotations
              </h2>
              <p>
                All quotations issued by Solvoka are valid for 30 days from the date of issue, unless otherwise stated in writing. Solvoka aims to respond to every RFQ within one business day.
              </p>
            </section>

            {/* SECTION 2 */}
            <section id="section-2" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                2. Order Acceptance
              </h2>
              <p>
                An order is confirmed only when Solvoka issues written acceptance of the Buyer&apos;s purchase order.
              </p>
            </section>

            {/* SECTION 3 */}
            <section id="section-3" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                3. Drawings, Specifications &amp; Tolerances
              </h2>
              <p>
                Parts are manufactured strictly to the drawing, specification, and tolerance confirmed at the time of quotation. The Buyer is responsible for the accuracy and completeness of all drawings and specifications supplied.
              </p>
            </section>

            {/* SECTION 4 */}
            <section id="section-4" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                4. Pricing &amp; Payment Terms
              </h2>
              <p>Unless otherwise agreed in writing:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-800">
                <li>
                  <strong>50% advance payment</strong> is required with order confirmation.
                </li>
                <li>
                  The <strong>remaining 50%</strong> is due prior to shipment, against the commercial invoice and shipping documents.
                </li>
              </ul>
            </section>

            {/* SECTION 5 */}
            <section id="section-5" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                5. Incoterms
              </h2>
              <p>
                Unless otherwise agreed, quotations are issued on an FOB (Free On Board) basis from the nearest applicable Indian port.
              </p>
            </section>

            {/* SECTION 6 */}
            <section id="section-6" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                6. Production &amp; Quality Control
              </h2>
              <p>
                Every order is manufactured under Solvoka&apos;s three-gate inspection process:
              </p>
              <div className="space-y-3 pl-2">
                <div className="border-l-2 border-slate-300 pl-4 py-1">
                  <h3 className="font-bold text-black text-sm sm:text-base">
                    Gate 1 &mdash; Incoming Material Isolation &amp; MTR Verification:
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm mt-0.5">
                    raw material is isolated on arrival and matched against Mill Test Reports before production begins.
                  </p>
                </div>

                <div className="border-l-2 border-slate-300 pl-4 py-1">
                  <h3 className="font-bold text-black text-sm sm:text-base">
                    Gate 2 &mdash; First-Article Validation &amp; In-Process Audit:
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm mt-0.5">
                    the first piece off the die or line is checked against the Buyer&apos;s drawing before the full run continues, with manual gauge checks at fixed intervals throughout production.
                  </p>
                </div>

                <div className="border-l-2 border-slate-300 pl-4 py-1">
                  <h3 className="font-bold text-black text-sm sm:text-base">
                    Gate 3 &mdash; Pre-Export Environmental Protection &amp; Crating:
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm mt-0.5">
                    finished parts are cleaned, inspected, treated with rust-preventative compounds, vacuum sealed where necessary, and packed in reinforced industrial crates before shipment.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7 */}
            <section id="section-7" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                7. Inspection &amp; Acceptance
              </h2>
              <p>
                Any claim relating to a visible defect, shortage, or discrepancy from the confirmed order must be raised in writing within 7 days of delivery, together with supporting evidence. Claims raised after this period may not be accepted.
              </p>
            </section>

            {/* SECTION 8 */}
            <section id="section-8" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                8. Warranty
              </h2>
              <p>
                Solvoka does not provide a warranty on delivered parts. All parts are inspected under Solvoka&apos;s three-gate quality process &mdash; including first-article validation against the Buyer&apos;s drawing and pre-export inspection &mdash; before shipment. The Buyer is responsible for inspecting parts on receipt and raising any claim within the window stated in Section 7.
              </p>
            </section>

            {/* SECTION 9 */}
            <section id="section-9" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                9. Confidentiality
              </h2>
              <p>
                Drawings and technical data provided by the Buyer remain the Buyer&apos;s property. Where the Buyer has requested a Non-Disclosure Agreement before submitting a drawing, that drawing is handled under the terms of the signed NDA.
              </p>
            </section>

            {/* SECTION 10 */}
            <section id="section-10" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                10. Shipping &amp; Export
              </h2>
              <p>
                Export shipments are prepared and packed under Solvoka&apos;s Gate 3 protocol (see Section 6).
              </p>
            </section>

            {/* SECTION 11 */}
            <section id="section-11" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                11. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms are governed by the laws of India. Any dispute arising from these Terms or any order shall be subject to the exclusive jurisdiction of the courts of Mohali, Punjab, India, save that Solvoka may, at its discretion, refer any dispute with an international Buyer to arbitration under mutually agreed rules.
              </p>
            </section>

            {/* SECTION CONTACT */}
            <section id="section-contact" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                Contact
              </h2>
              <div className="border border-slate-200 bg-white p-5 rounded space-y-2 text-sm text-slate-800">
                <div className="font-bold text-black">Solvoka Industries (Trading)</div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-slate-500 mt-0.5" />
                  <span>Cabin No. 2, 17-B, Phase-II, Focal Point, Ludhiana, Punjab 141003, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-slate-500" />
                  <span>Email: <a href="mailto:solvoka@gmail.com" className="text-[#2563eb] hover:underline font-medium">solvoka@gmail.com</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-slate-500" />
                  <span>Phone / WhatsApp: <a href="tel:+917087086696" className="text-[#2563eb] hover:underline font-medium">+91 70870-86696</a></span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 print:hidden">
                <a
                  href="mailto:solvoka@gmail.com?subject=Terms%20%26%20Conditions%20Inquiry%20-%20Solvoka"
                  className="inline-flex items-center gap-2 rounded bg-black px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-slate-800 transition"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Commercial Inquiry</span>
                </a>
                <a
                  href="https://wa.me/917087086696?text=Hello%20Solvoka%20Team%2C%20I%20have%20a%20question%20regarding%20commercial%20terms%20of%20sale."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-black hover:bg-slate-50 transition"
                >
                  <MessageSquare className="h-4 w-4 text-slate-700" />
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </section>

            {/* Closing Note */}
            <div className="pt-8 border-t border-slate-200 text-xs text-slate-500 text-center">
              Solvoka Industries (Trading) &bull; Draft prepared for review by qualified legal counsel &mdash; not legal advice.
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
