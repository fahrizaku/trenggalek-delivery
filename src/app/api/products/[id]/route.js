import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cleanProductData, validateProductData } from "@/lib/utils";

// GET /api/products/[id] - Get single product
export async function GET(request, { params }) {
  try {
    const { id } = await params; // Await params before destructuring

    const product = await db.product.findUnique({
      where: { id },
    });

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
    const { id } = await params; // Await params before destructuring
    const rawData = await request.json();

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Validasi data
    const validation = validateProductData(rawData);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    // Clean dan prepare data
    const data = cleanProductData(rawData);

    // Update product di database
    const product = await db.product.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error updating product:", error);

    // Handle db unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Product with this name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(request, { params }) {
  try {
    const { id } = await params; // Await params before destructuring

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete product
    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
      deletedProduct: existingProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);

    // Handle foreign key constraint errors
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Cannot delete product. It may be referenced by other records.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
