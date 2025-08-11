import db from "./dbConfig";

const usersModule = (() => {
  // تابع تبدیل تاریخ میلادی به شمسی
  const toPersianDate = (date = new Date()) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      calendar: "persian",
    };
    return new Date(date).toLocaleDateString("fa-IR", options);
  };

  // تعریف متدها به صورت جداگانه
  // {گرفتن تمامی کاربران با تمام اطلاعات و تراکنش هاشون}
  const getAllUsers = async () => {
    const users = await db.users.toArray();
    const usersWithTransactions = await Promise.all(
      users.map(async (user) => {
        const transactions = await db.transactions
          .where("userId")
          .equals(user.id)
          .toArray();
        return { ...user, transactions };
      })
    );
    return usersWithTransactions;
  };
  // {گرفتن کاربر از طریق آیدی  به همراه تمامی اطلاعاتش}
  const getUserById = async (id) => {
    const user = await db.users.get(id);
    if (!user) return null;

    const transactions = await db.transactions
      .where("userId")
      .equals(id)
      .toArray();

    return { ...user, transactions };
  };
  // {اضافه کردن کاربر با تمامی تراکنش هاش}
  const addUser = async (userData) => {
    const id = await db.users.add({
      name: userData.name || "",
      job: userData.job || "",
      userStatus: userData.userStatus || "not active",
      email: userData.email || "",
      phone: userData.phone || "",
      joinDate: toPersianDate(),
    });

    if (userData.transactions?.length > 0) {
      await db.transactions.bulkAdd(
        userData.transactions.map((t) => ({
          ...t,
          userId: id,
        }))
      );
    }

    return getUserById(id);
  };
  // {بروزرسانی اطلاعات کاربر}
  const updateUser = async (id, field, value) => {
    if (typeof field === "string") {
      await db.users.update(id, { [field]: value });
    } else if (typeof field === "object") {
      await db.users.update(id, field);
    }
    return getUserById(id);
  };
// { حذف کاربر و تراکنش های مرتبط باهاش}
  const deleteUser = async (id) => {
    await db.transactions.where("userId").equals(id).delete();
    await db.users.delete(id);
    return true;
  };
// {اضافه کردن تراکنش جدید}
  const addTransaction = async (userId, transactionData) => {
    const newTransaction = {
      userId,
      date: transactionData.date || toPersianDate(),
      amount: transactionData.amount || "۰",
      status: ["approved", "declined", "pending"].includes(
        transactionData.status
      )
        ? transactionData.status
        : "pending",
    };

    const id = await db.transactions.add(newTransaction);
    return { id, ...newTransaction };
  };
// {تغییر وضعیت کاربر مد نظر}
  const changeUserStatus = async (userId, status) => {
    if (["active", "not active"].includes(status)) {
      await db.users.update(userId, { userStatus: status });
      return true;
    }
    return false;
  };
// {جمع تراکنش های یک کاربر}
  const getTotalTransactionsAmount = async (userId) => {
    const transactions = await db.transactions
      .where("userId")
      .equals(userId)
      .toArray();

    return transactions.reduce((total, transaction) => {
      const amount =
        parseInt(transaction.amount.toString().replace(/,/g, ""), 10) || 0;
      return total + amount;
    }, 0);
  };
