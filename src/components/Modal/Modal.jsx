import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  maxWidth = "max-w-md", // قابلیت تغییر سایز
  className = "", // استایل سفارشی برای بدنه
  overlayClassName = "" // استایل سفارشی برای پس‌زمینه
}) => {
  
  // مدیریت بستن با کلید Escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // اگر مودال بسته بود، چیزی رندر نشود
  if (!isOpen) return null;

  // استفاده از Portal برای رندر شدن در انتهای Body
  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-[1px] transition-opacity ${overlayClassName}`}
      onClick={onClose} // بستن با کلیک روی Overlay
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full ${maxWidth} transform transition-all animate-in fade-in zoom-in duration-200 ${className}`}
        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن هنگام کلیک داخل مودال
      >
        {/* Header - اختیاری */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors hover:cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;