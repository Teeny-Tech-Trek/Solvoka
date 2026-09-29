import { useState, useEffect } from "react";
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
  { id: "section-1", number: "1", title: "Who We Are" },
  { id: "section-2", number: "2", title: "Scope of This Policy" },
  { id: "section-3", number: "3", title: "Information We Collect" },
  { id: "section-4", number: "4", title: "How We Use Your Information" },
  { id: "section-5", number: "5", title: "Legal Basis for Processing (UK & EU GDPR)" },
  { id: "section-6", number: "6", title: "How We Share Your Information" },
  { id: "section-7", number: "7", title: "International Data Transfers" },
  { id: "section-8", number: "8", title: "Data Retention" },
  { id: "section-9", number: "9", title: "Cookies and Tracking Technologies" },
  { id: "section-10", number: "10", title: "Your Privacy Rights by Region" },
  { id: "section-11", number: "11", title: "Data Security" },
  { id: "section-12", number: "12", title: "Children's Privacy" },
  { id: "section-13", number: "13", title: "Changes to This Policy" },
  { id: "section-14", number: "14", title: "Contact Us" },
];

const REGIONAL_RIGHTS = [
  {
    region: "United Kingdom & European Union (UK GDPR / GDPR)",
    statute: "UK GDPR / EU GDPR (Regulation 2016/679)",
    content:
      "You have the right to access, correct, or request erasure of your data; restrict or object to certain processing; data portability where feasible; withdraw consent at any time; and lodge a complaint with the UK Information Commissioner's Office or your local supervisory authority.",
  },
  {
    region: "United States",
    statute: "CCPA / CPRA & State Privacy Laws",
    content:
      "Depending on your state, you may have rights under applicable state privacy law (including the CCPA/CPRA), including the right to know what personal information we hold, request deletion or correction, opt out of sale or sharing of personal information (we do not sell personal information — see Section 6), and non-discrimination for exercising these rights.",
  },
  {
    region: "Canada (PIPEDA)",
    statute: "PIPEDA / Quebec Law 25",
    content:
      "You have the right to access your personal information, request correction, and withdraw consent to processing, subject to legal and contractual restrictions, and to lodge a complaint with the Office of the Privacy Commissioner of Canada. Quebec residents may also have rights under Quebec's Law 25.",
  },
  {
    region: "India",
    statute: "Domestic Hub / DPDP",
    content:
      "You may contact us to ask what personal information we hold or to request correction, and we will respond within a reasonable time.",
  },
  {
    region: "South Africa (POPIA)",
    statute: "Protection of Personal Information Act",
    content:
      "You have the right to access, correct, or request deletion of your personal information, object to processing in certain circumstances, and lodge a complaint with South Africa's Information Regulator.",
  },
  {
    region: "Other African Markets",
    statute: "National Statutory Frameworks",
    content:
      "Data protection requirements vary by country. You may contact us at any time using the details in Section 14 with questions about how your information is handled.",
  },
];

