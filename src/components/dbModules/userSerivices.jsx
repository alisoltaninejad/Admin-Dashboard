import usersModule from './userModule';

// ایجاد یک نمونه Singleton از سرویس کاربر
const userService = {
  /**
   * مقداردهی اولیه دیتابیس
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  initializeDatabase: async () => {
    try {
      await usersModule.initializeDatabase();
      console.log('Database initialized successfully');
      return { success: true };
    } catch (error) {
      console.error('Error initializing database:', error);
      return { 
        success: false, 
        error: error.message || 'خطا در راه‌اندازی پایگاه داده' 
      };
    }
  },

  /**
   * دریافت تمام کاربران
   * @returns {Promise<{success: boolean, data?: Array, message?: string, error?: string, details?: string}>}
   */
  getAllUsers: async () => {
    try {
      const users = await usersModule.getAllUsers();
      return {
        success: true,
        data: users,
        message: 'کاربران با موفقیت دریافت شدند'
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return {
        success: false,
        error: 'خطا در دریافت لیست کاربران',
        details: error.message
      };
    }
  },

  /**
   * افزودن کاربر جدید
   * @param {Object} userData - اطلاعات کاربر
   * @returns {Promise<{success: boolean, data?: Object, message?: string, error?: string}>}
   */
  addUser: async (userData) => {
    // اعتبارسنجی پیشرفته‌تر
    if (!userData?.name?.trim()) {
      return {
        success: false,
        error: 'نام کاربر الزامی است'
      };
    }

    if (!/^\S+@\S+\.\S+$/.test(userData?.email)) {
      return {
        success: false,
        error: 'فرمت ایمیل نامعتبر است'
      };
    }

    try {
      const newUser = await usersModule.addUser({
        ...userData,
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim()
      });
      
      return {
        success: true,
        data: newUser,
        message: 'کاربر جدید با موفقیت اضافه شد'
      };
    } catch (error) {
      console.error('Error adding user:', error);
      return {
        success: false,
        error: error.message.includes('unique') 
          ? 'این ایمیل قبلاً ثبت شده است' 
          : 'خطا در ثبت کاربر جدید',
        details: error.message
      };
    }
  },

  /**
   * افزودن تراکنش برای کاربر
   * @param {number|string} userId - آی دی کاربر
   * @param {Object} transactionData - اطلاعات تراکنش
   * @returns {Promise<{success: boolean, data?: Object, message?: string, error?: string}>}
   */
  addTransaction: async (userId, transactionData) => {
    const amount = parseFloat(transactionData?.amount);
    
    if (!userId) {
      return {
        success: false,
        error: 'آی دی کاربر الزامی است'
      };
    }

    if (isNaN(amount)) {
      return {
        success: false,
        error: 'مبلغ تراکنش باید عددی باشد'
      };
    }

    try {
      const transaction = await usersModule.addTransaction(userId, {
        ...transactionData,
        amount
      });
      
      return {
        success: true,
        data: transaction,
        message: 'تراکنش با موفقیت ثبت شد'
      };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return {
        success: false,
        error: 'خطا در ثبت تراکنش',
        details: error.message
      };
    }
  },

  /**
   * محاسبه مجموع تراکنش‌های کاربر
   * @param {number|string} userId - آی دی کاربر
   * @returns {Promise<{success: boolean, data?: {total: number}, message?: string, error?: string}>}
   */
  getTotalTransactions: async (userId) => {
    if (!userId) {
      return {
        success: false,
        error: 'آی دی کاربر الزامی است'
      };
    }

    try {
      const total = await usersModule.getTotalTransactionsAmount(userId);
      return {
        success: true,
        data: { total },
        message: 'مجموع تراکنش‌ها محاسبه شد'
      };
    } catch (error) {
      console.error('Error calculating transactions:', error);
      return {
        success: false,
        error: 'خطا در محاسبه مجموع تراکنش‌ها',
        details: error.message
      };
    }
  },

  /**
   * دریافت اطلاعات کامل یک کاربر
   * @param {number|string} userId - آی دی کاربر
   * @returns {Promise<{success: boolean, data?: Object, message?: string, error?: string}>}
   */
  getUserProfile: async (userId) => {
    if (!userId) {
      return {
        success: false,
        error: 'آی دی کاربر الزامی است'
      };
    }

    try {
      const user = await usersModule.getUserById(userId);
      if (!user) {
        return {
          success: false,
          error: 'کاربر مورد نظر یافت نشد'
        };
      }
      
      const total = await usersModule.getTotalTransactionsAmount(userId);
      return {
        success: true,
        data: {
          ...user,
          totalTransactions: total
        },
        message: 'اطلاعات کاربر با موفقیت دریافت شد'
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return {
        success: false,
        error: 'خطا در دریافت اطلاعات کاربر',
        details: error.message
      };
    }
  }
};

export default userService;