import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/data-store";
import { createSessionToken, getSessionCookieOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "يرجى إدخال البريد الإلكتروني وكلمة المرور" },
        { status: 400 }
      );
    }

    const user = await verifyAdminCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const cookieOptions = getSessionCookieOptions();

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user,
    });

    response.cookies.set({
      name: cookieOptions.name,
      value: token,
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء تسجيل الدخول" },
      { status: 500 }
    );
  }
}
