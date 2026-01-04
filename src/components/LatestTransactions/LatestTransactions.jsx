import React, { useState, useEffect } from "react";
import userService from "../dbModules/userServices";
import Utilities from '../Utilities/Utilities';

export default function LatestTransactions() {
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const result = await userService.getAllUsers();
        if (result.success) {
          const transactions = processTransactions(result.data);
          setLatestTransactions(transactions);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("خطا در دریافت تراکنش‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const processTransactions = (users) => {
    const allTransactions = [];

    // چون دیتابیس تراکنش‌ها را داخل هر کاربر نگه می‌دارد، آن‌ها را استخراج و در یک لیست واحد می‌ریزیم
    users.forEach((user) => {
      user.transactions?.forEach((transaction) => {
        allTransactions.push({
          userId: user.id,
          userName: user.name,
          transaction: transaction,
        });
      });
    });

    // مرتب‌سازی بر اساس تاریخ شمسی با تبدیل به عدد (Timestamp) جهت نمایش جدیدترین‌ها در بالا
    return allTransactions
      .sort(
        (a, b) =>
          Utilities.parsePersianDate(b.transaction.date) -
          Utilities.parsePersianDate(a.transaction.date)
      )
      .slice(0, 5); // فقط ۵ مورد آخر را برای جلوگیری از شلوغی داشبورد نمایش می‌دهیم
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "declined": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved": return "تایید شده";
      case "pending": return "در انتظار";
      case "declined": return "رد شده";
      default: return "نامشخص";
    }
  };

  if (loading) {
    return (
      <div className="w-full lg:w-4/6 shadow p-4 rounded-lg bg-white">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-4/6 shadow p-4 rounded-lg bg-white">
        <div className="text-center text-red-500 py-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-4/6 shadow p-4 rounded-lg bg-white">
      <h2 className="text-xl mb-6 font-bold text-gray-800">تراکنش‌های اخیر</h2>
      {latestTransactions.length > 0 ? (
        <table className="w-full text-center">
          <thead>
            <tr className="border-b border-gray-200 text-center">
              <th className="py-3 px-4">خریدار</th>
              <th className="py-3 px-4">تاریخ</th>
              <th className="py-3 px-4">مبلغ</th>
              <th className="py-3 px-4">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {latestTransactions.map((item) => (
              <tr
                key={`${item.userId}-${item.transaction.id}`}
                className="border-b border-gray-100 hover:bg-gray-50 text-[10px] sm:text-xs md:text-sm"
              >
                <td className="py-3 px-4">{item.userName}</td>
                <td className="py-3 px-4">{item.transaction.date}</td>
                <td className="py-3 px-4">
                  {Utilities.formatAmount(item.transaction.amount)} تومان
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(item.transaction.status)}`}>
                    {getStatusText(item.transaction.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-8 text-gray-500">تراکنشی یافت نشد</div>
      )}
    </div>
  );
}