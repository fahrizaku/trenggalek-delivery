"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ShoppingCart,
  Star,
  MapPin,
  Clock,
  Flame,
  Leaf,
  Award,
  ChefHat,
} from "lucide-react";

// Mock data untuk produk makanan/minuman
const foodProducts = [
  {
    id: 1,
    name: "Nasi Gudeg Komplit",
    price: 18000,
    store: "Warung Bu Sari",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.9,
    stock: 10,
    preparationTime: 15,
    calories: 450,
    ingredients: "Nasi, gudeg, ayam, telur, krecek, sambal",
    allergens: "Telur",
    isSpicy: false,
    spicyLevel: 0,
    isVegetarian: false,
    isHalal: true,
    portion: "Porsi besar",
    category: "Makanan Utama",
    cuisine: "Jawa",
    tags: ["Tradisional", "Lengkap", "Enak"],
  },
  {
    id: 2,
    name: "Ayam Bakar Madu",
    price: 25000,
    store: "Ayam Bakar Pak Budi",
    storeId: 2,
    image: "/api/placeholder/150/150",
    rating: 4.8,
    stock: 8,
    preparationTime: 20,
    calories: 380,
    ingredients: "Ayam, madu, bumbu bakar, nasi",
    allergens: "Tidak ada",
    isSpicy: true,
    spicyLevel: 2,
    isVegetarian: false,
    isHalal: true,
    portion: "Porsi sedang",
    category: "Makanan Utama",
    cuisine: "Indonesia",
    tags: ["Bakar", "Madu", "Protein"],
  },
  {
    id: 3,
    name: "Es Teh Manis",
    price: 5000,
    store: "Warung Bu Sari",
    storeId: 1,
    image: "/api/placeholder/150/150",
    rating: 4.5,
    stock: 20,
    preparationTime: 5,
    calories: 120,
    ingredients: "Teh, gula, es batu",
    allergens: "Tidak ada",
    isSpicy: false,
    spicyLevel: 0,
    isVegetarian: true,
    isHalal: true,
    portion: "Gelas besar",
    category: "Minuman",
    cuisine: "Indonesia",
    tags: ["Segar", "Manis", "Dingin"],
  },
  {
    id: 4,
    name: "Gado-Gado Jakarta",
    price: 15000,
    store: "Gado-Gado Ibu Eni",
    storeId: 3,
    image: "/api/placeholder/150/150",
    rating: 4.7,
    stock: 12,
    preparationTime: 10,
    calories: 280,
    ingredients: "Sayuran, tahu, tempe, telur, bumbu kacang",
    allergens: "Kacang, telur",
    isSpicy: true,
    spicyLevel: 1,
    isVegetarian: true,
    isHalal: true,
    portion: "Porsi sedang",
    category: "Makanan Sehat",
    cuisine: "Betawi",
    tags: ["Sehat", "Sayuran", "Kacang"],
  },
  {
    id: 5,
    name: "Mie Ayam Bakso",
    price: 12000,
    store: "Mie Ayam Mas Agus",
    storeId: 4,
    image: "/api/placeholder/150/150",
    rating: 4.6,
    stock: 15,
    preparationTime: 12,
    calories: 420,
    ingredients: "Mie, ayam, bakso, sayuran, kaldu",
    allergens: "Gluten",
    isSpicy: false,
    spicyLevel: 0,
    isVegetarian: false,
    isHalal: true,
    portion: "Mangkuk besar",
    category: "Mie & Pasta",
    cuisine: "Tionghoa",
    tags: ["Berkuah", "Hangat", "Kenyang"],
  },
  {
    id: 6,
    name: "Jus Alpukat",
    price: 8000,
    store: "Jus Buah Segar",
    storeId: 5,
    image: "/api/placeholder/150/150",
    rating: 4.4,
    stock: 18,
    preparationTime: 8,
    calories: 200,
    ingredients: "Alpukat, susu, gula, es",
    allergens: "Susu",
    isSpicy: false,
    spicyLevel: 0,
    isVegetarian: true,
    isHalal: true,
    portion: "Gelas besar",
    category: "Minuman",
    cuisine: "Modern",
    tags: ["Sehat", "Creamy", "Vitamin"],
  },
  {
    id: 7,
    name: "Sate Ayam 10 Tusuk",
    price: 20000,
    store: "Sate Pak Yanto",
    storeId: 6,
    image: "/api/placeholder/150/150",
    rating: 4.8,
    stock: 6,
    preparationTime: 18,
    calories: 350,
    ingredients: "Ayam, bumbu sate, kecap, bawang",
    allergens: "Kacang",
    isSpicy: true,
    spicyLevel: 3,
    isVegetarian: false,
    isHalal: true,
    portion: "10 tusuk",
    category: "Makanan Utama",
    cuisine: "Jawa",
    tags: ["Bakar", "Pedas", "Protein"],
  },
  {
    id: 8,
    name: "Pisang Goreng Crispy",
    price: 7000,
    store: "Gorengan Bu Tini",
    storeId: 7,
    image: "/api/placeholder/150/150",
    rating: 4.3,
    stock: 25,
    preparationTime: 6,
    calories: 180,
    ingredients: "Pisang, tepung, minyak goreng",
    allergens: "Gluten",
    isSpicy: false,
    spicyLevel: 0,
    isVegetarian: true,
    isHalal: true,
    portion: "5 potong",
    category: "Snack",
    cuisine: "Indonesia",
    tags: ["Crispy", "Manis", "Hangat"],
  },
  {
    id: 9,
    name: "Es Campur Spesial",
    price: 10000,
    store: "Es Campur Pak Dhe",
    storeId: 8,
    image: "/api/placeholder/150/150",
    rating: 4.5,
    stock: 14,
    preparationTime: 7,
    calories: 250,
    ingredients: "Es serut, alpukat, kelapa, cincau, susu",
    allergens: "Susu",
    isSpicy: false,
    spicyLevel: 0,
    isVegetarian: true,
    isHalal: true,
    portion: "Mangkuk besar",
    category: "Dessert",
    cuisine: "Indonesia",
    tags: ["Segar", "Manis", "Dingin"],
  },
];

