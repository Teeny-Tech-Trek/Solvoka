import { lazy, Suspense, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import SmoothScroll from './components/layout/SmoothScroll';
import UtilityBar from './components/layout/UtilityBar';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import SectionErrorBoundary from './components/common/SectionErrorBoundary';
import LazySection from './components/common/LazySection';
import WhatsAppFloatingButton from './components/common/WhatsAppFloatingButton';
import { useLenis } from './components/layout/LenisContext';
import { trackPageView } from './utils/analytics';
import {
  CapabilitiesSkeleton,
  CoordinationModelSkeleton,
  QualityPreviewSkeleton,
  NetworkTeaserSkeleton,
  QuickRFQSkeleton,
  FooterSkeleton,
} from './components/skeletons/SectionSkeletons';

// Heavy below-the-fold components loaded progressively
const Capabilities = lazy(() => import('./components/layout/Capabilities'));
const CoordinationModel = lazy(() => import('./components/layout/Coordinationmodel'));
const QualityPreview = lazy(() => import('./components/layout/Qualitypreview'));
const NetworkTeaser = lazy(() => import('./components/layout/NetworkTeaser'));
const QuickRFQ = lazy(() => import('./components/layout/QuickGuote'));
const Footer = lazy(() => import('./components/layout/Footer'));

// Pages
const ForgingPage = lazy(() => import('./pages/Forgingpage'));
const CncMachiningPage = lazy(() => import('./pages/CncMachiningpage'));
const CastingPage = lazy(() => import('./pages/Castingpage'));
const PrintingPage = lazy(() => import('./pages/3dPrintingpage'));
const SheetMetalPage = lazy(() => import('./pages/Sheetmetalfabrication'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const AboutUsPage = lazy(() => import('./pages/Aboutpage'));
const MaterialsPage = lazy(() => import('./pages/Materialspage'));
const QualityPage = lazy(() => import('./pages/Qualitypage'));
const AutomotivePage = lazy(() => import('./pages/Automotivepage'));

// Admin CRM Components
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminContactsPage = lazy(() => import('./pages/admin/AdminContactsPage'));
const AdminRfqsPage = lazy(() => import('./pages/admin/AdminRfqsPage'));

function AnalyticsTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    if (lastTrackedPath.current === currentPath) {
      return;
    }
    lastTrackedPath.current = currentPath;

    // Small timeout ensures document.title has updated if page sets it
    const timer = setTimeout(() => {
      trackPageView(currentPath, document.title);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  const prevPathRef = useRef<string>(pathname);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const isNewPage = prevPathRef.current !== pathname;
    prevPathRef.current = pathname;

    if (hash) {
      const targetHash = hash.toLowerCase();

      // When navigating from another page, start at the top so the user experiences
      // the smooth downward glide to the section!
      if (isNewPage) {
        window.scrollTo(0, 0);
        lenis?.scrollTo(0, { immediate: true });
      }

      // Notify lazy sections to render immediately if target matches
      window.dispatchEvent(new Event("hashchange"));

      let attempts = 0;
      const tryScroll = () => {
        let elem: HTMLElement | null = null;
        try {
          elem = document.querySelector(targetHash);
        } catch {
          // ignore invalid selector
        }
        if (!elem && (targetHash === "#quote" || targetHash === "#contact" || targetHash === "#rfq")) {
          elem =
            document.getElementById("quote") ||
            document.getElementById("contact") ||
            document.getElementById("rfq");
        }
        if (!elem && targetHash === "#capabilities") {
          elem = document.getElementById("capabilities");
        }

        if (elem) {
          if (lenis) {
            lenis.scrollTo(elem, { offset: -70, duration: 1.4 });
          } else {
            const top = elem.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: "smooth" });
          }
          return;
        }

        attempts++;
        if (attempts < 25) {
          setTimeout(tryScroll, 50);
        }
      };

      const delay = isNewPage ? 100 : 30;
      const timer = setTimeout(tryScroll, delay);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash, lenis]);

  return null;
}

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-[#2563eb] selection:text-white">
      {/* 1. CRITICAL INITIAL VIEWPORT RENDER (Synchronous, immediate FCP/LCP) */}
      <UtilityBar />
      <Navbar />
      <Hero />

      {/* 2. CAPABILITIES (Loaded immediately after Hero enters viewport) */}
      <SectionErrorBoundary sectionName="Capabilities" fallback={<CapabilitiesSkeleton />}>
        <LazySection id="capabilities" fallback={<CapabilitiesSkeleton />} minHeight="clamp(480px, 75vh, 620px)">
          <Suspense fallback={<CapabilitiesSkeleton />}>
            <Capabilities />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>

      {/* 3. COORDINATION MODEL */}
      <SectionErrorBoundary sectionName="Coordination Model" fallback={<CoordinationModelSkeleton />}>
        <LazySection fallback={<CoordinationModelSkeleton />} minHeight="clamp(460px, 70vh, 540px)">
          <Suspense fallback={<CoordinationModelSkeleton />}>
            <CoordinationModel />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>

      {/* 4. QUALITY PREVIEW */}
      <SectionErrorBoundary sectionName="Quality Preview" fallback={<QualityPreviewSkeleton />}>
        <LazySection fallback={<QualityPreviewSkeleton />} minHeight="clamp(420px, 65vh, 500px)">
          <Suspense fallback={<QualityPreviewSkeleton />}>
            <QualityPreview />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>

      {/* 5. NETWORK TEASER */}
      <SectionErrorBoundary sectionName="Network Teaser" fallback={<NetworkTeaserSkeleton />}>
        <LazySection fallback={<NetworkTeaserSkeleton />} minHeight="clamp(440px, 65vh, 540px)">
          <Suspense fallback={<NetworkTeaserSkeleton />}>
            <NetworkTeaser />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>

      {/* 6. QUICK RFQ */}
      <SectionErrorBoundary sectionName="Quick RFQ" fallback={<QuickRFQSkeleton />}>
        <LazySection id="quote" fallback={<QuickRFQSkeleton />} minHeight="clamp(480px, 75vh, 620px)">
          <Suspense fallback={<QuickRFQSkeleton />}>
            <QuickRFQ />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>

      {/* 7. FOOTER */}
      <SectionErrorBoundary sectionName="Footer" fallback={<FooterSkeleton />}>
        <LazySection fallback={<FooterSkeleton />} minHeight="clamp(320px, 50vh, 420px)" rootMargin="100px">
          <Suspense fallback={<FooterSkeleton />}>
            <Footer />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>
    </div>
  );
}

