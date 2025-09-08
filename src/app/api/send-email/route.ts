import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, address, msg } = body;

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // bắt buộc dùng sender này khi chưa verify domain
      to: "truonghoanganhminh2000@gmail.com", // email bạn muốn nhận
      subject: "New Jewelry Purchase",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nMessage: ${msg}`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
