// file: src/app/(customer)/products/supermarket/[id]/page.jsx
"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Package, ShoppingCart } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

// Mock data untuk produk supermarket (sama seperti di halaman list)
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
    description:
      "Beras premium berkualitas tinggi dengan butiran yang pulen dan wangi. Dipilih dari varietas terbaik dan diproses dengan teknologi modern untuk menjaga kualitas dan kebersihan. Cocok untuk konsumsi sehari-hari keluarga.",
    origin: "Jawa Tengah",
    storageMethod:
      "Simpan di tempat kering dan sejuk, hindari paparan sinar matahari langsung",
    nutritionPer100g: {
      calories: "130 kcal",
      carbs: "28g",
      protein: "2.7g",
      fat: "0.3g",
    },
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
    description:
      "Minyak goreng berkualitas tinggi yang dibuat dari kelapa sawit pilihan. Jernih, tidak berbau, dan tahan panas tinggi. Cocok untuk menggoreng, menumis, dan memasak berbagai hidangan.",
    origin: "Indonesia",
    storageMethod:
      "Simpan di tempat sejuk dan kering, tutup rapat setelah digunakan",
    nutritionPer100g: {
      calories: "884 kcal",
      carbs: "0g",
      protein: "0g",
      fat: "100g",
    },
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
    description:
      "Gula pasir murni berkualitas premium dengan kristal yang halus dan putih bersih. Diproduksi dari tebu pilihan dengan proses yang higienis. Cocok untuk memasak, membuat kue, dan minuman.",
    origin: "Jawa Timur",
    storageMethod: "Simpan dalam wadah tertutup rapat, hindari tempat lembab",
    nutritionPer100g: {
      calories: "387 kcal",
      carbs: "100g",
      protein: "0g",
      fat: "0g",
    },
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
    description:
      "Susu segar UHT (Ultra High Temperature) yang kaya nutrisi dan vitamin. Diolah dengan teknologi modern untuk menjaga kualitas dan kesegaran. Cocok diminum langsung atau sebagai bahan masakan.",
    origin: "Indonesia",
    storageMethod:
      "Simpan di tempat sejuk, setelah dibuka simpan di kulkas dan habiskan dalam 3 hari",
    nutritionPer100g: {
      calories: "42 kcal",
      carbs: "4.8g",
      protein: "3.4g",
      fat: "1g",
    },
  },
  // Tambahkan produk lainnya sesuai kebutuhan...
];

export default function SupermarketProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const productId = parseInt(params.id);
    const foundProduct = supermarketProducts.find((p) => p.id === productId);
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

  const handleAddToCart = () => {
    // Implementasi add to cart
    alert(`${product.name} berhasil ditambahkan ke keranjang`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
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
        <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
          <Package size={64} className="text-blue-500" />
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{product.name}</h2>

        <div className="text-2xl font-bold text-blue-600">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Bottom Action - Fixed floating button */}
      <div className="fixed bottom-20 left-4 right-4 z-30">
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg"
        >
          <ShoppingCart size={20} />
          <span>Tambah ke Keranjang - {formatPrice(product.price)}</span>
        </button>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-32"></div>
    </div>
  );
}
