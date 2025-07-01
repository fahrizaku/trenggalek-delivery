// src/components/ProductFilters.js
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    productType: searchParams.get("productType") || "",
    category: searchParams.get("category") || "",
    search: searchParams.get("search") || "",
  });

  // Update URL saat filter berubah
  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    // Reset ke page 1 saat filter berubah
    if (params.toString()) {
      params.set("page", "1");
    }

    const queryString = params.toString();
    router.push(`/admin/products${queryString ? `?${queryString}` : ""}`);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { productType: "", category: "", search: "" };
    setFilters(clearedFilters);
    updateFilters(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Product Type Filter */}
        <div className="min-w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Type
          </label>
          <select
            value={filters.productType}
            onChange={(e) => handleFilterChange("productType", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="SUPERMARKET">Supermarket</option>
            <option value="PHARMACY">Pharmacy</option>
            <option value="FOOD">Food</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            placeholder="Filter by category..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Filter */}
        <div className="flex-1 min-w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.productType && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Type: {filters.productType}
              <button
                onClick={() => handleFilterChange("productType", "")}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Category: {filters.category}
              <button
                onClick={() => handleFilterChange("category", "")}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Search: "{filters.search}"
              <button
                onClick={() => handleFilterChange("search", "")}
                className="ml-1 text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
