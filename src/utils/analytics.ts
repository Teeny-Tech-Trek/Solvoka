declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GA_MEASUREMENT_ID) ||
  "G-XXXXXXXXXX";

/**
 * Initializes Google Analytics 4 (gtag.js) safely.
 */
export function initGA(): void {
  if (typeof window === "undefined") return;

  // Initialize dataLayer and gtag stub if not present
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }

  window.gtag("js", new Date());
  // Disable automatic page_view so React SPA router handles virtual page_view events accurately
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  // Inject gtag.js script if not already present
  if (!document.getElementById("ga-gtag-script") && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    const script = document.createElement("script");
    script.id = "ga-gtag-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  }

  if (import.meta.env?.DEV) {
    console.log(`[GA4] Initialized with ID: ${GA_MEASUREMENT_ID}`);
  }
}

/**
 * Dispatches a typed custom event to GA4.
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
  }

  if (import.meta.env?.DEV) {
    console.log(`[GA4 Event] ${eventName}:`, eventParams);
  }
}

/**
 * Dispatches a virtual page view event.
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle || (typeof document !== "undefined" ? document.title : ""),
    page_location: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * Dispatches a whatsapp_click event.
 */
export function trackWhatsAppClick(location: string): void {
  trackEvent("whatsapp_click", {
    location,
  });
}

/**
 * Dispatches a phone_click event.
 */
export function trackPhoneClick(location: string): void {
  trackEvent("phone_click", {
    location,
  });
}

/**
 * Dispatches an email_click event.
 */
export function trackEmailClick(location: string): void {
  trackEvent("email_click", {
    location,
  });
}

/**
 * Dispatches a quote_cta_click event.
 */
export function trackQuoteCtaClick(location: string): void {
  trackEvent("quote_cta_click", {
    location,
  });
}

/**
 * Dispatches a contact_form_submit event (Key Event / Conversion).
 * STRICTLY NO PII: Only non-identifying metadata.
 */
export function trackContactFormSubmit(params: {
  form_id: string;
  project_type?: string;
  has_company: boolean;
}): void {
  trackEvent("contact_form_submit", {
    form_id: params.form_id,
    project_type: params.project_type || "Unspecified",
    has_company: params.has_company,
  });
}

/**
 * Dispatches an rfq_submit event (Primary Key Event / Conversion).
 * STRICTLY NO PII: Only non-identifying metadata.
 */
export function trackRfqSubmit(params: {
  form_id: string;
  has_cad_file: boolean;
  has_material: boolean;
  has_nda: boolean;
}): void {
  trackEvent("rfq_submit", {
    form_id: params.form_id,
    has_cad_file: params.has_cad_file,
    has_material: params.has_material,
    has_nda: params.has_nda,
  });
}
