// file: src/app/(customer)/checkout/components/OrderItemsSection.jsx
export default function OrderItemsSection({
  cartItems,
  totalItems,
  formatPrice,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Item Pesanan ({totalItems} item)
      </h3>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-blue-500 text-lg">📦</span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 line-clamp-2">
                {item.name}
              </h4>
              <p className="text-sm text-gray-500 mb-2">{item.store}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  {item.quantity}x {formatPrice(item.price)}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
