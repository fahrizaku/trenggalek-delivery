// file: src/app/(customer)/cart/page.jsx
"use client";
import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Mock data produk (dalam aplikasi nyata, ini akan diambil dari API/database)
const allProducts = [
  {
    id: 1,
    name: "Beras Premium 5kg Asli Berkualitas",
    price: 65000,
    store: "Supermarket Segar",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.8,
    stock: 25,
    unit: "kg",
    weight: 5000,
    brand: "Rose Brand",
    category: "Makanan Pokok",
  },
  {
    id: 2,
    name: "Minyak Goreng 2L",
    price: 28000,
    store: "Toko Sembako Jaya",
    storeId: 2,
    image: "/api/placeholder/150/150",
    rating: 4.6,
    stock: 15,
    unit: "liter",
    weight: 2000,
    brand: "Tropical",
    category: "Makanan Pokok",
  },
  {
    id: 3,
    name: "Gula Pasir 1kg",
    price: 14000,
    store: "Supermarket Segar",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.7,
    stock: 30,
    unit: "kg",
    weight: 1000,
    brand: "Gulaku",
    category: "Makanan Pokok",
  },
  {
    id: 4,
    name: "Susu Ultra 1L",
    price: 18000,
    store: "Supermarket Segar",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.9,
    stock: 20,
    unit: "liter",
    weight: 1000,
    brand: "Ultra Milk",
    category: "Minuman",
  },
  {
    id: 5,
    name: "Roti Tawar Gandum",
    price: 12000,
    store: "Toko Roti Manis",
    storeId: 3,
    image: "/api/placeholder/150/150",
    rating: 4.5,
    stock: 12,
    unit: "pcs",
    weight: 400,
    brand: "Sari Roti",
    category: "Roti & Kue",
  },
  {
    id: 6,
    name: "Telur Ayam 1kg",
    price: 25000,
    store: "Supermarket Segar",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.8,
    stock: 18,
    unit: "kg",
    weight: 1000,
    brand: "Telur Segar",
    category: "Protein",
  },
  {
    id: 7,
    name: "Sabun Mandi Cair 250ml",
    price: 15000,
    store: "Toko Sembako Jaya",
    storeId: 2,
    image: "/api/placeholder/150/150",
    rating: 4.4,
    stock: 22,
    unit: "botol",
    weight: 250,
    brand: "Lifebuoy",
    category: "Perawatan Tubuh",
  },
  {
    id: 8,
    name: "Deterjen Bubuk 1kg",
    price: 22000,
    store: "Supermarket Segar",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.6,
    stock: 14,
    unit: "kg",
    weight: 1000,
    brand: "Rinso",
    category: "Rumah Tangga",
  },
  {
    id: 9,
    name: "Air Mineral 600ml",
    price: 3000,
    store: "Toko Sembako Jaya",
    storeId: 2,
    image: "/api/placeholder/150/150",
    rating: 4.3,
    stock: 50,
    unit: "botol",
    weight: 600,
    brand: "Aqua",
    category: "Minuman",
  },
];

export default function CartPage() {
  const {
    addToCart,
    removeFromCart,
    removeItemCompletely,
    clearCart,
    updateQuantity,
    getCartQuantity,
    getTotalItems,
    getTotalValue,
    getCartItems,
    isLoaded,
  } = useCart();

  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get cart items with product details
  const cartItemsWithDetails = getCartItems()
    .map(({ productId, quantity }) => {
      const product = allProducts.find((p) => p.id === productId);
      return {
        ...product,
        quantity,
        subtotal: product ? product.price * quantity : 0,
      };
    })
    .filter((item) => item.id); // Filter out items where product wasn't found

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirmation(false);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeItemCompletely(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500">Memuat keranjang...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cart Summary Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">
                {getTotalItems()} item dalam keranjang
              </div>
            </div>

            {getTotalItems() > 0 && (
              <button
                onClick={() => setShowClearConfirmation(true)}
                className="text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
              >
                Kosongkan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className={`px-4 py-4 ${getTotalItems() > 0 ? "pb-32" : "pb-20"}`}>
        {getTotalItems() === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Keranjang Kosong
            </h3>
            <p className="text-gray-500 mb-6">
              Belum ada produk di keranjang Anda
            </p>
            <a
              href="/products/supermarket"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Mulai Belanja
            </a>
          </div>
        ) : (
          // Cart Items
          <div className="space-y-4">
            {/* Cart Items List */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {cartItemsWithDetails.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex space-x-3">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-500 text-xs">📦</span>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">
                          {item.store}
                        </p>
                        <p className="text-blue-600 font-semibold text-sm mb-2">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-gray-50 rounded-lg p-1">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 bg-white hover:bg-gray-100 rounded-md flex items-center justify-center transition-colors border"
                            >
                              <Minus size={14} className="text-gray-600" />
                            </button>

                            <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => addToCart(item.id)}
                              className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center transition-colors"
                            >
                              <Plus size={14} className="text-white" />
                            </button>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-gray-900">
                              {formatPrice(item.subtotal)}
                            </span>
                            <button
                              onClick={() => removeItemCompletely(item.id)}
                              className="p-1 text-red-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Order Summary - Only show when cart has items */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-30 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Left Side - Total Price and Shipping Info */}
            <div className="flex-1">
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(getTotalValue(allProducts))}
              </div>
              <div className="text-xs text-gray-500">Belum termasuk ongkir</div>
            </div>

            {/* Right Side - Checkout Button */}
            <a
              href="/checkout"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block text-center"
            >
              Checkout
            </a>
          </div>
        </div>
      )}

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirmation && (
        <>
          <div
            className="fixed inset-0 bg-black/25 z-50"
            onClick={() => setShowClearConfirmation(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl z-50 w-80 max-w-[90vw]">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Kosongkan Keranjang?
            </h3>
            <p className="text-gray-600 mb-6">
              Semua item akan dihapus dari keranjang Anda.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowClearConfirmation(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleClearCart}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Kosongkan
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
