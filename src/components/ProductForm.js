// src/components/ProductForm.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({ product = null }) {
  const router = useRouter();
  const isEdit = !!product;

  const [formData, setFormData] = useState({
    productType: product?.productType || "SUPERMARKET",
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    purchasePrice: product?.purchasePrice || "",
    category: product?.category || "",
    stock: product?.stock || 50,
    weight: product?.weight || "",
    unit: product?.unit || "",
    image: product?.image || "",
    isActive: product?.isActive ?? true,

    // Supermarket specific
    brand: product?.brand || "",

    // Pharmacy specific
    isPrescriptionRequired: product?.isPrescriptionRequired || false,

    // Food specific
    preparationTime: product?.preparationTime || "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean data berdasarkan productType
      const cleanData = { ...formData };

      // Remove fields yang tidak diperlukan berdasarkan productType
      if (cleanData.productType !== "SUPERMARKET") {
        delete cleanData.brand;
      }
      if (cleanData.productType !== "PHARMACY") {
        delete cleanData.isPrescriptionRequired;
      }
      if (cleanData.productType !== "FOOD") {
        delete cleanData.preparationTime;
      }

      // Convert numeric fields
      cleanData.price = Number(cleanData.price);
      cleanData.purchasePrice = cleanData.purchasePrice
        ? Number(cleanData.purchasePrice)
        : null;
      cleanData.stock = Number(cleanData.stock);
      cleanData.weight = Number(cleanData.weight);
      if (cleanData.preparationTime) {
        cleanData.preparationTime = Number(cleanData.preparationTime);
      }

      // Handle empty image string
      if (!cleanData.image.trim()) {
        cleanData.image = null;
      }

      const url = isEdit ? `/api/products/${product.id}` : "/api/products";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanData),
      });

      if (response.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type *
            </label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="SUPERMARKET">Supermarket</option>
              <option value="PHARMACY">Pharmacy</option>
              <option value="FOOD">Food</option>
            </select>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter a valid URL for the product image
            </p>
            {/* Image Preview */}
            {formData.image && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Preview:
                </p>
                <img
                  src={formData.image}
                  alt="Product preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.target.style.display = "block";
                  }}
                />
              </div>
            )}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Price
              </label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (gram) *
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                placeholder="pcs, kg, liter, strip, botol, porsi"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conditional Fields */}
          {formData.productType === "SUPERMARKET" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {formData.productType === "PHARMACY" && (
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPrescriptionRequired"
                  checked={formData.isPrescriptionRequired}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Prescription Required
                </span>
              </label>
            </div>
          )}

          {formData.productType === "FOOD" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          )}

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Active Product</span>
            </label>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Product"
              : "Create Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
