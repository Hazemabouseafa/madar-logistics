import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth";
import { getSiteSettings, updateSiteSettings } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("GET /api/admin/settings error:", error);
    return NextResponse.json({ success: false, error: "فشل تحميل الإعدادات" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const body = await req.json();
    const updated = await updateSiteSettings(body);

    return NextResponse.json({
      success: true,
      message: "تم حفظ الإعدادات العامة بنجاح وتحديث الموقع فورياً",
      settings: updated,
    });
  } catch (error) {
    console.error("PUT /api/admin/settings error:", error);
    return NextResponse.json({ success: false, error: "فشل حفظ الإعدادات" }, { status: 500 });
  }
}
