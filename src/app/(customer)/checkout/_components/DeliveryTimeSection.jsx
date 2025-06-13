// file: src/app/(customer)/checkout/components/DeliveryTimeSection.jsx
import { Clock } from "lucide-react";

export default function DeliveryTimeSection({
  deliveryOptions,
  selectedDelivery,
  setSelectedDelivery,
}) {
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
        {deliveryOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm ${
              selectedDelivery === option.id
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                name="delivery"
                value={option.id}
                checked={selectedDelivery === option.id}
                onChange={(e) => setSelectedDelivery(e.target.value)}
                className="w-5 h-5 text-blue-500 border-2 border-gray-300"
              />
              <div>
                <p className="font-medium text-gray-900 text-lg">
                  {option.name}
                </p>
                <p className="text-gray-500">
                  {option.time} • {option.description}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