export default function PrivacyPolicypage() {
  const [activeSection, setActiveSection] = useState<string>("section-1");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    document.title = "Privacy Policy | Solvoka Industries (Trading)";
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
            Privacy Policy
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700 max-w-3xl">
            This Privacy Policy explains how Solvoka Industries (Trading) (&ldquo;Solvoka,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, and protects information when you visit our website, submit a request for quotation (RFQ), or otherwise communicate with us.
          </p>

          <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700 max-w-3xl">
            We serve customers and prospective customers in India, the United States, the United Kingdom, Canada, and across African markets. This Policy is written to meet the requirements of each of those markets. Where a specific region has additional rights, those are set out in Section 10 below.
          </p>

          <div className="mt-4 text-xs text-slate-500">
            Draft prepared for review by qualified legal counsel &mdash; not legal advice.
          </div>

          {/* Action strip */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4 print:hidden">
            <div className="text-xs text-slate-500">
              Solvoka Industries (Trading) &bull; Ludhiana, Punjab, India &bull; Last updated: September 2026
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
                <div className="font-semibold text-black">Questions?</div>
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

          {/* Right Column: Clean Document Text */}
          <div className="lg:col-span-8 space-y-12 text-slate-900 leading-relaxed text-sm sm:text-base">

            {/* SECTION 1 */}
            <section id="section-1" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                1. Who We Are
              </h2>
              <p>
                Solvoka Industries (Trading) is a precision components supplier based in Focal Point, Ludhiana, Punjab, India, specializing in forging and CNC machining for automotive exporters and OEMs, coordinated through a network of 15+ vetted partner facilities.
              </p>
              <div className="border border-slate-200 bg-white p-4 rounded text-xs sm:text-sm space-y-1.5 text-slate-700">
                <div className="font-semibold text-black">Solvoka Industries (Trading)</div>
                <div><strong>Address:</strong> Cabin No. 2, 17-B, Phase-II, Focal Point, Ludhiana, Punjab 141003, India</div>
                <div><strong>Email:</strong> <a href="mailto:solvoka@gmail.com" className="text-[#2563eb] hover:underline">solvoka@gmail.com</a></div>
                <div><strong>Phone / WhatsApp:</strong> <a href="tel:+917087086696" className="text-[#2563eb] hover:underline">+91 70870-86696</a></div>
              </div>
            </section>

            {/* SECTION 2 */}
            <section id="section-2" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                2. Scope of This Policy
              </h2>
              <p>
                This Policy applies to our website, any RFQ or quote forms hosted on it, our email/phone/WhatsApp communications with you, and any files or drawings you send us for quotation or production. It does not apply to third-party sites we link to, including Instagram or LinkedIn.
              </p>
            </section>

            {/* SECTION 3 */}
            <section id="section-3" className="scroll-mt-24 space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                3. Information We Collect
              </h2>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-black">3.1 Information You Provide Directly</h3>
                <p>
                  When you submit a Request for Quotation &mdash; through the full RFQ form, a mid-page quote block, or by email/WhatsApp &mdash; we may collect: your name, company name, email, phone/WhatsApp number, country, the manufacturing process required (Forging, CNC Machining, Casting, Sheet Metal Fabrication, 3D Printing), part description, material and grade, quantity, tolerance class, surface finish, application and sector, preferred Incoterm, required documentation, uploaded technical drawings and files, and whether you have requested an NDA before file transmission.
                </p>
                <p>
                  We also collect the content of any direct communication you send us by email, phone, or WhatsApp.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-black">3.2 Information Collected Automatically</h3>
                <p>
                  When you visit our website, we use Google Analytics 4 to understand how visitors use our site. This may collect your IP address, browser and device type, pages visited, referring site, and date/time of visit, typically through cookies and similar technologies. Google Analytics processes this data under its own privacy terms. See Section 9 for how we manage cookie consent.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-black">3.3 Files and Drawings You Upload</h3>
                <p>
                  Technical drawings and specifications submitted through the RFQ form are used solely to prepare and process your quotation and, if you proceed, to fulfil production. Where you have requested an NDA before submitting a drawing, that drawing is treated as confidential and handled under the terms of the signed NDA. We do not use your drawings for any purpose beyond quoting and fulfilling your order.
                </p>
              </div>
            </section>

            {/* SECTION 4 */}
            <section id="section-4" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                4. How We Use Your Information
              </h2>
              <p>
                We use your information to: prepare and respond to your RFQ within our stated one-business-day response time; communicate with you about your enquiry, quotation, or order; coordinate production with the relevant facility in our partner network; fulfil export, shipping, and documentation requirements; maintain records for accounting, warranty, and legal compliance; understand and improve how our website is used, through Google Analytics 4; and comply with legal obligations including tax, export control, and customs requirements.
              </p>
              <p className="font-semibold text-black">
                We do not use your information for automated decision-making that produces legal or similarly significant effects on you.
              </p>
            </section>

            {/* SECTION 5 */}
            <section id="section-5" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                5. Legal Basis for Processing (UK &amp; EU GDPR)
              </h2>
              <p>
                Where UK or EU GDPR applies to you, we rely on:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-800">
                <li><strong>Contract:</strong> to prepare a quotation and perform a contract with you.</li>
                <li><strong>Legitimate Interests:</strong> to respond to enquiries and maintain business records.</li>
                <li><strong>Legal Obligation:</strong> for tax, customs, and export compliance.</li>
                <li><strong>Consent:</strong> for Google Analytics 4 cookies (see Section 9).</li>
              </ul>
            </section>

            {/* SECTION 6 */}
            <section id="section-6" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                6. How We Share Your Information
              </h2>
              <p className="font-semibold text-black">
                We do not sell your personal information.
              </p>
              <p>
                We may share your information with: partner facilities within our coordinated network, where necessary to quote or produce your part &mdash; every facility operates under Solvoka&apos;s inspection standard and single point of accountability, and drawings shared under an NDA are shared only to the extent necessary for quotation or production; freight forwarders, customs agents, and logistics providers, where necessary to ship your order; Google, as our analytics service provider, to the extent described in Section 3.2; and regulators, courts, or authorities, where required by law.
              </p>
              <p className="font-semibold text-black">
                We do not share your information with third parties for their own independent marketing purposes.
              </p>
            </section>

            {/* SECTION 7 */}
            <section id="section-7" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                7. International Data Transfers
              </h2>
              <p>
                Solvoka is based in India, and personal information you submit &mdash; including through the RFQ form &mdash; is processed and stored in India. If you are located outside India, this means your information is transferred to and processed in a country with different data protection laws than your own.
              </p>
            </section>

            {/* SECTION 8 */}
            <section id="section-8" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                8. Data Retention
              </h2>
              <p>
                We retain personal information for as long as necessary to fulfil the purposes described in this Policy, and in any event no longer than seven years from the end of our business relationship with you, in line with standard tax, accounting, and warranty record-keeping practice.
              </p>
            </section>

            {/* SECTION 9 */}
            <section id="section-9" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                9. Cookies and Tracking Technologies
              </h2>
              <p>
                Our website uses Google Analytics 4 to understand how visitors use the site, which sets cookies on your device. Where required by law, we will request your consent before setting these non-essential cookies, and you will be able to manage your preferences through a cookie banner or your browser settings.
              </p>
            </section>

            {/* SECTION 10 */}
            <section id="section-10" className="scroll-mt-24 space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                10. Your Privacy Rights by Region
              </h2>
              <div className="space-y-4">
                {REGIONAL_RIGHTS.map((reg) => (
                  <div key={reg.region} className="border-l-2 border-slate-200 pl-4 py-1 space-y-1">
                    <h3 className="font-bold text-black text-sm sm:text-base">
                      {reg.region}
                    </h3>
                    <p className="text-slate-700 text-xs sm:text-sm">
                      {reg.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11 */}
            <section id="section-11" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                11. Data Security
              </h2>
              <p>
                We take reasonable technical and organizational measures to protect the personal information and technical drawings you share with us against unauthorized access, loss, or misuse. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* SECTION 12 */}
            <section id="section-12" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                12. Children&apos;s Privacy
              </h2>
              <p>
                Our website and services are directed at businesses and professionals and are not intended for use by children. We do not knowingly collect personal information from children.
              </p>
            </section>

            {/* SECTION 13 */}
            <section id="section-13" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                13. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be reflected on this page.
              </p>
            </section>

            {/* SECTION 14 */}
            <section id="section-14" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-b border-slate-200 pb-2">
                14. Contact Us
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or how your personal information or drawings are handled, please contact us:
              </p>
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
                  href="mailto:solvoka@gmail.com?subject=Privacy%20Policy%20Inquiry%20-%20Solvoka"
                  className="inline-flex items-center gap-2 rounded bg-black px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-slate-800 transition"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Compliance Desk</span>
                </a>
                <a
                  href="https://wa.me/917087086696?text=Hello%20Solvoka%20Team%2C%20I%20have%20a%20question%20regarding%20data%20privacy%20and%20technical%20drawing%20protection."
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
              Solvoka Industries (Trading) &bull; Draft for review by qualified legal counsel &mdash; not legal advice.
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
