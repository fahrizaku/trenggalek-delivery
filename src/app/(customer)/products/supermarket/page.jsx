"use client";
import { useState, useEffect } from "react";
import { Search, Filter, Star, MapPin, Package, Clock } from "lucide-react";

// Mock data untuk produk supermarket
const supermarketProducts = [
  {
    id: 1,
    name: "Beras Premium 5kg",
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
    barcode: "8992761111112",
    expiredDate: "2024-12-31",
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
    barcode: "8992761111113",
    expiredDate: "2025-06-30",
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
    barcode: "8992761111114",
    expiredDate: "2025-12-31",
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
    barcode: "8992761111115",
    expiredDate: "2024-07-15",
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
    barcode: "8992761111116",
    expiredDate: "2024-06-10",
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
    barcode: "8992761111117",
    expiredDate: "2024-06-20",
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
    barcode: "8992761111118",
    expiredDate: "2026-03-15",
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
    barcode: "8992761111119",
    expiredDate: "2027-01-30",
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
    barcode: "8992761111120",
    expiredDate: "2025-12-31",
  },
];

const productCategories = [
  { id: "all", name: "Semua Produk", count: supermarketProducts.length },
  {
    id: "Makanan Pokok",
    name: "Makanan Pokok",
    count: supermarketProducts.filter((p) => p.category === "Makanan Pokok")
      .length,
  },
  {
    id: "Minuman",
    name: "Minuman",
    count: supermarketProducts.filter((p) => p.category === "Minuman").length,
  },
  {
    id: "Protein",
    name: "Protein",
    count: supermarketProducts.filter((p) => p.category === "Protein").length,
  },
  {
    id: "Roti & Kue",
    name: "Roti & Kue",
    count: supermarketProducts.filter((p) => p.category === "Roti & Kue")
      .length,
  },
  {
    id: "Perawatan Tubuh",
    name: "Perawatan Tubuh",
    count: supermarketProducts.filter((p) => p.category === "Perawatan Tubuh")
      .length,
  },
  {
    id: "Rumah Tangga",
    name: "Rumah Tangga",
    count: supermarketProducts.filter((p) => p.category === "Rumah Tangga")
      .length,
  },
];

const sortOptions = [
  { id: "name", name: "Nama A-Z" },
  { id: "price-low", name: "Harga Terendah" },
  { id: "price-high", name: "Harga Tertinggi" },
  { id: "rating", name: "Rating Tertinggi" },
  { id: "stock", name: "Stok Terbanyak" },
];

const priceRanges = [
  { id: "all", name: "Semua Harga", min: 0, max: Infinity },
  { id: "under-10k", name: "Di bawah Rp 10.000", min: 0, max: 10000 },
  { id: "10k-25k", name: "Rp 10.000 - Rp 25.000", min: 10000, max: 25000 },
  { id: "25k-50k", name: "Rp 25.000 - Rp 50.000", min: 25000, max: 50000 },
  { id: "above-50k", name: "Di atas Rp 50.000", min: 50000, max: Infinity },
];

export default function SupermarketProductsPage() {
  const [products, setProducts] = useState(supermarketProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("name");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
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
    if (diffDays === 0) return "Kadaluarsa hari ini";
    if (diffDays === 1) return "Kadaluarsa besok";
    if (diffDays <= 7) return `${diffDays} hari lagi`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} minggu lagi`;
    return `${Math.ceil(diffDays / 30)} bulan lagi`;
  };

  // Filter dan Sort Products
  useEffect(() => {
    let filtered = supermarketProducts;

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

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
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
        case "stock":
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

    setProducts(filtered);
  }, [searchQuery, selectedCategory, selectedSort, selectedPriceRange]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (sortId) => {
    setSelectedSort(sortId);
  };

  const handlePriceRangeChange = (priceRangeId) => {
    setSelectedPriceRange(priceRangeId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🏪</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Produk Supermarket
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari produk, merek, atau toko..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>

          {/* Filter and Sort */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Kategori Produk
              </h3>
              <div className="space-y-2">
                {productCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {category.name} ({category.count})
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
                    onClick={() => handlePriceRangeChange(range.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedPriceRange === range.id
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
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
                    onClick={() => handleSortChange(option.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSort === option.id
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
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
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
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
                href={`/products/supermarket/${product.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gray-200 relative">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Package size={24} className="text-blue-500" />
                  </div>
                  {/* Stock Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 20
                          ? "bg-green-100 text-green-700"
                          : product.stock > 10
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
                    {product.brand} • {product.category}
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
                    <span className="text-xs text-gray-500">
                      {product.weight}g
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-blue-600 text-sm">
                      {formatPrice(product.price)}
                    </p>
                    <span className="text-xs text-gray-500">
                      /{product.unit}
                    </span>
                  </div>

                  {/* Expiry Date */}
                  <div className="flex items-center space-x-1">
                    <Clock size={10} className="text-gray-400" />
                    <span
                      className={`text-xs ${
                        formatExpiredDate(product.expiredDate).includes(
                          "hari"
                        ) ||
                        formatExpiredDate(product.expiredDate).includes(
                          "Kadaluarsa"
                        )
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {formatExpiredDate(product.expiredDate)}
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
