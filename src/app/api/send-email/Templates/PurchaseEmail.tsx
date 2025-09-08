import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";

export const PurchaseEmail = ({ name, email, phone, address, msg }: any) => (
  <Html>
    <Head />
    <Preview>New Jewelry Purchase</Preview>
    <Body
      style={{ backgroundColor: "#f3f3f3", fontFamily: "Arial, sans-serif" }}
    >
      <Container
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Heading>New Purchase</Heading>
        <Text>
          <b>Name:</b> {name}
        </Text>
        <Text>
          <b>Email:</b> {email}
        </Text>
        <Text>
          <b>Phone:</b> {phone}
        </Text>
        <Text>
          <b>Address:</b> {address}
        </Text>
        <Text>
          <b>Message:</b> {msg}
        </Text>
      </Container>
    </Body>
  </Html>
);
