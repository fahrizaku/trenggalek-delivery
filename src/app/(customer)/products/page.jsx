"use client";
import { useState, useEffect } from "react";
import { Search, Filter, ShoppingCart, Star, MapPin, X } from "lucide-react";

// Mock data - nanti diganti dengan API call
const allProducts = [
  // Supermarket Products
  {
    id: 1,
    name: "Beras Premium 5kg",
    price: 65000,
    store: "Supermarket Segar",
    storeId: 1,
    category: "supermarket",
    categoryName: "Supermarket",
    image: "/api/placeholder/150/150",
    rating: 4.8,
    stock: 25,
    unit: "kg",
    brand: "Rose Brand",
  },
  {
    id: 2,
    name: "Minyak Goreng 2L",
    price: 28000,
    store: "Toko Sembako Jaya",
    storeId: 2,
    category: "supermarket",
    categoryName: "Supermarket",
    image: "/api/placeholder/150/150",
    rating: 4.6,
    stock: 15,
    unit: "liter",
    brand: "Tropical",
  },
  {
    id: 3,
    name: "Gula Pasir 1kg",
    price: 14000,
    store: "Supermarket Segar",
    storeId: 1,
    category: "supermarket",
    categoryName: "Supermarket",
    image: "/api/placeholder/150/150",
    rating: 4.7,
    stock: 30,
    unit: "kg",
    brand: "Gulaku",
  },
  // Pharmacy Products
  {
    id: 4,
    name: "Paracetamol 500mg",
    price: 8000,
    store: "Apotek Sehat",
    storeId: 3,
    category: "pharmacy",
    categoryName: "Apotek",
    image: "/api/placeholder/150/150",
    rating: 4.9,
    stock: 50,
    unit: "strip",
    manufacturer: "Kimia Farma",
  },
  {
    id: 5,
    name: "Vitamin C 500mg",
    price: 15000,
    store: "Apotek Sehat",
    storeId: 3,
    category: "pharmacy",
    categoryName: "Apotek",
    image: "/api/placeholder/150/150",
    rating: 4.8,
    stock: 20,
    unit: "botol",
    manufacturer: "Sido Muncul",
  },
  {
    id: 6,
    name: "Betadine 15ml",
    price: 12000,
    store: "Apotek Kimia Farma",
    storeId: 4,
    category: "pharmacy",
    categoryName: "Apotek",
    image: "/api/placeholder/150/150",
    rating: 4.7,
    stock: 35,
    unit: "botol",
    manufacturer: "Mundipharma",
  },
  // Food Products
  {
    id: 7,
    name: "Nasi Gudeg Komplit",
    price: 18000,
    store: "Warung Bu Sari",
    storeId: 5,
    category: "food",
    categoryName: "Makanan",
    image: "/api/placeholder/150/150",
    rating: 4.9,
    stock: 10,
    preparationTime: 15,
    isSpicy: false,
  },
  {
    id: 8,
    name: "Ayam Bakar Madu",
    price: 25000,
    store: "Ayam Bakar Pak Budi",
    storeId: 6,
    category: "food",
    categoryName: "Makanan",
    image: "/api/placeholder/150/150",
    rating: 4.8,
    stock: 8,
    preparationTime: 20,
    isSpicy: true,
  },
  {
    id: 9,
    name: "Es Teh Manis",
    price: 5000,
    store: "Warung Bu Sari",
    storeId: 5,
    category: "food",
    categoryName: "Makanan",
    image: "/api/placeholder/150/150",
    rating: 4.5,
    stock: 20,
    preparationTime: 5,
    isSpicy: false,
  },
];

const categories = [
  { id: "all", name: "Semua", count: allProducts.length },
  {
    id: "supermarket",
    name: "Supermarket",
    count: allProducts.filter((p) => p.category === "supermarket").length,
  },
  {
    id: "pharmacy",
    name: "Apotek",
    count: allProducts.filter((p) => p.category === "pharmacy").length,
  },
  {
    id: "food",
    name: "Makanan",
    count: allProducts.filter((p) => p.category === "food").length,
  },
];

const sortOptions = [
  { id: "name", name: "Nama A-Z" },
  { id: "price-low", name: "Harga Terendah" },
  { id: "price-high", name: "Harga Tertinggi" },
  { id: "rating", name: "Rating Tertinggi" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(allProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Filter dan Sort Products
  useEffect(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
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
        default:
          return 0;
      }
    });

    setProducts(filtered);
  }, [searchQuery, selectedCategory, selectedSort]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowFilters(false);
  };

  const handleSortChange = (sortId) => {
    setSelectedSort(sortId);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Semua Produk</h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari produk atau toko..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>

          {/* Filter and Sort */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter size={16} />
              <span className="text-sm font-medium">Filter & Urutkan</span>
            </button>

            <div className="text-sm text-gray-600">
              {products.length} produk ditemukan
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border-t border-gray-200 px-4 py-4">
            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Kategori</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Urutkan</h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSortChange(option.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSort === option.id
                        ? "bg-blue-50 text-blue-600"
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
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
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
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
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
                href={`/products/${product.category}/${product.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gray-200 relative">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <ShoppingCart size={24} className="text-gray-500" />
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.category === "supermarket"
                          ? "bg-blue-100 text-blue-700"
                          : product.category === "pharmacy"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {product.categoryName}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                    {product.name}
                  </h3>

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
                      Stok: {product.stock}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-bold text-blue-600 text-sm">
                      {formatPrice(product.price)}
                    </p>
                    {product.unit && (
                      <span className="text-xs text-gray-500">
                        /{product.unit}
                      </span>
                    )}
                  </div>

                  {/* Additional Info */}
                  {product.preparationTime && (
                    <div className="mt-2 text-xs text-gray-500">
                      Siap dalam {product.preparationTime} menit
                    </div>
                  )}
                  {product.brand && (
                    <div className="mt-1 text-xs text-gray-500">
                      {product.brand}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
