import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "iPhone 18, iPhone 18 Pro & iPhone 18 Pro Max - Apple (Việt Nam)",
  description: "Khám phá thế hệ iPhone 18 mới nhất: iPhone 18, iPhone 18 Pro và iPhone 18 Pro Max với chip A20 Pro, khung Titan và camera siêu đỉnh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark bg-[#151516] text-[#f5f5f7]">
      <body className={`${inter.className} min-h-screen bg-[#151516] text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
