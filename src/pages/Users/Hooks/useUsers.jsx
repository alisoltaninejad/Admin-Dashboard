import { useState, useCallback, useRef } from "react";
import userService from "../../../Context/dbModules/userServices";
import usersModule from "../../../Context/dbModules/userModule";

export const useUsers = () => {
  // Stateها
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تابع loadUsers
  const loadUsers = useCallback(async () => {
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
      setError("خطا در دریافت اطلاعات کاربران");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // تابع handleEditClick
  const handleEditClick = useCallback((userId, field, currentValue) => {
    setEditingUser(userId);
    setEditField(field);
    setEditValue(currentValue);
  }, []);

  // تابع handleSaveEdit
  const handleSaveEdit = useCallback(async (userId) => {
    try {
      const result = await usersModule.updateUser(userId, editField, editValue);
      if (result) {
        await loadUsers(); // refresh users list
        setEditingUser(null);
        setEditField("");
        setEditValue("");
      } else {
        setError("خطا در به‌روزرسانی کاربر");
      }
    } catch (err) {
      setError("خطا در به‌روزرسانی کاربر");
      console.error(err);
    }
  }, [editField, editValue, loadUsers]);

  // تابع handleCancelEdit
  const handleCancelEdit = useCallback(() => {
    setEditingUser(null);
    setEditField("");
    setEditValue("");
  }, []);

  // تابع handleDeleteUser
  const handleDeleteUser = useCallback(async (userId) => {
    if (window.confirm("آیا از حذف این کاربر مطمئن هستید؟")) {
      try {
        const result = await usersModule.deleteUser(userId);
        if (result) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } else {
          setError("خطا در حذف کاربر");
        }
      } catch (err) {
        setError("خطا در حذف کاربر");
        console.error(err);
      }
    }
  }, []);


  // بازگرداندن تمام مقادیر و توابع
  return {
    // Stateها
    users,
    editingUser,
    editField,
    editValue,
    loading,
    error,
    
    // Setterها (فقط برای مقادیری که ممکن است نیاز به تغییر مستقیم داشته باشند)
    setEditValue,
    setEditField,
    
    // توابع
    loadUsers,
    handleEditClick,
    handleSaveEdit,
    handleCancelEdit,
    handleDeleteUser,
  };
};