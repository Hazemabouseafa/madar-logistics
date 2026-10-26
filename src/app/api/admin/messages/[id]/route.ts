import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth";
import { updateMessageStatus, deleteMessage, getMessageById } from "@/lib/data-store";
import { MessageStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const message = await getMessageById(params.id);
    if (!message) {
      return NextResponse.json({ success: false, error: "الرسالة غير موجودة" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("GET /api/admin/messages/[id] error:", error);
    return NextResponse.json({ success: false, error: "خطأ بالخادم" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const body = await req.json();
    const { status, notes } = body;

    const validStatuses: MessageStatus[] = ["NEW", "IN_PROGRESS", "COMPLETED"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: "حالة غير صالحة" }, { status: 400 });
    }

    const updated = await updateMessageStatus(params.id, status, notes);
    if (!updated) {
      return NextResponse.json({ success: false, error: "لم يتم العثور على الرسالة" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: updated });
  } catch (error) {
    console.error("PATCH /api/admin/messages/[id] error:", error);
    return NextResponse.json({ success: false, error: "فشل تحديث الرسالة" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const success = await deleteMessage(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: "الرسالة غير موجودة" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "تم حذف الرسالة بنجاح" });
  } catch (error) {
    console.error("DELETE /api/admin/messages/[id] error:", error);
    return NextResponse.json({ success: false, error: "فشل حذف الرسالة" }, { status: 500 });
  }
}
