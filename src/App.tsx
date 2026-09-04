import { lazy, Suspense } from 'react';
import './App.css';
import UtilityBar from './components/layout/UtilityBar';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import SectionErrorBoundary from './components/common/SectionErrorBoundary';
import LazySection from './components/common/LazySection';
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

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-amber-500 selection:text-white">
      {/* 1. CRITICAL INITIAL VIEWPORT RENDER (Synchronous, immediate FCP/LCP) */}
      <UtilityBar />
      <Navbar />
      <Hero />

      {/* 2. CAPABILITIES (Loaded immediately after Hero enters viewport) */}
      <SectionErrorBoundary sectionName="Capabilities" fallback={<CapabilitiesSkeleton />}>
        <LazySection fallback={<CapabilitiesSkeleton />} minHeight="600px">
          <Suspense fallback={<CapabilitiesSkeleton />}>
            <Capabilities />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>

      {/* 3. COORDINATION MODEL */}
      <SectionErrorBoundary sectionName="Coordination Model" fallback={<CoordinationModelSkeleton />}>
        <LazySection fallback={<CoordinationModelSkeleton />} minHeight="520px">
          <Suspense fallback={<CoordinationModelSkeleton />}>
            <CoordinationModel />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>

      {/* 4. QUALITY PREVIEW */}
      <SectionErrorBoundary sectionName="Quality Preview" fallback={<QualityPreviewSkeleton />}>
        <LazySection fallback={<QualityPreviewSkeleton />} minHeight="480px">
          <Suspense fallback={<QualityPreviewSkeleton />}>
            <QualityPreview />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>

      {/* 5. NETWORK TEASER */}
      <SectionErrorBoundary sectionName="Network Teaser" fallback={<NetworkTeaserSkeleton />}>
        <LazySection fallback={<NetworkTeaserSkeleton />} minHeight="540px">
          <Suspense fallback={<NetworkTeaserSkeleton />}>
            <NetworkTeaser />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>

      {/* 6. QUICK RFQ */}
      <SectionErrorBoundary sectionName="Quick RFQ" fallback={<QuickRFQSkeleton />}>
        <LazySection fallback={<QuickRFQSkeleton />} minHeight="600px">
          <Suspense fallback={<QuickRFQSkeleton />}>
            <QuickRFQ />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>

      {/* 7. FOOTER */}
      <SectionErrorBoundary sectionName="Footer" fallback={<FooterSkeleton />}>
        <LazySection fallback={<FooterSkeleton />} minHeight="380px" rootMargin="100px">
          <Suspense fallback={<FooterSkeleton />}>
            <Footer />
          </Suspense>
        </LazySection>
      </SectionErrorBoundary>
    </div>
  );
}

export default App;
