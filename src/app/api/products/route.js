// file: src/app/api/products/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Ambil semua produk dengan filter
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get("storeId");
    const productType = searchParams.get("productType");
    const category = searchParams.get("category");
    const isActive = searchParams.get("isActive");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    // Build where clause
    const where = {};
    if (storeId) where.storeId = storeId;
    if (productType) where.productType = productType;
    if (category) where.category = category;
    if (isActive !== null) where.isActive = isActive === "true";
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get total count for pagination
    const totalCount = await db.product.count({ where });

    // Get products with pagination
    const products = await db.product.findMany({
      where,
      include: {
        store: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - Tambah produk baru
export async function POST(request) {
  try {
    const body = await request.json();

    // Validasi required fields
    const { storeId, productType, name, price, category, weight } = body;
    if (!storeId || !productType || !name || !price || !category || !weight) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validasi productType
    const validProductTypes = ["SUPERMARKET", "PHARMACY", "FOOD"];
    if (!validProductTypes.includes(productType)) {
      return NextResponse.json(
        { success: false, error: "Invalid product type" },
        { status: 400 }
      );
    }

    // Build product data based on type
    const productData = {
      storeId,
      productType,
      name,
      description: body.description || null,
      price: parseFloat(price),
      purchasePrice: body.purchasePrice ? parseFloat(body.purchasePrice) : null,
      image: body.image || null,
      category,
      stock: body.stock || 50,
      weight: parseInt(weight),
      unit: body.unit || null,
      isActive: body.isActive !== undefined ? body.isActive : true,
    };

    // Add type-specific fields
    if (productType === "SUPERMARKET") {
      productData.brand = body.brand || null;
    } else if (productType === "PHARMACY") {
      productData.isPrescriptionRequired = body.isPrescriptionRequired || false;
    } else if (productType === "FOOD") {
      productData.preparationTime = body.preparationTime
        ? parseInt(body.preparationTime)
        : null;
    }

    const product = await db.product.create({
      data: productData,
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

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
