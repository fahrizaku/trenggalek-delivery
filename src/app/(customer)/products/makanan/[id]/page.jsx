// file: src/app/(customer)/products/food/[id]/page.jsx
"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, ChefHat, ShoppingCart } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

// Mock data untuk produk makanan/minuman (sama seperti di halaman list)
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
    description:
      "Nasi gudeg khas Yogyakarta dengan lauk lengkap. Terdiri dari gudeg manis, ayam goreng atau bakar, telur pindang, krecek, dan sambal krecek. Sajian tradisional yang mengenyangkan dan autentik.",
    nutritionInfo: {
      protein: "25g",
      carbs: "58g",
      fat: "12g",
      fiber: "8g",
    },
    cookingMethod:
      "Gudeg dimasak dengan santan dan gula jawa selama berjam-jam hingga empuk. Ayam digoreng atau dibakar dengan bumbu tradisional.",
    servingSuggestion:
      "Disajikan hangat dengan sambal terpisah. Cocok untuk makan siang atau malam.",
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
    description:
      "Ayam bakar dengan olesan madu yang memberikan rasa manis gurih. Dibakar dengan arang hingga matang sempurna dan bumbu meresap. Disajikan dengan nasi putih hangat.",
    nutritionInfo: {
      protein: "32g",
      carbs: "45g",
      fat: "8g",
      fiber: "2g",
    },
    cookingMethod:
      "Ayam dimarinasi dengan bumbu rempah, kemudian dibakar dengan arang sambil diolesi madu berkali-kali.",
    servingSuggestion:
      "Disajikan hangat dengan nasi putih, lalapan, dan sambal. Cocok untuk makan siang atau malam.",
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
    description:
      "Minuman teh manis dingin yang menyegarkan. Dibuat dari teh hitam berkualitas dengan takaran gula yang pas. Disajikan dengan es batu untuk kesegaran maksimal.",
    nutritionInfo: {
      protein: "0g",
      carbs: "30g",
      fat: "0g",
      fiber: "0g",
    },
    cookingMethod:
      "Teh diseduh dengan air panas, ditambah gula sesuai takaran, kemudian didinginkan dengan es batu.",
    servingSuggestion:
      "Disajikan dingin. Cocok sebagai teman makan atau untuk menghilangkan dahaga.",
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
    description:
      "Salad Indonesia dengan sayuran segar, tahu, tempe, dan telur rebus. Disajikan dengan bumbu kacang khas Jakarta yang kaya rempah. Menu sehat dan bergizi.",
    nutritionInfo: {
      protein: "18g",
      carbs: "25g",
      fat: "15g",
      fiber: "12g",
    },
    cookingMethod:
      "Sayuran direbus sebentar, tahu dan tempe digoreng. Bumbu kacang dibuat dari kacang tanah, cabai, dan rempah-rempah.",
    servingSuggestion:
      "Disajikan dalam porsi segar dengan bumbu kacang terpisah. Cocok untuk diet sehat.",
  },
  // Tambahkan produk lainnya sesuai kebutuhan...
];

export default function FoodProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const productId = parseInt(params.id);
    const foundProduct = foodProducts.find((p) => p.id === productId);
    setProduct(foundProduct);
  }, [params.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getSpicyLevelText = (level) => {
    // Function removed as spicy level display is removed
    const levels = ["Tidak Pedas", "Sedikit Pedas", "Pedas", "Sangat Pedas"];
    return levels[level] || "Tidak Pedas";
  };

  const getSpicyLevelColor = (level) => {
    // Function removed as spicy level display is removed
    const colors = [
      "text-green-500",
      "text-yellow-500",
      "text-orange-500",
      "text-red-500",
    ];
    return colors[level] || "text-green-500";
  };

  const handleAddToCart = () => {
    // Implementasi add to cart
    alert(`${product.name} berhasil ditambahkan ke keranjang`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat size={48} className="mx-auto text-gray-400 mb-4" />
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
        <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
          <ChefHat size={64} className="text-orange-500" />
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{product.name}</h2>

        <div className="text-2xl font-bold text-orange-600">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Bottom Action - Fixed floating button */}
      <div className="fixed bottom-20 left-4 right-4 z-30">
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg"
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
