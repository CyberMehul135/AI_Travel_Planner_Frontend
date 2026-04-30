import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Earth, RefreshCw, TrainFront } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateAiRecommendedTrip, getAiModels } from "../trip.service";
import { SelectDemo } from "@/components/common/SelectDemo";
import { ErrorToast } from "./ErrorToast";
import { toast } from "react-toastify";
import { toast as toasty } from "sonner";

export const AiTripCard = ({ className }) => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["aiModels"],
    queryFn: () => getAiModels(),
    staleTime: 3000,
  });

  const providers = Object.keys(data?.data?.AI_MODELS || {});
  const models = selectedProvider
    ? data?.data?.AI_MODELS[selectedProvider]
    : [];

  // Mutation for button click
  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => generateAiRecommendedTrip(payload),
    onSuccess: (data) => {
      const newTrips = data?.data?.trips || [];
      localStorage.setItem("recommendedTrips", JSON.stringify(newTrips));
      setTrips(newTrips);
      toasty.success("Trips generated");
    },
    onError: (error) => {
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

  // Initial load (static or stored data)
  useEffect(() => {
    const stored = localStorage.getItem("recommendedTrips");

    if (stored) {
      setTrips(JSON.parse(stored));
    } else {
      // Static data (first time users)
      const staticData = [
        {
          quickSummary: {
            destination: "Paris, France",
            totalDays: 3,
            travelers: 2,
            budget: 20000,
            bestTimeToVisit: "April to June",
            tripType: "Romantic Getaway",
            startDate: "2026-05-10",
            endDate: "2026-05-12",
            image:
              "https://plus.unsplash.com/premium_photo-1718035557075-5111d9d906d2?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          itinerary: [
            {
              day: 1,
              dayTitle: "Eiffel Tower & Cruise",
              date: "2026-05-10",
              dailyBudget: 6000,
              activities: [
                {
                  title: "Eiffel Tower Visit",
                  location: "Paris",
                  description: "Iconic landmark visit",
                  startTime: "09:00",
                  duration: "2h",
                  cost: 1500,
                },
                {
                  title: "Seine River Cruise",
                  location: "Paris",
                  description: "Relaxing boat ride",
                  startTime: "13:00",
                  duration: "1h",
                  cost: 1200,
                },
              ],
              dining: [
                {
                  name: "Cafe de Paris",
                  location: "Paris",
                  cuisine: "French",
                  cost: 800,
                  description: "Breakfast cafe",
                },
                {
                  name: "Le Gourmet",
                  location: "Paris",
                  cuisine: "French",
                  cost: 1200,
                  description: "Dinner restaurant",
                },
              ],
            },
            {
              day: 2,
              dayTitle: "Louvre & City Walk",
              date: "2026-05-11",
              dailyBudget: 7000,
              activities: [
                {
                  title: "Louvre Museum",
                  location: "Paris",
                  description: "Famous art museum",
                  startTime: "10:00",
                  duration: "3h",
                  cost: 1800,
                },
                {
                  title: "Champs-Élysées Walk",
                  location: "Paris",
                  description: "Shopping street walk",
                  startTime: "15:00",
                  duration: "2h",
                  cost: 1000,
                },
              ],
              dining: [
                {
                  name: "Paris Bistro",
                  location: "Paris",
                  cuisine: "French",
                  cost: 900,
                  description: "Lunch spot",
                },
                {
                  name: "Evening Delight",
                  location: "Paris",
                  cuisine: "European",
                  cost: 1300,
                  description: "Dinner experience",
                },
              ],
            },
            {
              day: 3,
              dayTitle: "Montmartre & Shopping",
              date: "2026-05-12",
              dailyBudget: 7000,
              activities: [
                {
                  title: "Montmartre Visit",
                  location: "Paris",
                  description: "Artistic hill area",
                  startTime: "10:00",
                  duration: "2h",
                  cost: 800,
                },
                {
                  title: "Local Market",
                  location: "Paris",
                  description: "Souvenir shopping",
                  startTime: "14:00",
                  duration: "2h",
                  cost: 1000,
                },
              ],
              dining: [
                {
                  name: "Morning Cafe",
                  location: "Paris",
                  cuisine: "French",
                  cost: 700,
                  description: "Breakfast",
                },
                {
                  name: "Final Dinner",
                  location: "Paris",
                  cuisine: "French",
                  cost: 1400,
                  description: "Trip closing dinner",
                },
              ],
            },
          ],
        },

        {
          quickSummary: {
            destination: "Bali, Indonesia",
            totalDays: 3,
            travelers: 2,
            budget: 18000,
            bestTimeToVisit: "May to September",
            tripType: "Adventure Travel",
            startDate: "2026-06-15",
            endDate: "2026-06-17",
            image:
              "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          itinerary: [
            {
              day: 1,
              dayTitle: "Beach & Temple",
              date: "2026-06-15",
              dailyBudget: 5000,
              activities: [
                {
                  title: "Kuta Beach",
                  location: "Bali",
                  description: "Relax at beach",
                  startTime: "10:00",
                  duration: "2h",
                  cost: 500,
                },
                {
                  title: "Uluwatu Temple",
                  location: "Bali",
                  description: "Cliffside temple",
                  startTime: "14:00",
                  duration: "2h",
                  cost: 700,
                },
              ],
              dining: [
                {
                  name: "Beach Cafe",
                  location: "Bali",
                  cuisine: "Indonesian",
                  cost: 600,
                  description: "Breakfast",
                },
                {
                  name: "Sunset Dine",
                  location: "Bali",
                  cuisine: "Seafood",
                  cost: 1000,
                  description: "Dinner",
                },
              ],
            },
            {
              day: 2,
              dayTitle: "Waterfall & Jungle",
              date: "2026-06-16",
              dailyBudget: 6000,
              activities: [
                {
                  title: "Tegenungan Waterfall",
                  location: "Bali",
                  description: "Waterfall visit",
                  startTime: "10:00",
                  duration: "2h",
                  cost: 600,
                },
                {
                  title: "Ubud Jungle Walk",
                  location: "Bali",
                  description: "Nature walk",
                  startTime: "14:00",
                  duration: "2h",
                  cost: 800,
                },
              ],
              dining: [
                {
                  name: "Ubud Cafe",
                  location: "Bali",
                  cuisine: "Indonesian",
                  cost: 700,
                  description: "Lunch",
                },
                {
                  name: "Jungle Dinner",
                  location: "Bali",
                  cuisine: "Asian",
                  cost: 1200,
                  description: "Dinner",
                },
              ],
            },
            {
              day: 3,
              dayTitle: "Shopping & Spa",
              date: "2026-06-17",
              dailyBudget: 7000,
              activities: [
                {
                  title: "Local Market",
                  location: "Bali",
                  description: "Shopping",
                  startTime: "10:00",
                  duration: "2h",
                  cost: 1000,
                },
                {
                  title: "Balinese Spa",
                  location: "Bali",
                  description: "Relaxing spa",
                  startTime: "14:00",
                  duration: "2h",
                  cost: 1500,
                },
              ],
              dining: [
                {
                  name: "Morning Bites",
                  location: "Bali",
                  cuisine: "Indonesian",
                  cost: 600,
                  description: "Breakfast",
                },
                {
                  name: "Final Feast",
                  location: "Bali",
                  cuisine: "Asian",
                  cost: 1300,
                  description: "Dinner",
                },
              ],
            },
          ],
        },

        {
          quickSummary: {
            destination: "Dubai, UAE",
            totalDays: 3,
            travelers: 2,
            budget: 25000,
            bestTimeToVisit: "November to March",
            tripType: "Luxury Trip",
            startDate: "2026-11-05",
            endDate: "2026-11-07",
            image:
              "https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          itinerary: [
            {
              day: 1,
              dayTitle: "Burj Khalifa & Mall",
              date: "2026-11-05",
              dailyBudget: 8000,
              activities: [
                {
                  title: "Burj Khalifa Visit",
                  location: "Dubai",
                  description: "Tallest building",
                  startTime: "10:00",
                  duration: "2h",
                  cost: 2000,
                },
                {
                  title: "Dubai Mall",
                  location: "Dubai",
                  description: "Shopping",
                  startTime: "13:00",
                  duration: "3h",
                  cost: 1500,
                },
              ],
              dining: [
                {
                  name: "Dubai Cafe",
                  location: "Dubai",
                  cuisine: "Arabic",
                  cost: 900,
                  description: "Breakfast",
                },
                {
                  name: "Sky Lounge",
                  location: "Dubai",
                  cuisine: "International",
                  cost: 1500,
                  description: "Dinner",
                },
              ],
            },
            {
              day: 2,
              dayTitle: "Desert Safari",
              date: "2026-11-06",
              dailyBudget: 9000,
              activities: [
                {
                  title: "Desert Safari",
                  location: "Dubai",
                  description: "Dune bashing",
                  startTime: "10:00",
                  duration: "4h",
                  cost: 2500,
                },
                {
                  title: "Camel Ride",
                  location: "Dubai",
                  description: "Desert ride",
                  startTime: "15:00",
                  duration: "1h",
                  cost: 800,
                },
              ],
              dining: [
                {
                  name: "Desert Camp",
                  location: "Dubai",
                  cuisine: "Arabic",
                  cost: 1200,
                  description: "Dinner",
                },
              ],
            },
            {
              day: 3,
              dayTitle: "Marina & Beach",
              date: "2026-11-07",
              dailyBudget: 8000,
              activities: [
                {
                  title: "Dubai Marina",
                  location: "Dubai",
                  description: "Waterfront walk",
                  startTime: "10:00",
                  duration: "2h",
                  cost: 1000,
                },
                {
                  title: "JBR Beach",
                  location: "Dubai",
                  description: "Beach relax",
                  startTime: "14:00",
                  duration: "2h",
                  cost: 800,
                },
              ],
              dining: [
                {
                  name: "Beach Cafe",
                  location: "Dubai",
                  cuisine: "International",
                  cost: 900,
                  description: "Lunch",
                },
              ],
            },
          ],
        },
      ];

      localStorage.setItem("recommendedTrips", JSON.stringify(staticData));
      setTrips(staticData);
    }
  }, []);

  return (
    <div
      className={`mt-5 bg-card shadow-sm max-md:border-none dark:bg-card/50 border max-md:p-0 max-md:bg-background! p-7 rounded-lg w-full ${className}`}
    >
      {/* Heading */}
      <div className="font-semibold flex justify-between items-center">
        <h3 className="text-lg max-md:text-xl max-md:ml-2">AI Recommended</h3>
        <TrainFront className="gradient-btn box-content p-1 rounded-lg max-md:size-8" />
      </div>

      {/* Selectors */}
      <div className="flex w-full gap-2 mt-3">
        <SelectDemo
          options={providers}
          placeholder="Providers"
          value={selectedProvider}
          onChange={(value) => {
            setSelectedProvider(value);
            setSelectedModel(""); // reset model
          }}
          disabled={isPending}
          className="w-1/2!"
        />

        <SelectDemo
          options={models}
          placeholder="Models"
          value={selectedModel}
          onChange={(value) => setSelectedModel(value)}
          disabled={!selectedProvider || isPending}
          className="w-1/2!"
        />
      </div>

      {/* Trips */}
      <div className="flex flex-col gap-3 mt-4">
        {trips?.map((trip, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-card p-3 rounded-lg cursor-pointer border overflow-hidden"
            onClick={() => navigate(`/trips/${i}/ai`)}
          >
            <Earth className="gradient-btn shrink-0 box-content p-2 rounded-lg" />

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">
                {trip.quickSummary.destination}
              </h4>

              <p className="text-xs truncate">
                {trip.itinerary?.[0]?.dayTitle || "Top attractions"}
              </p>

              <div className="flex gap-2 mt-2">
                <Badge className="bg-gray-500/60 text-white">
                  ₹{trip.quickSummary.budget}
                </Badge>

                <Badge className="bg-gray-500/60 text-white">
                  {trip.quickSummary.totalDays} days
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <Button
        onClick={() => {
          if (!selectedProvider || !selectedModel) {
            alert("Please select Provider and Model first");
            return;
          }

          mutate({
            provider: selectedProvider,
            model: selectedModel,
          });
        }}
        disabled={isPending || !selectedProvider || !selectedModel}
        className="text-foreground hover:text-white mt-5 w-full py-5 dark:bg-transparent border border-gray-300 dark:border-gray-700 bg-gray-300 hover:bg-blue-600 dark:hover:bg-blue-600 ring-0 font-semibold cursor-pointer"
      >
        <RefreshCw
          className={`${isPending && "animate-spin animation-duration-[2s]"}`}
        />
        Refresh
      </Button>
    </div>
  );
};
