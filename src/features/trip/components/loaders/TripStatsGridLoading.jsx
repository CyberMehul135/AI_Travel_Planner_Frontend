import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TripStatsGridLoading = ({ count }) => {
  return (
    <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 gap-3 mt-6">
      {[...Array(count)].map((v, i) => (
        <Card className="py-5 max-w-xs" key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-auto w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
