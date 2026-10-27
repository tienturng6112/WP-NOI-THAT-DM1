"use client";

import React from "react";
import Image from "next/image";
import { Star, CheckCircle2, ShieldCheck, TreePine, Award, Sparkles, Quote, MapPin } from "lucide-react";

// Part A: 4 Prestigious Quality Certifications
interface CertificationItem {
  id: string;
  name: string;
  code: string;
  subtitle: string;
  description: string;
  origin: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "fsc",
    name: "Chứng chỉ FSC®",
    code: "FSC-STD-40-004",
    subtitle: "Forest Stewardship Council",
    description: "100% Gỗ Sồi Nga & Dẻ Gai khai thác bền vững có truy xuất nguồn gốc minh bạch từ rừng trồng chuẩn châu Âu.",
    origin: "Đức & Bắc Âu",
    icon: TreePine,
  },
  {
    id: "pelle",
    name: "Chứng nhận Da Thuộc Ý",
    code: "Consorzio Vera Pelle",
    subtitle: "Pelle Conciata al Vegetale in Toscana",
    description: "Da bò Full-Grain thảo mộc tự nhiên từ vùng Tuscany, ủ tannin vỏ cây sồi không hóa chất chrome, càng dùng càng bóng đẹp.",
    origin: "Tuscany, Italia",
    icon: ShieldCheck,
  },
  {
    id: "oeko",
    name: "Tiêu chuẩn OEKO-TEX®",
    code: "OEKO-TEX Standard 100",
    subtitle: "Kiểm Định An Toàn Dệt May Thụy Sĩ",
    description: "Vải Bouclé dệt lông cừu & đệm lông vũ an toàn tuyệt đối cho làn da nhạy cảm, đạt cấp độ Class 1 an toàn cho cả trẻ sơ sinh.",
    origin: "Zurich, Thụy Sĩ",
    icon: Sparkles,
  },
  {
    id: "reddot",
    name: "ISO 9001:2015 & Red Dot",
    code: "Red Dot Design Award Winner",
    subtitle: "Design Concept & Kết Cấu Cơ Khí",
    description: "Quy trình kiểm định kết cấu khung chịu tải tĩnh 300kg, thử nghiệm nhún nảy 100.000 chu kỳ với cam kết bảo hành khung 10 năm.",
    origin: "Essen, Đức",
    icon: Award,
  },
];

// Part B: 3 Verified Client Reviews
interface TestimonialItem {
  id: string;
  clientName: string;
  clientTitle: string;
  location: string;
  sofaConfig: string;
  quote: string;
  roomImage: string;
  date: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "review-1",
    clientName: "KTS. Hoàng Minh Tuấn",
    clientTitle: "Founder Studio Kiến Trúc Thảo Điền",
    location: "TP. Hồ Chí Minh",
    sofaConfig: "Milano Modular Sofa (3.2m)",
    quote: "Tỷ lệ form dáng và đường chỉ khâu tay Saddle Stitching thực sự đạt đẳng cấp ngang ngửa các hãng nội thất tôi từng nhập từ Milan. Đệm bọt hybrid giữ phom cực tốt sau nhiều tháng khách ngồi liên tục.",
    roomImage: "/images/sofas/milano_taupe.jpg",
    date: "Đã thẩm định 4 tháng",
  },
  {
    id: "review-2",
    clientName: "Chị Nguyễn Lan Khuê",
    clientTitle: "Biệt thự Hoa Phượng",
    location: "Vinhomes Riverside, Hà Nội",
    sofaConfig: "Nordic Bouclé Lounge Sofa",
    quote: "Sợi vải Bouclé cừu chạm vào cực kỳ êm. Đội ngũ vận chuyển White-Glove bọc lót 4 lớp và lắp đặt tận phòng khách vô cùng chuyên nghiệp. Ghế cong tạo điểm nhấn mềm mại cho cả căn phòng.",
    roomImage: "/images/sofas/nordic_birch.jpg",
    date: "Đã bàn giao 2 tháng",
  },
  {
    id: "review-3",
    clientName: "Anh David Nguyễn",
    clientTitle: "Penthouse Tilia Residences",
    location: "Empire City, Thủ Thiêm",
    sofaConfig: "Verona Cognac Leather Sofa",
    quote: "Lớp da bò Ý lên màu Cognac trầm ấm tuyệt đẹp dưới ánh đèn vàng. Ngồi thử 3 tháng đệm lông vũ vẫn giữ nguyên độ phồng. Cảm giác da mịn mát và mùi hương thảo mộc tự nhiên rất tinh tế.",
    roomImage: "/images/sofas/verona_cognac.jpg",
    date: "Đã sử dụng 3 tháng",
  },
];

