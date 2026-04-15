export const ErrorToast = ({ message, statusCode }) => {
  return (
    <div className="bg-card">
      <p className="font-semibold text-red-600">{message}</p>
      <p className="text-sm text-gray-500">Status Code: {statusCode}</p>
    </div>
  );
};
