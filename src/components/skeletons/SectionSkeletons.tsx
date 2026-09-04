export function CapabilitiesSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-12 px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1536px]">
        {/* Heading Skeleton */}
        <div className="max-w-[640px] space-y-3 mb-8">
          <div className="h-4 w-28 bg-slate-200 animate-pulse rounded" />
          <div className="h-8 sm:h-10 w-3/4 bg-slate-200 animate-pulse rounded" />
          <div className="h-8 sm:h-10 w-1/2 bg-slate-200 animate-pulse rounded" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-200 animate-pulse"
            >
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-300 to-transparent p-4 flex flex-col justify-end">
                <div className="h-3 w-16 bg-slate-400 rounded mb-2" />
                <div className="h-5 w-36 bg-slate-400 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoordinationModelSkeleton() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left copy skeleton */}
          <div className="space-y-4">
            <div className="h-3 w-32 bg-slate-200 animate-pulse rounded" />
            <div className="h-10 w-4/5 bg-slate-200 animate-pulse rounded" />
            <div className="h-4 w-full bg-slate-200 animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-slate-200 animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-slate-200 animate-pulse rounded" />
            <div className="pt-4">
              <div className="h-5 w-44 bg-blue-100 animate-pulse rounded" />
            </div>
          </div>

          {/* Right card skeleton */}
          <div className="relative min-h-[360px] sm:min-h-[440px] w-full rounded-xl bg-slate-100 animate-pulse p-6">
            <div className="w-[260px] rounded-lg bg-slate-900/40 p-5 space-y-3">
              <div className="h-3 w-24 bg-slate-700 rounded" />
              <div className="h-10 w-20 bg-blue-900/60 rounded" />
              <div className="h-3 w-36 bg-slate-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function QualityPreviewSkeleton() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="mx-auto max-w-3xl text-center pb-8 space-y-3">
          <div className="h-3 w-32 bg-slate-200 animate-pulse rounded mx-auto" />
          <div className="h-8 w-2/3 bg-slate-200 animate-pulse rounded mx-auto" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 pt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-5 w-48 bg-slate-200 animate-pulse rounded" />
              </div>
              <div className="aspect-[18/10] w-full rounded-xl bg-slate-100 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-200 animate-pulse rounded" />
                <div className="h-3 w-4/5 bg-slate-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NetworkTeaserSkeleton() {
  return (
    <section className="relative w-full bg-slate-50 min-h-[500px] lg:min-h-[560px] py-14 px-6 sm:px-10 lg:px-16 flex items-center">
      <div className="max-w-xl space-y-4">
        <div className="h-3 w-28 bg-slate-200 animate-pulse rounded" />
        <div className="h-10 w-3/4 bg-slate-200 animate-pulse rounded" />
        <div className="h-4 w-full bg-slate-200 animate-pulse rounded" />
        <div className="h-4 w-4/5 bg-slate-200 animate-pulse rounded" />
        <div className="h-10 w-36 bg-blue-100 animate-pulse rounded pt-2" />
      </div>
    </section>
  );
}

export function QuickRFQSkeleton() {
  return (
    <section className="relative w-full bg-white px-4 sm:px-8 lg:px-12 py-10 sm:py-14 border-t border-slate-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="h-3 w-24 bg-slate-200 animate-pulse rounded" />
          <div className="h-8 w-3/4 bg-slate-200 animate-pulse rounded" />
          <div className="h-4 w-full bg-slate-200 animate-pulse rounded" />
          <div className="grid grid-cols-3 gap-2 pt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-100 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="h-6 w-32 bg-slate-200 animate-pulse rounded" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-9 bg-slate-100 rounded animate-pulse" />
            <div className="h-9 bg-slate-100 rounded animate-pulse" />
            <div className="h-9 bg-slate-100 rounded animate-pulse" />
            <div className="h-9 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="h-9 bg-slate-100 rounded animate-pulse" />
          <div className="h-12 bg-blue-100 rounded animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="w-full bg-slate-100 px-6 py-14">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-28 bg-slate-200 animate-pulse rounded" />
            <div className="h-3 w-full bg-slate-200 animate-pulse rounded" />
            <div className="h-3 w-3/4 bg-slate-200 animate-pulse rounded" />
            <div className="h-3 w-1/2 bg-slate-200 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </footer>
  );
}
