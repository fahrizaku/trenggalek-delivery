// src/app/api/products/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cleanProductData, validateProductData } from "@/lib/utils";

// GET /api/products - Get all products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productType = searchParams.get("productType");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Build where clause untuk filtering
    const whereClause = {
      ...(productType && { productType }),
      ...(category && { category }),
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

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product
export async function POST(request) {
  try {
    const rawData = await request.json();

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

    // Create product di database
    const product = await db.product.create({
      data,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);

    // Handle db unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Product with this name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
