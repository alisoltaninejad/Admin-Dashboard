import React, { useEffect, useCallback } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay با ویژگی‌های دسترسی‌پذیری */}
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 bg-black/10 z-[1000] flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        {/* Modal Content */}
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;