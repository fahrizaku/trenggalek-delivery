"use client";
import { useState, useEffect } from "react";
import { Search, Pill, AlertTriangle } from "lucide-react";

// Mock data untuk produk apotek
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
  },
  {
    id: 5,
    name: "Omeprazole 20mg",
    price: 35000,
    store: "Apotek Kimia Farma",
    storeId: 2,
    image: "/api/placeholder/150/150",
    rating: 4.8,
    stock: 20,
    unit: "strip",
    dosage: "20mg",
    activeIngredient: "Omeprazole",
    manufacturer: "Kalbe Farma",
    bpomNumber: "DKL1234567890A4",
    isPrescriptionRequired: true,
    category: "Obat Keras",
    expiredDate: "2025-11-10",
    indication: "Maag, GERD",
    sideEffects: "Sakit kepala, diare",
  },
  {
    id: 6,
    name: "Multivitamin Dewasa",
    price: 55000,
    store: "Apotek Sehat Selalu",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.5,
    stock: 18,
    unit: "botol",
    dosage: "1 tablet/hari",
    activeIngredient: "Vitamin A, B, C, D, E",
    manufacturer: "Blackmores",
    bpomNumber: "SI1234567890A2",
    isPrescriptionRequired: false,
    category: "Suplemen",
    expiredDate: "2026-09-25",
    indication: "Suplemen nutrisi harian",
    sideEffects: "Tidak ada efek samping signifikan",
  },
  {
    id: 7,
    name: "Ibuprofen 400mg",
    price: 15000,
    store: "Apotek Guardian",
    storeId: 3,
    image: "/api/placeholder/150/150",
    rating: 4.7,
    stock: 35,
    unit: "strip",
    dosage: "400mg",
    activeIngredient: "Ibuprofen",
    manufacturer: "Tempo Scan Pacific",
    bpomNumber: "DKL1234567890A5",
    isPrescriptionRequired: false,
    category: "Obat Bebas Terbatas",
    expiredDate: "2025-07-18",
    indication: "Anti inflamasi, pereda nyeri",
    sideEffects: "Gangguan lambung, pusing",
  },
  {
    id: 8,
    name: "Hand Sanitizer 100ml",
    price: 18000,
    store: "Apotek Sehat Selalu",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.4,
    stock: 60,
    unit: "botol",
    dosage: "70% alcohol",
    activeIngredient: "Ethyl Alcohol",
    manufacturer: "Antis",
    bpomNumber: "NA18200300123",
    isPrescriptionRequired: false,
    category: "Antiseptik",
    expiredDate: "2026-12-31",
    indication: "Membunuh kuman di tangan",
    sideEffects: "Kulit kering (penggunaan berlebihan)",
  },
];

const medicineCategories = [
  { id: "all", name: "Semua Produk", count: pharmacyProducts.length },
  {
    id: "Obat Bebas",
    name: "Obat Bebas",
    count: pharmacyProducts.filter((p) => p.category === "Obat Bebas").length,
  },
  {
    id: "Obat Bebas Terbatas",
    name: "Obat Bebas Terbatas",
    count: pharmacyProducts.filter((p) => p.category === "Obat Bebas Terbatas")
      .length,
  },
  {
    id: "Obat Keras",
    name: "Obat Keras",
    count: pharmacyProducts.filter((p) => p.category === "Obat Keras").length,
  },
  {
    id: "Suplemen",
    name: "Suplemen",
    count: pharmacyProducts.filter((p) => p.category === "Suplemen").length,
  },
  {
    id: "Antiseptik",
    name: "Antiseptik",
    count: pharmacyProducts.filter((p) => p.category === "Antiseptik").length,
  },
];

const sortOptions = [
  { id: "name", name: "Nama A-Z" },
  { id: "price-low", name: "Harga Terendah" },
  { id: "price-high", name: "Harga Tertinggi" },
  { id: "rating", name: "Rating Tertinggi" },
  { id: "expiry", name: "Terlama Expired" },
];

const priceRanges = [
  { id: "all", name: "Semua Harga", min: 0, max: Infinity },
  { id: "under-15k", name: "Di bawah Rp 15.000", min: 0, max: 15000 },
  { id: "15k-30k", name: "Rp 15.000 - Rp 30.000", min: 15000, max: 30000 },
  { id: "30k-50k", name: "Rp 30.000 - Rp 50.000", min: 30000, max: 50000 },
  { id: "above-50k", name: "Di atas Rp 50.000", min: 50000, max: Infinity },
];

export default function PharmacyProductsPage() {
  const [products, setProducts] = useState(pharmacyProducts);
  const [searchQuery, setSearchQuery] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Filter products by search query only
  useEffect(() => {
    let filtered = pharmacyProducts;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.manufacturer
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.activeIngredient
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.indication.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">💊</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Produk Apotek</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari obat, suplemen, atau apotek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 py-4">
        {products.length === 0 ? (
          <div className="text-center py-8">
            <Pill size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Produk tidak ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <a
                key={product.id}
                href={`/products/pharmacy/${product.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gray-200 relative">
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <Pill size={24} className="text-green-500" />
                  </div>

                  {/* Prescription Badge */}
                  {product.isPrescriptionRequired && (
                    <div className="absolute top-2 left-2">
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <AlertTriangle size={10} />
                        <span>Resep</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="font-bold text-green-600 text-sm">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
