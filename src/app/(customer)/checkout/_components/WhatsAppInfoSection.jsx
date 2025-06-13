// file: src/app/(customer)/checkout/components/WhatsAppInfoSection.jsx
import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/config/whatsapp";

export default function WhatsAppInfoSection() {
  const formatPhoneNumber = (phone) => {
    // Convert 6281234567890 to +62 812-3456-7890
    if (phone.startsWith("62")) {
      const withoutPrefix = phone.slice(2);
      return `+62 ${withoutPrefix.slice(0, 3)}-${withoutPrefix.slice(
        3,
        7
      )}-${withoutPrefix.slice(7)}`;
    }
    return phone;
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <MessageCircle size={20} className="text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Informasi Pemesanan
        </h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Phone size={18} className="text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              WhatsApp: {formatPhoneNumber(WHATSAPP_CONFIG.BUSINESS_PHONE)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-green-200">
          <p className="text-sm text-gray-700">
            Setelah menekan tombol "Pesan via WhatsApp", rincian pesanan akan
            dikirim langsung ke admin.
          </p>
        </div>
      </div>
    </div>
  );
}
