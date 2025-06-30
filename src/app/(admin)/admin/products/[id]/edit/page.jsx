// src/app/admin/products/[id]/edit/page.js
import ProductForm from "@/components/ProductForm";

// Dummy function - nanti akan diganti dengan fetch dari database
async function getProduct(id) {
  // Simulate API call
  const products = {
    1: {
      id: "1",
      name: "Indomie Goreng",
      productType: "SUPERMARKET",
      description: "Mie instan rasa goreng",
      category: "Makanan Instan",
      price: 3500,
      purchasePrice: 3000,
      stock: 100,
      weight: 85,
      unit: "pcs",
      brand: "Indofood",
      isActive: true,
    },
    2: {
      id: "2",
      name: "Paracetamol 500mg",
      productType: "PHARMACY",
      description: "Obat penurun demam dan pereda nyeri",
      category: "Obat Bebas",
      price: 5000,
      purchasePrice: 4000,
      stock: 50,
      weight: 10,
      unit: "strip",
      isPrescriptionRequired: false,
      isActive: true,
    },
    3: {
      id: "3",
      name: "Nasi Gudeg",
      productType: "FOOD",
      description: "Nasi gudeg khas Yogyakarta",
      category: "Makanan Tradisional",
      price: 15000,
      purchasePrice: 12000,
      stock: 20,
      weight: 300,
      unit: "porsi",
      preparationTime: 15,
      isActive: true,
    },
  };

  return products[id] || null;
}

export default async function EditProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600">
          The product you're looking for doesn't exist.
        </p>
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
