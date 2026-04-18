export const formatDateToDDMonthYYYY = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-IN", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month.slice(0, 3)} ${year}`;
};

export const formatDateToMonthDDYYYY = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-IN", { month: "long" });
  const year = date.getFullYear();

  return `${month.slice(0, 3)} ${day},  ${year}`;
};