// {ایچاد پایگاه داده و افزودن اطلاعات کاربران پیشفرض}
  const initializeDatabase = async () => {
    await db.users.clear();
    await db.transactions.clear();

    // داده‌های نمونه اولیه
    const sampleUsers = [
      {
        id: 1,
        name: "علی سلطانی نژاد",
        job: "توسعه‌دهنده بک‌اند",
        transactions: [
          {
            id: 1,
            date: toPersianDate(new Date(2025, 4, 15)),
            amount: 1230000,
            status: "approved",
          },
          {
            id: 2,
            date: toPersianDate(new Date(2021, 5, 20)),
            amount: 850000,
            status: "pending",
          },
          {
            id: 5,
            date: toPersianDate(new Date(2022, 7, 1)),
            amount: 1500000,
            status: "approved",
          },
          {
            id: 6,
            date: toPersianDate(new Date(2025, 7, 2)),
            amount: 2750000,
            status: "pending",
          },
        ],
        userStatus: "active",
        email: "ali@example.com",
        phone: "09123456789",
        joinDate: toPersianDate(new Date(2023, 0, 10)),
      },
      {
        id: 2,
        name: "سارا محمدی",
        job: "طراح رابط کاربری",
        transactions: [
          {
            id: 3,
            date: toPersianDate(new Date(2024, 3, 10)),
            amount: 1560000,
            status: "declined",
          },
        ],
        userStatus: "active",
        email: "sara@example.com",
        phone: "09129876543",
        joinDate: toPersianDate(new Date(2022, 2, 15)),
      },
      {
        id: 3,
        name: "محمد رضایی",
        job: "مدیر پروژه",
        transactions: [
          {
            id: 7,
            date: toPersianDate(new Date(2023, 8, 12)),
            amount: 3200000,
            status: "approved",
          },
          {
            id: 8,
            date: toPersianDate(new Date(2024, 1, 5)),
            amount: 1250000,
            status: "approved",
          },
        ],
        userStatus: "not active",
        email: "mohammad@example.com",
        phone: "09351234567",
        joinDate: toPersianDate(new Date(2021, 10, 5)),
      },
      {
        id: 4,
        name: "امیر سلیمی",
        job: "مدیر داخلی",
        transactions: [
          {
            id: 9,
            date: toPersianDate(new Date(2025, 2, 18)),
            amount: 980000,
            status: "pending",
          },
        ],
        userStatus: "not active",
        email: "amir@example.com",
        phone: "09355353567",
        joinDate: toPersianDate(new Date(2025, 10, 5)),
      },
      {
        id: 5,
        name: "نرگس اکبری",
        job: "توسعه‌دهنده فرانت‌اند",
        transactions: [
          {
            id: 10,
            date: toPersianDate(new Date(2025, 6, 31)),
            amount: 2300000,
            status: "approved",
          },
          {
            id: 11,
            date: toPersianDate(new Date(2025, 7, 15)),
            amount: 1750000,
            status: "declined",
          },
          {
            id: 12,
            date: toPersianDate(new Date(2025, 9, 3)),
            amount: 3100000,
            status: "approved",
          },
        ],
        userStatus: "active",
        email: "narges@example.com",
        phone: "09012345678",
        joinDate: toPersianDate(new Date(2023, 0, 1)),
      },
      {
        id: 6,
        name: "فاطمه زاهدی",
        job: "تحلیلگر داده",
        transactions: [
          {
            id: 13,
            date: toPersianDate(new Date(2024, 11, 20)),
            amount: 2100000,
            status: "approved",
          },
          {
            id: 14,
            date: toPersianDate(new Date(2025, 0, 5)),
            amount: 1450000,
            status: "declined",
          },
        ],
        userStatus: "active",
        email: "fatemeh@example.com",
        phone: "09187654321",
        joinDate: toPersianDate(new Date(2022, 5, 10)),
      },
      {
        id: 7,
        name: "رضا کریمی",
        job: "مدیر فنی",
        transactions: [
          {
            id: 15,
            date: toPersianDate(new Date(2023, 4, 22)),
            amount: 2850000,
            status: "approved",
          },
          {
            id: 16,
            date: toPersianDate(new Date(2024, 7, 30)),
            amount: 1950000,
            status: "approved",
          },
          {
            id: 17,
            date: toPersianDate(new Date(2025, 2, 14)),
            amount: 2250000,
            status: "pending",
          },
        ],
        userStatus: "active",
        email: "reza@example.com",
        phone: "09213456789",
        joinDate: toPersianDate(new Date(2021, 8, 15)),
      },
    ];
    for (const user of sampleUsers) {
      await addUser(user);
    }
  };

  // متدهای عمومی
  return {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    addTransaction,
    changeUserStatus,
    getTotalTransactionsAmount,
    getPersianDate: toPersianDate,
    initializeDatabase,
  };
})();

export default usersModule;
