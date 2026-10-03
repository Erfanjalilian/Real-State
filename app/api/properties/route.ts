import { NextRequest, NextResponse } from "next/server";
import { createProperty, getFilteredProperties, isPropertyInput, normalizeFilters } from "@/lib/property-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const province = searchParams.get("province") ?? undefined;
    const city = searchParams.get("city") ?? undefined;
    const type = searchParams.get("type") ?? undefined;
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const filters = normalizeFilters({
      province: province ?? undefined,
      city: city ?? undefined,
      type: type && type !== "all" ? (type as "land" | "house" | "villa" | "shop") : "all",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });

    const data = await getFilteredProperties(filters);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return NextResponse.json(
      {
        success: false,
        message: "در دریافت آگهی‌ها مشکلی پیش آمده است.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isPropertyInput(body)) {
      return NextResponse.json({ success: false, message: "فیلدهای آگهی را بررسی کنید." }, { status: 400 });
    }

    const property = await createProperty(body);
    return NextResponse.json({ success: true, data: property }, { status: 201 });
  } catch (error) {
    console.error("Failed to create property:", error);
    return NextResponse.json({ success: false, message: "ثبت آگهی ناموفق بود." }, { status: 500 });
  }
}