const foodCategories = [
  { id: "all", name: "Semua Menu", count: foodProducts.length },
  {
    id: "Makanan Utama",
    name: "Makanan Utama",
    count: foodProducts.filter((p) => p.category === "Makanan Utama").length,
  },
  {
    id: "Minuman",
    name: "Minuman",
    count: foodProducts.filter((p) => p.category === "Minuman").length,
  },
  {
    id: "Snack",
    name: "Snack",
    count: foodProducts.filter((p) => p.category === "Snack").length,
  },
  {
    id: "Makanan Sehat",
    name: "Makanan Sehat",
    count: foodProducts.filter((p) => p.category === "Makanan Sehat").length,
  },
  {
    id: "Mie & Pasta",
    name: "Mie & Pasta",
    count: foodProducts.filter((p) => p.category === "Mie & Pasta").length,
  },
  {
    id: "Dessert",
    name: "Dessert",
    count: foodProducts.filter((p) => p.category === "Dessert").length,
  },
];

const sortOptions = [
  { id: "name", name: "Nama A-Z" },
  { id: "price-low", name: "Harga Terendah" },
  { id: "price-high", name: "Harga Tertinggi" },
  { id: "rating", name: "Rating Tertinggi" },
  { id: "prep-time", name: "Tercepat Siap" },
  { id: "calories", name: "Kalori Terendah" },
];

const priceRanges = [
  { id: "all", name: "Semua Harga", min: 0, max: Infinity },
  { id: "under-10k", name: "Di bawah Rp 10.000", min: 0, max: 10000 },
  { id: "10k-20k", name: "Rp 10.000 - Rp 20.000", min: 10000, max: 20000 },
  { id: "above-20k", name: "Di atas Rp 20.000", min: 20000, max: Infinity },
];

const spicyLevels = [
  { id: "all", name: "Semua Level", level: null },
  { id: "not-spicy", name: "Tidak Pedas", level: 0 },
  { id: "mild", name: "Pedas Ringan", level: 1 },
  { id: "medium", name: "Pedas Sedang", level: 2 },
  { id: "hot", name: "Pedas", level: 3 },
];

