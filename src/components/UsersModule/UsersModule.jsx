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
      name: "علی سلطانی",
      job: "توسعه‌دهنده بک‌اند",
      transactions: [
        { 
          id: 1, 
          date: toPersianDate(new Date(2023, 4, 15)), // 1402/02/25
          amount: '۱,۲۳۰,۰۰۰', 
          status: 'approved' 
        },
        { 
          id: 2, 
          date: toPersianDate(new Date(2023, 5, 20)), // 1402/03/30
          amount: '۸۵۰,۰۰۰', 
          status: 'pending' 
        }
      ],
      userStatus: 'active',
      email: 'ali@example.com',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      joinDate: toPersianDate(new Date(2022, 0, 10)) // 1400/10/20
    },
    {
      id: 2,
      name: "سارا محمدی",
      job: "طراح رابط کاربری",
      transactions: [
        { 
          id: 3, 
          date: toPersianDate(new Date(2023, 3, 10)), // 1402/01/21
          amount: '۱,۵۶۰,۰۰۰', 
          status: 'declined' 
        }
      ],
      userStatus: 'active',
      email: 'sara@example.com',
      phone: '۰۹۱۲۹۸۷۶۵۴۳',
      joinDate: toPersianDate(new Date(2022, 2, 15)) // 1401/01/25
    },
    {
      id: 3,
      name: "محمد رضایی",
      job: "مدیر پروژه",
      transactions: [],
      userStatus: 'not active',
      email: 'mohammad@example.com',
      phone: '۰۹۳۵۱۲۳۴۵۶۷',
      joinDate: toPersianDate(new Date(2021, 10, 5)) // 1400/08/14
    },
    {
      id: 4,
      name: "نرگس اکبری",
      job: "توسعه‌دهنده فرانت‌اند",
      transactions: [
        { 
          id: 4, 
          date: toPersianDate(), // تاریخ امروز
          amount: '۲,۳۰۰,۰۰۰', 
          status: 'approved' 
        }
      ],
      userStatus: 'active',
      email: 'narges@example.com',
      phone: '۰۹۰۱۲۳۴۵۶۷۸',
      joinDate: toPersianDate(new Date(2023, 0, 1)) // 1401/10/11
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

    updateUser: (id, updateData) => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) return null;
      
      users[userIndex] = {
        ...users[userIndex],
        ...updateData,
        id
      };
      
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

    // تابع کمکی برای دریافت تاریخ شمسی
    getPersianDate: (date) => toPersianDate(date)
  };
})();

export default usersModule;