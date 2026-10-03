import { NextRequest, NextResponse } from "next/server";
import { getCities } from "@/lib/property-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const province = searchParams.get("province") ?? undefined;

    const data = await getCities(province);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    return NextResponse.json(
      {
        success: false,
        message: "در دریافت شهرها مشکلی پیش آمده است.",
      },
      { status: 500 },
    );
  }
}
