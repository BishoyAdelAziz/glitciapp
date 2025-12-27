"use client";
import { ReactNode, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ isOpen, onClose, children, setIsOpen }: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 scrollbar-hidden "
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-xl p-6 shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
