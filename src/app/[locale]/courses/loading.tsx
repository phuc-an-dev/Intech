export default function CoursesLoading() {
  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24">
      {/* Hero skeleton */}
      <div className="bg-[#002D62] py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="h-12 w-2/3 bg-white/10 rounded-xl mx-auto animate-pulse" />
          <div className="h-6 w-1/2 bg-white/10 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        {/* Search bar skeleton */}
        <div className="h-14 w-full max-w-xl mx-auto bg-white rounded-2xl shadow-sm animate-pulse" />

        {/* Topic filter pills skeleton */}
        <div className="flex gap-3 flex-wrap justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-28 bg-white rounded-full shadow-sm animate-pulse" />
          ))}
        </div>

        {/* Course cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-36 bg-gradient-to-br from-gray-200 to-gray-100" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-6 w-full bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 w-1/4 bg-gray-200 rounded" />
                  <div className="h-9 w-24 bg-gray-200 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
