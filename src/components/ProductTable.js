// src/components/ProductTable.js
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  formatCurrency,
  getProductTypeColor,
  getStockStatusColor,
} from "@/lib/utils";

export default function ProductTable({ products }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    setDeletingId(product.id);

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh halaman untuk update data
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {product.name}
                  </div>
                  {product.description && (
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {product.description}
                    </div>
                  )}
                  {product.brand && (
                    <div className="text-sm text-gray-500">
                      Brand: {product.brand}
                    </div>
                  )}
                  {product.preparationTime && (
                    <div className="text-sm text-gray-500">
                      Prep: {product.preparationTime} min
                    </div>
                  )}
                  {product.isPrescriptionRequired && (
                    <div className="text-sm text-red-600">
                      Prescription Required
                    </div>
                  )}
                  {product.unit && (
                    <div className="text-sm text-gray-500">
                      Unit: {product.unit}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProductTypeColor(
                    product.productType
                  )}`}
                >
                  {product.productType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatCurrency(product.price)}
                </div>
                {product.purchasePrice && (
                  <div className="text-xs text-gray-500">
                    Cost: {formatCurrency(product.purchasePrice)}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusColor(
                    product.stock
                  )}`}
                >
                  {product.stock}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product)}
                    disabled={deletingId === product.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
                  >
                    {deletingId === product.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
