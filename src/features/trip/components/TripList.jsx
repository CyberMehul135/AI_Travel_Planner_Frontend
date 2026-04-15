import { TripCard } from "./TripCard";

export const TripList = ({ trips, loading, err }) => {
  const error = err?.response?.data?.message || err?.message;
  const status = err?.status;

  if (loading) return <p className="my-5">Loading...</p>;
  if (err)
    return (
      <p>
        Error : {error} {status}
      </p>
    );
  if (trips) {
    return (
      <div className="grid gap-4 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 mt-10">
        {trips.length > 0 ? (
          trips.map((trip) => <TripCard key={trip._id} data={trip} />)
        ) : (
          <p>0 Trips found</p>
        )}
      </div>
    );
  }
};
