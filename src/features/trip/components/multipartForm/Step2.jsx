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

  return (
    <div className="max-w-[800px] md:shadow-sm border max-md:bg-transparent max-md:px-1 max-md:border-none mx-auto bg-card/40 p-10  max-md:py-5 rounded-xl">
      {/* Interests */}
      <div className="mb-8">
        <h2 className="mb-5 text-lg font-semibold">What are your interests?</h2>
        <div className="max-w-[800px] grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4 max-md:gap-x-3 max-md:gap-y-3 mx-auto">
          {interestsFields.map((field) => (
            <Field className="relative" key={field.id}>
              <Label
                htmlFor={field.id}
                className={`p-5 z-10 border cursor-pointer hover:scale-105 transition-all ease-in rounded-xl flex flex-col  ${trip.interests.includes(field.value) ? "gradient-btn" : "bg-card"}`}
              >
                <field.icon />
                <p className="text-sm">{field.title}</p>
              </Label>
              <Checkbox
                className="absolute hidden"
                id={field.id}
                name={field.name}
                value={field.value}
                checked={trip.interests.includes(field.value)}
                onCheckedChange={() => dispatch(toggleInterests(field.value))}
              />
            </Field>
          ))}
        </div>
      </div>

      {/* Accomodation */}
      <div className="mb-8">
        <h2 className="mb-5 text-lg font-semibold">Accommodation</h2>
        <div className="max-w-[800px] mx-auto">
          <RadioGroup
            defaultValue=""
            value={trip.accomodation}
            onValueChange={(value) =>
              dispatch(
                updateFields({
                  field: accomodationFields[0].name,
                  value,
                }),
              )
            }
            className="grid grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-5 gap-y-5 mx-auto"
          >
            {accomodationFields.map((field) => (
              <div className="flex items-center gap-3 w-full" key={field.id}>
                <RadioGroupItem
                  value={field.value}
                  id={field.id}
                  className="hidden"
                />
                <Label
                  htmlFor={field.id}
                  className={`flex flex-col gap-1.5 border cursor-pointer rounded-xl items-start bg-card p-5 w-full ${trip.accomodation === field.value && "gradient-btn"}`}
                >
                  <h4 className="text-lg font-semibold">{field.title}</h4>
                  <p className="text-xs m-0">{field.description}</p>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Transportation */}
      <div className="space-y-2 mb-6">
        <Label className="text-lg font-semibold">Transportation</Label>

        <Select
          value={trip.transportation}
          onValueChange={(value) =>
            dispatch(updateFields({ field: "transportation", value: value }))
          }
        >
          <SelectTrigger className="w-full py-6">
            <SelectValue placeholder="Select Transportation" />
          </SelectTrigger>

          <SelectContent>
            {transportationFields.map((field) => (
              <SelectItem key={field} className="p-3" value={field}>
                {field.charAt(0).toLocaleUpperCase() + field.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Button onClick={nextStep} className="w-[48%] py-6 ">
          Next
          <MoveRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
