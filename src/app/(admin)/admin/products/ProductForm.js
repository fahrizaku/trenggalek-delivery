"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({ productId = null }) {
  const router = useRouter();
  const isEdit = !!productId;

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    storeId: "",
    productType: "SUPERMARKET",
    name: "",
    description: "",
    price: "",
    purchasePrice: "",
    image: "",
    category: "",
    stock: "50",
    weight: "",
    unit: "",
    isActive: true,
    // Type-specific fields
    brand: "", // For SUPERMARKET
    isPrescriptionRequired: false, // For PHARMACY
    preparationTime: "", // For FOOD
  });

  // Fetch stores
  const fetchStores = async () => {
    try {
      const response = await fetch("/api/stores");
      const data = await response.json();
      if (data.success) {
        setStores(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch stores:", err);
    }
  };

  // Fetch product data for edit
  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();

      if (data.success) {
        const product = data.data;
        setFormData({
          storeId: product.storeId,
          productType: product.productType,
          name: product.name,
          description: product.description || "",
          price: product.price.toString(),
          purchasePrice: product.purchasePrice
            ? product.purchasePrice.toString()
            : "",
          image: product.image || "",
          category: product.category,
          stock: product.stock.toString(),
          weight: product.weight.toString(),
          unit: product.unit || "",
          isActive: product.isActive,
          // Type-specific fields
          brand: product.brand || "",
          isPrescriptionRequired: product.isPrescriptionRequired || false,
          preparationTime: product.preparationTime
            ? product.preparationTime.toString()
            : "",
        });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch product data");
    }
  };

  useEffect(() => {
    fetchStores();
    if (isEdit) {
      fetchProduct();
    }
  }, [productId]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validation
      if (
        !formData.storeId ||
        !formData.name ||
        !formData.price ||
        !formData.category ||
        !formData.weight
      ) {
        setError("Harap lengkapi semua field yang wajib diisi");
        setLoading(false);
        return;
      }

      const url = isEdit ? `/api/products/${productId}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => {
          router.push("/products");
        }, 1500);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan produk");
    } finally {
      setLoading(false);
    }
  };

  // Get categories based on product type
  const getCategories = () => {
    switch (formData.productType) {
      case "SUPERMARKET":
        return [
          "Makanan & Minuman",
          "Perawatan Tubuh",
          "Rumah Tangga",
          "Elektronik",
          "Pakaian",
          "Lainnya",
        ];
      case "PHARMACY":
        return [
          "Obat Bebas",
          "Obat Keras",
          "Vitamin & Suplemen",
          "Perawatan Kesehatan",
          "Alat Kesehatan",
        ];
      case "FOOD":
        return [
          "Makanan Utama",
          "Minuman",
          "Snack",
          "Dessert",
          "Makanan Pembuka",
        ];
      default:
        return [];
    }
  };

  // Get units based on product type
  const getUnits = () => {
    switch (formData.productType) {
      case "SUPERMARKET":
        return ["pcs", "kg", "liter", "pack", "botol", "kaleng"];
      case "PHARMACY":
        return ["strip", "botol", "tube", "sachet", "kapsul", "tablet"];
      case "FOOD":
        return ["porsi", "pcs", "gelas", "mangkok", "piring"];
      default:
        return ["pcs"];
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 text-gray-600 hover:text-gray-800"
          >
            ← Kembali
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
          </h1>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6"
        >
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Informasi Dasar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Store Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Toko <span className="text-red-500">*</span>
                </label>
                <select
                  name="storeId"
                  value={formData.storeId}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Toko</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name} ({store.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Produk <span className="text-red-500">*</span>
                </label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  required
                  disabled={isEdit}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="SUPERMARKET">Supermarket</option>
                  <option value="PHARMACY">Apotek</option>
                  <option value="FOOD">Makanan</option>
                </select>
              </div>

              {/* Product Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Produk <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Kategori</option>
                  {getCategories().map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Harga & Stok
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Jual <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Purchase Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Beli
                </label>
                <input
                  type="number"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stok
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Berat (gram) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Satuan
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Satuan</option>
                  {getUnits().map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Produk Aktif
                </label>
              </div>
            </div>
          </div>

          {/* Type-specific Fields */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Informasi Khusus (
              {formData.productType === "SUPERMARKET"
                ? "Supermarket"
                : formData.productType === "PHARMACY"
                ? "Apotek"
                : "Makanan"}
              )
            </h2>

            {formData.productType === "SUPERMARKET" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Merek
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {formData.productType === "PHARMACY" && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPrescriptionRequired"
                  checked={formData.isPrescriptionRequired}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Memerlukan Resep Dokter
                </label>
              </div>
            )}

            {formData.productType === "FOOD" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waktu Persiapan (menit)
                </label>
                <input
                  type="number"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleChange}
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Menyimpan..."
                : isEdit
                ? "Update Produk"
                : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
