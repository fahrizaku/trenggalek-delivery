// file: src/app/(customer)/checkout/page.jsx
"use client";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import {
  generateTransactionCode,
  sendOrderToWhatsApp,
} from "@/config/whatsapp";
import DeliveryAddressSection from "./_components/DeliveryAddressSection";
import DeliveryTimeSection from "./_components/DeliveryTimeSection";
import PaymentMethodSection from "./_components/PaymentMethodSection";
import OrderItemsSection from "./_components/OrderItemsSection";
import OrderSummarySection from "./_components/OrderSummarySection";
import WhatsAppInfoSection from "./_components/WhatsAppInfoSection";
import NotificationToast from "./_components/NotificationToast";

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

// Updated delivery time options with availability
const deliveryOptions = [
  {
    id: "fajar",
    name: "Pagi Buta",
    time: "05:00 - 06:30",
    description: "Cocok untuk sarapan",
    available: false,
    unavailableReason: "belum tersedia",
  },
  {
    id: "pagi",
    name: "Pagi",
    time: "08:00 - 10:00",
    description: "Pengiriman pagi hari",
    available: false,
    unavailableReason: "belum tersedia",
  },
  {
    id: "siang",
    name: "Siang",
    time: "11:00 - 13:00",
    description: "Pengiriman siang hari",
    available: false,
    unavailableReason: "belum tersedia",
  },
  {
    id: "sore",
    name: "Sore",
    time: "14:00 - 16:00",
    description: "Pengiriman sore hari",
    available: true,
  },
  {
    id: "petang",
    name: "Petang",
    time: "17:00 - 19:00",
    description: "Pengiriman petang",
    available: true,
    unavailableReason: "",
  },
  {
    id: "malam",
    name: "Malam",
    time: "20:00 - 22:00",
    description: "Pengiriman malam hari",
    available: true,
  },
  {
    id: "secepatnya",
    name: "Secepatnya 🔥",
    time: "< 30 menit",
    description: "Dikirim Secepatnya",
    available: false,
    unavailableReason: "Semua kurir sedang bertugas",
  },
];

// Simplified payment methods
const paymentMethods = [
  {
    id: "cod",
    name: "Bayar di Tempat (COD)",
    icon: "Wallet",
    description: "Bayar saat barang diterima",
  },
  {
    id: "transfer",
    name: "Transfer Bank / E-Wallet",
    icon: "CreditCard",
    description: "Transfer ke rekening atau e-wallet",
  },
];

// Helper functions for localStorage
const saveToLocalStorage = (customerName, selectedDusun) => {
  try {
    // Handle customer name history
    const existingNameHistory = JSON.parse(
      localStorage.getItem("customerNameHistory") || "[]"
    );

    // Remove if already exists to avoid duplicates
    const filteredNameHistory = existingNameHistory.filter(
      (name) => name !== customerName
    );

    // Add to beginning of array
    const newNameHistory = [customerName, ...filteredNameHistory];

    // Keep only first 3 items for names
    const limitedNameHistory = newNameHistory.slice(0, 3);

    localStorage.setItem(
      "customerNameHistory",
      JSON.stringify(limitedNameHistory)
    );

    // Handle dusun history
    const existingDusunHistory = JSON.parse(
      localStorage.getItem("dusunHistory") || "[]"
    );

    // Remove if already exists to avoid duplicates
    const filteredHistory = existingDusunHistory.filter(
      (dusun) => dusun.id !== selectedDusun.id
    );

    // Add to beginning of array
    const newHistory = [selectedDusun, ...filteredHistory];

    // Keep only first 2 items
    const limitedHistory = newHistory.slice(0, 2);

    localStorage.setItem("dusunHistory", JSON.stringify(limitedHistory));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const customerNameHistory = JSON.parse(
      localStorage.getItem("customerNameHistory") || "[]"
    );
    const dusunHistory = JSON.parse(
      localStorage.getItem("dusunHistory") || "[]"
    );
    return { customerNameHistory, dusunHistory };
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return { customerNameHistory: [], dusunHistory: [] };
  }
};

