import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, email, subject, message } = body ?? {};

    if (!fullName || !phone || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "لطفاً همه فیلدها را به‌درستی وارد کنید.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "پیام شما با موفقیت ثبت شد. تیم پشتیبانی در اسرع وقت با شما تماس خواهد گرفت.",
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "در ثبت پیام مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 },
    );
  }
}
