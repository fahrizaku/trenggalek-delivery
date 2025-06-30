// src/app/admin/products/create/page.js
import ProductForm from "@/components/ProductForm";

export default function CreateProductPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
        <p className="text-gray-600">Create a new product for your store</p>
      </div>

      <ProductForm />
    </div>
  );
}
