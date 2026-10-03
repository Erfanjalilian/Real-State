import { NextResponse } from "next/server";
import { getSiteContent, isSiteContent, saveSiteContent, type SiteContentSection } from "@/lib/site-content";
import { deleteUploadedFile } from "@/lib/uploads";

function isSection(value: string): value is SiteContentSection {
  return value === "about" || value === "contact" || value === "banner";
}

export async function GET(_request: Request, { params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isSection(section)) {
    return NextResponse.json({ success: false, message: "بخش مورد نظر پیدا نشد." }, { status: 404 });
  }

  try {
    return NextResponse.json({ success: true, data: await getSiteContent(section) });
  } catch (error) {
    console.error("Failed to read site content:", error);
    return NextResponse.json({ success: false, message: "دریافت محتوای صفحه ناموفق بود." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isSection(section)) {
    return NextResponse.json({ success: false, message: "بخش مورد نظر پیدا نشد." }, { status: 404 });
  }

  try {
    const content: unknown = await request.json();
    if (!isSiteContent(section, content)) {
      return NextResponse.json({ success: false, message: "ساختار محتوای ارسال‌شده معتبر نیست." }, { status: 400 });
    }

    const previous = section === "banner" ? await getSiteContent("banner") : null;
    await saveSiteContent(section, content);
    if (section === "banner" && previous && "imageUrl" in previous && "imageUrl" in content && previous.imageUrl !== content.imageUrl) {
      await deleteUploadedFile(previous.imageUrl);
    }
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error("Failed to save site content:", error);
    return NextResponse.json({ success: false, message: "ذخیره محتوای صفحه ناموفق بود." }, { status: 500 });
  }
}