export default function CheckoutPage() {
  const { getTotalItems, getTotalValue, getCartItems, isLoaded, clearCart } =
    useCart();
  const router = useRouter();

  // Find first available delivery option as default
  const firstAvailableDelivery =
    deliveryOptions.find((option) => option.available)?.id || "pagi";
  const [selectedDelivery, setSelectedDelivery] = useState(
    firstAvailableDelivery
  );
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  // Notification state
  const [notification, setNotification] = useState(null);

  // Delivery address states
  const [customerName, setCustomerName] = useState("");
  const [selectedDusun, setSelectedDusun] = useState(null);
  const [dusunHistory, setDusunHistory] = useState([]);
  const [customerNameHistory, setCustomerNameHistory] = useState([]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    setCustomerNameHistory(savedData.customerNameHistory);
    setDusunHistory(savedData.dusunHistory);

    // Set the most recent name as default if available
    if (savedData.customerNameHistory.length > 0) {
      setCustomerName(savedData.customerNameHistory[0]);
    }
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Show notification function
  const showNotification = (message, type = "error") => {
    setNotification({ message, type });
  };

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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

  const handlePlaceOrder = async () => {
    // Validation
    if (!customerName.trim()) {
      showNotification("Mohon isi nama Anda", "error");
      return;
    }
    if (!selectedDusun) {
      showNotification("Mohon pilih dusun untuk pengiriman", "error");
      return;
    }

    // Check if selected delivery is available
    const selectedOption = deliveryOptions.find(
      (d) => d.id === selectedDelivery
    );
    if (!selectedOption?.available) {
      showNotification("Waktu pengiriman yang dipilih tidak tersedia", "error");
      return;
    }

    setIsProcessing(true);

    // Generate transaction code
    const transactionCode = generateTransactionCode();

    // Prepare order data
    const orderData = {
      transactionCode,
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

      // Save to localStorage before proceeding
      saveToLocalStorage(customerName.trim(), selectedDusun);

      // Send to WhatsApp
      try {
        sendOrderToWhatsApp(orderData, paymentMethods);
        showNotification(
          `Pesanan ${transactionCode} berhasil dibuat! Mengarahkan ke WhatsApp...`,
          "success"
        );

        // Clear cart and navigate to home page
        setTimeout(() => {
          clearCart();
          router.push("/");
        }, 1500); // Give some time to see the success notification
      } catch (error) {
        console.error("Error sending to WhatsApp:", error);
        showNotification(
          "Pesanan berhasil dibuat, namun gagal membuka WhatsApp. Silakan hubungi admin.",
          "error"
        );

        // Still clear cart and navigate even if WhatsApp fails
        setTimeout(() => {
          clearCart();
          router.push("/");
        }, 2000);
      }
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
      {/* Notification Toast */}
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <DeliveryAddressSection
          customerName={customerName}
          setCustomerName={setCustomerName}
          selectedDusun={selectedDusun}
          setSelectedDusun={setSelectedDusun}
          dusunHistory={dusunHistory}
          customerNameHistory={customerNameHistory}
          showNotification={showNotification}
        />

        <DeliveryTimeSection
          deliveryOptions={deliveryOptions}
          selectedDelivery={selectedDelivery}
          setSelectedDelivery={setSelectedDelivery}
        />

        <PaymentMethodSection
          paymentMethods={paymentMethods}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />

        <OrderItemsSection
          cartItems={cartItemsWithDetails}
          totalItems={getTotalItems()}
          formatPrice={formatPrice}
        />

        <OrderSummarySection
          subtotal={subtotal}
          shippingCost={baseShippingCost}
          total={total}
          totalItems={getTotalItems()}
          selectedDusun={selectedDusun}
          formatPrice={formatPrice}
        />

        <WhatsAppInfoSection />
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
                <span>Pesan via WhatsApp</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
