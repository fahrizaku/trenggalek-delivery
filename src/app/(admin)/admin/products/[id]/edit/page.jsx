// src/app/admin/products/[id]/edit/page.js
import ProductForm from "@/components/ProductForm";

// Fetch product dari API
async function getProduct(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store", // Disable caching untuk data yang sering berubah
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function EditProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or may have been deleted.
        </p>
        <a
          href="/admin/products"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Products
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
        <p className="text-gray-600">Update product information</p>
      </div>

      <ProductForm product={product} />
    </div>
  );
}
