// file: src/app/(customer)/checkout/page.jsx
"use client";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  CreditCard,
  Wallet,
  Smartphone,
  Truck,
  CheckCircle,
  Edit3,
  Plus,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Mock data produk (sama dengan cart page)
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
];

// Mock delivery options
const deliveryOptions = [
  {
    id: "regular",
    name: "Reguler",
    time: "60-90 menit",
    price: 5000,
    description: "Pengiriman standar",
  },
  {
    id: "express",
    name: "Express",
    time: "30-45 menit",
    price: 8000,
    description: "Pengiriman cepat",
  },
  {
    id: "instant",
    name: "Instant",
    time: "15-30 menit",
    price: 12000,
    description: "Pengiriman kilat",
  },
];

// Mock payment methods
const paymentMethods = [
  {
    id: "cod",
    name: "Bayar di Tempat (COD)",
    icon: Wallet,
    description: "Bayar saat barang diterima",
  },
  {
    id: "gopay",
    name: "GoPay",
    icon: Smartphone,
    description: "Bayar dengan GoPay",
  },
  {
    id: "dana",
    name: "DANA",
    icon: Smartphone,
    description: "Bayar dengan DANA",
  },
  {
    id: "ovo",
    name: "OVO",
    icon: Smartphone,
    description: "Bayar dengan OVO",
  },
  {
    id: "bank",
    name: "Transfer Bank",
    icon: CreditCard,
    description: "Transfer ke rekening bank",
  },
];

export default function CheckoutPage() {
  const { getTotalItems, getTotalValue, getCartItems, isLoaded } = useCart();

  const [selectedDelivery, setSelectedDelivery] = useState("regular");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "John Doe",
    phone: "081234567890",
    address: "Jl. Merdeka No. 123, Trenggalek",
    notes: "Rumah cat biru, depan masjid",
  });

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

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
    .filter((item) => item.id);

  const subtotal = getTotalValue(allProducts);
  const selectedDeliveryOption = deliveryOptions.find(
    (d) => d.id === selectedDelivery
  );
  const deliveryFee = selectedDeliveryOption?.price || 0;
  const total = subtotal + deliveryFee;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setDeliveryAddress({ ...addressForm });
    setShowAddressForm(false);
    setAddressForm({ name: "", phone: "", address: "", notes: "" });
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to success page or show success modal
      alert("Pesanan berhasil dibuat!");
    }, 2000);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500">Memuat checkout...</p>
        </div>
      </div>
    );
  }

  if (getTotalItems() === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Keranjang Kosong
          </h3>
          <p className="text-gray-500 mb-4">Tidak ada item untuk checkout</p>
          <a
            href="/cart"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Kembali ke Keranjang
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white sticky top-16 z-40 border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <a
              href="/cart"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </a>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Delivery Address */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <MapPin size={20} className="text-blue-500" />
              <h3 className="font-semibold text-gray-900">Alamat Pengiriman</h3>
            </div>
            <button
              onClick={() => {
                setAddressForm(deliveryAddress);
                setShowAddressForm(true);
              }}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Edit3 size={16} />
            </button>
          </div>

          <div className="space-y-1">
            <p className="font-medium text-gray-900">{deliveryAddress.name}</p>
            <p className="text-sm text-gray-600">{deliveryAddress.phone}</p>
            <p className="text-sm text-gray-600">{deliveryAddress.address}</p>
            {deliveryAddress.notes && (
              <p className="text-sm text-gray-500">
                Catatan: {deliveryAddress.notes}
              </p>
            )}
          </div>
        </div>

        {/* Delivery Time */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Clock size={20} className="text-blue-500" />
            <h3 className="font-semibold text-gray-900">Waktu Pengiriman</h3>
          </div>

          <div className="space-y-2">
            {deliveryOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedDelivery === option.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery"
                    value={option.id}
                    checked={selectedDelivery === option.id}
                    onChange={(e) => setSelectedDelivery(e.target.value)}
                    className="text-blue-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{option.name}</p>
                    <p className="text-sm text-gray-500">{option.time}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">
                  {formatPrice(option.price)}
                </p>
              </label>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center space-x-2 mb-3">
            <CreditCard size={20} className="text-blue-500" />
            <h3 className="font-semibold text-gray-900">Metode Pembayaran</h3>
          </div>

          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedPayment === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="text-blue-500"
                />
                <method.icon size={20} className="text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Item Pesanan</h3>

          <div className="space-y-3">
            {cartItemsWithDetails.map((item) => (
              <div key={item.id} className="flex space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-500 text-xs">📦</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">{item.store}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-600">
                      {item.quantity}x {formatPrice(item.price)}
                    </span>
                    <span className="font-semibold text-gray-900 text-sm">
                      {formatPrice(item.subtotal)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Order Summary */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-30 shadow-lg">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Subtotal ({getTotalItems()} item)
            </span>
            <span className="text-gray-900">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Ongkos Kirim</span>
            <span className="text-gray-900">{formatPrice(deliveryFee)}</span>
          </div>
          <div className="border-t border-gray-100 pt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-blue-600">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              <span>Buat Pesanan</span>
            </>
          )}
        </button>
      </div>

      {/* Address Form Modal */}
      {showAddressForm && (
        <>
          <div
            className="fixed inset-0 bg-black/25 z-50"
            onClick={() => setShowAddressForm(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl z-50 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Alamat Pengiriman
            </h3>

            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={addressForm.name}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={addressForm.phone}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  value={addressForm.address}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, address: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catatan (Opsional)
                </label>
                <input
                  type="text"
                  value={addressForm.notes}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Patokan, warna rumah, dll"
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
