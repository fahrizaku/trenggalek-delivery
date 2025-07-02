// src/app/admin/products/page.js
import Link from "next/link";
import ProductTable from "@/components/ProductTable";
import ProductFilters from "@/components/ProductFilters";
import { db } from "@/lib/db";

// Fetch products dari database
async function getProducts(searchParams = {}) {
  try {
    // Await searchParams if it's a Promise
    const params = await searchParams;

    const productType = params.productType || "";
    const category = params.category || "";
    const search = params.search || "";
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const skip = (page - 1) * limit;

    // Build where clause untuk filtering
    const whereClause = {
      ...(productType && { productType }),
      ...(category && {
        category: {
          contains: category,
          mode: "insensitive",
        },
      }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    // Get products dengan pagination
    const [products, total] = await Promise.all([
      db.product.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.product.count({ where: whereClause }),
    ]);

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
    };
  }
}

export default async function ProductsPage({ searchParams = {} }) {
  // Await searchParams before using it
  const params = await searchParams;
  const { products, pagination } = await getProducts(params);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">
            Manage all your products ({pagination.total} total)
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
          {pagination.totalPages > 1 && (
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
                      ...params,
                      page: (pagination.page - 1).toString(),
                    })}`}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                {pagination.page < pagination.totalPages && (
                  <Link
                    href={`?${new URLSearchParams({
                      ...params,
                      page: (pagination.page + 1).toString(),
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
            {Object.keys(params).some((key) => params[key])
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
