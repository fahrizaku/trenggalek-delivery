// file: src/app/(customer)/checkout/page.jsx
"use client";
import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  CreditCard,
  Wallet,
  Search,
  MessageCircle,
  AlertCircle,
  X,
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
  const [selectedDusun, setSelectedDusun] = useState(null);
  const [dusunSearch, setDusunSearch] = useState("");
  const [showDusunDropdown, setShowDusunDropdown] = useState(false);

  // Dusun data states
  const [dusunList, setDusunList] = useState([]);
  const [isLoadingDusun, setIsLoadingDusun] = useState(false);
  const [dusunError, setDusunError] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Fetch dusun data from API
  const fetchDusun = async (searchQuery = "") => {
    setIsLoadingDusun(true);
    setDusunError(null);

    try {
      const url = new URL("/api/dusun", window.location.origin);
      if (searchQuery) {
        url.searchParams.set("search", searchQuery);
      }

      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setDusunList(result.data);
      } else {
        setDusunError("Gagal memuat data dusun");
      }
    } catch (error) {
      console.error("Error fetching dusun:", error);
      setDusunError("Terjadi kesalahan saat memuat data dusun");
    } finally {
      setIsLoadingDusun(false);
    }
  };

  // Load initial dusun data
  useEffect(() => {
    fetchDusun();
  }, []);

  // Debounced search for dusun
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (dusunSearch && showDusunDropdown) {
        fetchDusun(dusunSearch);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [dusunSearch, showDusunDropdown]);

  // Filter dusun based on search (for client-side filtering if needed)
  const filteredDusun = dusunList.filter(
    (dusun) =>
      dusun.name.toLowerCase().includes(dusunSearch.toLowerCase()) ||
      dusun.fullName.toLowerCase().includes(dusunSearch.toLowerCase())
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
  const baseShippingCost = selectedDusun?.shippingCost || 0;
  const total = subtotal + baseShippingCost;

  const handleDusunSelect = (dusun) => {
    setSelectedDusun(dusun);
    setDusunSearch(dusun.fullName);
    setShowDusunDropdown(false);
  };

  const handleDusunInputChange = (e) => {
    const value = e.target.value;
    setDusunSearch(value);
    setShowDusunDropdown(true);

    // Reset selected dusun if input is cleared
    if (value === "") {
      setSelectedDusun(null);
    }
  };

  // Clear functions
  const clearCustomerName = () => {
    setCustomerName("");
  };

  const clearDusun = () => {
    setSelectedDusun(null);
    setDusunSearch("");
    setShowDusunDropdown(false);
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (!customerName.trim()) {
      alert("Mohon isi nama lengkap Anda");
      return;
    }
    if (!selectedDusun) {
      alert("Mohon pilih dusun untuk pengiriman");
      return;
    }

    setIsProcessing(true);

    // Prepare order data
    const orderData = {
      customerName: customerName.trim(),
      deliveryAddress: {
        dusunId: selectedDusun.id,
        dusunName: selectedDusun.name,
        fullAddress: selectedDusun.fullName,
        shippingCost: selectedDusun.shippingCost,
        deliveryNotes: selectedDusun.deliveryNotes,
      },
      deliveryTime: selectedDeliveryOption,
      paymentMethod: selectedPayment,
      items: cartItemsWithDetails,
      summary: {
        subtotal,
        shippingCost: baseShippingCost,
        total,
      },
    };

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      console.log("Order data:", orderData);
      // Here you would typically:
      // 1. Send order to your backend API
      // 2. Clear the cart
      // 3. Redirect to success page or WhatsApp
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
              <div className="relative">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama lengkap"
                  required
                />
                {customerName && (
                  <button
                    type="button"
                    onClick={clearCustomerName}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Dusun */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dusun *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={dusunSearch}
                  onChange={handleDusunInputChange}
                  onFocus={() => setShowDusunDropdown(true)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Cari atau pilih dusun"
                  required
                />
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                {(dusunSearch || selectedDusun) && (
                  <button
                    type="button"
                    onClick={clearDusun}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Show delivery notes if dusun selected */}
              {selectedDusun && selectedDusun.deliveryNotes && (
                <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle
                      size={16}
                      className="text-amber-600 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-sm text-amber-800">
                      <span className="font-medium">Catatan Pengiriman:</span>{" "}
                      {selectedDusun.deliveryNotes}
                    </p>
                  </div>
                </div>
              )}

              {/* Dusun Dropdown */}
              {showDusunDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {isLoadingDusun ? (
                    <div className="px-4 py-3 text-center">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <span className="text-sm text-gray-500">
                        Memuat data dusun...
                      </span>
                    </div>
                  ) : dusunError ? (
                    <div className="px-4 py-3">
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle size={16} />
                        <span className="text-sm">{dusunError}</span>
                      </div>
                      <button
                        onClick={() => fetchDusun(dusunSearch)}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        Coba lagi
                      </button>
                    </div>
                  ) : filteredDusun.length > 0 ? (
                    filteredDusun.map((dusun) => (
                      <button
                        key={dusun.id}
                        type="button"
                        onClick={() => handleDusunSelect(dusun)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {dusun.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {dusun.desaKelurahan}, {dusun.kecamatan}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-gray-900 ml-2 flex-shrink-0">
                            {formatPrice(dusun.shippingCost)}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm text-center">
                      {dusunSearch
                        ? "Dusun tidak ditemukan"
                        : "Tidak ada data dusun"}
                    </div>
                  )}
                </div>
              )}

              {/* Click outside to close dropdown */}
              {showDusunDropdown && (
                <div
                  className="fixed inset-0 z-5"
                  onClick={() => setShowDusunDropdown(false)}
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
                {selectedDusun ? formatPrice(baseShippingCost) : "Pilih dusun"}
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
