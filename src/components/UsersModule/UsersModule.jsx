const usersModule = (() => {
// تابع تبدیل تاریخ میلادی به شمسی (ساده‌شده)
const toPersianDate = (date = new Date()) => {
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    calendar: 'persian'
  };
  return new Date(date).toLocaleDateString('fa-IR', options);
};

// داده‌های نمونه کاربران با تاریخ شمسی
const users = [
  {
    id: 1,
    name: "علی سلطانی نژاد",
    job: "توسعه‌دهنده بک‌اند",
    transactions: [
      { id: 1, date: toPersianDate(new Date(2025, 4, 15)), amount: 1230000, status: 'approved' },
      { id: 2, date: toPersianDate(new Date(2021, 5, 20)), amount: 850000, status: 'pending' },
      { id: 5, date: toPersianDate(new Date(2022, 7, 1)), amount: 1500000, status: 'approved' },
      { id: 6, date: toPersianDate(new Date(2025, 7, 2)), amount: 2750000, status: 'pending' }
    ],
    userStatus: 'active',
    email: 'ali@example.com',
    phone: '09123456789',
    joinDate: toPersianDate(new Date(2023, 0, 10))
  },
  {
    id: 2,
    name: "سارا محمدی",
    job: "طراح رابط کاربری",
    transactions: [
      { id: 3, date: toPersianDate(new Date(2024, 3, 10)), amount: 1560000, status: 'declined' }
    ],
    userStatus: 'active',
    email: 'sara@example.com',
    phone: '09129876543',
    joinDate: toPersianDate(new Date(2022, 2, 15))
  },
  {
    id: 3,
    name: "محمد رضایی",
    job: "مدیر پروژه",
    transactions: [
      { id: 7, date: toPersianDate(new Date(2023, 8, 12)), amount: 3200000, status: 'approved' },
      { id: 8, date: toPersianDate(new Date(2024, 1, 5)), amount: 1250000, status: 'approved' }
    ],
    userStatus: 'not active',
    email: 'mohammad@example.com',
    phone: '09351234567',
    joinDate: toPersianDate(new Date(2021, 10, 5))
  },
  {
    id: 4,
    name: "امیر سلیمی",
    job: "مدیر داخلی",
    transactions: [
      { id: 9, date: toPersianDate(new Date(2025, 2, 18)), amount: 980000, status: 'pending' }
    ],
    userStatus: 'not active',
    email: 'amir@example.com',
    phone: '09355353567',
    joinDate: toPersianDate(new Date(2025, 10, 5))
  },
  {
    id: 5,
    name: "نرگس اکبری",
    job: "توسعه‌دهنده فرانت‌اند",
    transactions: [
      { id: 10, date: toPersianDate(new Date(2025, 6, 31)), amount: 2300000, status: 'approved' },
      { id: 11, date: toPersianDate(new Date(2025, 7, 15)), amount: 1750000, status: 'pending' },
      { id: 12, date: toPersianDate(new Date(2025, 9, 3)), amount: 3100000, status: 'approved' }
    ],
    userStatus: 'active',
    email: 'narges@example.com',
    phone: '09012345678',
    joinDate: toPersianDate(new Date(2023, 0, 1))
  },
  {
    id: 6,
    name: "فاطمه زاهدی",
    job: "تحلیلگر داده",
    transactions: [
      { id: 13, date: toPersianDate(new Date(2024, 11, 20)), amount: 2100000, status: 'approved' },
      { id: 14, date: toPersianDate(new Date(2025, 0, 5)), amount: 1450000, status: 'declined' }
    ],
    userStatus: 'active',
    email: 'fatemeh@example.com',
    phone: '09187654321',
    joinDate: toPersianDate(new Date(2022, 5, 10))
  },
  {
    id: 7,
    name: "رضا کریمی",
    job: "مدیر فنی",
    transactions: [
      { id: 15, date: toPersianDate(new Date(2023, 4, 22)), amount: 2850000, status: 'approved' },
      { id: 16, date: toPersianDate(new Date(2024, 7, 30)), amount: 1950000, status: 'approved' },
      { id: 17, date: toPersianDate(new Date(2025, 2, 14)), amount: 2250000, status: 'pending' }
    ],
    userStatus: 'active',
    email: 'reza@example.com',
    phone: '09213456789',
    joinDate: toPersianDate(new Date(2021, 8, 15))
  }
];

 // متدهای عمومی ماژول
return {
  getAllUsers: () => [...users],
  getUserById: (id) => users.find(user => user.id === id),
  
  addUser: (userData) => {
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: userData.name || '',
      job: userData.job || '',
      transactions: userData.transactions || [],
      userStatus: userData.userStatus || 'not active',
      email: userData.email || '',
      phone: userData.phone || '',
      joinDate: toPersianDate()
    };
    users.push(newUser);
    return newUser;
  },

  // تغییر داده‌شده برای پشتیبانی از ویرایش فیلدهای جداگانه
  updateUser: (id, field, value) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    // اگر field یک رشته باشد (ویرایش تک فیلد)
    if (typeof field === 'string') {
      users[userIndex] = {
        ...users[userIndex],
        [field]: value
      };
    } 
    // اگر field یک آبجکت باشد (ویرایش چند فیلد)
    else if (typeof field === 'object') {
      users[userIndex] = {
        ...users[userIndex],
        ...field
      };
    }
    
    return users[userIndex];
  },

  deleteUser: (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  },

  addTransaction: (userId, transactionData) => {
    const user = users.find(user => user.id === userId);
    if (!user) return null;
    
    const newTransaction = {
      id: user.transactions.length > 0 
        ? Math.max(...user.transactions.map(t => t.id)) + 1 
        : 1,
      date: transactionData.date || toPersianDate(),
      amount: transactionData.amount || '۰',
      status: ['approved', 'declined', 'pending'].includes(transactionData.status) 
        ? transactionData.status 
        : 'pending'
    };
    
    user.transactions.push(newTransaction);
    return newTransaction;
  },

  changeUserStatus: (userId, status) => {
    const user = users.find(user => user.id === userId);
    if (!user) return false;
    if (['active', 'not active'].includes(status)) {
      user.userStatus = status;
      return true;
    }
    return false;
  },

  // متد جدید برای محاسبه مجموع تراکنش‌ها
  getTotalTransactionsAmount: (userId) => {
    const user = users.find(user => user.id === userId);
    if (!user) return 0;
    
    return user.transactions.reduce((total, transaction) => {
      const amount = parseInt(transaction.amount.replace(/,/g, ''), 10) || 0;
      return total + amount;
    }, 0);
  },

  // تابع کمکی برای دریافت تاریخ شمسی
  getPersianDate: (date) => toPersianDate(date)
};
})();

export default usersModule;