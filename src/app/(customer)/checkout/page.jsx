// file: src/app/(customer)/checkout/page.jsx
"use client";
import { useState } from "react";
import {
  MapPin,
  Clock,
  CreditCard,
  Wallet,
  CheckCircle,
  Search,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Mock data produk (sama dengan sebelumnya)
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

// Mock desa/kelurahan data with shipping costs
const villages = [
  { id: 1, name: "Trenggalek", shippingCost: 5000 },
  { id: 2, name: "Karangan", shippingCost: 7000 },
  { id: 3, name: "Tugu", shippingCost: 6000 },
  { id: 4, name: "Ngantru", shippingCost: 8000 },
  { id: 5, name: "Durenan", shippingCost: 10000 },
  { id: 6, name: "Pogalan", shippingCost: 9000 },
  { id: 7, name: "Watulimo", shippingCost: 12000 },
  { id: 8, name: "Kampak", shippingCost: 11000 },
  { id: 9, name: "Dongko", shippingCost: 15000 },
  { id: 10, name: "Panggul", shippingCost: 13000 },
];

// Mock delivery time options
const deliveryOptions = [
  {
    id: "dawn",
    name: "Subuh",
    time: "05:00 - 06:30",
    description: "Pengiriman pagi hari",
  },
  {
    id: "morning",
    name: "Pagi",
    time: "09:00 - 12:00",
    description: "Pengiriman siang hari",
  },
  {
    id: "afternoon",
    name: "Sore",
    time: "16:00 - 19:00",
    description: "Pengiriman sore hari",
  },
  {
    id: "night",
    name: "Malam",
    time: "21:00 - 23:00",
    description: "Pengiriman malam hari",
  },
];

// Simplified payment methods
const paymentMethods = [
  {
    id: "cod",
    name: "Bayar di Tempat (COD)",
    icon: Wallet,
    description: "Bayar saat barang diterima",
  },
  {
    id: "transfer",
    name: "Transfer Bank / E-Wallet",
    icon: CreditCard,
    description: "Transfer ke rekening atau e-wallet",
  },
];

export default function CheckoutPage() {
  const { getTotalItems, getTotalValue, getCartItems, isLoaded } = useCart();

  const [selectedDelivery, setSelectedDelivery] = useState("morning");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  // Delivery address states
  const [customerName, setCustomerName] = useState("");
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [villageSearch, setVillageSearch] = useState("");
  const [showVillageDropdown, setShowVillageDropdown] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Filter villages based on search
  const filteredVillages = villages.filter((village) =>
    village.name.toLowerCase().includes(villageSearch.toLowerCase())
  );

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
  const baseShippingCost = selectedVillage?.shippingCost || 0;
  const total = subtotal + baseShippingCost;

  const handleVillageSelect = (village) => {
    setSelectedVillage(village);
    setVillageSearch(village.name);
    setShowVillageDropdown(false);
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (!customerName.trim()) {
      alert("Mohon isi nama lengkap Anda");
      return;
    }
    if (!selectedVillage) {
      alert("Mohon pilih desa/kelurahan untuk pengiriman");
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to WhatsApp or show success modal
      alert("Pesanan berhasil dibuat! Anda akan dihubungi melalui WhatsApp.");
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
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Delivery Address */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin size={20} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Alamat Pengiriman
            </h3>
          </div>

          <div className="space-y-4">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            {/* Desa/Kelurahan */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desa/Kelurahan *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={villageSearch}
                  onChange={(e) => {
                    setVillageSearch(e.target.value);
                    setShowVillageDropdown(true);
                    if (e.target.value === "") {
                      setSelectedVillage(null);
                    }
                  }}
                  onFocus={() => setShowVillageDropdown(true)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Cari atau pilih desa/kelurahan"
                  required
                />
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Village Dropdown */}
              {showVillageDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {filteredVillages.length > 0 ? (
                    filteredVillages.map((village) => (
                      <button
                        key={village.id}
                        type="button"
                        onClick={() => handleVillageSelect(village)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex justify-between items-center"
                      >
                        <span className="text-gray-900">{village.name}</span>
                        <span className="text-sm text-gray-500">
                          {formatPrice(village.shippingCost)}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      Desa/kelurahan tidak ditemukan
                    </div>
                  )}
                </div>
              )}

              {/* Click outside to close dropdown */}
              {showVillageDropdown && (
                <div
                  className="fixed inset-0 z-5"
                  onClick={() => setShowVillageDropdown(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Delivery Time */}
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

        {/* Payment Method */}
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
            {paymentMethods.map((method) => (
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
                  <method.icon size={20} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-lg">
                    {method.name}
                  </p>
                  <p className="text-gray-500">{method.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Item Pesanan ({getTotalItems()} item)
          </h3>

          <div className="space-y-4">
            {cartItemsWithDetails.map((item) => (
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

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ringkasan Pesanan
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Subtotal ({getTotalItems()} item)
              </span>
              <span className="text-gray-900 font-medium">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ongkos Kirim</span>
              <span className="text-gray-900 font-medium">
                {selectedVillage ? formatPrice(baseShippingCost) : "Pilih desa"}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-30 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(total)}
            </div>
            <div className="text-sm text-gray-500">Total pembayaran</div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center space-x-2 shadow-lg"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <MessageCircle size={20} />
                <span>Buat Pesanan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
