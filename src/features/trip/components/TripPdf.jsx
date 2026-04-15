export const TripPdf = ({ trip }) => {
  return (
    <div
      id="pdf-content"
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
      className="absolute -left-[9999px] top-0"
    >
      <h1>{trip?.quickSummary?.destination} Trip Plan</h1>

      {trip?.itinerary?.map((day, index) => (
        <div key={index}>
          <h2>
            Day {index + 1}: {day.dayTitle}
          </h2>

          {day.activities.map((activity, i) => (
            <div key={i}>
              <p>
                <b>{activity.startTime}</b> - {activity.title}
              </p>
              <p>{activity.description}</p>
              <p>📍 {activity.location}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
