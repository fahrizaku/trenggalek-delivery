"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Pill,
  AlertTriangle,
  Clock,
  Shield,
} from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("name");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatExpiredDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Kadaluarsa";
    if (diffDays <= 30) return `${diffDays} hari lagi`;
    if (diffDays <= 365) return `${Math.ceil(diffDays / 30)} bulan lagi`;
    return `${Math.ceil(diffDays / 365)} tahun lagi`;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Obat Keras":
        return "🔴";
      case "Obat Bebas Terbatas":
        return "🟡";
      case "Obat Bebas":
        return "🟢";
      case "Suplemen":
        return "💊";
      case "Antiseptik":
        return "🧴";
      default:
        return "💊";
    }
  };

  // Filter dan Sort Products
  useEffect(() => {
    let filtered = pharmacyProducts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    if (selectedPriceRange !== "all") {
      const range = priceRanges.find((r) => r.id === selectedPriceRange);
      filtered = filtered.filter(
        (product) => product.price >= range.min && product.price <= range.max
      );
    }

    // Filter by prescription requirement
    if (showPrescriptionOnly) {
      filtered = filtered.filter((product) => !product.isPrescriptionRequired);
    }

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

    // Sort products
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "expiry":
          return new Date(b.expiredDate) - new Date(a.expiredDate);
        default:
          return 0;
      }
    });

    setProducts(filtered);
  }, [
    searchQuery,
    selectedCategory,
    selectedSort,
    selectedPriceRange,
    showPrescriptionOnly,
  ]);

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

          {/* Filter and Sort */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Filter size={16} />
              <span className="text-sm font-medium">Filter</span>
            </button>

            <div className="text-sm text-gray-600">
              {products.length} produk ditemukan
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border-t border-gray-200 px-4 py-4 max-h-96 overflow-y-auto">
            {/* Prescription Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Filter Khusus</h3>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={showPrescriptionOnly}
                  onChange={(e) => setShowPrescriptionOnly(e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  Hanya obat tanpa resep
                </span>
              </label>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Kategori Obat</h3>
              <div className="space-y-2">
                {medicineCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{getCategoryIcon(category.name)}</span>
                    <span>
                      {category.name} ({category.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Rentang Harga</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedPriceRange === range.id
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {range.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-3">Urutkan</h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedSort(option.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSort === option.id
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Terapkan Filter
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="px-4 py-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : products.length === 0 ? (
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

                  {/* Stock Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 30
                          ? "bg-green-100 text-green-700"
                          : product.stock > 15
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock} tersisa
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="text-xs text-gray-500 mb-2">
                    {product.manufacturer} • {product.dosage}
                  </div>

                  <div className="flex items-center space-x-1 mb-2">
                    <MapPin size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500 truncate">
                      {product.store}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <Star
                        size={12}
                        className="text-yellow-400 fill-current"
                      />
                      <span className="text-xs text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield size={10} className="text-green-500" />
                      <span className="text-xs text-green-600">BPOM</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-green-600 text-sm">
                      {formatPrice(product.price)}
                    </p>
                    <span className="text-xs text-gray-500">
                      /{product.unit}
                    </span>
                  </div>

                  {/* Category & Expiry */}
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`px-2 py-1 rounded-full font-medium ${
                        product.category === "Obat Keras"
                          ? "bg-red-100 text-red-700"
                          : product.category === "Obat Bebas Terbatas"
                          ? "bg-yellow-100 text-yellow-700"
                          : product.category === "Obat Bebas"
                          ? "bg-green-100 text-green-700"
                          : product.category === "Suplemen"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {getCategoryIcon(product.category)} {product.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 mt-2">
                    <Clock size={10} className="text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Exp: {formatExpiredDate(product.expiredDate)}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
