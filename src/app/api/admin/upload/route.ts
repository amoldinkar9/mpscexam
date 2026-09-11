import { NextResponse } from "next/server";
import { saveUploadedImage, listUploadedImages, deleteUploadedImage } from "@/lib/imageStore";
import { checkDbHealth } from "@/lib/db";

async function getAdminPasscode(): Promise<string> {
  if (process.env.ADMIN_PASSCODE) {
    return process.env.ADMIN_PASSCODE;
  }
  try {
    // @ts-ignore
    const workers = await import("cloudflare:workers");
    if (workers?.env?.ADMIN_PASSCODE) {
      return workers.env.ADMIN_PASSCODE;
    }
  } catch {
    // Not running inside Cloudflare Workers
  }
  return "3103@moL..**";
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const passcode = searchParams.get("passcode") || request.headers.get("x-admin-passcode");
    const action = searchParams.get("action") || "check-db";

    const expectedPasscode = await getAdminPasscode();
    if (passcode !== expectedPasscode) {
      return NextResponse.json(
        { success: false, error: "चुकीचा पासवर्ड (Invalid Passcode)!" },
        { status: 401 }
      );
    }

    if (action === "check-db") {
      const health = await checkDbHealth();
      return NextResponse.json({
        success: true,
        health,
        message: health.ok
          ? `डेटाबेस कनेक्टेड आहे (${health.engine})! एकूण ${health.imageCount} इमेजेस सुरक्षित आहेत.`
          : `डेटाबेस चेतावणी: ${health.error || "काही टेबल्स उपलब्ध नाहीत"}`,
      });
    }

    if (action === "list") {
      const images = await listUploadedImages(50);
      return NextResponse.json({
        success: true,
        images,
      });
    }

    return NextResponse.json({ success: true, message: "Upload service active" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const passcode = (formData.get("passcode") as string) || request.headers.get("x-admin-passcode");

    const expectedPasscode = await getAdminPasscode();
    if (passcode !== expectedPasscode) {
      return NextResponse.json(
        { success: false, error: "चुकीचा पासवर्ड (Invalid Passcode)!" },
        { status: 401 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { success: false, error: "कृपया इमेज फाइल निवडा (No image file provided)" },
        { status: 400 }
      );
    }

    // Validate mime type
    const validMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
    ];
    if (!validMimes.includes(file.type.toLowerCase()) && !file.name.match(/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i)) {
      return NextResponse.json(
        { success: false, error: "केवळ JPG, PNG, WEBP, GIF किंवा SVG इमेजेस अपलोड करता येतील." },
        { status: 400 }
      );
    }

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "इमेज फाइल खूप मोठी आहे. कमाल आकार 5MB असावा." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const stored = await saveUploadedImage({
      filename: file.name,
      mimeType: file.type || "image/jpeg",
      buffer,
    });

    return NextResponse.json({
      success: true,
      message: stored.verifiedInDatabase
        ? `इमेज यशस्वीरीत्या डेटाबेसमध्ये सेव्ह झाली (${stored.engine})!`
        : "इमेज सेव्ह झाली.",
      url: stored.url,
      id: stored.id,
      filename: stored.filename,
      size: stored.size,
      verifiedInDatabase: stored.verifiedInDatabase,
      engine: stored.engine,
    });
  } catch (error: any) {
    console.error("[upload API] Error handling file upload:", error);
    return NextResponse.json(
      { success: false, error: error.message || "इमेज अपलोड करताना त्रुटी आली (Internal Server Error)" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const passcode = searchParams.get("passcode") || request.headers.get("x-admin-passcode");

    const expectedPasscode = await getAdminPasscode();
    if (passcode !== expectedPasscode) {
      return NextResponse.json(
        { success: false, error: "चुकीचा पासवर्ड (Invalid Passcode)!" },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Image ID is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteUploadedImage(id);
    return NextResponse.json({
      success: deleted,
      message: deleted ? "इमेज डेटाबेसमधून हटवली गेली!" : "इमेज सापडली नाही.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete image" },
      { status: 500 }
    );
  }
}
