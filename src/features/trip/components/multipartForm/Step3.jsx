import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  DollarSign,
  MapPinned,
  MoveLeft,
  MoveRight,
  Plane,
  UsersRound,
  WandSparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { generateAiTrip, getAiModels } from "../../trip.service";
import { resetFields, updateTripData } from "../../tripSlice";
import { toast } from "react-toastify";
import { toast as toasty } from "sonner";
import { useState } from "react";
import { SelectDemo } from "@/components/common/SelectDemo";
import { ErrorToast } from "../ErrorToast";

export default function Step3({ nextStep, prevStep }) {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.trip);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  // const [err, serErr] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["aiModels"],
    queryFn: () => getAiModels(),
    staleTime: 3000,
  });

  const providers = Object.keys(data?.data?.AI_MODELS || {});
  const models = selectedProvider
    ? data?.data?.AI_MODELS[selectedProvider]
    : [];

  const getTravelPlanMutation = useMutation({
    mutationFn: (payload) => generateAiTrip(payload),
    onSuccess: (data) => {
      dispatch(updateTripData(data));
      nextStep();
      dispatch(resetFields());
      toasty.success("Trip generated");
    },
    onError: (error) => {
      // serErr(error);
      console.dir(error);
      toast.error(
        <ErrorToast
          message={error?.response?.data?.message}
          statusCode={error?.status}
        />,
        {
          className: "!bg-card !text-xs !border",
          position: "top-right",
          autoClose: 10000,
        },
      );
    },
  });

  const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);

    const diff = (e - s) / (1000 * 60 * 60 * 24);
    return diff + 1; // include both days
  };

  const handleGenerateItinery = () => {
    getTravelPlanMutation.mutate({
      userPrompt: formData,
      provider: selectedProvider,
      model: selectedModel,
    });
  };

  return (
    <div className="max-w-[800px] mx-auto bg-card/40 p-8 max-md:px-3 max-md:py-5 border rounded-xl">
      <div className="max-w-[800px] mb-8 bg-linear-to-r from-purple-500/20 to-blue-500/20 rounded-xl px-5 py-8">
        <Plane
          size={40}
          className={`gradient-btn box-content p-5 rounded-full overflow-visible mb-3 mx-auto ${getTravelPlanMutation.isPending ? "animate-spin animation-duration-[3s]" : ""}`}
        />
        <h2 className="text-xl font-semibold text-foreground text-center mb-5">
          Ready to Create Your Perfect Itinery?
        </h2>
        <p className="max-w-[600px] mx-auto text-center text-sm text-muted-foreground font-medium mb-8">
          Our Ai will analyze your preferences and create a personalized itinery
          with activities, restaurants and accomodation tailored just for you.
        </p>

        <div className="flex justify-between max-w-[400px] mx-auto mb-7">
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
            <MapPinned color="#2D5FE0" strokeWidth={2} absoluteStrokeWidth />{" "}
            {formData?.destination}
          </div>
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays color="#2D5FE0" strokeWidth={2} absoluteStrokeWidth />
            {calculateDays(formData?.startDate, formData?.endDate)} days
          </div>
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
            <UsersRound color="#2D5FE0" strokeWidth={2} absoluteStrokeWidth />
            {formData?.travellers} travellers
          </div>
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
            <DollarSign color="#2D5FE0" strokeWidth={2} absoluteStrokeWidth />
            {formData?.accomodation}{" "}
          </div>
        </div>

        {/* Selectors */}
        <div className="flex justify-center w-2/3 mx-auto gap-2 mt-3 mb-5">
          <SelectDemo
            options={providers}
            label="AI Provider"
            placeholder="Providers"
            value={selectedProvider}
            onChange={(value) => {
              setSelectedProvider(value);
              setSelectedModel("");
            }}
            disabled={getTravelPlanMutation.isPending}
          />

          <SelectDemo
            options={models}
            label="AI Model"
            placeholder="Models"
            value={selectedModel}
            onChange={(value) => setSelectedModel(value)}
            disabled={!selectedProvider || getTravelPlanMutation.isPending}
          />
        </div>

        <Button
          className={`gradient-btn px-8 py-6 flex mx-auto font-semibold ${getTravelPlanMutation.isPending && "opacity-70"}`}
          onClick={handleGenerateItinery}
          disabled={
            getTravelPlanMutation.isPending ||
            !selectedProvider ||
            !selectedModel
          }
        >
          {!getTravelPlanMutation.isPending && <WandSparkles color="#fff" />}
          {getTravelPlanMutation.isPending && <Spinner />}
          {getTravelPlanMutation.isPending
            ? "AI is crafting..."
            : "Generate AI Itinery"}
        </Button>
      </div>

      <div className="w-full flex justify-between">
        <Button onClick={prevStep} className="w-[48%] py-6" variant="secondary">
          <MoveLeft className="size-5" />
          Previous
        </Button>
        <Button className="w-[48%] py-6" disabled>
          Next
          <MoveRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
