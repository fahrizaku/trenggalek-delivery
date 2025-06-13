// file: src/app/(customer)/checkout/components/OrderSummarySection.jsx
export default function OrderSummarySection({
  subtotal,
  shippingCost,
  total,
  totalItems,
  selectedDusun,
  formatPrice,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Ringkasan Pesanan
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} item)</span>
          <span className="text-gray-900 font-medium">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Ongkos Kirim</span>
          <span className="text-gray-900 font-medium">
            {selectedDusun ? formatPrice(shippingCost) : "Pilih dusun"}
          </span>
        </div>
        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
