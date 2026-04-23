import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { ArrowLeft, MapPinned, MoveLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateFields } from "@/features/trip/tripSlice";

export default function Step1({ nextStep }) {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.trip.formData);

  const handleNext = () => {
    if (
      trip.destination &&
      trip.travellers &&
      trip.startDate &&
      trip.endDate &&
      trip.budget
    ) {
      nextStep();
    }
  };

  return (
    <div className="max-w-[800px] md:shadow-sm mx-auto bg-card/40 max-md:bg-transparent max-md:border-none max-md:px-1  p-10  max-md:py-5 border rounded-xl">
      <div className="max-w-[800px] grid grid-cols-2 max-md:grid-cols-1 gap-x-5 gap-y-5 mb-8">
        <Field className="gap-0">
          <FieldLabel
            htmlFor="destination"
            className="mb-2 text-lg font-semibold"
          >
            Where do you want to go?
          </FieldLabel>
          <Input
            placeholder="Enter destination"
            id="destination"
            className="p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={trip.destination}
            onChange={(e) =>
              dispatch(
                updateFields({ field: e.target.id, value: e.target.value }),
              )
            }
          />
        </Field>
        <Field className="gap-0">
          <FieldLabel
            htmlFor="travellers"
            className="mb-2 text-lg font-semibold"
          >
            Number of travellers
          </FieldLabel>
          <Input
            placeholder="2"
            id="travellers"
            className="p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={trip.travellers}
            onChange={(e) =>
              dispatch(
                updateFields({ field: e.target.id, value: e.target.value }),
              )
            }
          />
        </Field>
        <Field className={cn("gap-0")}>
          <FieldLabel
            htmlFor="start-date"
            className="mb-2 text-lg font-semibold"
          >
            Start date
          </FieldLabel>
          <Input
            type="date"
            placeholder="2"
            id="startDate"
            className="p-6 dark:scheme-dark placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={trip.startDate}
            onChange={(e) =>
              dispatch(
                updateFields({ field: e.target.id, value: e.target.value }),
              )
            }
          />
        </Field>
        <Field className={cn("gap-0")}>
          <FieldLabel htmlFor="enddate" className="mb-2 text-lg font-semibold">
            End date
          </FieldLabel>
          <Input
            type="date"
            placeholder="2"
            id="endDate"
            className="p-6 dark:scheme-dark placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={trip.endDate}
            onChange={(e) =>
              dispatch(
                updateFields({ field: e.target.id, value: e.target.value }),
              )
            }
          />
        </Field>
        <Field className="md:col-span-2 gap-0">
          <FieldLabel htmlFor="budget" className="mb-2 text-lg font-semibold">
            Total Budget (INR)
          </FieldLabel>
          <Input
            type="number"
            placeholder="₹70,000"
            id="budget"
            className="p-6 dark:scheme-dark placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={trip.budget}
            onChange={(e) =>
              dispatch(
                updateFields({ field: e.target.id, value: e.target.value }),
              )
            }
          />
        </Field>
      </div>

      <div className="w-full flex justify-between">
        <Button
          onClick={nextStep}
          className="w-[48%] py-6 border border-gray-300 dark:border-border"
          variant="secondary"
          disabled
        >
          <MoveLeft className="size-5" />
          Previous
        </Button>
        <Button onClick={handleNext} className="w-[48%] py-6 ">
          Next
          <MoveRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
