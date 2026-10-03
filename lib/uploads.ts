import { unlink } from "node:fs/promises";
import path from "node:path";

export async function deleteUploadedFile(url: string) {
  const filename = url.startsWith("/api/uploads/") ? url.slice("/api/uploads/".length) : "";
  if (!/^[\da-f-]{36}(?:\.[a-z\d]{1,16})?$/i.test(filename)) return;

  try {
    await unlink(path.join(process.cwd(), "data", "uploads", filename));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return;
    throw error;
  }
}