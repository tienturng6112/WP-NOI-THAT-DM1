import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atelier Sofa — Tuyệt Tác Nội Thất Thủ Công Ý & Bắc Âu (Luxury Furniture)",
  description: "Trưng bày và may đo sofa cao cấp phong cách Italian Modern & Nordic Minimalist. Chất liệu da bò Tuscany tự nhiên và vải Bouclé hữu cơ nhập khẩu.",
  openGraph: {
    title: "Atelier Sofa — Tuyệt Tác Nội Thất Thủ Công Ý & Bắc Âu",
    description: "Bộ sưu tập sofa cao cấp Milano, Nordic Bouclé và Verona Leather.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="bg-[#F8F2EF] text-[#1E252D] selection:bg-[#4C637C] selection:text-[#F8F2EF] antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
