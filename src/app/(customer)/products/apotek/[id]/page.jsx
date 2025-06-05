// file: src/app/(customer)/products/pharmacy/[id]/page.jsx
"use client";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Pill,
  AlertTriangle,
  Info,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

// Mock data untuk produk apotek (sama seperti di halaman list)
const pharmacyProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 8000,
    store: "Apotek Sehat Selalu",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.9,
    stock: 50,
    unit: "strip",
    dosage: "500mg",
    activeIngredient: "Paracetamol",
    manufacturer: "Kimia Farma",
    bpomNumber: "DKL1234567890A1",
    isPrescriptionRequired: false,
    category: "Obat Bebas",
    expiredDate: "2025-12-31",
    indication: "Demam, sakit kepala, nyeri ringan",
    sideEffects: "Mual, muntah (jarang)",
    description:
      "Paracetamol adalah obat pereda nyeri dan penurun demam yang aman untuk segala usia. Cocok untuk mengatasi sakit kepala, demam, dan nyeri ringan hingga sedang.",
    dosageInstructions:
      "Dewasa: 1-2 tablet 3-4 kali sehari. Anak 6-12 tahun: 1/2-1 tablet 3-4 kali sehari. Diminum setelah makan.",
    contraindications:
      "Hipersensitif terhadap paracetamol, gangguan fungsi hati berat",
    storage:
      "Simpan di tempat kering, sejuk, terhindar dari cahaya matahari langsung",
  },
  {
    id: 2,
    name: "Amoxicillin 500mg",
    price: 25000,
    store: "Apotek Kimia Farma",
    storeId: 2,
    image: "/api/placeholder/150/150",
    rating: 4.8,
    stock: 30,
    unit: "strip",
    dosage: "500mg",
    activeIngredient: "Amoxicillin",
    manufacturer: "Dexa Medica",
    bpomNumber: "DKL1234567890A2",
    isPrescriptionRequired: true,
    category: "Obat Keras",
    expiredDate: "2025-08-15",
    indication: "Infeksi bakteri",
    sideEffects: "Diare, ruam kulit",
    description:
      "Amoxicillin adalah antibiotik golongan penisilin yang efektif untuk mengatasi berbagai infeksi bakteri. Harus dikonsumsi sesuai resep dokter.",
    dosageInstructions:
      "Sesuai resep dokter. Umumnya 500mg 3 kali sehari selama 7-10 hari. Harus dihabiskan meskipun gejala sudah membaik.",
    contraindications:
      "Alergi penisilin, riwayat reaksi alergi berat terhadap antibiotik beta-laktam",
    storage: "Simpan pada suhu ruang, di tempat kering dan sejuk",
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    price: 45000,
    store: "Apotek Sehat Selalu",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.7,
    stock: 25,
    unit: "botol",
    dosage: "1000mg",
    activeIngredient: "Ascorbic Acid",
    manufacturer: "Sido Muncul",
    bpomNumber: "SI1234567890A1",
    isPrescriptionRequired: false,
    category: "Suplemen",
    expiredDate: "2026-06-30",
    indication: "Meningkatkan daya tahan tubuh",
    sideEffects: "Gangguan pencernaan (dosis tinggi)",
    description:
      "Suplemen Vitamin C dengan dosis tinggi untuk meningkatkan daya tahan tubuh dan membantu proses penyembuhan. Mengandung antioksidan alami.",
    dosageInstructions:
      "1 tablet per hari setelah makan. Dapat diminum dengan air putih atau jus.",
    contraindications: "Batu ginjal, gangguan fungsi ginjal berat",
    storage: "Simpan di tempat sejuk dan kering, tutup rapat setelah digunakan",
  },
  {
    id: 4,
    name: "Betadine 15ml",
    price: 12000,
    store: "Apotek Guardian",
    storeId: 3,
    image: "/api/placeholder/150/150",
    rating: 4.6,
    stock: 40,
    unit: "botol",
    dosage: "10% solution",
    activeIngredient: "Povidone Iodine",
    manufacturer: "Mundipharma",
    bpomNumber: "DKL1234567890A3",
    isPrescriptionRequired: false,
    category: "Antiseptik",
    expiredDate: "2027-03-20",
    indication: "Antiseptik luka luar",
    sideEffects: "Iritasi kulit (sensitif)",
    description:
      "Antiseptik topikal yang efektif membunuh bakteri, virus, dan jamur. Ideal untuk perawatan luka kecil dan pencegahan infeksi.",
    dosageInstructions:
      "Oleskan tipis pada area yang terluka 2-3 kali sehari. Bersihkan luka terlebih dahulu sebelum aplikasi.",
    contraindications:
      "Hipersensitif terhadap iodine, gangguan tiroid, kehamilan dan menyusui (konsultasi dokter)",
    storage: "Simpan pada suhu ruang, hindari paparan cahaya langsung",
  },
  // Tambahkan produk lainnya sesuai kebutuhan...
];

export default function PharmacyProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const productId = parseInt(params.id);
    const foundProduct = pharmacyProducts.find((p) => p.id === productId);
    setProduct(foundProduct);
  }, [params.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleQuantityChange = (action) => {
    // Function removed as quantity selector is removed
  };

  const handleAddToCart = () => {
    // Implementasi add to cart
    alert(`${product.name} berhasil ditambahkan ke keranjang`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Pill size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Produk tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="bg-white">
        <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative">
          <Pill size={64} className="text-green-500" />

          {/* Prescription Badge */}
          {product.isPrescriptionRequired && (
            <div className="absolute top-4 left-4">
              <div className="bg-red-500 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <AlertTriangle size={16} />
                <span>Memerlukan Resep</span>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium text-gray-700">
              {product.category}
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{product.name}</h2>

        <div className="text-2xl font-bold text-green-600">
          {formatPrice(product.price)}
          <span className="text-sm font-normal text-gray-500">
            /{product.unit}
          </span>
        </div>
      </div>

      {/* Prescription Warning (if needed) */}
      {product.isPrescriptionRequired && (
        <div className="bg-white px-4 py-4 border-b border-gray-100">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle
                size={20}
                className="text-orange-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <h4 className="font-semibold text-orange-900 mb-1">
                  Memerlukan Resep Dokter
                </h4>
                <p className="text-sm text-orange-700 leading-relaxed">
                  Produk ini termasuk obat keras dan hanya dapat dibeli dengan
                  resep dokter. Silakan konsultasi dengan dokter atau datang
                  langsung ke apotek dengan membawa resep.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action - Fixed floating button */}
      <div className="fixed bottom-20 left-4 right-4 z-30">
        {product.isPrescriptionRequired ? (
          <button
            onClick={() =>
              alert("Silakan datang ke apotek dengan resep dokter")
            }
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg"
          >
            <AlertTriangle size={20} />
            <span>Perlu Resep Dokter</span>
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg"
          >
            <ShoppingCart size={20} />
            <span>Tambah ke Keranjang - {formatPrice(product.price)}</span>
          </button>
        )}
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-32"></div>
    </div>
  );
}
