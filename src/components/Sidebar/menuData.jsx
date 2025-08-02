export const mainMenuItems = [
  {
    id: "dashboard",
    title: "پیشخوان",
    icon: "dashboard",
    path: "/",
    exact: true
  },
  {
    id: "users",
    title: "مدیریت کاربران",
    icon: "profile",
    submenus: [
      { id: "user-list", title: "لیست کاربران", path: "/Users" },
      { id: "add-user", title: "افزودن کاربر جدید", path: "/NewUser" },
      { id: "permissions", title: "مجوزهای دسترسی", path: "/Accessibility" }
    ]
  },
  {
    id: "products",
    title: "مدیریت محصولات",
    icon: "shoppingCart",
    submenus: [
      { id: "all-products", title: "همه محصولات", path: "/Products" },
      { id: "categories", title: "دسته‌بندی‌ها", path: "/Categories" },
      { id: "inventory", title: "موجودی انبار", path: "/Inventory" }
    ]
  }
];

export const contentManagementItems = [
  { id: "pages", title: "صفحات", icon: "pages", path: "/Pages" },
  { id: "blog", title: "وبلاگ", icon: "document", path: "/Blogs",badge: "new" }
];

export const settingsItems = [
  { id: "system-settings", title: "تنظیمات سیستم", icon: "setting", path: "/SystemSetting" },
  { id: "account-settings", title: "تنظیمات حساب", icon: "userAvatar", path: "/AccountSetting" },
  { id: "edit-profile", title: "ویرایش پروفایل", icon: "profile", path: "/EditProfile" }
];