import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import PurchaseTemplate from "./PurchaseTemplate";

export async function POST(req: Request) {
  try {
    const { name, email, phone, address, msg, imageBase64 } = await req.json();

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

    // Render HTML email gốc
    const emailHtmlBase = await render(
      PurchaseTemplate({ name, email, phone, address, msg }),
    );

    const hasImage = !!imageBase64;

    // Nếu có ảnh thì chèn thêm vào HTML
    const emailHtml = hasImage
      ? `${emailHtmlBase}<br/><p><b>Preview:</b></p><img src="cid:ringImage" style="max-width: 600px; width: 100%; height: auto;" />`
      : emailHtmlBase;

    const attachments = hasImage
      ? [
          {
            filename: "ring.png",
            content: imageBase64.split("base64,")[1], // bỏ prefix data:image/png;base64,
            encoding: "base64",
            cid: "Image", // để hiển thị inline
          },
        ]
      : [];

    // Gửi mail
    await transporter.sendMail({
      from: `"Johnny Minh & Co Jewelry" <${process.env.EMAIL_AUTH_USER}>`,
      to: email,
      subject: "Order Confirmation",
      html: emailHtml,
      attachments,
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
