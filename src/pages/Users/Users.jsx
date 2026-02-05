import React, { useEffect } from "react";
import {
  calculateTotalTransactions,
  formatTransactionCount,
} from "./Utils/Utils.js";
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
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="lg:container mt-10 md:mt-0 mx-auto p-4 ">
      <div className="overflow-x-autorounded-xl md:overflow-x-scroll lg:overflow-x-clip">
        <table className="min-w-full divide-y divide-gray-400 md:shadow-sm text-gray-800 md:border md:border-gray-100 dark:border-brand-900 rounded-xl">
          <thead className="hidden md:table-header-group bg-gray-300  dark:bg-brand-200 ">
            <tr className="flex flex-col md:table-row">
              {[
                "ID",
                "نام کاربر",
                "ایمیل",
                "شغل",
                "وضعیت",
                "تعداد تراکنش",
                "جمع تراکنش",
                "عملیات",
              ].map((item) => (
                <th
                  key={item}
                  className="px-2 py-4 text-center text-xs font-bold dark:text-gray-400 uppercase tracking-wider">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide divide-gray-300/60">
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