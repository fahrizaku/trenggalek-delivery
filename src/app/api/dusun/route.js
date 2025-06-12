// file: src/app/api/dusun/route.js
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const dusun = await prisma.dusun.findMany({
      where: {
        is_active: true,
        nama_dusun: {
          contains: search,
          mode: "insensitive",
        },
      },
      include: {
        desa_kelurahan: {
          include: {
            kecamatan: true,
          },
        },
      },
      orderBy: {
        nama_dusun: "asc",
      },
    });

    // Transform data untuk frontend
    const transformedData = dusun.map((item) => ({
      id: item.id,
      name: item.nama_dusun,
      fullName: `${item.nama_dusun}, ${item.desa_kelurahan.nama_desa_kelurahan}, ${item.desa_kelurahan.kecamatan.nama_kecamatan}`,
      shippingCost: item.shipping_cost,
      deliveryNotes: item.delivery_notes,
      desaKelurahan: item.desa_kelurahan.nama_desa_kelurahan,
      kecamatan: item.desa_kelurahan.kecamatan.nama_kecamatan,
    }));

    return Response.json({
      success: true,
      data: transformedData,
    });
  } catch (error) {
    console.error("Error fetching dusun:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch dusun data",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
