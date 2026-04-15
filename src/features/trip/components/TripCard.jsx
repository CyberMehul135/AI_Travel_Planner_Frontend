import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, MapPin, Trash2, Users, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteTrip } from "../trip.service";
import { toast } from "sonner";
import { TripDeleteDialog } from "./TripDeleteDialog";
import { useDispatch } from "react-redux";
import { toggleDeleteDialog } from "../tripSlice";

export const TripCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Functions
  const handleTripDelete = (e, tripId) => {
    e.preventDefault();
    e.stopPropagation();

    tripDeleteMutation.mutate(tripId);
  };

  return (
    <div
      className="p-5 bg-card/30  transition-all hover:-translate-y-1 border cursor-pointer dark:border-card rounded-3xl group"
      onClick={() => navigate(`/trips/${data._id}`)}
    >
      <div className="flex items-center justify-between">
        <MapPin className="box-content p-2 gradient-btn rounded-xl" />
        <Trash2
          size={18}
          className="text-destructive/80 p-2 box-content bg-destructive/10 rounded-2xl hover:bg-destructive/20 group-hover:block md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              toggleDeleteDialog({
                isOpen: true,
                data: { id: data._id, name: data.quickSummary.destination },
              }),
            );
          }}
        />
      </div>
      <h3 className="text-xl font-bold my-3">
        {data.quickSummary.destination}
      </h3>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays size={18} color="#5B4BB6" />
          <p className="text-sm text-muted-foreground">
            {data.quickSummary.startDate} - {data.quickSummary.endDate}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Wallet size={18} color="#5B4BB6" />
          <p className="text-sm text-muted-foreground">
            ₹{data.quickSummary.budget}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Users size={18} color="#5B4BB6" />
          <p className="text-sm text-muted-foreground">
            {data.quickSummary.travelers} Adults
          </p>
        </div>
      </div>
    </div>
  );
};
