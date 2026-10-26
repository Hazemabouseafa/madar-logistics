import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth";
import { getMessages, getDashboardStats } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح لك بالوصول" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "ALL";
    const search = searchParams.get("search") || "";

    const messages = await getMessages({ status, search });
    const stats = await getDashboardStats();

    return NextResponse.json({
      success: true,
      messages,
      stats,
    });
  } catch (error) {
    console.error("GET /api/admin/messages error:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء جلب الرسائل" },
      { status: 500 }
    );
  }
}
