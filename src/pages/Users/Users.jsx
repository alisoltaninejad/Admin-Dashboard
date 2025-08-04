import React, { useState, useEffect } from 'react';
import usersModule from '../../components/UsersModule/UsersModule';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  // بارگذاری اولیه کاربران
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setUsers(usersModule.getAllUsers());
  };

  const handleEditClick = (userId, field, currentValue) => {
    setEditingUser(userId);
    setEditField(field);
    setEditValue(currentValue);
  };

  const handleSaveEdit = (userId) => {
    usersModule.updateUser(userId, editField, editValue);
    loadUsers(); // بارگذاری مجدد کاربران پس از ویرایش
    setEditingUser(null);
    setEditField('');
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditField('');
    setEditValue('');
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('آیا از حذف این کاربر مطمئن هستید؟')) {
      usersModule.deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }
  };

  const calculateTotalTransactions = (transactions) => {
    return transactions
      .reduce((total, transaction) => total + (transaction.amount || 0), 0)
      .toLocaleString('fa-IR');
  };

  const formatTransactionCount = (count) => {
    return count.toLocaleString('fa-IR');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ایمیل</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تعداد تراکنش‌ها</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">جمع تراکنش‌ها</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.id}
                </td>
                
                {/* نام کاربر */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === user.id && editField === 'name' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                        autoFocus
                      />
                      <button 
                        onClick={() => handleSaveEdit(user.id)}
                        className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        ذخیره
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        لغو
                      </button>
                    </div>
                  ) : (
                    <span
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      onClick={() => handleEditClick(user.id, 'name', user.name)}
                    >
                      {user.name}
                    </span>
                  )}
                </td>
                
                {/* ایمیل کاربر */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === user.id && editField === 'email' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                        autoFocus
                      />
                      <button 
                        onClick={() => handleSaveEdit(user.id)}
                        className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        ذخیره
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        لغو
                      </button>
                    </div>
                  ) : (
                    <span
                      className="text-sm text-gray-600 hover:text-gray-800 hover:underline cursor-pointer"
                      onClick={() => handleEditClick(user.id, 'email', user.email)}
                    >
                      {user.email}
                    </span>
                  )}
                </td>
                
                {/* وضعیت کاربر */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.userStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.userStatus === 'active' ? 'فعال' : 'غیرفعال'}
                  </span>
                </td>
                
                {/* تعداد تراکنش‌ها */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTransactionCount(user.transactions.length)}
                </td>
                
                {/* جمع تراکنش‌ها */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {calculateTotalTransactions(user.transactions)}
                </td>
                
                {/* عملیات */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}