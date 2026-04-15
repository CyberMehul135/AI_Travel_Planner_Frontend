import html2pdf from "html2pdf.js";

export const generateTripPdf = async (elementId = "pdf-content") => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error("PDF element not found");
    return;
  }

  const options = {
    margin: 10,
    filename: "trip-plan.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      backgroundColor: "#ffffff",
      // IMP FIX
      onclone: (doc) => {
        // remove ALL stylesheets (Tailwind + your CSS)
        const styles = doc.querySelectorAll("style, link[rel='stylesheet']");
        styles.forEach((style) => style.remove());

        // force safe styles
        doc.body.style.background = "#ffffff";
        doc.body.style.color = "#000000";
      },
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
  };

  try {
    await html2pdf().from(element).set(options).save();
  } catch (error) {
    console.error("PDF Error:", error);
  }
};
