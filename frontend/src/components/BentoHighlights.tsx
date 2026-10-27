"use client";

import React, { useEffect, useRef } from "react";
import { BentoSectionData } from "@/lib/graphql";
import { TreePine, Feather, ShieldCheck, Sparkles, Scissors, Compass, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BentoHighlightsProps {
  bentoData: BentoSectionData;
}

export default function BentoHighlights({ bentoData }: BentoHighlightsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered slide up of Bento cards upon scrolling - bulletproof against rapid anchor jumps
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".bento-item");

        gsap.fromTo(
          cards,
          { opacity: 0.2, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
              fastScrollEnd: true,
              onEnter: () => {
                gsap.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, overwrite: "auto" });
              },
            },
            onComplete: () => {
              gsap.set(cards, { clearProps: "all" });
            },
          }
        );

        // Safety listener for hash jumps (e.g. clicking menu link #craftsmanship)
        const handleHash = () => {
          if (window.location.hash === "#craftsmanship") {
            gsap.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.3, overwrite: "auto" });
          }
        };
        window.addEventListener("hashchange", handleHash);
        return () => window.removeEventListener("hashchange", handleHash);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "tree-pine":
        return <TreePine className="w-5 h-5 text-[#4C637C]" />;
      case "feather":
        return <Feather className="w-5 h-5 text-[#CEB88E]" />;
      case "shield-check":
        return <ShieldCheck className="w-5 h-5 text-[#4C637C]" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-[#CEB88E]" />;
      case "scissors":
        return <Scissors className="w-5 h-5 text-[#4C637C]" />;
      case "compass":
      default:
        return <Compass className="w-5 h-5 text-[#CEB88E]" />;
    }
  };

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      className="scroll-mt-24 py-20 lg:py-28 bg-[#DEE6EC]/40 border-t border-b border-[#4C637C]/[0.08] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#4C637C] block mb-2 px-2">
            {bentoData.superTitle}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#1E252D] font-normal leading-[1.2] mb-3 md:mb-4">
            {bentoData.heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6872] font-light leading-relaxed max-w-2xl mx-auto px-2">
            {bentoData.description}
          </p>
          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden items-center justify-center gap-1.5 text-[11px] text-[#4C637C] font-medium mt-3 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#CEB88E]" />
            <span>Vuốt ngang để xem 6 bí quyết chế tác &rarr;</span>
          </div>
        </div>

        {/* Bento Grid: Horizontal Snap Carousel on Mobile, Grid on Desktop */}
        <div
          ref={cardsRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:p-0 md:m-0"
        >
          {bentoData.features.map((item, idx) => {
            // Give specific cards distinctive rich aesthetic touches
            const isHighlight = idx === 0 || idx === 2;

            return (
              <div
                key={idx}
                className={`bento-item rounded-3xl p-5 md:p-8 flex flex-col justify-between transition-all duration-300 relative border min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center shrink-0 md:shrink ${
                  isHighlight
                    ? "bg-[#F8F2EF] border-[#CEB88E]/60 shadow-md shadow-[#4C637C]/5"
                    : "bg-[#F8F2EF] border-[#4C637C]/[0.1] hover:border-[#4C637C]/30 shadow-sm"
                }`}
              >
                <div>
                  {/* Top Bar with Icon and Tag */}
                  <div className="flex items-center justify-between mb-4 md:mb-5">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-[#DEE6EC] flex items-center justify-center shrink-0 shadow-inner">
                      {getIcon(item.icon)}
                    </div>
                    <span className="text-[10px] font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[#5F6872]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-[#1E252D] font-medium leading-snug mb-2 md:mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#5F6872] font-light leading-relaxed mb-4 md:mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Trust Micro-Bullet */}
                <div className="pt-3.5 md:pt-4 border-t border-[#4C637C]/[0.08] flex items-center gap-2 text-[10px] sm:text-[11px] font-medium text-[#1E252D]/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4C637C] shrink-0" />
                  <span>Tiêu chuẩn kiểm nghiệm xuất khẩu EU</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel Indicator Dots */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-2 mb-2">
          {bentoData.features.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === 0 ? "w-5 bg-[#4C637C]" : "w-1.5 bg-[#4C637C]/25"
              }`}
            />
          ))}
        </div>

        {/* Secondary Trust Note Strip */}
        <div className="mt-14 p-6 rounded-3xl bg-[#F8F2EF] border border-[#4C637C]/[0.1] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4C637C]/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#4C637C]" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg text-[#1E252D] font-medium">
                Chứng Chỉ Nguồn Gốc Gỗ &amp; Da Thuộc Ý (100% Traceability)
              </h4>
              <p className="text-xs text-[#5F6872] font-light">
                Mỗi bộ sofa giao tới khách hàng đều đi kèm Giấy chứng nhận nguồn gốc xuất xứ da Ý (Certificato di Origine) và tem đồng bảo chứng khắc laser.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("customizer");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-full bg-[#4C637C] hover:bg-[#3A4E63] text-[#F8F2EF] text-xs font-medium tracking-[0.1em] uppercase transition-colors shrink-0 cursor-pointer border border-[#CEB88E]/30"
          >
            Tùy Biến Sofa Ngay
          </button>
        </div>
      </div>
    </section>
  );
}
