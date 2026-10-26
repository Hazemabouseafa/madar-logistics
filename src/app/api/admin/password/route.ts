import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth";
import { updateAdminPassword } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "غير مصرح لك بالوصول، يرجى تسجيل الدخول أولاً" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, error: "يرجى تعبئة كافة الحقول المطلوبة (كلمة المرور الحالية، الجديدة، وتأكيدها)" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: "يجب ألا تقل كلمة المرور الجديدة عن 8 أحرف" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: "كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقين" },
        { status: 400 }
      );
    }

    if (newPassword === currentPassword) {
      return NextResponse.json(
        { success: false, error: "كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور الحالية" },
        { status: 400 }
      );
    }

    const result = await updateAdminPassword(session.email, currentPassword, newPassword);

    return NextResponse.json({
      success: true,
      message: "تم تغيير كلمة المرور بنجاح! يمكنك الآن استخدام كلمة المرور الجديدة في تسجيلات الدخول القادمة.",
    });
  } catch (error: any) {
    console.error("Admin password change error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "فشل تغيير كلمة المرور، يرجى المحاولة مرة أخرى" },
      { status: 400 }
    );
  }
}
