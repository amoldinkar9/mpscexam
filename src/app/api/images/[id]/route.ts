import { getImageById } from "@/lib/imageStore";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return new Response("Image ID missing", { status: 400 });
    }

    const image = await getImageById(id);
    if (!image || !image.buffer) {
      return new Response("Image not found", { status: 404 });
    }

    return new Response(new Uint8Array(image.buffer), {
      status: 200,
      headers: {
        "Content-Type": image.mimeType || "image/jpeg",
        "Content-Length": image.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    return new Response(error.message || "Failed to retrieve image", { status: 500 });
  }
}
