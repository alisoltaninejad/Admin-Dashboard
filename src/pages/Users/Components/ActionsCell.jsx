// components/ActionsCell.jsx
export const ActionsCell = ({ user, onDelete,label }) => {
  return (
    <td className="px-4 py-1  md:py-4 whitespace-nowrap text-sm font-medium">
      <span className="font-bold md:hidden me-2 text-brand-700">{label}:</span>
      <button
        className="px-3 py-1 text-xs bg-red-400 text-white rounded hover:bg-red-500 transition-colors cursor-pointer"
        onClick={() => onDelete(user.id)}>
        حذف
      </button>
    </td>
  );
};