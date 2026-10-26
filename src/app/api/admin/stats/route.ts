import { NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth";
import { getDashboardStats } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const stats = await getDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return NextResponse.json({ success: false, error: "فشل جلب الإحصائيات" }, { status: 500 });
  }
}
