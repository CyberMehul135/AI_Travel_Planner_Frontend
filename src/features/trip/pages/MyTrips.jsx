import { useQuery } from "@tanstack/react-query";
import { getTrips } from "../trip.service";
import { TripDeleteDialog } from "../components/TripDeleteDialog";
import { TripList } from "../components/TripList";

export const MyTrips = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getTrips(),
    staleTime: 3000,
  });
  console.log(data);

  return (
    <>
      <h2 className="text-2xl font-medium gradient-text">My Trips</h2>
      <p className="text-muted-foreground text-base mt-1">
        {data?.data?.data?.length} saved trip
      </p>

      <TripList trips={data?.data?.data} loading={isLoading} err={error} />

      <TripDeleteDialog />
    </>
  );
};
