// src/app/admin/page.js
import Link from "next/link";

// Fetch dashboard stats dari API
async function getDashboardStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    const products = data.products || [];

    // Calculate stats
    const totalProducts = products.length;
    const supermarketItems = products.filter(
      (p) => p.productType === "SUPERMARKET"
    ).length;
    const pharmacyItems = products.filter(
      (p) => p.productType === "PHARMACY"
    ).length;
    const foodItems = products.filter((p) => p.productType === "FOOD").length;
    const lowStockItems = products.filter((p) => p.stock < 10).length;
    const outOfStockItems = products.filter((p) => p.stock === 0).length;
    const activeProducts = products.filter((p) => p.isActive).length;

    return {
      totalProducts,
      supermarketItems,
      pharmacyItems,
      foodItems,
      lowStockItems,
      outOfStockItems,
      activeProducts,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalProducts: 0,
      supermarketItems: 0,
      pharmacyItems: 0,
      foodItems: 0,
      lowStockItems: 0,
      outOfStockItems: 0,
      activeProducts: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Manage your products and inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalProducts}
              </p>
              <p className="text-xs text-gray-500">
                {stats.activeProducts} active
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">🛒</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Supermarket Items
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.supermarketItems}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-2xl">💊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pharmacy Items
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.pharmacyItems}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">🍕</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Food Items</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.foodItems}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Alerts */}
      {(stats.lowStockItems > 0 || stats.outOfStockItems > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            ⚠️ Inventory Alerts
          </h3>
          <div className="space-y-2">
            {stats.outOfStockItems > 0 && (
              <p className="text-sm text-yellow-700">
                <span className="font-medium">{stats.outOfStockItems}</span>{" "}
                products are out of stock
              </p>
            )}
            {stats.lowStockItems > 0 && (
              <p className="text-sm text-yellow-700">
                <span className="font-medium">{stats.lowStockItems}</span>{" "}
                products have low stock (less than 10 items)
              </p>
            )}
          </div>
          <Link
            href="/admin/products?search=&productType=&category="
            className="inline-block mt-3 text-sm text-yellow-800 hover:text-yellow-900 underline"
          >
            View all products →
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Product
          </Link>
          <Link
            href="/admin/products"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View All Products
          </Link>
          {stats.lowStockItems > 0 && (
            <Link
              href="/admin/products"
              className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              Check Low Stock Items
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
