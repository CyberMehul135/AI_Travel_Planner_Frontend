import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteDialog } from "../tripSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrip } from "../trip.service";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export function TripDeleteDialog() {
  // Redux
  const dispatch = useDispatch();
  const { tripDeleteDialog } = useSelector((state) => state.trip);

  // Tanstack
  const queryClient = useQueryClient();
  const tripDeleteMutation = useMutation({
    mutationFn: (tripId) => deleteTrip(tripId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      toast.success("Trip Deleted", { position: "bottom-right" });
      dispatch(toggleDeleteDialog({ isOpen: false }));
    },
  });

  // Functions
  const handleTripDelete = () => {
    tripDeleteMutation.mutate(tripDeleteDialog.data.id);
  };

  return (
    <AlertDialog
      open={tripDeleteDialog.isOpen}
      onOpenChange={(value) => dispatch(toggleDeleteDialog({ isOpen: value }))}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg">Delete Trip</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the trip{" "}
            {tripDeleteDialog.data.name}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => dispatch(toggleDeleteDialog({ isOpen: false }))}
          >
            cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleTripDelete();
            }}
          >
            {tripDeleteMutation.isPending && <Spinner />}
            {tripDeleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
