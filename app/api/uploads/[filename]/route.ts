import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const imageTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".bmp": "image/bmp",
  ".gif": "image/gif",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".webp": "image/webp",
};

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!/^[\da-f-]{36}(?:\.[a-z\d]{1,16})?$/i.test(filename)) {
    return NextResponse.json({ success: false, message: "فایل پیدا نشد." }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "data", "uploads", filename);
  try {
    const fileStats = await stat(filePath);
    const extension = path.extname(filename).toLowerCase();
    const contentType = imageTypes[extension] ?? "application/octet-stream";
    const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream;

    return new Response(stream, {
      headers: {
        "Content-Length": String(fileStats.size),
        "Content-Disposition": `${contentType.startsWith("image/") ? "inline" : "attachment"}; filename="${filename}"`,
        "Content-Security-Policy": "sandbox; default-src 'none'",
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ success: false, message: "فایل پیدا نشد." }, { status: 404 });
  }
}