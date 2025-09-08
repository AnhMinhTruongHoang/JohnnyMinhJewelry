import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import PurchaseTemplate from "./PurchaseTemplate";

export async function POST(req: Request) {
  try {
    const { name, email, phone, address, msg } = await req.json();

    // Tạo transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    // Render HTML email (sync)
    const emailHtml = await render(
      PurchaseTemplate({ name, email, phone, address, msg }),
    );

    // Gửi mail
    await transporter.sendMail({
      from: `"JohnnyMinh Jewelry" <${process.env.EMAIL_AUTH_USER}>`,
      to: email,
      subject: "Order Confirmation",
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
