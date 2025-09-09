import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components";
import { JmLogo } from "@/Components/JM.logo";

type Props = {
  name: string;
  email: string;
  phone: string;
  address: string;
  msg?: string;
};

export default function PurchaseTemplate({
  name,
  email,
  phone,
  address,
  msg,
}: Props) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#f4f4f4",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {/* Logo */}
          <Section
            style={{
              backgroundColor: "#222",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <JmLogo style={{ height: "60px" }} />
          </Section>

          {/* Tiêu đề */}
          <Section style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
            <Heading
              as="h2"
              style={{
                textAlign: "center",
                margin: "0",
                fontSize: "22px",
                color: "#333",
              }}
            >
              Order Confirmation
            </Heading>
            <Text
              style={{ textAlign: "center", color: "#666", marginTop: "5px" }}
            >
              Thank you for your purchase! Below are your order details.
            </Text>
          </Section>

          {/* Thông tin khách hàng */}
          <Section style={{ padding: "20px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <tbody>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>Name:</td>
                  <td style={{ padding: "8px" }}>{name}</td>
                </tr>
                <tr style={{ backgroundColor: "#fafafa" }}>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>Email:</td>
                  <td style={{ padding: "8px" }}>{email}</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>Phone:</td>
                  <td style={{ padding: "8px" }}>{phone}</td>
                </tr>
                <tr style={{ backgroundColor: "#fafafa" }}>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    Address:
                  </td>
                  <td style={{ padding: "8px" }}>{address}</td>
                </tr>
                {msg && (
                  <tr>
                    <td style={{ padding: "8px", fontWeight: "bold" }}>
                      Message:
                    </td>
                    <td style={{ padding: "8px" }}>{msg}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Section>

          {/* Ghi chú */}
          <Section
            style={{
              padding: "20px",
              borderTop: "1px solid #eee",
              backgroundColor: "#fafafa",
            }}
          >
            <Text style={{ fontSize: "14px", color: "#555" }}>
              We will process your order shortly. If you have any questions,
              feel free to reply to this email or contact our support team.
            </Text>
          </Section>

          {/* Footer */}
          <Section
            style={{
              padding: "15px",
              textAlign: "center",
              fontSize: "12px",
              color: "#999",
              backgroundColor: "#f4f4f4",
            }}
          >
            © {new Date().getFullYear()} Johnny Minh & Co Jewelry. All rights
            reserved.
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
