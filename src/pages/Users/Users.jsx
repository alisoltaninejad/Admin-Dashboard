import React, { useState, useEffect } from 'react';
import userService from '../../components/dbModules/userSerivices';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // بارگذاری اولیه کاربران
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.getAllUsers();
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('خطا در دریافت اطلاعات کاربران');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (userId, field, currentValue) => {
    setEditingUser(userId);
    setEditField(field);
    setEditValue(currentValue);
  };

  const handleSaveEdit = async (userId) => {
    try {
      const result = await userService.updateUser(userId, editField, editValue);
      if (result.success) {
        await loadUsers();
        setEditingUser(null);
        setEditField('');
        setEditValue('');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('خطا در به‌روزرسانی کاربر');
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditField('');
    setEditValue('');
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('آیا از حذف این کاربر مطمئن هستید؟')) {
      try {
        const result = await userService.deleteUser(userId);
        if (result) {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } else {
          setError('خطا در حذف کاربر');
        }
      } catch (err) {
        setError('خطا در حذف کاربر');
      }
    }
  };

  const calculateTotalTransactions = (transactions) => {
    return transactions
      .reduce((total, transaction) => {
        const amount = typeof transaction.amount === 'string' 
          ? parseInt(transaction.amount.replace(/,/g, '')) 
          : transaction.amount || 0;
        return total + amount;
      }, 0)
      .toLocaleString('fa-IR');
  };

  const formatTransactionCount = (count) => {
    return count.toLocaleString('fa-IR');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-12 py-3 rounded relative" role="alert">
          <strong className="font-bold  ">خطا! </strong>
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={loadUsers}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg className="fill-current h-6 w-6 me-3 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>تلاش مجدد</title>
              <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

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
                  {formatTransactionCount(user.transactions?.length || 0)}
                </td>
                
                {/* جمع تراکنش‌ها */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {calculateTotalTransactions(user.transactions || [])} تومان
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