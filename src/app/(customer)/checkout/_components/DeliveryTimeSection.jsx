// file: src/app/(customer)/checkout/components/DeliveryTimeSection.jsx
import { Clock, AlertCircle } from "lucide-react";

export default function DeliveryTimeSection({
  deliveryOptions,
  selectedDelivery,
  setSelectedDelivery,
}) {
  const handleDeliveryChange = (optionId, isAvailable) => {
    if (isAvailable) {
      setSelectedDelivery(optionId);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Clock size={20} className="text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Waktu Pengiriman
        </h3>
      </div>

      <div className="space-y-3">
        {deliveryOptions.map((option) => {
          const isAvailable = option.available;
          const isSelected = selectedDelivery === option.id;

          return (
            <label
              key={option.id}
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                !isAvailable
                  ? "cursor-not-allowed bg-gray-50 border-gray-200 opacity-60"
                  : isSelected
                  ? "cursor-pointer border-blue-500 bg-blue-50 shadow-sm hover:shadow-sm"
                  : "cursor-pointer border-gray-100 hover:border-gray-200 hover:shadow-sm"
              }`}
              onClick={() => handleDeliveryChange(option.id, isAvailable)}
            >
              <div className="flex items-center space-x-4 flex-1">
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={isSelected}
                  disabled={!isAvailable}
                  onChange={() => {}} // Handled by label onClick
                  className={`w-5 h-5 border-2 ${
                    !isAvailable
                      ? "text-gray-400 border-gray-300 cursor-not-allowed"
                      : "text-blue-500 border-gray-300 cursor-pointer"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p
                      className={`font-medium text-lg ${
                        !isAvailable ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      {option.name}
                    </p>
                    {!isAvailable && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertCircle size={12} className="mr-1" />
                        Tidak Tersedia
                      </span>
                    )}
                  </div>
                  <p
                    className={`${
                      !isAvailable ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {option.time} • {option.description}
                  </p>
                  {!isAvailable && option.unavailableReason && (
                    <p className="text-sm text-red-500 mt-1 italic">
                      {option.unavailableReason}
                    </p>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Available options count */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700">
          <Clock size={16} className="inline mr-1" />
          {
            deliveryOptions.filter((option) => option.available).length
          } dari {deliveryOptions.length} slot waktu tersedia
        </p>
      </div>
    </div>
  );
}
