import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Ambil detail produk berdasarkan ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const product = await db.product.findUnique({
      where: { id },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            category: true,
            address: true,
            phone: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT - Update produk
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Build update data
    const updateData = {};

    // Basic fields
    if (body.name !== undefined) updateData.name = body.name;
    if (body.description !== undefined)
      updateData.description = body.description;
    if (body.price !== undefined) updateData.price = parseFloat(body.price);
    if (body.purchasePrice !== undefined)
      updateData.purchasePrice = body.purchasePrice
        ? parseFloat(body.purchasePrice)
        : null;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.stock !== undefined) updateData.stock = parseInt(body.stock);
    if (body.weight !== undefined) updateData.weight = parseInt(body.weight);
    if (body.unit !== undefined) updateData.unit = body.unit;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    // Type-specific fields
    if (existingProduct.productType === "SUPERMARKET") {
      if (body.brand !== undefined) updateData.brand = body.brand;
    } else if (existingProduct.productType === "PHARMACY") {
      if (body.isPrescriptionRequired !== undefined)
        updateData.isPrescriptionRequired = body.isPrescriptionRequired;
    } else if (existingProduct.productType === "FOOD") {
      if (body.preparationTime !== undefined)
        updateData.preparationTime = body.preparationTime
          ? parseInt(body.preparationTime)
          : null;
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: updateData,
      include: {
        store: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus produk
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
