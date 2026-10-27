"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDown, Sparkles, ShieldCheck, Ruler, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection({
  onExploreClick,
  onConsultClick,
}: {
  onExploreClick: () => void;
  onConsultClick: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Stagger Text Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-tag", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.2,
      })
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.18,
          },
          "-=0.6"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 25,
            duration: 1,
          },
          "-=0.7"
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          ".hero-badge",
          {
            opacity: 0,
            y: 20,
            stagger: 0.12,
            duration: 0.8,
          },
          "-=0.5"
        );

      // 2. Parallax on Scroll: Image zooms from 1.15 to 1.0 and drifts slower than text
      if (bgImageRef.current && containerRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.15, y: "0%" },
          {
            scale: 1.0,
            y: "22%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // Parallax text shift
      if (textContainerRef.current && containerRef.current) {
        gsap.to(textContainerRef.current, {
          y: "-15%",
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#1C1917]"
    >
      {/* Background Image Container with Parallax Scale */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center pointer-events-none will-change-transform opacity-70"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90')",
        }}
      />

      {/* Atmospheric Overlays for Warm Luxury Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/40 to-[#1C1917]/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(206,184,142,0.18)_0%,transparent_75%)]" />

      {/* Hero Content */}
      <div
        ref={textContainerRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#F8F2EF] py-20 lg:py-28"
      >
        {/* Editorial Subtitle Tag */}
        <div className="hero-tag inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#CEB88E]/40 bg-black/40 backdrop-blur-md text-[11px] font-medium tracking-[0.25em] uppercase text-[#F8F2EF] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#CEB88E]" />
          <span>BỘ SƯU TẬP ATELIER 2026 • THỦ CÔNG Ý</span>
        </div>

        {/* Grand Headline (Playfair Display) */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.01em] font-normal leading-[1.08] mb-6">
          <span className="hero-title-line block">Nghệ Thuật Nội Thất Ý</span>
          <span className="hero-title-line block font-serif italic text-[#E1D7D2] font-light">
            Cho Không Gian Vượt Thời Gian
          </span>
        </h1>

        {/* Descriptive Statement */}
        <p className="hero-desc font-sans text-[#DEE6EC] text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10 text-balance">
          Hội tụ giữa kỹ thuật mộc mộng tinh tế từ vùng Lombardy và các dòng da bò tự nhiên Tuscany nguyên bản. Tạo tác riêng cho những tư gia đẳng cấp.
        </p>

        {/* Hero CTAs */}
        <div className="hero-actions flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#4C637C] hover:bg-[#3A4E63] text-[#F8F2EF] font-medium text-xs tracking-[0.16em] uppercase transition-all shadow-xl shadow-black/25 flex items-center justify-center gap-2 group cursor-pointer border border-[#CEB88E]/30"
          >
            <span>Khám Phá Bộ Sưu Tập</span>
            <ArrowRight className="w-4 h-4 text-[#CEB88E] group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onConsultClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#E1D7D2]/30 text-[#F8F2EF] font-medium text-xs tracking-[0.16em] uppercase transition-all cursor-pointer"
          >
            Đặt Lịch Thăm Salon VIP
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto pt-6 border-t border-white/10 text-left">
          <div className="hero-badge flex items-center gap-3 p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#4C637C]/60 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#CEB88E]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold text-white">Da Bò Ý &amp; Bouclé Thật</h2>
              <p className="text-[11px] text-[#C8D7E1]">100% da thuộc thảo mộc tự nhiên</p>
            </div>
          </div>

          <div className="hero-badge flex items-center gap-3 p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#4C637C]/60 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#CEB88E]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold text-white">Bảo Hành Khung 10 Năm</h2>
              <p className="text-[11px] text-[#C8D7E1]">Gỗ sồi Nga nguyên khối sấy 6 tháng</p>
            </div>
          </div>

          <div className="hero-badge flex items-center gap-3 p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#4C637C]/60 flex items-center justify-center shrink-0">
              <Ruler className="w-4 h-4 text-[#CEB88E]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold text-white">May Đo Bespoke Tỉ Lệ</h2>
              <p className="text-[11px] text-[#C8D7E1]">Chuẩn xác từng centimet bản vẽ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gentle Scroll Down Indicator */}
      <button
        onClick={onExploreClick}
        aria-label="Cuộn xuống xem sản phẩm"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#C8D7E1] hover:text-[#CEB88E] transition-colors cursor-pointer group"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-light">Cuộn Khám Phá</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#CEB88E]" />
      </button>
    </section>
  );
}
