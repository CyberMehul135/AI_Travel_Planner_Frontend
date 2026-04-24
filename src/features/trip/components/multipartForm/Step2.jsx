import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  Building2,
  Camera,
  Heart,
  MountainSnow,
  MoveLeft,
  MoveRight,
  Music,
  TreePalm,
  TreePine,
  Utensils,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { toggleInterests, updateFields } from "../../tripSlice";
import { useState } from "react";
import { cn } from "@/lib/utils";

const interestsFields = [
  {
    title: "Culture & History",
    id: "culture-history",
    name: "interests",
    value: "culture-history",
    icon: Building2,
  },
  {
    title: "Nature & Wildlife",
    id: "nature-wildlife",
    name: "interests",
    value: "nature-wildlife",
    icon: TreePine,
  },
  {
    title: "Adventure & Sports",
    id: "adventure-sports",
    name: "interests",
    value: "adventure-sports",
    icon: MountainSnow,
  },
  {
    title: "Beach & Relaxation",
    id: "beach-relaxation",
    name: "interests",
    value: "beach-relaxation",
    icon: TreePalm,
  },
  {
    title: "Food & Couisine",
    id: "food-couisine",
    name: "interests",
    value: "food-couisine",
    icon: Utensils,
  },
  {
    title: "Nightlife & Music",
    id: "nightlife-music",
    name: "interests",
    value: "nightlife-music",
    icon: Music,
  },
  {
    title: "Photography",
    id: "photography",
    name: "interests",
    value: "photography",
    icon: Camera,
  },
  {
    title: "Wellness & Spa",
    id: "wellness-spa",
    name: "interests",
    value: "wellness-spa",
    icon: Heart,
  },
];
const accomodationFields = [
  {
    title: "Luxury",
    description: "High end experiences",
    id: "luxury",
    name: "accomodation",
    value: "luxury",
  },
  {
    title: "Mid-Range",
    description: "comfortable travel",
    id: "mid-range",
    name: "accomodation",
    value: "mid-range",
  },
  {
    title: "Budget",
    description: "cost effective options",
    id: "budget-friendly",
    name: "accomodation",
    value: "budget-friendly",
  },
];
const transportationFields = ["flight", "train", "car", "bus"];

export default function Step2({ nextStep, prevStep }) {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.trip.formData);

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};

    if (!trip.interests.length) newErrors.interests = true;
    if (!trip.accomodation) newErrors.accomodation = true;
    if (!trip.transportation) newErrors.transportation = true;

    setErrors(newErrors);

    const firstError = Object.keys(newErrors)[0];
    if (firstError) {
      document
        .getElementById(firstError)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    nextStep();
  };

  return (
    <div className="max-w-[800px] md:shadow-sm border max-md:bg-transparent max-md:px-1 max-md:border-none mx-auto bg-card/40 p-10  max-md:py-5 rounded-xl">
      {/* Interests */}
      <div id="interests" className="mb-8">
        <h2
          className={cn(
            "mb-5 text-lg font-semibold",
            errors.interests && "text-red-500",
          )}
        >
          What are your interests?
        </h2>

        <div
          className={cn(
            "grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4 max-md:gap-3",
          )}
        >
          {interestsFields.map((field) => (
            <Field className="relative" key={field.id}>
              <Label
                htmlFor={field.id}
                className={cn(
                  "p-5 cursor-pointer rounded-xl flex flex-col border",
                  trip.interests.includes(field.value)
                    ? "gradient-btn"
                    : "bg-card",
                )}
              >
                <field.icon />
                <p className="text-sm">{field.title}</p>
              </Label>

              <Checkbox
                className="hidden"
                id={field.id}
                checked={trip.interests.includes(field.value)}
                onCheckedChange={() => {
                  dispatch(toggleInterests(field.value));
                  setErrors((prev) => ({ ...prev, interests: false }));
                }}
              />
            </Field>
          ))}
        </div>

        {errors.interests && (
          <p className="text-xs text-red-500 mt-3 ml-1">
            Please select at least one interest
          </p>
        )}
      </div>

      {/* Accomodation */}
      <div id="accomodation" className="mb-8">
        <h2
          className={cn(
            "mb-5 text-lg font-semibold",
            errors.accomodation && "text-red-500",
          )}
        >
          Accommodation
        </h2>

        <RadioGroup
          value={trip.accomodation}
          onValueChange={(value) => {
            dispatch(updateFields({ field: "accomodation", value }));
            setErrors((prev) => ({ ...prev, accomodation: false }));
          }}
          className={cn("grid grid-cols-2 max-md:grid-cols-1 gap-5")}
        >
          {accomodationFields.map((field) => (
            <div key={field.id}>
              <RadioGroupItem
                value={field.value}
                id={field.id}
                className="hidden"
              />

              <Label
                htmlFor={field.id}
                className={cn(
                  "flex flex-col p-5 rounded-xl cursor-pointer bg-card items-start border",
                  trip.accomodation === field.value && "gradient-btn",
                )}
              >
                <h4 className="text-lg font-semibold">{field.title}</h4>
                <p className="text-xs m-0">{field.description}</p>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {errors.accomodation && (
          <p className="text-xs text-red-500 mt-3 ml-1">
            Please select accommodation
          </p>
        )}
      </div>

      {/* Transportation */}
      <div id="transportation" className="space-y-2 mb-6">
        <Label
          className={cn(
            "text-lg font-semibold",
            errors.transportation && "text-red-500",
          )}
        >
          Transportation
        </Label>

        <Select
          value={trip.transportation}
          onValueChange={(value) => {
            dispatch(updateFields({ field: "transportation", value }));
            setErrors((prev) => ({ ...prev, transportation: false }));
          }}
        >
          <SelectTrigger
            className={cn(
              "w-full py-6",
              errors.transportation && "border-red-500",
            )}
          >
            <SelectValue placeholder="Select Transportation" />
          </SelectTrigger>

          <SelectContent>
            {transportationFields.map((field) => (
              <SelectItem key={field} value={field} className="p-3">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.transportation && (
          <p className="text-xs text-red-500">Please select transportation</p>
        )}
      </div>

      {/* Special-Requirements */}
      <div className="space-y-2 mb-6">
        <Label className="text-lg font-semibold">
          Special Requests (Optional)
        </Label>

        <Textarea
          placeholder="Any special requirements..."
          value={trip.specialRequirements}
          onChange={(e) =>
            dispatch(
              updateFields({
                field: "specialRequirements",
                value: e.target.value,
              }),
            )
          }
          className="min-h-[120px] placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>

      <div className="w-full flex justify-between">
        <Button
          onClick={prevStep}
          className="w-[48%] py-6 border ring-0 border-gray-200 dark:border-border"
          variant="secondary"
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
