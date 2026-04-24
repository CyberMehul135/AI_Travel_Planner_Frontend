import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { ArrowLeft, MapPinned, MoveLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateFields } from "@/features/trip/tripSlice";
import { useRef, useState } from "react";

export default function Step1({ nextStep }) {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.trip.formData);

  const [errors, setErrors] = useState({});
  const refs = {
    destination: useRef(null),
    travellers: useRef(null),
    startDate: useRef(null),
    endDate: useRef(null),
    budget: useRef(null),
  };

  const handleNext = () => {
    const newErrors = {};

    if (!trip.destination) newErrors.destination = true;
    if (!trip.travellers) newErrors.travellers = true;
    if (!trip.startDate) newErrors.startDate = true;
    if (!trip.endDate) newErrors.endDate = true;
    if (!trip.budget) newErrors.budget = true;

    setErrors(newErrors);

    // first invalid field focus
    const firstErrorField = Object.keys(newErrors)[0];
    if (firstErrorField && refs[firstErrorField]?.current) {
      const element = refs[firstErrorField].current;

      // scroll + focus
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      element.focus();

      return;
    }

    //  all valid
    nextStep();
  };

  const handleInputOnChange = (e) => {
    dispatch(updateFields({ field: e.target.id, value: e.target.value }));
    setErrors((prev) => ({
      ...prev,
      [e.target.id]: false,
    }));
  };

  return (
    <div className="max-w-[800px] md:shadow-sm mx-auto bg-card/40 max-md:bg-transparent max-md:border-none max-md:px-1 p-10 max-md:py-5 border rounded-xl">
      {/* Fields */}
      <div className="max-w-[800px] grid grid-cols-2 max-md:grid-cols-1 gap-x-5 gap-y-5 mb-8">
        <Field className="gap-0">
          <FieldLabel
            htmlFor="destination"
            className="mb-2 text-lg font-semibold"
          >
            Where do you want to go?
          </FieldLabel>
          <Input
            id="destination"
            placeholder="Enter destination"
            ref={refs.destination}
            className={cn(
              "p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500",
              errors.destination && "border-red-500",
            )}
            value={trip.destination}
            onChange={handleInputOnChange}
          />
          {errors.destination && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">
              Destination is required
            </p>
          )}
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
            ref={refs.travellers}
            className={cn(
              "p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500",
              errors.travellers && "border-red-500 focus-visible:ring-red-500",
            )}
            value={trip.travellers}
            onChange={handleInputOnChange}
          />
          {errors.travellers && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">
              Travellers is required
            </p>
          )}
        </Field>
        <Field className="gap-0">
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
            ref={refs.startDate}
            className={`p-6 placeholder:text-gray-400 dark:placeholder:text-white scheme-light dark:scheme-dark ${errors.startDate && "border-red-500"}`}
            value={trip.startDate}
            onChange={handleInputOnChange}
          />
          {errors.startDate && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">
              Start-Date is required
            </p>
          )}
        </Field>
        <Field className="gap-0">
          <FieldLabel htmlFor="enddate" className="mb-2 text-lg font-semibold">
            End date
          </FieldLabel>
          <Input
            type="date"
            placeholder="2"
            id="endDate"
            ref={refs.endDate}
            className={cn(
              "p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500 scheme-light dark:scheme-dark",
              errors.endDate && "border-red-500 focus-visible:ring-red-500",
            )}
            value={trip.endDate}
            onChange={handleInputOnChange}
          />
          {errors.endDate && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">
              End-Date is required
            </p>
          )}
        </Field>
        <Field className="md:col-span-2 gap-0">
          <FieldLabel htmlFor="budget" className="mb-2 text-lg font-semibold">
            Total Budget (INR)
          </FieldLabel>
          <Input
            type="number"
            placeholder="₹70,000"
            id="budget"
            ref={refs.budget}
            className={cn(
              "p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500 scheme-light dark:scheme-dark",
              errors.budget && "border-red-500 focus-visible:ring-red-500",
            )}
            value={trip.budget}
            onChange={handleInputOnChange}
          />
          {errors.budget && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">
              Budget is required
            </p>
          )}
        </Field>
      </div>

      {/* Buttons */}
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
