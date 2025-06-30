// src/lib/utils.js

// Format currency ke Rupiah
export function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Format number dengan thousand separator
export function formatNumber(number) {
  return new Intl.NumberFormat("id-ID").format(number);
}

// Get product type display name
export function getProductTypeLabel(type) {
  const labels = {
    SUPERMARKET: "Supermarket",
    PHARMACY: "Pharmacy",
    FOOD: "Food",
  };
  return labels[type] || type;
}

// Get product type color for badges
export function getProductTypeColor(type) {
  const colors = {
    SUPERMARKET: "bg-green-100 text-green-800",
    PHARMACY: "bg-red-100 text-red-800",
    FOOD: "bg-yellow-100 text-yellow-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
}

// Get stock status color
export function getStockStatusColor(stock) {
  if (stock === 0) return "bg-red-100 text-red-800";
  if (stock < 10) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
}

// Get stock status text
export function getStockStatusText(stock) {
  if (stock === 0) return "Out of Stock";
  if (stock < 10) return "Low Stock";
  return "In Stock";
}

// Validate product data
export function validateProductData(data) {
  const errors = [];

  if (!data.name?.trim()) errors.push("Product name is required");
  if (!data.productType) errors.push("Product type is required");
  if (!data.category?.trim()) errors.push("Category is required");
  if (!data.price || data.price <= 0) errors.push("Valid price is required");
  if (data.stock < 0) errors.push("Stock cannot be negative");
  if (!data.weight || data.weight <= 0) errors.push("Valid weight is required");

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Clean product data berdasarkan type
export function cleanProductData(data) {
  const cleaned = { ...data };

  // Remove fields yang tidak diperlukan berdasarkan productType
  if (cleaned.productType !== "SUPERMARKET") {
    delete cleaned.brand;
  }
  if (cleaned.productType !== "PHARMACY") {
    delete cleaned.isPrescriptionRequired;
  }
  if (cleaned.productType !== "FOOD") {
    delete cleaned.preparationTime;
  }

  // Convert to proper types
  cleaned.price = Number(cleaned.price);
  cleaned.purchasePrice = cleaned.purchasePrice
    ? Number(cleaned.purchasePrice)
    : null;
  cleaned.stock = Number(cleaned.stock);
  cleaned.weight = Number(cleaned.weight);

  if (cleaned.preparationTime) {
    cleaned.preparationTime = Number(cleaned.preparationTime);
  }

  return cleaned;
}
