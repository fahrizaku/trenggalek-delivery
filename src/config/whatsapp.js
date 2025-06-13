// file: src/config/whatsapp.js

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  // Ganti dengan nomor WhatsApp bisnis Anda (format: 62xxx tanpa +)
  BUSINESS_PHONE: "6281334223752", // Contoh: 6281234567890

  // Nama bisnis untuk ditampilkan di pesan
  BUSINESS_NAME: "Toko Sembako Online",
};

// Generate unique transaction code
export const generateTransactionCode = () => {
  const prefix = "TRX";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");
  return `${prefix}${timestamp}${random}`;
};

// Format currency for WhatsApp message
export const formatCurrencyForWA = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format order message for WhatsApp
export const formatOrderMessage = (orderData, paymentMethods) => {
  const {
    transactionCode,
    customerName,
    deliveryAddress,
    deliveryTime,
    paymentMethod,
    items,
    summary,
  } = orderData;

  let message = `🛒 *PESANAN BARU*\n\n`;

  // Header info
  message += `📋 *Kode:* ${transactionCode}\n`;
  message += `👤 *Nama:* ${customerName}\n`;
  message += `📍 *Alamat:* ${deliveryAddress.fullAddress}\n`;
  message += `⏰ *Waktu Kirim:* ${deliveryTime.name} (${deliveryTime.time})\n`;

  if (deliveryAddress.deliveryNotes) {
    message += `📝 *Catatan:* ${deliveryAddress.deliveryNotes}\n`;
  }

  // Payment info
  const selectedPaymentMethod = paymentMethods.find(
    (p) => p.id === paymentMethod
  );
  message += `💳 *Pembayaran:* ${
    selectedPaymentMethod?.name || paymentMethod
  }\n\n`;

  // Items details
  message += `📦 *PESANAN:*\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`; // Baris pertama item (nama produk)
    message += `    ${formatCurrencyForWA(item.price)} x ${
      item.quantity
    } = ${formatCurrencyForWA(item.subtotal)}\n\n`; // Baris kedua item (harga) diikuti dua newline
  });

  // Summary
  message += `💰 *TOTAL:*\n`;
  message += `Subtotal: ${formatCurrencyForWA(summary.subtotal)}\n`;
  message += `Ongkir: ${formatCurrencyForWA(summary.shippingCost)}\n`;
  message += `*TOTAL: ${formatCurrencyForWA(summary.total)}*\n\n`;

  // Footer
  message += `Mohon konfirmasi pesanan ini. Terima kasih! 🙏`;

  return message;
};

// Send order to WhatsApp
export const sendOrderToWhatsApp = (orderData, paymentMethods) => {
  const message = formatOrderMessage(orderData, paymentMethods);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.BUSINESS_PHONE}?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappUrl, "_blank");

  return whatsappUrl;
};
