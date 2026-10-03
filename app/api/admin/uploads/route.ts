import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, message: "فایلی برای بارگذاری انتخاب نشده است." }, { status: 400 });
    }

    const extension = path.extname(file.name).toLowerCase().replace(/[^a-z0-9.]/g, "").slice(0, 16);
    const filename = `${randomUUID()}${extension}`;
    const uploadDirectory = path.join(process.cwd(), "data", "uploads");
    await mkdir(uploadDirectory, { recursive: true });
    await pipeline(
      Readable.fromWeb(file.stream() as unknown as import("node:stream/web").ReadableStream),
      createWriteStream(path.join(uploadDirectory, filename), { flags: "wx" }),
    );

    return NextResponse.json({
      success: true,
      data: { url: `/api/uploads/${filename}`, name: file.name, size: file.size, type: file.type },
    });
  } catch (error) {
    console.error("Failed to upload property file:", error);
    return NextResponse.json({ success: false, message: "بارگذاری فایل ناموفق بود." }, { status: 500 });
  }
}