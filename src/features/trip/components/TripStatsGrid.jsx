import { TripStatsCard } from "./TripStatsCard";
import { getTripStats } from "../trip.service";
import { useQuery } from "@tanstack/react-query";
import { TripStatsGridLoading } from "./loaders/TripStatsGridLoading";

export const TripStatsGrid = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tripStats"],
    queryFn: () => getTripStats(),
    staleTime: 2000,
  });

  if (isLoading) return <TripStatsGridLoading count={4} />;
  if (error) return <p className="py-2 mt-5">Error {error.message}</p>;
  if (data && data.success) {
    return (
      <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 gap-3 mt-6">
        <TripStatsCard
          title="TOTAL TRIPS GENERATED"
          value={data?.data?.totalTrips}
          subTitle="All Time"
          subTitleColor="blue"
        />
        <TripStatsCard
          title="UPCOMING TRIPS"
          value={data?.data?.upcomingTrips}
          subTitle="Planned"
          subTitleColor="green"
        />
        <TripStatsCard
          title="PAST TRIPS"
          value={data?.data?.pastTrips}
          subTitle="Completed"
          subTitleColor="sky"
        />
        <TripStatsCard
          title="AI REQUEST LEFT"
          value={`♾️`}
          subTitle="Monthly"
          subTitleColor="purple"
        />
      </div>
    );
  }
};
