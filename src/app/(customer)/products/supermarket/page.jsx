//file: src/app/(customer)/products/supermarket/page.jsx
"use client";
import { useState, useEffect } from "react";
import { Search, Package } from "lucide-react";

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

export default function SupermarketProductsPage() {
  const [products, setProducts] = useState(supermarketProducts);
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
    let filtered = supermarketProducts;

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

    setProducts(filtered);
  }, [searchQuery]);

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
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 py-4">
        {products.length === 0 ? (
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
                <div className="aspect-square bg-gray-200">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Package size={24} className="text-blue-500" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="font-bold text-blue-600 text-sm">
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
