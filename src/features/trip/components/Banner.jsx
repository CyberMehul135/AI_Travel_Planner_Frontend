import { Badge } from "@/components/ui/badge";
import { getUserDetails } from "@/features/user/user.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const Banner = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDetails(),
    staleTime: 3000,
  });

  return (
    <div className="flex justify-between items-center gradient-btn px-6 py-5  rounded-lg">
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Welcome, {isLoading ? "Loading..." : user?.user?.name}! 👋
        </h2>
        <p className="">
          Ready to plan your next adventure? Let's make it amazing.
        </p>
      </div>

      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 max-md:hidden">
        Standard Plan
      </Badge>
    </div>
  );
};
