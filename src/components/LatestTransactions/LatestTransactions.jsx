import React from "react";
import usersModule from "../../components/UsersModule/UsersModule";
import { toGregorian } from "jalaali-js";

// تبدیل ارقام فارسی به انگلیسی
const toEnglishDigits = (str) =>
  str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

// تبدیل ارقام انگلیسی به فارسی
const toPersianDigits = (num) => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  return num.toString().replace(/\d/g, (d) => persianDigits[d]);
};

// فرمت کردن مبلغ به صورت زیبا با جداکننده هزارگان
const formatAmount = (amount) => {
  return toPersianDigits(new Intl.NumberFormat('fa-IR').format(amount));
};

export default function LatestTransactions() {
  // تبدیل تاریخ شمسی (فارسی) به تاریخ میلادی قابل مقایسه
  const parsePersianDate = (persianDate) => {
    const englishDate = toEnglishDigits(persianDate);
    const [year, month, day] = englishDate.split("/").map(Number);
    const g = toGregorian(year, month, day);
    return new Date(g.gy, g.gm - 1, g.gd);
  };

  const getLatestTransactions = (users) => {
    const allTransactions = [];

    users.forEach((user) => {
      user.transactions.forEach((transaction) => {
        allTransactions.push({
          userId: user.id,
          userName: user.name,
          transaction: transaction,
        });
      });
    });

    return allTransactions
      .sort(
        (a, b) =>
          parsePersianDate(b.transaction.date) -
          parsePersianDate(a.transaction.date)
      )
      .slice(0, 5);
  };

  const allUsers = usersModule.getAllUsers();
  const latestTransactions = getLatestTransactions(allUsers);

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "declined":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "تایید شده";
      case "pending":
        return "در انتظار";
      case "declined":
        return "رد شده";
      default:
        return "نامشخص";
    }
  };

  return (
    <div className="w-4/6 shadow p-4 rounded-lg bg-white">
      <h2 className="text-xl mb-6 font-bold text-gray-800">تراکنش‌های اخیر</h2>
      {latestTransactions.length > 0 ? (
        <table className="w-full text-center">
          <thead>
            <tr className="border-b border-gray-200 text-center">
              <th className="text-center py-3 px-4">خریدار</th>
              <th className="text-center py-3 px-4">تاریخ</th>
              <th className="text-center py-3 px-4">مبلغ</th>
              <th className="text-center py-3 px-4">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {latestTransactions.map((item) => (
              <tr
                key={item.transaction.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-center">{item.userName}</td>
                <td className="py-3 px-4 text-center">{item.transaction.date}</td>
                <td className="py-3 px-4 text-center">
                  {formatAmount(item.transaction.amount)} تومان
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(
                      item.transaction.status
                    )}`}
                  >
                    {getStatusText(item.transaction.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-8 text-gray-500">
          هیچ تراکنشی یافت نشد
        </div>
      )}
    </div>
  );
}