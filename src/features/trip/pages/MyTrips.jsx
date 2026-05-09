import { useQuery } from "@tanstack/react-query";
import { getTrips } from "../trip.service";
import { TripDeleteDialog } from "../components/TripDeleteDialog";
import { TripList } from "../components/TripList";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const MyTrips = () => {
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["trips", debounceSearch],
    queryFn: () => getTrips(debounceSearch),
    staleTime: 3000,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <div className="flex gap-5 items-center max-md:flex-col max-md:items-start">
        <div className="w-fit max-md:hidden">
          <h2 className="text-2xl font-medium gradient-text w-max">My Trips</h2>
          <p className="text-muted-foreground text-base mt-1 w-max">
            {data?.data?.data?.length} saved trip
          </p>
        </div>

        <Input
          id="search"
          placeholder="🔍 Search destination"
          className={cn(
            "p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500 max-w-full",
          )}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <TripList trips={data?.data?.data} loading={isLoading} err={error} />

      <TripDeleteDialog />
    </>
  );
};
