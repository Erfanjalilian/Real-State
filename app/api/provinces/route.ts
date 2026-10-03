import { NextResponse } from "next/server";
import { getProvinces } from "@/lib/property-data";

export async function GET() {
  try {
    const data = await getProvinces();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Failed to fetch provinces:", error);
    return NextResponse.json(
      {
        success: false,
        message: "در دریافت استان‌ها مشکلی پیش آمده است.",
      },
      { status: 500 },
    );
  }
}
