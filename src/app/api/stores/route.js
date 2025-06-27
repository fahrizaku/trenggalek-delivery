import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Ambil semua toko
export async function GET() {
  try {
    const stores = await db.store.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        category: true,
        address: true,
        phone: true,
        email: true,
        isOpen: true,
        openTime: true,
        closeTime: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: stores,
    });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stores" },
      { status: 500 }
    );
  }
}
