import React, { useEffect } from "react";
import { calculateTotalTransactions, formatTransactionCount } from "./Utils/Utils";
import { useUsers } from "./hooks/useUsers";
import { UserRow } from "./components/UserRow";

export default function Users() {
  const {
    users,
    editingUser,
    editField,
    editValue,
    loading,
    error,
    setEditValue,
    loadUsers,
    handleEditClick,
    handleSaveEdit,
    handleCancelEdit,
    handleDeleteUser,
  } = useUsers();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          در حال بارگذاری
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={loadUsers} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-10 md:mt-0 mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="hidden md:inline bg-gray-50 dark:bg-brand-800">
            <tr className="flex flex-col md:table-row">
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                نام کاربر
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                ایمیل
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                شغل
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                وضعیت
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                تعداد تراکنش
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                جمع تراکنش
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-brand-900 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                editingUser={editingUser}
                editField={editField}
                editValue={editValue}
                onEditClick={handleEditClick}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onValueChange={setEditValue}
                onDeleteUser={handleDeleteUser}
                calculateTotalTransactions={calculateTotalTransactions}
                formatTransactionCount={formatTransactionCount}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}