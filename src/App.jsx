import { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import userService from "./Context/dbModules/userServices"; 
import routes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [dbReady, setDbReady] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 همیشه هوک‌ها باید در بالا صدا زده بشن
  const router = useRoutes(routes);

  useEffect(() => {
    console.log("آغاز مقداردهی اولیه دیتابیس...");
    userService
      .initializeDatabase()
      .then((result) => {
        if (!result.success) {
          console.error("خطا در مقداردهی دیتابیس:", result.error);
          setError(result.error);
        }
        setDbReady(true);
      })
      .catch((err) => {
        console.error("خطای غیرمنتظره:", err);
        setError("خطای سیستمی رخ داده است");
      });
  }, []);

  if (!dbReady) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center text-shadow-brand-800 bg-brand-50  z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">در حال راه‌اندازی سیستم...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 p-4">
        <div className="text-red-500 mb-4">
          <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">خطا در اتصال به پایگاه داده</h2>
        <p className="text-gray-600 mb-6 text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className=" w-full min-h-[calc(100vh-60px)] h-full xl:w-4/5 float-left mt-[60px] p-10 bg-brand-100 text-brand-800">{router}</div>
    </>
  );
}

export default App;
