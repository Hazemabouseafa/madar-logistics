import { NextRequest, NextResponse } from "next/server";
import { createMessage } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, serviceType, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "يرجى كتابة الاسم بالكامل" },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: "يرجى إدخال رقم هاتف صحيح للتواصل" },
        { status: 400 }
      );
    }

    if (!serviceType || typeof serviceType !== "string") {
      return NextResponse.json(
        { success: false, error: "يرجى اختيار نوع الخدمة أو الشحنة" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "يرجى كتابة تفاصيل الشحنة أو الاستفسار بوضوح (5 أحرف على الأقل)" },
        { status: 400 }
      );
    }

    const newMessage = await createMessage({
      name,
      phone,
      serviceType,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "تم استلام طلبكم بنجاح! سيتواصل معكم فريق المتابعة والعمليات في أقرب وقت.",
        data: newMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /contact error:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ غير متوقع أثناء إرسال الرسالة، يرجى المحاولة لاحقاً." },
      { status: 500 }
    );
  }
}