export default function FoodProductsPage() {
  const [products, setProducts] = useState(foodProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("name");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedSpicyLevel, setSelectedSpicyLevel] = useState("all");
  const [showVegetarianOnly, setShowVegetarianOnly] = useState(false);
  const [showHalalOnly, setShowHalalOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getSpicyIndicator = (level) => {
    if (level === 0) return "";
    return "🌶️".repeat(level);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Makanan Utama":
        return "🍛";
      case "Minuman":
        return "🥤";
      case "Snack":
        return "🍿";
      case "Makanan Sehat":
        return "🥗";
      case "Mie & Pasta":
        return "🍜";
      case "Dessert":
        return "🍨";
      default:
        return "🍽️";
    }
  };

  // Filter dan Sort Products
  useEffect(() => {
    let filtered = foodProducts;

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

    // Filter by spicy level
    if (selectedSpicyLevel !== "all") {
      const spicyFilter = spicyLevels.find((s) => s.id === selectedSpicyLevel);
      if (spicyFilter.level !== null) {
        filtered = filtered.filter(
          (product) => product.spicyLevel === spicyFilter.level
        );
      }
    }

    // Filter by dietary preferences
    if (showVegetarianOnly) {
      filtered = filtered.filter((product) => product.isVegetarian);
    }

    if (showHalalOnly) {
      filtered = filtered.filter((product) => product.isHalal);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.ingredients
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          product.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
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
        case "prep-time":
          return a.preparationTime - b.preparationTime;
        case "calories":
          return a.calories - b.calories;
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
    selectedSpicyLevel,
    showVegetarianOnly,
    showHalalOnly,
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🍔</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Makanan & Minuman
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
              placeholder="Cari makanan, minuman, atau warung..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50"
            />
          </div>

          {/* Filter and Sort */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Filter size={16} />
              <span className="text-sm font-medium">Filter</span>
            </button>

            <div className="text-sm text-gray-600">
              {products.length} menu ditemukan
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border-t border-gray-200 px-4 py-4 max-h-96 overflow-y-auto">
            {/* Dietary Preferences */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Preferensi Diet
              </h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={showVegetarianOnly}
                    onChange={(e) => setShowVegetarianOnly(e.target.checked)}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Leaf size={16} className="text-green-500" />
                    <span className="text-sm text-gray-700">Vegetarian</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={showHalalOnly}
                    onChange={(e) => setShowHalalOnly(e.target.checked)}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Award size={16} className="text-green-500" />
                    <span className="text-sm text-gray-700">Halal</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Kategori Menu</h3>
              <div className="space-y-2">
                {foodCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? "bg-orange-50 text-orange-600 border border-orange-200"
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

            {/* Spicy Level Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Level Pedas</h3>
              <div className="space-y-2">
                {spicyLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedSpicyLevel(level.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${
                      selectedSpicyLevel === level.id
                        ? "bg-orange-50 text-orange-600 border border-orange-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>
                      {level.level !== null
                        ? getSpicyIndicator(level.level) || "😌"
                        : "🌶️"}
                    </span>
                    <span>{level.name}</span>
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
                        ? "bg-orange-50 text-orange-600 border border-orange-200"
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
                        ? "bg-orange-50 text-orange-600 border border-orange-200"
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
              className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <ChefHat size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Menu tidak ditemukan
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
                href={`/products/food/${product.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gray-200 relative">
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <ChefHat size={24} className="text-orange-500" />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.isVegetarian && (
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Leaf size={10} />
                        <span>Vege</span>
                      </div>
                    )}
                    {product.isHalal && (
                      <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Award size={10} />
                        <span>Halal</span>
                      </div>
                    )}
                  </div>

                  {/* Stock & Prep Time */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 15
                          ? "bg-green-100 text-green-700"
                          : product.stock > 5
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock} porsi
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="text-xs text-gray-500 mb-2">
                    {product.cuisine} • {product.portion}
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
                      <Clock size={10} className="text-orange-500" />
                      <span className="text-xs text-orange-600">
                        {product.preparationTime} min
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-orange-600 text-sm">
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex items-center space-x-1">
                      <Flame size={10} className="text-red-500" />
                      <span className="text-xs text-gray-500">
                        {product.calories} kal
                      </span>
                    </div>
                  </div>

                  {/* Spicy Level & Category */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {getCategoryIcon(product.category)} {product.category}
                    </span>
                    {product.isSpicy && (
                      <span className="text-red-500">
                        {getSpicyIndicator(product.spicyLevel)}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
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
