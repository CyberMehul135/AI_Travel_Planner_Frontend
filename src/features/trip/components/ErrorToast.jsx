export const ErrorToast = ({ message }) => {
  return (
    <div className="bg-card">
      <p className="font-semibold text-red-600">{message}</p>
    </div>
  );
};
