import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("API /settings error:", error);
    return NextResponse.json(
      { success: false, error: "تعذر تحميل الإعدادات" },
      { status: 500 }
    );
  }
}
