import { Skeleton } from "@/components/ui/skeleton";

export const TripDetailsCardLoading = () => {
  return (
    <div className="space-y-6 mx-auto w-full max-w-[800px]">
      {/* 🔹 Hero Section */}
      <div className="relative rounded-2xl overflow-hidden">
        <Skeleton className="w-full h-[250px]" />
        <div className="absolute bottom-5 left-5 space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>
      </div>

      {/* 🔹 Trip Summary */}
      <div className="bg-card/30 border rounded-2xl p-5 space-y-4">
        <Skeleton className="h-6 w-40" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 rounded-2xl border space-y-3">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        ))}
      </div>

      {/* 🔹 Important Info */}
      <Skeleton className="h-16 w-full rounded-xl" />

      {/* 🔹 Itinerary */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />

        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border rounded-xl"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>

            <div className="text-right space-y-2">
              <Skeleton className="h-3 w-20 ml-auto" />
              <Skeleton className="h-4 w-16 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
