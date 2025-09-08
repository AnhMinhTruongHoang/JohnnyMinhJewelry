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
        style={{ backgroundColor: "#f4f4f4", fontFamily: "Arial, sans-serif" }}
      >
        <Container
          style={{
            margin: "40px auto",
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          <Heading as="h2">Thank you for your order!</Heading>

          <Section>
            <Text>
              <strong>Name:</strong> {name}
            </Text>
            <Text>
              <strong>Email:</strong> {email}
            </Text>
            <Text>
              <strong>Phone:</strong> {phone}
            </Text>
            <Text>
              <strong>Address:</strong> {address}
            </Text>
            {msg && (
              <Text>
                <strong>Message:</strong> {msg}
              </Text>
            )}
          </Section>

          <Section>
            <Text style={{ marginTop: "20px" }}>
              We will process your order shortly. If you have any questions,
              feel free to reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
