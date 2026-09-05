import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent, getDefaultSiteContent } from "@/lib/contentStore";

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

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, passcode, action } = body;

    const expectedPasscode = await getAdminPasscode();

    // Passcode validation
    if (passcode !== expectedPasscode) {
      return NextResponse.json(
        { success: false, error: "चुकीचा पासवर्ड (Invalid Passcode)!" },
        { status: 401 }
      );
    }

    if (action === "verify") {
      return NextResponse.json({ success: true, message: "Authorized" });
    }

    if (action === "reset") {
      const defaultContent = getDefaultSiteContent();
      const saved = await saveSiteContent(defaultContent);
      return NextResponse.json({ success: saved, content: defaultContent, message: "मजकूर मूळ स्थितीत रिसेट करण्यात आला!" });
    }

    if (!content) {
      return NextResponse.json(
        { success: false, error: "अवैध डेटा (Missing content payload)" },
        { status: 400 }
      );
    }

    const saved = await saveSiteContent(content);
    if (!saved) {
      return NextResponse.json(
        { success: false, error: "डेटा सेव्ह करताना त्रुटी आली (Failed to save content)" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "बदल यशस्वीरीत्या सेव्ह झाले! (Changes successfully saved to Cloudflare Database)",
      content
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
