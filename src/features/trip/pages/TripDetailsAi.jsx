import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TripDetailsCard } from "../components/TripDetailsCard";
import { generateTripPdf } from "../utils/generatePdf";
import { TripPdf } from "../components/TripPdf";

export const TripDetailsAi = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState("");

  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("recommendedTrips"));
    const trip = trips?.find((trip, i) => i == id);

    setTrip(trip);
  }, []);

  const downloadPDF = () => {
    generateTripPdf();
  };

  return (
    <>
      <TripDetailsCard
        destinationImg={true}
        activityImg={false}
        tripSummary={true}
        buttons={true}
        data={trip}
        onClickDownloadAsPDF={downloadPDF}
      />

      <TripPdf trip={trip} />
    </>
  );
};
