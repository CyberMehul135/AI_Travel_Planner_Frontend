import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function TripStatsCard({ title, value, subTitle, subTitleColor }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    green: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    sky: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    purple:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  };

  return (
    <Card className="rounded-lg bg-card/50 shadow-sm border ring-0 hover:shadow-xl transition duration-500">
      <CardContent className="py-2">
        <h3 className="text-sm mb-2 font-normal max-md:text-xs">{title}</h3>
        <p className="text-sm flex items-center max-sm:items-end justify-start gap-1 max-md:gap-3">
          <span className="text-2xl">{value}</span>
          <Badge className={`${colorClasses[subTitleColor]} max-md:hidden`}>
            {subTitle}
          </Badge>
        </p>
      </CardContent>
    </Card>
  );
}
