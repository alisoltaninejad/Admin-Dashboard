import React, { useState, useEffect } from "react";
import Icon from "../Icons/Icons";
import userService from "../dbModules/userServices"; 
import Modal from "../Modal/Modal";

export default function LatestUsers() {
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دریافت کاربران به صورت ناهمگام
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await userService.getAllUsers();
        if (result.success) {
          const sortedUsers = result.data
            .sort((a, b) => b.id - a.id)
            .slice(0, 4);
          setLatestUsers(sortedUsers);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("خطا در دریافت داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const selectedUser = latestUsers.find((user) => user.id === userId);

  if (loading) {
    return (
      <div className=" w-2/6 shadow p-4 rounded-lg bg-white">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-2/6 shadow p-4 rounded-lg bg-white">
        <div className="text-center text-red-500 py-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-2/6 shadow p-4 rounded-lg bg-white">
      <h2 className="text-xl mb-6 font-bold text-gray-800">
        کاربران تازه ورود
      </h2>
      <div className="my-auto">
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
                    <Icon name="profile" className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* اطلاعات کاربر */}
              <div className="flex-1 px-4 text-right">
                <h3 className="font-medium text-gray-700 text-xs lg:text-sm">{user.name}</h3>
                <h6 className="text-gray-400 text-[10px] lg:text-xs mt-1">
                  {user.job} •{" "}
                  <span
                    className={`inline-block w-2 h-2 text-[6px] lg:text-[10px] rounded-full me-1 ${
                      user.userStatus === "active"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  {user.userStatus === "active" ? "فعال" : "غیرفعال"}
                </h6>
              </div>

              {/* دکمه مشاهده */}
              <button
                className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md p-2 transition-colors"
                aria-label={`مشاهده ${user.name}`}
                onClick={() => {
                  setUserId(user.id);
                  toggleModal();
                }}
              >
                <Icon name="eye" className="text-gray-600" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">کاربری یافت نشد</div>
        )}

        {/* مودال نمایش اطلاعات کاربر */}
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          {selectedUser ? (
            <div className="flex flex-col justify-between items-center p-6">
              <h2 className="text-xl font-bold mb-3 p-5">اطلاعات کاربر</h2>
              <div className="space-y-4 flex flex-col justify-baseline items-center">
                {selectedUser.pic ? (
                  <img
                    src={selectedUser.pic}
                    alt="pic"
                    className="w-14 h-14 rounded-full"
                  />
                ) : (
                  <Icon name="profile" className="w-14 h-14 rounded-full" />
                )}

                <p>نام: {selectedUser.name}</p>
                <p>ایمیل: {selectedUser.email || "ثبت نشده"}</p>
                <p>تلفن: {selectedUser.phone || "ثبت نشده"}</p>
                <p>تاریخ ثبت نام: {selectedUser.joinDate || "ثبت نشده"}</p>
                <p>سمت: {selectedUser.job || "ثبت نشده"}</p>
              </div>
              <button
                onClick={toggleModal}
                className="mt-6 px-4 py-2 bg-red-500 text-white border-none rounded-md cursor-pointer hover:bg-red-600"
              >
                بستن
              </button>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p>اطلاعات کاربر یافت نشد</p>
              <button
                onClick={toggleModal}
                className="mt-4 px-4 py-2 bg-red-500 text-white border-none rounded-md cursor-pointer hover:bg-red-600"
              >
                بستن
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}