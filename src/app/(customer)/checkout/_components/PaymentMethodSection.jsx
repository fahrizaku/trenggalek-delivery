// file: src/app/(customer)/checkout/components/PaymentMethodSection.jsx
import { CreditCard, Wallet } from "lucide-react";

const iconMap = {
  Wallet: Wallet,
  CreditCard: CreditCard,
};

export default function PaymentMethodSection({
  paymentMethods,
  selectedPayment,
  setSelectedPayment,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <CreditCard size={20} className="text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Metode Pembayaran
        </h3>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const IconComponent = iconMap[method.icon];
          return (
            <label
              key={method.id}
              className={`flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm ${
                selectedPayment === method.id
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-5 h-5 text-blue-500 border-2 border-gray-300"
              />
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <IconComponent size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-lg">
                  {method.name}
                </p>
                <p className="text-gray-500">{method.description}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
