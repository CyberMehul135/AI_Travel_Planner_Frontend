import { MapPinned, Plane, Rocket } from "lucide-react";
import { QuickActionButton } from "./QuickActionButton";
import { useNavigate } from "react-router-dom";

export const QuickActions = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`mt-5 bg-card/50 shadow-sm max-md:border-none max-md:bg-transparent border p-7 max-md:p-2 rounded-lg w-full h-fit ${className}`}
    >
      <h2 className="flex items-center gap-3 font-bold text-xl mb-4">
        <Rocket className="text-blue-500" />
        <p>Quick Actions</p>
      </h2>

      <div className="flex gap-3 max-md:gap-5 flex-wrap">
        <QuickActionButton
          heading="Plan New Trip"
          subHeading="Create AI-powered itinery"
          icon={Plane}
          className={"bg-blue-500"}
          onClick={() => navigate("/trips/create")}
        />
        <QuickActionButton
          heading="Saved Trips"
          subHeading="View your saved trip"
          icon={MapPinned}
          className="bg-green-600"
          onClick={() => navigate("/trips")}
        />
      </div>
    </div>
  );
};
