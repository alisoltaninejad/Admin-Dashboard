// components/UserRow.jsx
import { EditableCell } from "./EditableCell";
import { StatusCell } from "./StatusCell";
import { ActionsCell } from "./ActionsCell";

export const UserRow = ({
  user,
  editingUser,
  editField,
  editValue,
  onEditClick,
  onSaveEdit,
  onCancelEdit,
  onValueChange,
  onDeleteUser,
  calculateTotalTransactions,
  formatTransactionCount,
}) => {
  return (
    <tr
      key={user.id}
      className="flex flex-col bg-white dark:bg-brand-300 md:table-row mb-4 md:mb-0 border border-brand-800 md:border-none rounded-lg md:rounded-none  p-4 md:p-0">
      <td className="px-4 py-4 whitespace-nowrap text-sm text-brand-900">
        {user.id}
      </td>

      {/* نام کاربر */}
      <EditableCell
        user={user}
        editingUser={editingUser}
        editField={editField}
        editValue={editValue}
        field="name"
        label="نام"
        onEditClick={onEditClick}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
        onValueChange={onValueChange}
      />

      {/* ایمیل کاربر */}
      <EditableCell
        user={user}
        editingUser={editingUser}
        editField={editField}
        editValue={editValue}
        field="email"
        label="ایمیل"
        type="email"
        onEditClick={onEditClick}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
        onValueChange={onValueChange}
      />

      {/* شغل کاربر */}
      <EditableCell
        user={user}
        editingUser={editingUser}
        editField={editField}
        editValue={editValue}
        field="job"
        label="شغل"
        onEditClick={onEditClick}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
        onValueChange={onValueChange}
      />

      {/* وضعیت کاربر */}
      <StatusCell user={user} label="وضعیت" />

      {/* تعداد تراکنش‌ها */}
      <td className="px-4 py-1 md:py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">
        <span className="font-bold md:hidden me-2 text-brand-700">تعداد تراکنش:</span>
        {formatTransactionCount(user.transactions?.length || 0)}
      </td>

      {/* جمع تراکنش‌ها */}
      <td className="px-4 py-1 md:py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">
        <span className="font-bold md:hidden me-2 text-brand-700">جمع تراکنش:</span>
        {calculateTotalTransactions(user.transactions || [])} تومان
      </td>

      {/* عملیات */}
      <ActionsCell user={user} onDelete={onDeleteUser} label="عملیات"/>
    </tr>
  );
};
