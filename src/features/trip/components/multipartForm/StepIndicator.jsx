import { Check } from "lucide-react";

export default function StepIndicator({ step }) {
  const steps = [
    "Destination-Dates",
    "Travel-Preferences",
    "Generate-Itinerary",
    "Your-Itinerary",
  ];

  return (
    <div className="flex items-center justify-between mb-8 max-w-[800px] mx-auto bg-card/50 p-10 max-md:p-5 rounded-xl border">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = step === stepNumber;
        const isCompleted = step > stepNumber;

        return (
          <div key={index} className="flex-1 flex items-center">
            {/* STEP BOX */}
            <div
              className={`px-6 py-2 rounded-lg text-sm border font-medium flex flex-col items-center lg:min-w-[125px] max-lg:rounded-full max-lg:p-0 max-lg:size-10 max-lg:justify-center
              ${
                isActive
                  ? "bg-linear-to-r from-purple-500 to-blue-500 text-white"
                  : isCompleted
                    ? "bg-linear-to-r from-purple-500 to-blue-500 text-white"
                    : "bg-card text-muted-foreground"
              }`}
            >
              {/* NUMBER / CHECK */}
              <div className="text-base">
                {isCompleted ? (
                  <Check
                    size={18}
                    className="lg:bg-white p-0.5 rounded-full text-black max-lg:text-white"
                  />
                ) : (
                  stepNumber
                )}
              </div>

              {/* LABEL */}
              <div className="flex flex-col items-center max-lg:hidden">
                <span>{label.split("-")[0]}</span>
                <span>{label.split("-")[1]}</span>
              </div>
            </div>

            {/* LINE */}
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 transition-all duration-300
                ${
                  step > index + 1
                    ? "bg-linear-to-r from-purple-500 to-blue-500"
                    : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
