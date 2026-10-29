import React from 'react';
import { LogOut, X } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-[#111827] border border-gray-800 p-6 shadow-2xl text-white relative">
        
        {/* زرار الإغلاق (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* أيقونة التحذير أو الخروج */}
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-4 mx-auto">
          <LogOut size={24} />
        </div>

        {/* النص */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-white mb-1">Confirm Logout</h3>
          <p className="text-gray-400 text-sm">
            Are you sure you want to log out of your admin dashboard? You will need to sign in again.
          </p>
        </div>

        {/* الأزرار */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium text-sm transition-colors border border-gray-700"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-red-600/20"
          >
            Yes Logout!
          </button>
        </div>

      </div>
    </div>
  );
}