export default function CertificationsAndReviews() {
  return (
    <section
      id="certifications-reviews"
      className="scroll-mt-24 py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#4C637C]/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* PHẦN A: BẰNG CẤP & CHỨNG NHẬN CHẤT LƯỢNG (4 THẺ CHỨNG CHỈ DANH GIÁ)     */}
        {/* ========================================================================= */}
        <div className="mb-14 sm:mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#9A5B42] block mb-2 px-2">
              TIÊU CHUẨN XA XỈ QUỐC TẾ • CERTIFIED EXCELLENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#1C1917] font-normal leading-[1.2] mb-3 sm:mb-4">
              Bằng Cấp &amp; Chứng Nhận Chất Lượng
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] font-light leading-relaxed max-w-2xl mx-auto px-2">
              Mỗi tác phẩm sofa rời xưởng đều được bảo chứng bởi các tổ chức kiểm định vật liệu và thiết kế hàng đầu thế giới, đảm bảo giá trị trường tồn cùng năm tháng.
            </p>
            {/* Mobile Swipe Hint */}
            <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] text-[#9A5B42] font-medium mt-3 tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#CEB88E]" />
              <span>Vuốt ngang để xem 4 chứng chỉ quốc tế &rarr;</span>
            </div>
          </div>

          {/* 4 Cards: Horizontal Snap Carousel on Mobile, Grid on Desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:p-0 sm:m-0">
            {CERTIFICATIONS.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.id}
                  className="group relative bg-[#F0EBE1]/75 hover:bg-[#F0EBE1] backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#CEB88E]/30 hover:border-[#9A5B42]/50 transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/5 flex flex-col justify-between min-w-[80vw] sm:min-w-0 snap-center shrink-0 sm:shrink"
                >
                  <div>
                    {/* Compact Seal Header: Medallion and Title in flex row on mobile */}
                    <div className="flex items-start justify-between gap-3 mb-3.5 md:mb-5">
                      <div className="flex items-center gap-3">
                        {/* Medallion Seal Icon */}
                        <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#1C1917] via-[#2A2624] to-[#1C1917] border-2 border-[#CEB88E]/60 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
                          <Icon className="w-5 h-5 text-[#CEB88E]" />
                          {/* Little Gold Sparkle dot */}
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#CEB88E] ring-2 ring-[#F0EBE1]" />
                        </div>

                        <div>
                          <h3 className="font-serif text-base sm:text-lg font-semibold text-[#1C1917] group-hover:text-[#9A5B42] transition-colors leading-tight">
                            {cert.name}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] font-medium text-[#CEB88E] tracking-wide uppercase line-clamp-1">
                            {cert.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Origin Tag */}
                      <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#9A5B42] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#CEB88E]/20 shrink-0">
                        {cert.origin}
                      </span>
                    </div>

                    {/* Detailed Spec */}
                    <p className="text-xs text-[#57534E] font-light leading-relaxed mb-4">
                      {cert.description}
                    </p>
                  </div>

                  {/* Certification Code Footer */}
                  <div className="pt-3 border-t border-[#4C637C]/10 flex items-center justify-between text-[10px] text-[#57534E]/80">
                    <span className="font-mono tracking-tight">{cert.code}</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Hiệu lực 2026
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Carousel Indicator Dots */}
          <div className="flex sm:hidden justify-center items-center gap-1.5 mt-2 mb-2">
            {CERTIFICATIONS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === 0 ? "w-5 bg-[#9A5B42]" : "w-1.5 bg-[#9A5B42]/25"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHẦN B: FEEDBACK KHÁCH HÀNG THỰC TẾ & KIẾN TRÚC SƯ (VERIFIED REVIEWS GRID)*/}
        {/* ========================================================================= */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#9A5B42] block mb-2 px-2">
              TRẢI NGHIỆM KHÁCH HÀNG THỰC TẾ • VERIFIED ARCHIVE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#1C1917] font-normal leading-[1.2] mb-3 sm:mb-4">
              Không Gian Sống Của Khách Hàng &amp; KTS
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] font-light leading-relaxed max-w-2xl mx-auto px-2">
              Hình ảnh thực tế được chụp tại tư gia của các khách hàng và dự án căn hộ, biệt thự cao cấp đã hoàn thiện lắp đặt bởi đội ngũ Atelier.
            </p>
          </div>

          {/* 3 Verified Testimonial Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="group bg-[#F0EBE1]/60 rounded-3xl p-5 sm:p-7 border border-[#4C637C]/10 hover:border-[#9A5B42]/40 transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/5 flex flex-col justify-between"
              >
                <div>
                  {/* Actual Living Room Photo with Sofa Installed */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-200/60 mb-5 shadow-sm border border-stone-300/40">
                    <Image
                      src={item.roomImage}
                      alt={item.sofaConfig}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for Tag Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Verified Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917]/85 backdrop-blur-md text-[#FAF7F2] text-[10px] font-semibold tracking-wide border border-emerald-500/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Đã mua hàng &amp; Lắp đặt thực tế</span>
                    </div>

                    {/* Sofa Configuration Tag in Room */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#FAF7F2]">
                      <span className="text-[11px] font-medium tracking-wide drop-shadow-sm truncate">
                        {item.sofaConfig}
                      </span>
                      <span className="text-[10px] text-stone-300 tracking-wider font-light shrink-0 ml-2">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  {/* 5 Warm Gold Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-[#CEB88E] fill-[#CEB88E]"
                      />
                    ))}
                    <span className="text-[11px] font-semibold text-[#1C1917] ml-2 tracking-wide">
                      5.0 Tuyệt Đối
                    </span>
                  </div>

                  {/* Customer Quote */}
                  <div className="relative mb-6">
                    <Quote className="w-6 h-6 text-[#9A5B42]/20 absolute -top-2.5 -left-1 pointer-events-none" />
                    <p className="font-serif italic text-sm sm:text-[15px] text-[#1C1917] leading-relaxed pl-5 font-normal">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Client Profile Footer */}
                <div className="pt-4 border-t border-[#4C637C]/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#1C1917] group-hover:text-[#9A5B42] transition-colors">
                      {item.clientName}
                    </h4>
                    <p className="text-xs text-[#57534E] font-medium">
                      {item.clientTitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#9A5B42] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#9A5B42]" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
