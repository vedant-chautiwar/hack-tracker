export const DashboardSkeleton = () => (
  <div className="mt-8 animate-pulse">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="h-3 w-24 rounded bg-stone-200" />
          <div className="mt-5 h-8 w-16 rounded bg-stone-200" />
          <div className="mt-4 h-3 w-32 rounded bg-stone-100" />
        </div>
      ))}
    </div>
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="grid gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="h-4 w-2/5 rounded bg-stone-200" />
            <div className="mt-4 h-3 w-3/4 rounded bg-stone-100" />
            <div className="mt-3 h-3 w-1/2 rounded bg-stone-100" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <div className="h-5 w-36 rounded bg-stone-200" />
        <div className="mt-5 h-24 rounded bg-stone-100" />
      </div>
    </div>
  </div>
);

export const ListSkeleton = () => (
  <div className="mt-6 grid animate-pulse gap-4">
    {[1, 2, 3, 4].map((item) => (
      <div key={item} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex justify-between gap-4">
          <div className="h-4 w-2/5 rounded bg-stone-200" />
          <div className="h-6 w-24 rounded-full bg-stone-100" />
        </div>
        <div className="mt-5 h-3 w-3/4 rounded bg-stone-100" />
        <div className="mt-3 h-3 w-1/2 rounded bg-stone-100" />
      </div>
    ))}
  </div>
);
