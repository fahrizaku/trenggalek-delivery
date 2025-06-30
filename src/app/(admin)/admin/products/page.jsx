// src/app/admin/products/page.js
import Link from "next/link";
import ProductTable from "@/components/ProductTable";

// Dummy data - nanti akan diganti dengan fetch dari database
const products = [
  {
    id: "1",
    name: "Indomie Goreng",
    productType: "SUPERMARKET",
    category: "Makanan Instan",
    price: 3500,
    stock: 100,
    brand: "Indofood",
    isActive: true,
  },
  {
    id: "2",
    name: "Paracetamol 500mg",
    productType: "PHARMACY",
    category: "Obat Bebas",
    price: 5000,
    stock: 50,
    isPrescriptionRequired: false,
    isActive: true,
  },
  {
    id: "3",
    name: "Nasi Gudeg",
    productType: "FOOD",
    category: "Makanan Tradisional",
    price: 15000,
    stock: 20,
    preparationTime: 15,
    isActive: true,
  },
];

export default function ProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">Manage all your products</p>
        </div>
        <Link
          href="/admin/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option value="">All Types</option>
            <option value="SUPERMARKET">Supermarket</option>
            <option value="PHARMACY">Pharmacy</option>
            <option value="FOOD">Food</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option value="">All Categories</option>
            <option value="Makanan Instan">Makanan Instan</option>
            <option value="Obat Bebas">Obat Bebas</option>
            <option value="Makanan Tradisional">Makanan Tradisional</option>
          </select>
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-64"
          />
        </div>
      </div>

      <ProductTable products={products} />
    </div>
  );
}
