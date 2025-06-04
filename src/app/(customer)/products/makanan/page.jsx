"use client";
import { useState, useEffect } from "react";
import { Search, ChefHat } from "lucide-react";

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

export default function FoodProductsPage() {
  const [products, setProducts] = useState(foodProducts);
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
    let filtered = foodProducts;

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

    setProducts(filtered);
  }, [searchQuery]);

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
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 py-4">
        {products.length === 0 ? (
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
                <div className="aspect-square bg-gray-200">
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <ChefHat size={24} className="text-orange-500" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="font-bold text-orange-600 text-sm">
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
