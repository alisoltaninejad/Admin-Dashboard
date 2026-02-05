export const EditableCell = ({
  user,
  editingUser,
  editField,
  editValue,
  field,
  label,
  type = "text",
  onEditClick,
  onSaveEdit,
  onCancelEdit,
  onValueChange,
}) => {
  const isEditing = editingUser === user.id && editField === field;

  return (
    <td className="px-4 py-1 md:py-4 whitespace-nowrap text-gray-800 dark:text-gray-300">
      <span className="font-bold md:hidden me-2 text-brand-700">{label}:</span>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type={type}
            value={editValue}
            onChange={(e) => onValueChange(e.target.value)}
            className="border min-w-fit border-gray-300 rounded px-2 py-1 text-sm"
            autoFocus
          />
          <button
            onClick={() => onSaveEdit(user.id)}
            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">
            ذخیره
          </button>
          <button
            onClick={onCancelEdit}
            className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600">
            لغو
          </button>
        </div>
      ) : (
        <span
          className="text-sm text-gray-800 dark:text-gray-300 hover:text-brand-500 hover:underline cursor-pointer"
          onClick={() => onEditClick(user.id, field, user[field])}>
          {user[field] || "-"}
        </span>
      )}
    </td>
  );
};
