// src/app/api/products/route.js
import { NextResponse } from "next/server";
// import { prisma } from '@/lib/prisma'

// GET /api/products - Get all products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productType = searchParams.get("productType");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    // Dummy data - nanti akan diganti dengan Prisma query
    let products = [
      {
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
      {
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Filter berdasarkan productType
    if (productType) {
      products = products.filter((p) => p.productType === productType);
    }

    // Filter berdasarkan category
    if (category) {
      products = products.filter((p) => p.category === category);
    }

    // Filter berdasarkan search
    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    /* Nanti akan diganti dengan:
    const whereClause = {
      ...(productType && { productType }),
      ...(category && { category }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    })
    */

    return NextResponse.json({ products });
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
    const data = await request.json();

    // Validasi data
    if (!data.name || !data.productType || !data.price || !data.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Dummy response - nanti akan diganti dengan Prisma create
    const newProduct = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    /* Nanti akan diganti dengan:
    const product = await prisma.product.create({
      data: {
        ...data,
        price: Number(data.price),
        purchasePrice: data.purchasePrice ? Number(data.purchasePrice) : null,
        stock: Number(data.stock),
        weight: Number(data.weight),
        ...(data.preparationTime && { preparationTime: Number(data.preparationTime) })
      }
    })
    */

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
