import Icon from "./../Icons/Icons";
import UserMenuItem from './UserMenuItem'

export default function ProfileMenu({handleMenuItemClick}) {
  return (
    <div className="absolute top-full end-0 w-48 mt-1 p-2 bg-brand-50 shadow-lg shadow-brand-200 rounded-xl z-50 border border-brand-300">
  <div className="px-3 py-2 text-left">
    <h4 className="font-medium text-brand-900">username</h4>
    <h6 className="text-xs text-brand-500 truncate">email@gmail.com</h6>
  </div>
  
  <div className="w-4/5 mx-auto border-t border-brand-300 my-1" />

  <div className="py-1">
    <UserMenuItem
      iconName="profile"
      ClickHandler={handleMenuItemClick}
      txt="ویرایش پروفایل"
    />
    <UserMenuItem
      iconName="setting"
      ClickHandler={handleMenuItemClick}
      txt=" تنظیمات حساب"
    />
    <UserMenuItem
      iconName="warn"
      ClickHandler={handleMenuItemClick}
      txt="پشتیبانی"
    />

    <div className="w-4/5  mx-auto border-t border-brand-300 my-1" />

    <button
      className="w-full text-right px-3 py-2 text-sm flex items-end gap-2 hover:bg-red-500/10 dark:hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
      onClick={handleMenuItemClick}>
      <Icon name="signOut" color="danger" size="sm" />
      خروج
    </button>
  </div>
</div>
  );
}
