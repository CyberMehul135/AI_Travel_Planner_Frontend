import { useQuery } from "@tanstack/react-query";
import { TripDetailsCard } from "../components/TripDetailsCard";
import { getTrip } from "../trip.service";
import { useParams } from "react-router-dom";

export const TripDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["trip", id],
    queryFn: () => getTrip(id),
    staleTime: 3000,
  });

  return (
    <TripDetailsCard
      destinationImg={true}
      activityImg={false}
      tripSummary={true}
      buttons={false}
      data={data?.data?.trip}
      loading={isLoading || isFetching}
      err={error}
    />
  );
};
