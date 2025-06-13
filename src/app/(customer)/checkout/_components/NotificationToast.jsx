// file: src/app/(customer)/checkout/components/NotificationToast.jsx
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

export default function NotificationToast({ notification, onClose }) {
  if (!notification) return null;

  const getNotificationStyles = (type) => {
    switch (type) {
      case "success":
        return {
          container: "bg-green-50 border-green-200 text-green-800",
          icon: (
            <CheckCircle
              size={20}
              className="text-green-600 flex-shrink-0 mt-0.5"
            />
          ),
        };
      case "error":
        return {
          container: "bg-red-50 border-red-200 text-red-800",
          icon: (
            <AlertCircle
              size={20}
              className="text-red-600 flex-shrink-0 mt-0.5"
            />
          ),
        };
      case "info":
        return {
          container: "bg-blue-50 border-blue-200 text-blue-800",
          icon: (
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          ),
        };
      default:
        return {
          container: "bg-gray-50 border-gray-200 text-gray-800",
          icon: (
            <Info size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
          ),
        };
    }
  };

  const styles = getNotificationStyles(notification.type);

  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto animate-in slide-in-from-top-2 duration-300">
      <div
        className={`rounded-lg border shadow-lg p-4 flex items-start space-x-3 ${styles.container}`}
      >
        {styles.icon}
        <p className="text-sm flex-1 leading-relaxed">{notification.message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0 transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
