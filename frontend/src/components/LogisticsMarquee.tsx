"use client";

import React from "react";
import { Plane, Globe, ShieldCheck, Truck, PackageCheck, Award, Sparkles } from "lucide-react";

interface LogisticsPartner {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const LOGISTICS_PARTNERS: LogisticsPartner[] = [
  {
    id: "dhl",
    name: "DHL Express",
    tagline: "Global Air Freight",
    badge: "Hàng Không VIP",
    icon: Plane,
    accentColor: "#CEB88E",
  },
  {
    id: "fedex",
    name: "FedEx Priority",
    tagline: "International Logistics",
    badge: "Chuẩn Quốc Tế",
    icon: Globe,
    accentColor: "#9A5B42",
  },
  {
    id: "ups",
    name: "UPS Supply Chain",
    tagline: "Heavy Cargo Care",
    badge: "Kiểm Soát Tải Trọng",
    icon: ShieldCheck,
    accentColor: "#4C637C",
  },
  {
    id: "viettel",
    name: "Viettel Post VIP",
    tagline: "Vận chuyển Nội thất Chuyên biệt",
    badge: "Mạng Lưới Toàn Quốc",
    icon: Truck,
    accentColor: "#CEB88E",
  },
  {
    id: "ghn",
    name: "GHN Bulky",
    tagline: "Hàng Cồng Kềnh Cao Cấp",
    badge: "Đệm Chống Va Đập",
    icon: PackageCheck,
    accentColor: "#9A5B42",
  },
  {
    id: "jnt",
    name: "J&T Express Luxury Line",
    tagline: "Bảo hiểm Hàng hóa 100%",
    badge: "Bảo Hiểm Toàn Phần",
    icon: Award,
    accentColor: "#4C637C",
  },
  {
    id: "kerry",
    name: "Kerry Express",
    tagline: "White-Glove Installation",
    badge: "Lắp Đặt Tại Gia",
    icon: Sparkles,
    accentColor: "#CEB88E",
  },
];

export default function LogisticsMarquee() {
  // Duplicate array 3 times for a completely seamless infinite loop
  const marqueeItems = [...LOGISTICS_PARTNERS, ...LOGISTICS_PARTNERS, ...LOGISTICS_PARTNERS];

  return (
    <section
      aria-label="Đối tác vận chuyển"
      className="w-full overflow-hidden bg-[#F0EBE1] border-y border-[#4C637C]/15 py-7 select-none relative"
    >
      {/* Decorative Gradient Fades at edges for smooth blend */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F0EBE1] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F0EBE1] to-transparent z-10 pointer-events-none" />

      {/* Leading Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#9A5B42] animate-pulse" />
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[#57534E]">
            ĐỐI TÁC VẬN CHUYỂN &amp; GIAO NHẬN BẠCH KIM (WHITE-GLOVE DELIVERY)
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[10px] tracking-wider uppercase text-[#57534E]/80 font-medium">
          <span>Bảo hiểm 100%</span>
          <span>•</span>
          <span>Bọc lót 4 lớp</span>
          <span>•</span>
          <span>Bàn giao tận phòng khách</span>
        </div>
      </div>

      {/* Infinite Horizontal Running Marquee */}
      <div className="overflow-hidden w-full">
        <div className="animate-marquee flex items-center gap-5 sm:gap-7">
          {marqueeItems.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={`${partner.id}-${index}`}
                className="group inline-flex items-center gap-3.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] backdrop-blur-md border border-[#4C637C]/10 hover:border-[#9A5B42]/40 transition-all duration-300 shadow-xs hover:shadow-md cursor-default shrink-0"
              >
                {/* SVG Icon Badge with Luxury Tone */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs"
                  style={{
                    backgroundColor: "#1C1917",
                    color: partner.accentColor,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Typographic Identity & Tagline */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm sm:text-[15px] font-semibold text-[#1C1917] tracking-tight group-hover:text-[#9A5B42] transition-colors">
                      {partner.name}
                    </span>
                    <span className="text-[9px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#F0EBE1] text-[#57534E] border border-stone-300/40">
                      {partner.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#57534E] font-medium tracking-normal mt-0.5">
                    {partner.tagline}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
