import { CalendarDays, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleDeleteDialog } from "../tripSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDateToDDMonthYYYY } from "@/shared/utils/formatDate";
import { getPluralSuffix } from "@/shared/utils/pluralize";

export const TripCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(data.quickSummary.travelers > 1 && "s");

  return (
    <Card
      className="group relative shadow-sm mx-auto w-full max-w-sm pt-0 cursor-pointer bg-card/50  transition-all hover:-translate-y-1 rounded-lg border-none "
      onClick={() => navigate(`/trips/${data._id}`)}
    >
      <div className="absolute inset-0 z-30 h-35 max-sm:h-25 bg-black/10" />
      <img
        src={data?.quickSummary?.image}
        alt="Event cover"
        className="relative z-20 h-35 max-sm:h-25 w-full object-cover brightness-100  dark:brightness-100 group-hover:scale-103 transition-all duration-300"
      />
      <Trash2
        size={18}
        className="max-sm:size-3.5 text-white p-2 box-content bg-gray-800/50 rounded-2xl hover:bg-gray-800/90 group-hover:block md:hidden absolute top-2 right-2 z-30"
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
      <CardHeader className={cn("max-sm:px-2")}>
        <CardTitle
          className={cn("font-semibold text-lg max-sm:text-lg -mt-2 mb-0.5")}
        >
          {data.quickSummary.destination}
        </CardTitle>
        <CardContent
          className={cn("px-0 flex flex-col gap-3 text-muted-foreground -mt-1")}
        >
          <div className="flex items-center gap-2  max-sm:hidden">
            <CalendarDays size={14} />
            <p className="text-xs ">
              {formatDateToDDMonthYYYY(data.quickSummary.startDate)} -{" "}
              {formatDateToDDMonthYYYY(data.quickSummary.endDate)}
            </p>
          </div>
          <p className="text-muted-foreground text-xs max-sm:mb-2.5 sm:hidden">
            {data.quickSummary.totalDays}-day trip to{" "}
            {data.quickSummary.destination}
          </p>
        </CardContent>
      </CardHeader>
      <CardFooter className={cn("flex justify-between py-2.5 max-sm:hidden ")}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users size={15} />
          <p className="text-xs">
            {data.quickSummary.travelers} traveller
            {getPluralSuffix(data.quickSummary.travelers)}
          </p>
        </div>
        <div>
          <p className="font-medium text-xs">
            ₹{data.quickSummary.budget.toLocaleString("en-IN")}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
