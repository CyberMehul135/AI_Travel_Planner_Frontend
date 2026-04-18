import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TripCardsLoading = () => {
  return (
    <div className="grid gap-6 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-2 max-sm:gap-4 mt-10">
      {[...Array(8)].map((v, i) => (
        <Card className="w-full max-w-xs" key={i}>
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
