import { NextResponse } from "next/server";
import { getSessionCookieOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const cookieOptions = getSessionCookieOptions();
  const response = NextResponse.json({
    success: true,
    message: "تم تسجيل الخروج بنجاح",
  });

  response.cookies.set({
    name: cookieOptions.name,
    value: "",
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
    maxAge: 0,
  });

  return response;
}
