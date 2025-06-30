// src/app/api/products/[id]/route.js
import { NextResponse } from "next/server";
// import { prisma } from '@/lib/prisma'

// GET /api/products/[id] - Get single product
export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Dummy data - nanti akan diganti dengan Prisma findUnique
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    const product = products[id];

    /* Nanti akan diganti dengan:
    const product = await prisma.product.findUnique({
      where: { id }
    })
    */

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    // Validasi data
    if (!data.name || !data.productType || !data.price || !data.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Dummy response - nanti akan diganti dengan Prisma update
    const updatedProduct = {
      id,
      ...data,
      updatedAt: new Date(),
    };

    /* Nanti akan diganti dengan:
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        price: Number(data.price),
        purchasePrice: data.purchasePrice ? Number(data.purchasePrice) : null,
        stock: Number(data.stock),
        weight: Number(data.weight),
        ...(data.preparationTime && { preparationTime: Number(data.preparationTime) }),
        updatedAt: new Date()
      }
    })
    */

    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Dummy response - nanti akan diganti dengan Prisma delete
    /* Nanti akan diganti dengan:
    await prisma.product.delete({
      where: { id }
    })
    */

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
