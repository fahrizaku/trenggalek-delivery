import { ShoppingCart, ChevronRight, Search } from "lucide-react";

// Mock data - nanti diganti dengan API call
const categories = [
  { id: 1, name: "Supermarket", icon: "🏪", color: "bg-blue-500" },
  { id: 2, name: "Apotek", icon: "💊", color: "bg-green-500" },
  { id: 3, name: "Makanan", icon: "🍔", color: "bg-orange-500" },
];

const popularProducts = [
  {
    id: 1,
    name: "Beras Premium 5kg",
    price: 65000,
    store: "Supermarket Segar",
    image: "/api/placeholder/150/150",
    category: "Supermarket",
  },
  {
    id: 2,
    name: "Paracetamol 500mg",
    price: 8000,
    store: "Apotek Sehat",
    image: "/api/placeholder/150/150",
    category: "Apotek",
  },
  {
    id: 3,
    name: "Nasi Gudeg Bu Sari",
    price: 15000,
    store: "Warung Bu Sari",
    image: "/api/placeholder/150/150",
    category: "Makanan",
  },
];

export default function CustomerHomepage() {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Search Bar */}
      <div className="px-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari toko atau produk..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Kategori</h2>
          <a
            href="/stores"
            className="text-blue-600 text-sm font-medium flex items-center"
          >
            Lihat semua
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/stores/${category.name.toLowerCase()}`}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}
              >
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-center text-sm">
                {category.name}
              </h3>
            </a>
          ))}
        </div>
      </div>

      {/* Popular Products */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Produk Populer</h2>
          <a
            href="/products"
            className="text-blue-600 text-sm font-medium flex items-center"
          >
            Lihat semua
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {popularProducts.map((product) => (
            <a
              key={product.id}
              href={`/products/${product.category.toLowerCase()}/${product.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gray-200">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <ShoppingCart size={32} className="text-gray-500" />
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{product.store}</p>
                <p className="font-bold text-blue-600">
                  {formatPrice(product.price)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
