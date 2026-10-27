"use client";

import React, { useState } from "react";
import { Maximize2, FileText, Check, Ruler } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DimensionsGuide({
  onOpenConsult,
}: {
  onOpenConsult: () => void;
}) {
  const [selectedConfig, setSelectedConfig] = useState(1);

  const configs = [
    {
      title: "Cấu hình 1: 2.4m Tiêu Chuẩn",
      subheading: "Văng Thẳng 3 Chỗ Ngồi",
      subtitle: "Phù hợp căn hộ cao cấp 85m² – 125m²",
      length: "240 cm",
      depth: "102 cm",
      height: "76 cm",
      seatDepth: "68 cm",
      seatHeight: "42 cm",
      armWidth: "26 cm",
      tableDistance: "45 cm (khoảng cách lý tưởng tới bàn trà)",
      roomAdvice: "Thích hợp kê sát tường hoặc làm vách ngăn mở phân chia khu vực tiếp khách và bàn ăn. Khoảng cách 45cm giúp lối đi lại thoải mái.",
    },
    {
      title: "Cấu hình 2: 3.2m Góc Chữ L",
      subheading: "Góc Chữ L Thư Giãn (Chaise Lounge)",
      subtitle: "Bán chạy nhất cho Duplex & Nhà phố 130m² – 220m²",
      length: "320 cm",
      depth: "175 cm (Phần chữ L)",
      height: "76 cm",
      seatDepth: "72 cm",
      seatHeight: "42 cm",
      armWidth: "28 cm",
      tableDistance: "50 cm",
      roomAdvice: "Phần góc L mở rộng 175cm tạo góc nằm đọc sách và xem phim tối ưu. Góc quay có thể tùy chỉnh quay trái (L-Left) hoặc quay phải (L-Right) theo mặt bằng.",
    },
    {
      title: "Cấu hình 3: 3.8m Grand Sectional",
      subheading: "Tổ Hợp Villa & Penthouse",
      subtitle: "Dành riêng cho Penthouse & Biệt thự đơn lập",
      length: "380 cm",
      depth: "210 cm (Sectional)",
      height: "76 cm",
      seatDepth: "75 cm",
      seatHeight: "42 cm",
      armWidth: "30 cm",
      tableDistance: "60 cm",
      roomAdvice: "Bố trí giữa phòng khách lớn không chạm tường (Free-standing) phô diễn trọn vẹn lưng da thuộc hoàn mỹ và hệ mô-đun kết hợp bàn trà travertine đôi.",
    },
  ];

  const current = configs[selectedConfig];

  return (
    <section id="dimensions" className="scroll-mt-24 py-14 lg:py-28 bg-[#F8F2EF] border-b border-[#4C637C]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#4C637C] block mb-2 px-2">
            TƯ VẤN BỐ TRÍ KHÔNG GIAN
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#1E252D] font-normal leading-[1.2] mb-3 sm:mb-4">
            Sơ Đồ Kích Thước &amp; Room Fit
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6872] font-light leading-relaxed max-w-2xl mx-auto px-2">
            Mỗi bộ sofa được tính toán nhân trắc học hoàn hảo nhằm đem lại tư thế ngồi chuẩn công thái học và tỷ lệ hài hòa với căn phòng.
          </p>
        </div>

        {/* Configuration Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {configs.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedConfig(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-[0.08em] transition-all cursor-pointer ${
                selectedConfig === idx
                  ? "bg-[#4C637C] text-[#F8F2EF] shadow-md ring-2 ring-[#4C637C]/20"
                  : "bg-[#DEE6EC] text-[#1E252D] hover:bg-[#E1D7D2]"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Blueprint Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#DEE6EC]/50 rounded-3xl p-6 sm:p-10 border border-[#4C637C]/[0.1]">
          {/* Visual Schematic Diagram (Left Column) */}
          <div className="lg:col-span-7 bg-[#F8F2EF] rounded-2xl p-6 sm:p-8 border border-[#4C637C]/[0.1] shadow-sm relative">
            <div className="flex items-center justify-between border-b border-[#4C637C]/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-[#4C637C]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1E252D]">
                  Bản Vẽ Mặt Bằng Kiến Trúc Tỉ Lệ 1:20
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono text-[#4C637C] font-semibold bg-[#4C637C]/10 px-2.5 py-0.5 rounded-full">
                {current.subheading}
              </span>
            </div>

            {/* Architectural Sofa Sketch Diagram */}
            <div className="relative aspect-[16/10] w-full border border-dashed border-[#4C637C]/30 rounded-xl flex items-center justify-center p-4 bg-[#F8F2EF] overflow-hidden select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedConfig}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {selectedConfig === 0 && (
                    /* Config 0: 2.4m Straight (3 Chỗ ngồi thẳng) */
                    <svg viewBox="0 0 600 360" className="w-full h-full max-h-[340px]">
                      {/* Blueprint Grid Lines */}
                      <defs>
                        <pattern id="grid-24" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4C637C" strokeWidth="0.5" strokeOpacity="0.08" />
                        </pattern>
                      </defs>
                      <rect width="600" height="360" fill="url(#grid-24)" />

                      {/* Area Rug Outline */}
                      <rect x="60" y="80" width="480" height="230" rx="8" fill="#E1D7D2" fillOpacity="0.35" stroke="#4C637C" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
                      <text x="75" y="100" fill="#4C637C" fillOpacity="0.6" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">THẢM SÀN 3.0m x 2.0m</text>

                      {/* Main Sofa Body (2.4m Straight) */}
                      <rect x="90" y="90" width="420" height="125" rx="14" fill="#E1D7D2" stroke="#4C637C" strokeWidth="2" />
                      
                      {/* Ergonomic Backrest */}
                      <rect x="94" y="94" width="412" height="34" rx="8" fill="#4C637C" fillOpacity="0.15" stroke="#4C637C" strokeWidth="1" strokeOpacity="0.3" />
                      <text x="300" y="115" textAnchor="middle" fill="#4C637C" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="0.15em">TỰA LƯNG LÔNG VŨ CÔNG THÁI HỌC (1020 mm)</text>

                      {/* Left Armrest */}
                      <rect x="90" y="90" width="38" height="125" rx="8" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.5" />
                      <text x="109" y="160" textAnchor="middle" fill="#4C637C" fontSize="8" fontFamily="monospace" transform="rotate(-90 109 160)">TAY VỊN 26cm</text>

                      {/* Right Armrest */}
                      <rect x="472" y="90" width="38" height="125" rx="8" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.5" />
                      <text x="491" y="160" textAnchor="middle" fill="#4C637C" fontSize="8" fontFamily="monospace" transform="rotate(90 491 160)">TAY VỊN 26cm</text>

                      {/* 3 Seat Cushions */}
                      <rect x="134" y="132" width="108" height="78" rx="8" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.2" />
                      <text x="188" y="174" textAnchor="middle" fill="#1E252D" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Đệm 1</text>
                      <text x="188" y="188" textAnchor="middle" fill="#5F6872" fontSize="8" fontFamily="monospace">70x68cm</text>

                      <rect x="246" y="132" width="108" height="78" rx="8" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.2" />
                      <text x="300" y="174" textAnchor="middle" fill="#1E252D" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Đệm 2</text>
                      <text x="300" y="188" textAnchor="middle" fill="#5F6872" fontSize="8" fontFamily="monospace">70x68cm</text>

                      <rect x="358" y="132" width="108" height="78" rx="8" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.2" />
                      <text x="412" y="174" textAnchor="middle" fill="#1E252D" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Đệm 3</text>
                      <text x="412" y="188" textAnchor="middle" fill="#5F6872" fontSize="8" fontFamily="monospace">70x68cm</text>

                      {/* Coffee Table */}
                      <rect x="200" y="255" width="200" height="45" rx="10" fill="#F8F2EF" stroke="#CEB88E" strokeWidth="1.5" />
                      <text x="300" y="278" textAnchor="middle" fill="#1E252D" fontSize="9" fontFamily="sans-serif" fontWeight="600">BÀN TRÀ TỰ NHIÊN (120 x 60 cm)</text>
                      <text x="300" y="290" textAnchor="middle" fill="#CEB88E" fontSize="7.5" fontFamily="monospace">GỖ SỒI NGA / ĐÁ MARBLE</text>

                      {/* Distance indicator between sofa & table */}
                      <line x1="300" y1="215" x2="300" y2="255" stroke="#4C637C" strokeWidth="1.2" strokeDasharray="2 2" />
                      <circle cx="300" cy="217" r="2" fill="#4C637C" />
                      <circle cx="300" cy="253" r="2" fill="#4C637C" />
                      <rect x="270" y="228" width="60" height="15" rx="4" fill="#4C637C" />
                      <text x="300" y="239" textAnchor="middle" fill="#F8F2EF" fontSize="8" fontFamily="monospace" fontWeight="bold">45 cm</text>

                      {/* Architectural Dimension Arrows */}
                      {/* TOP LENGTH DIMENSION: 2400 mm */}
                      <line x1="90" y1="58" x2="510" y2="58" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="90" y1="50" x2="90" y2="66" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="510" y1="50" x2="510" y2="66" stroke="#4C637C" strokeWidth="1.5" />
                      <polygon points="90,58 97,55 97,61" fill="#4C637C" />
                      <polygon points="510,58 503,55 503,61" fill="#4C637C" />
                      <rect x="215" y="48" width="170" height="20" rx="6" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1" />
                      <text x="300" y="62" textAnchor="middle" fill="#4C637C" fontSize="10" fontFamily="monospace" fontWeight="bold">CHIỀU DÀI: 2.400 mm (2.4m)</text>

                      {/* RIGHT DEPTH DIMENSION: 1020 mm */}
                      <line x1="535" y1="90" x2="535" y2="215" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="527" y1="90" x2="543" y2="90" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="527" y1="215" x2="543" y2="215" stroke="#4C637C" strokeWidth="1.5" />
                      <polygon points="535,90 532,97 538,97" fill="#4C637C" />
                      <polygon points="535,215 532,208 538,208" fill="#4C637C" />
                      <text x="548" y="157" fill="#4C637C" fontSize="9.5" fontFamily="monospace" fontWeight="bold">1.020 mm</text>
                    </svg>
                  )}

                  {selectedConfig === 1 && (
                    /* Config 1: 3.2m L-Shape (Góc Chữ L Thư Giãn) */
                    <svg viewBox="0 0 600 360" className="w-full h-full max-h-[340px]">
                      {/* Grid */}
                      <defs>
                        <pattern id="grid-32" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4C637C" strokeWidth="0.5" strokeOpacity="0.08" />
                        </pattern>
                      </defs>
                      <rect width="600" height="360" fill="url(#grid-32)" />

                      {/* Area Rug Outline */}
                      <rect x="40" y="75" width="510" height="245" rx="8" fill="#E1D7D2" fillOpacity="0.35" stroke="#4C637C" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
                      <text x="55" y="95" fill="#4C637C" fillOpacity="0.6" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">THẢM SÀN GÓC CHỮ L: 3.5m x 2.4m</text>

                      {/* L-SHAPE SOFA POLYGON */}
                      <path
                        d="M 65 90 L 515 90 A 14 14 0 0 1 529 104 L 529 276 A 14 14 0 0 1 515 290 L 395 290 A 14 14 0 0 1 381 276 L 381 204 L 79 204 A 14 14 0 0 1 65 190 Z"
                        fill="#E1D7D2"
                        stroke="#4C637C"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />

                      {/* Backrest along top */}
                      <path
                        d="M 69 94 L 511 94 A 8 8 0 0 1 519 102 L 519 126 A 6 6 0 0 1 513 132 L 75 132 A 6 6 0 0 1 69 126 Z"
                        fill="#4C637C"
                        fillOpacity="0.15"
                        stroke="#4C637C"
                        strokeWidth="1"
                        strokeOpacity="0.3"
                      />
                      <text x="245" y="116" textAnchor="middle" fill="#4C637C" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="0.15em">TỰA LƯNG MÔ-ĐUN Ý (1020 mm)</text>

                      {/* Left Armrest */}
                      <rect x="65" y="90" width="34" height="114" rx="8" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.5" />
                      <text x="82" y="150" textAnchor="middle" fill="#4C637C" fontSize="8" fontFamily="monospace" transform="rotate(-90 82 150)">TAY VỊN 28cm</text>

                      {/* Right Chaise Side Border / Arm */}
                      <rect x="495" y="90" width="34" height="200" rx="8" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.5" />
                      <text x="512" y="195" textAnchor="middle" fill="#4C637C" fontSize="8" fontFamily="monospace" transform="rotate(90 512 195)">TỰA CHỮ L 28cm</text>

                      {/* Main Seat Cushions */}
                      <rect x="105" y="136" width="86" height="62" rx="7" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.2" />
                      <text x="148" y="172" textAnchor="middle" fill="#1E252D" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">Đệm 1</text>

                      <rect x="195" y="136" width="86" height="62" rx="7" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.2" />
                      <text x="238" y="172" textAnchor="middle" fill="#1E252D" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">Đệm 2</text>

                      <rect x="285" y="136" width="90" height="62" rx="7" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.2" />
                      <text x="330" y="172" textAnchor="middle" fill="#1E252D" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">Góc Chữ L</text>

                      {/* Extended Chaise Lounge Cushion */}
                      <rect x="381" y="136" width="110" height="148" rx="8" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.5" />
                      <rect x="391" y="146" width="90" height="45" rx="5" fill="#CEB88E" fillOpacity="0.2" stroke="#CEB88E" strokeDasharray="2 2" />
                      <text x="436" y="172" textAnchor="middle" fill="#4C637C" fontSize="9" fontFamily="monospace" fontWeight="bold">GỐI TỰA ĐẦU</text>
                      <text x="436" y="215" textAnchor="middle" fill="#1E252D" fontSize="12" fontFamily="sans-serif" fontWeight="bold">CHAISE THƯ GIÃN</text>
                      <text x="436" y="232" textAnchor="middle" fill="#4C637C" fontSize="9" fontFamily="monospace" fontWeight="bold">SÂU 1.750 mm</text>
                      <text x="436" y="246" textAnchor="middle" fill="#5F6872" fontSize="7.5" fontFamily="monospace">(Đổi trái/phải tùy chọn)</text>

                      {/* Coffee Table nestled in L opening */}
                      <rect x="150" y="222" width="180" height="52" rx="12" fill="#F8F2EF" stroke="#CEB88E" strokeWidth="1.5" />
                      <text x="240" y="247" textAnchor="middle" fill="#1E252D" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">BÀN TRÀ BESPOKE CHỮ L (130x65cm)</text>
                      <text x="240" y="260" textAnchor="middle" fill="#CEB88E" fontSize="8" fontFamily="monospace">MẶT ĐÁ TRAVERTINE Ý</text>

                      {/* Clearance indicator */}
                      <line x1="330" y1="248" x2="381" y2="248" stroke="#4C637C" strokeWidth="1.2" strokeDasharray="2 2" />
                      <rect x="342" y="240" width="30" height="16" rx="4" fill="#4C637C" />
                      <text x="357" y="251" textAnchor="middle" fill="#F8F2EF" fontSize="8" fontFamily="monospace" fontWeight="bold">50cm</text>

                      {/* Dimension: TOP TOTAL LENGTH 3200 mm */}
                      <line x1="65" y1="58" x2="529" y2="58" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="65" y1="50" x2="65" y2="66" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="529" y1="50" x2="529" y2="66" stroke="#4C637C" strokeWidth="1.5" />
                      <polygon points="65,58 72,55 72,61" fill="#4C637C" />
                      <polygon points="529,58 522,55 522,61" fill="#4C637C" />
                      <rect x="205" y="48" width="180" height="20" rx="6" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1" />
                      <text x="295" y="62" textAnchor="middle" fill="#4C637C" fontSize="10" fontFamily="monospace" fontWeight="bold">CHIỀU DÀI: 3.200 mm (3.2m)</text>

                      {/* Dimension: RIGHT TOTAL L-DEPTH 1750 mm */}
                      <line x1="548" y1="90" x2="548" y2="290" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="540" y1="90" x2="556" y2="90" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="540" y1="290" x2="556" y2="290" stroke="#4C637C" strokeWidth="1.5" />
                      <polygon points="548,90 545,97 551,97" fill="#4C637C" />
                      <polygon points="548,290 545,283 551,283" fill="#4C637C" />
                      <text x="560" y="195" fill="#4C637C" fontSize="9.5" fontFamily="monospace" fontWeight="bold">1.750 mm</text>
                      <text x="560" y="208" fill="#5F6872" fontSize="7.5" fontFamily="monospace">(Phần L)</text>
                    </svg>
                  )}

                  {selectedConfig === 2 && (
                    /* Config 2: 3.8m Grand Sectional (Villa & Penthouse) */
                    <svg viewBox="0 0 600 360" className="w-full h-full max-h-[340px]">
                      <defs>
                        <pattern id="grid-38" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4C637C" strokeWidth="0.5" strokeOpacity="0.08" />
                        </pattern>
                      </defs>
                      <rect width="600" height="360" fill="url(#grid-38)" />

                      {/* Area Rug Outline */}
                      <rect x="25" y="70" width="550" height="260" rx="10" fill="#E1D7D2" fillOpacity="0.35" stroke="#4C637C" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
                      <text x="40" y="90" fill="#4C637C" fillOpacity="0.6" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">KHÔNG GIAN VILLA: 4.2m x 2.8m</text>

                      {/* GRAND SECTIONAL U-SHAPE / EXTENDED CHAISE LAYOUT */}
                      {/* Left Daybed Module */}
                      <rect x="45" y="90" width="95" height="180" rx="10" fill="#E1D7D2" stroke="#4C637C" strokeWidth="1.8" />
                      <rect x="49" y="125" width="87" height="140" rx="6" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.2" />
                      <text x="92" y="195" textAnchor="middle" fill="#1E252D" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Daybed</text>
                      <text x="92" y="210" textAnchor="middle" fill="#4C637C" fontSize="8" fontFamily="monospace">1.600 mm</text>

                      {/* Central Main Sofa (3 Deep Modules) */}
                      <rect x="145" y="90" width="280" height="120" rx="10" fill="#E1D7D2" stroke="#4C637C" strokeWidth="1.8" />
                      <rect x="149" y="94" width="272" height="32" rx="6" fill="#4C637C" fillOpacity="0.15" stroke="#4C637C" strokeWidth="1" strokeOpacity="0.3" />
                      <text x="285" y="115" textAnchor="middle" fill="#4C637C" fontSize="9" fontFamily="monospace" fontWeight="bold">TỰA LƯNG GRAND VILLA (1050 mm)</text>

                      <rect x="152" y="130" width="86" height="74" rx="6" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.2" />
                      <text x="195" y="172" textAnchor="middle" fill="#1E252D" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">Mô-đun 1</text>

                      <rect x="242" y="130" width="86" height="74" rx="6" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.2" />
                      <text x="285" y="172" textAnchor="middle" fill="#1E252D" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">Mô-đun 2</text>

                      <rect x="332" y="130" width="86" height="74" rx="6" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.2" />
                      <text x="375" y="172" textAnchor="middle" fill="#1E252D" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">Mô-đun 3</text>

                      {/* Right Grand Chaise (Deep 210cm) */}
                      <rect x="430" y="90" width="115" height="215" rx="10" fill="#E1D7D2" stroke="#4C637C" strokeWidth="1.8" />
                      <rect x="434" y="125" width="107" height="175" rx="7" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1.4" />
                      <text x="487" y="215" textAnchor="middle" fill="#1E252D" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Grand Chaise</text>
                      <text x="487" y="232" textAnchor="middle" fill="#4C637C" fontSize="9" fontFamily="monospace" fontWeight="bold">SÂU 2.100 mm</text>
                      <text x="487" y="246" textAnchor="middle" fill="#CEB88E" fontSize="7.5" fontFamily="monospace">(Tổng Thống)</text>

                      {/* Twin Travertine Round Coffee Tables */}
                      <circle cx="245" cy="255" r="34" fill="#F8F2EF" stroke="#CEB88E" strokeWidth="1.8" />
                      <text x="245" y="258" textAnchor="middle" fill="#1E252D" fontSize="9" fontFamily="sans-serif" fontWeight="bold">BÀN TRÒN Ø70</text>
                      
                      <circle cx="310" cy="242" r="26" fill="#F8F2EF" stroke="#CEB88E" strokeWidth="1.5" strokeDasharray="3 2" />
                      <text x="310" y="245" textAnchor="middle" fill="#1E252D" fontSize="8" fontFamily="sans-serif" fontWeight="bold">BÀN PHỤ Ø50</text>

                      {/* Clearance indicator */}
                      <line x1="336" y1="242" x2="430" y2="242" stroke="#4C637C" strokeWidth="1.2" strokeDasharray="2 2" />
                      <rect x="365" y="234" width="36" height="16" rx="4" fill="#4C637C" />
                      <text x="383" y="245" textAnchor="middle" fill="#F8F2EF" fontSize="8" fontFamily="monospace" fontWeight="bold">60 cm</text>

                      {/* Dimension: TOP GRAND LENGTH 3800 mm */}
                      <line x1="45" y1="56" x2="545" y2="56" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="45" y1="48" x2="45" y2="64" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="545" y1="48" x2="545" y2="64" stroke="#4C637C" strokeWidth="1.5" />
                      <polygon points="45,56 52,53 52,59" fill="#4C637C" />
                      <polygon points="545,56 538,53 538,59" fill="#4C637C" />
                      <rect x="195" y="46" width="210" height="20" rx="6" fill="#F8F2EF" stroke="#4C637C" strokeWidth="1" />
                      <text x="300" y="60" textAnchor="middle" fill="#4C637C" fontSize="10" fontFamily="monospace" fontWeight="bold">GRAND LENGTH: 3.800 mm (3.8m)</text>

                      {/* Dimension: RIGHT MAX DEPTH 2100 mm */}
                      <line x1="562" y1="90" x2="562" y2="305" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="554" y1="90" x2="570" y2="90" stroke="#4C637C" strokeWidth="1.5" />
                      <line x1="554" y1="305" x2="570" y2="305" stroke="#4C637C" strokeWidth="1.5" />
                      <polygon points="562,90 559,97 565,97" fill="#4C637C" />
                      <polygon points="562,305 559,298 565,298" fill="#4C637C" />
                      <text x="575" y="195" fill="#4C637C" fontSize="9.5" fontFamily="monospace" fontWeight="bold">2.100 mm</text>
                      <text x="575" y="208" fill="#5F6872" fontSize="7.5" fontFamily="monospace">(Grand)</text>
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Room Fit Recommendation Note */}
            <div className="mt-6 p-4 rounded-xl bg-[#DEE6EC]/60 border border-[#4C637C]/[0.08] text-xs">
              <span className="font-semibold text-[#1E252D] block mb-1">
                Gợi Ý Bố Trí Của Kiến Trúc Sư:
              </span>
              <p className="text-[#5F6872] font-light leading-relaxed">
                {current.roomAdvice}
              </p>
            </div>
          </div>

          {/* Detailed Dimensions Matrix (Right Column) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4C637C] block mb-1">
                THÔNG SỐ CHI TIẾT
              </span>
              <h3 className="font-serif text-2xl text-[#1E252D] font-medium">
                {current.title}
              </h3>
              <p className="text-xs text-[#5F6872] mt-1">{current.subtitle}</p>
            </div>

            {/* Specs Table */}
            <div className="space-y-3 divide-y divide-[#4C637C]/[0.08] text-xs">
              <div className="flex justify-between pt-2">
                <span className="text-[#5F6872]">Chiều Dài Phủ Bì (L):</span>
                <span className="font-semibold text-[#1E252D] font-mono">{current.length}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-[#5F6872]">Chiều Sâu Tổng Thể (D):</span>
                <span className="font-semibold text-[#1E252D] font-mono">{current.depth}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-[#5F6872]">Chiều Cao Tựa Lưng (H):</span>
                <span className="font-semibold text-[#1E252D] font-mono">{current.height}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-[#5F6872]">Chiều Sâu Lòng Ngồi:</span>
                <span className="font-semibold text-[#1E252D] font-mono">{current.seatDepth}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-[#5F6872]">Chiều Cao Đệm Ngồi:</span>
                <span className="font-semibold text-[#1E252D] font-mono">{current.seatHeight}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-[#5F6872]">Bề Rộng Tay Vịn:</span>
                <span className="font-semibold text-[#1E252D] font-mono">{current.armWidth}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-[#5F6872]">Khoảng Cách Tới Bàn Trà:</span>
                <span className="font-semibold text-[#4C637C] font-mono">{current.tableDistance}</span>
              </div>
            </div>

            {/* Download CAD/3D SketchUp button */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={onOpenConsult}
                className="w-full py-3.5 px-5 rounded-full bg-[#4C637C] hover:bg-[#3A4E63] text-[#F8F2EF] text-xs font-medium tracking-[0.1em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#CEB88E]/30"
              >
                <FileText className="w-4 h-4 text-[#CEB88E]" />
                <span>Nhận File CAD 2D/3D Cho Kiến Trúc Sư</span>
              </button>
              <p className="text-[11px] text-[#5F6872] text-center font-light">
                Hỗ trợ tùy biến kích thước lẻ theo từng 5cm phù hợp vị trí cột hoặc hốc tường.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
