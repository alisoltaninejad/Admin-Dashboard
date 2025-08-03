import React from "react";
import Icon from "../Icons/Icons";
import usersModule from "../../components/UsersModule/UsersModule"; 

export default function LatestUsers() {
  // دریافت 5 کاربر آخر از ماژول
  const latestUsers = usersModule.getAllUsers()
    .sort((a, b) => b.id - a.id) // مرتب سازی بر اساس ID به صورت نزولی
    .slice(0, 5); // دریافت 5 کاربر اخیر

  return (
    <div className="w-2/6 shadow p-4 rounded-lg bg-white">
      <h2 className="text-xl mb-3 font-bold text-gray-800">کاربران تازه ورود</h2>
      
      {latestUsers.length > 0 ? (
        latestUsers.map((user) => (
          <div 
            key={user.id} 
            className="flex w-5/6 mx-auto justify-between items-center py-3 border-b border-gray-100 last:border-0"
          >
            {/* تصویر پروفایل */}
            <div className="w-10 h-10 flex items-center justify-center">
              {user.pic ? (
                <img 
                  src={user.pic} 
                  alt={user.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="text-gray-400">
                  <Icon name="profile" className='w-8 h-8' />
                </div>
              )}
            </div>

            {/* اطلاعات کاربر */}
            <div className="flex-1 px-4 text-right">
              <h3 className="font-medium text-gray-700">{user.name}</h3>
              <h6 className="text-gray-400 text-xs mt-1">
                {user.job} •{' '}
                <span className={`inline-block w-2 h-2 rounded-full me-1 ${
                  user.userStatus === 'active' ? 'bg-green-500' : 'bg-gray-400'
                }`}></span>
                {user.userStatus === 'active' ? 'فعال' : 'غیرفعال'}
              </h6>
            </div>

            {/* دکمه مشاهده */}
            <button 
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md p-2 transition-colors"
              aria-label={`مشاهده ${user.name}`}
            >
              <Icon name="eye" className="text-gray-600" />
            </button>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">
          کاربری یافت نشد
        </div>
      )}
    </div>
  );
}