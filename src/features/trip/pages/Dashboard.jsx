import { Banner } from "../components/Banner";
import { TripStatsGrid } from "../components/TripStatsGrid";
import { QuickActions } from "../components/quickActions/QuickActions";
import { AiTripCard } from "../components/AiTripCard";

export const Dashboard = () => {
  return (
    <>
      <Banner />
      <TripStatsGrid />
      <div className="grid grid-cols-12 gap-4">
        <QuickActions className="col-span-8 max-xl:col-span-12" />
        <AiTripCard className="col-span-4 max-xl:col-span-12" />
      </div>
    </>
  );
};
