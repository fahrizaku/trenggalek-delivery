// src/app/admin/products/page.js
import Link from "next/link";
import ProductTable from "@/components/ProductTable";
import ProductFilters from "@/components/ProductFilters";

// Fetch products dari API
async function getProducts(searchParams = {}) {
  try {
    const params = new URLSearchParams();

    // Add search params ke URL
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/products?${params}`, {
      cache: "no-store", // Disable caching untuk data yang sering berubah
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], pagination: null };
  }
}

export default async function ProductsPage({ searchParams }) {
  const { products, pagination } = await getProducts(searchParams);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">
            Manage all your products ({pagination?.total || 0} total)
          </p>
        </div>
        <Link
          href="/admin/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <ProductFilters />

      {/* Products Table */}
      {products.length > 0 ? (
        <>
          <ProductTable products={products} />

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total} results
              </p>
              <div className="flex space-x-2">
                {pagination.page > 1 && (
                  <Link
                    href={`?${new URLSearchParams({
                      ...searchParams,
                      page: pagination.page - 1,
                    })}`}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                {pagination.page < pagination.totalPages && (
                  <Link
                    href={`?${new URLSearchParams({
                      ...searchParams,
                      page: pagination.page + 1,
                    })}`}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            {Object.keys(searchParams).length > 0
              ? "Try adjusting your search filters or create a new product."
              : "Get started by creating your first product."}
          </p>
          <Link
            href="/admin/products/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Product
          </Link>
        </div>
      )}
    </div>
  );
}
