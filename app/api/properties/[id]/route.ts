import { NextResponse } from "next/server";
import { deleteProperty, getPropertyById, isPropertyInput, updateProperty } from "@/lib/property-data";
import { deleteUploadedFile } from "@/lib/uploads";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const propertyId = Number(id);

    if (!Number.isFinite(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه آگهی نامعتبر است.",
        },
        { status: 400 },
      );
    }

    const property = await getPropertyById(propertyId);

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "آگهی مورد نظر پیدا نشد.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.error("Failed to fetch property detail:", error);
    return NextResponse.json(
      {
        success: false,
        message: "در دریافت اطلاعات ملک مشکلی پیش آمده است.",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const propertyId = Number(id);
    if (!Number.isInteger(propertyId)) {
      return NextResponse.json({ success: false, message: "شناسه آگهی نامعتبر است." }, { status: 400 });
    }

    const current = await getPropertyById(propertyId);
    if (!current) {
      return NextResponse.json({ success: false, message: "آگهی مورد نظر پیدا نشد." }, { status: 404 });
    }

    const body: unknown = await request.json();
    if (!isPropertyInput(body)) {
      return NextResponse.json({ success: false, message: "فیلدهای آگهی را بررسی کنید." }, { status: 400 });
    }

    const updated = await updateProperty(propertyId, body);
    await Promise.all(current.images.filter((image) => !body.images.includes(image)).map(deleteUploadedFile));
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Failed to update property:", error);
    return NextResponse.json({ success: false, message: "ذخیره تغییرات آگهی ناموفق بود." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const propertyId = Number(id);
    if (!Number.isInteger(propertyId)) {
      return NextResponse.json({ success: false, message: "شناسه آگهی نامعتبر است." }, { status: 400 });
    }

    const deleted = await deleteProperty(propertyId);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "آگهی مورد نظر پیدا نشد." }, { status: 404 });
    }

    await Promise.all(deleted.images.map(deleteUploadedFile));
    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    console.error("Failed to delete property:", error);
    return NextResponse.json({ success: false, message: "حذف آگهی ناموفق بود." }, { status: 500 });
  }
}
