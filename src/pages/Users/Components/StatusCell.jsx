// components/StatusCell.jsx
export const StatusCell = ({ user,label }) => {
  const statusConfig = {
    active: { bg: "bg-green-100", text: "text-green-800", label: "فعال" },
    inactive: { bg: "bg-red-100", text: "text-red-800", label: "غیرفعال" },
  };

  const status = user.userStatus || "inactive";
  const config = statusConfig[status] || statusConfig.inactive;

  return (
    <td className="px-4 py-1 md:py-4 whitespace-nowrap">
      <span className="font-bold md:hidden me-2 text-brand-700">{label}:</span>
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    </td>
  );
};
