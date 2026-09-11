import "./app.css";
import localFont from "next/font/local";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import Header from "@/Components/Header";
import ViewCanvas from "@/Components/ViewCanvas";
import FullScreenLoader from "@/Components/Loader";

const alpino = localFont({
  src: "../Assets/Fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={alpino.variable}>
      <body className="overflow-x-hidden bg-pink-200">
        {/* CUSTOM LOADING SCREEN */}
        <FullScreenLoader />

        <Header />

        <main>
          {children}

          <ViewCanvas />
        </main>

        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