function CapabilityPageLayout({ children, lightNavbar = false }: { children: React.ReactNode; lightNavbar?: boolean }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-[#2563eb] selection:text-white">
      <UtilityBar />
      <Navbar light={lightNavbar} darkSolid={!lightNavbar} />
      <div className="flex-1">
        {children}
      </div>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2563eb] border-t-transparent" />
    </div>
  );
}

function App() {
  return (
    <SmoothScroll>
      <ScrollToTop />
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/capabilities/forging"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <ForgingPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/forging"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <ForgingPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/capabilities/cnc-machining"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <CncMachiningPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/cnc-machining"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <CncMachiningPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/capabilities/casting"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <CastingPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/casting"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <CastingPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/capabilities/3d-printing"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <PrintingPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/3d-printing"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <PrintingPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/capabilities/sheet-metal-fabrication"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <SheetMetalPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/sheet-metal-fabrication"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <SheetMetalPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/capabilities/sheet-metal"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <SheetMetalPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/sheet-metal"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <SheetMetalPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />

        <Route
          path="/about-us"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <AboutUsPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <ContactUsPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/materials"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout lightNavbar={true}>
                <MaterialsPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/quality"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout lightNavbar={true}>
                <QualityPage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/automotive"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <AutomotivePage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />
        <Route
          path="/industries/automotive"
          element={
            <Suspense fallback={<PageFallback />}>
              <CapabilityPageLayout>
                <AutomotivePage />
              </CapabilityPageLayout>
            </Suspense>
          }
        />

        {/* Admin CRM Routes */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<PageFallback />}>
              <AdminLoginPage />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageFallback />}>
                <AdminLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<PageFallback />}>
                <AdminDashboardPage />
              </Suspense>
            }
          />
          <Route
            path="contacts"
            element={
              <Suspense fallback={<PageFallback />}>
                <AdminContactsPage />
              </Suspense>
            }
          />
          <Route
            path="rfqs"
            element={
              <Suspense fallback={<PageFallback />}>
                <AdminRfqsPage />
              </Suspense>
            }
          />
        </Route>

        {/* Section shortcuts & redirects */}
        <Route path="/capabilities" element={<Navigate to="/#capabilities" replace />} />
        <Route path="/about" element={<Navigate to="/about-us" replace />} />
        <Route path="/facility" element={<Navigate to="/#capabilities" replace />} />
        <Route path="/case-studies" element={<Navigate to="/#coordination-model" replace />} />
        <Route path="/how-we-work" element={<Navigate to="/#coordination-model" replace />} />
        <Route path="/resources" element={<Navigate to="/#capabilities" replace />} />
        <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
        <Route path="/quote" element={<Navigate to="/#quote" replace />} />
        <Route path="/request-a-quote" element={<Navigate to="/#quote" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      <WhatsAppFloatingButton />
    </SmoothScroll>
  );
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;
