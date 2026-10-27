"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Phone, MapPin, Menu, X, Compass, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsult: () => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  onOpenConsult,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#4C637C] text-[#F8F2EF] text-[10px] sm:text-[11px] font-medium tracking-[0.12em] sm:tracking-[0.18em] uppercase py-1.5 sm:py-2 px-3 sm:px-4 text-center border-b border-white/[0.12]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline-flex items-center gap-1.5 text-[#C8D7E1]">
            <MapPin className="w-3 h-3 text-[#CEB88E]" /> Flagship Showroom: Hà Nội &amp; TP. Hồ Chí Minh
          </span>
          <span className="mx-auto md:mx-0 font-medium">
            MIỄN PHÍ GỬI HỘP MẪU VẢI &amp; DA Ý TẬN NHÀ TRÊN TOÀN QUỐC
          </span>
          <a
            href="tel:0908888999"
            className="hidden md:inline-flex items-center gap-1.5 text-[#C8D7E1] hover:text-[#F8F2EF] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#CEB88E]" /> Hotline VIP: 0908.888.999
          </a>
        </div>
      </div>

      {/* Main Navigation Header - Fixed clean height on mobile without text clipping */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F8F2EF]/95 backdrop-blur-md shadow-sm border-b border-[#4C637C]/[0.08]"
            : "bg-[#F8F2EF]/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - Compact and vertically centered to prevent top clipping */}
          <a href="#" className="flex flex-col group justify-center py-1">
            <span className="font-serif text-base sm:text-lg md:text-2xl lg:text-3xl tracking-[0.08em] font-medium text-[#1E252D] group-hover:text-[#4C637C] transition-colors leading-tight">
              ATELIER SOFA
            </span>
            <span className="text-[9px] tracking-[0.2em] sm:tracking-[0.35em] uppercase text-[#4C637C]/70 -mt-0.5">
              MILANO • BẮC ÂU
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-[0.14em] uppercase font-medium text-[#1E252D]/80">
            <a
              href="#customizer"
              className="hover:text-[#4C637C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#CEB88E] hover:after:w-full after:transition-all"
            >
              Bộ Sưu Tập
            </a>
            <a
              href="#craftsmanship"
              className="hover:text-[#4C637C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#CEB88E] hover:after:w-full after:transition-all"
            >
              Di Sản Chế Tác
            </a>
            <a
              href="#collection-archive"
              className="hover:text-[#4C637C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#CEB88E] hover:after:w-full after:transition-all"
            >
              Tuyển Tập Độc Bản
            </a>
            <a
              href="#certifications-reviews"
              className="hover:text-[#4C637C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#CEB88E] hover:after:w-full after:transition-all"
            >
              Chứng Nhận &amp; Đánh Giá
            </a>
            <a
              href="#dimensions"
              className="hover:text-[#4C637C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#CEB88E] hover:after:w-full after:transition-all"
            >
              Kích Thước &amp; Phòng
            </a>
            <a
              href="#lien-he"
              className="hover:text-[#4C637C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#CEB88E] hover:after:w-full after:transition-all"
            >
              Đặt Chế Tác
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3.5 sm:space-x-4">
            <button
              onClick={onOpenConsult}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#4C637C]/25 text-xs font-medium tracking-[0.1em] uppercase text-[#1E252D] hover:bg-[#4C637C] hover:text-[#F8F2EF] hover:border-[#4C637C] transition-all cursor-pointer"
            >
              <span>Tư Vấn Thiết Kế</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#CEB88E]" />
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              aria-label="Giỏ hàng chế tác"
              className="relative p-2.5 rounded-full hover:bg-[#E1D7D2]/50 text-[#1E252D] transition-colors cursor-pointer group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform text-[#1E252D]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#CEB88E] text-[#1E252D] text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-50 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-[#E1D7D2]/50 text-[#1E252D] transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#F8F2EF] pt-28 px-6 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-6 text-lg font-serif text-[#1E252D]">
            <a
              href="#customizer"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#4C637C]/10 pb-3 flex justify-between items-center"
            >
              <span>Bộ Sưu Tập Sofa</span>
              <ArrowUpRight className="w-4 h-4 text-[#CEB88E]" />
            </a>
            <a
              href="#craftsmanship"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#4C637C]/10 pb-3 flex justify-between items-center"
            >
              <span>Di Sản &amp; Tay Nghề Thủ Công</span>
              <ArrowUpRight className="w-4 h-4 text-[#CEB88E]" />
            </a>
            <a
              href="#collection-archive"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#4C637C]/10 pb-3 flex justify-between items-center"
            >
              <span>Tuyển Tập Độc Bản 2026</span>
              <ArrowUpRight className="w-4 h-4 text-[#CEB88E]" />
            </a>
            <a
              href="#certifications-reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#4C637C]/10 pb-3 flex justify-between items-center"
            >
              <span>Chứng Nhận &amp; Đánh Giá</span>
              <ArrowUpRight className="w-4 h-4 text-[#CEB88E]" />
            </a>
            <a
              href="#dimensions"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#4C637C]/10 pb-3 flex justify-between items-center"
            >
              <span>Sơ Đồ Kích Thước &amp; Phòng</span>
              <ArrowUpRight className="w-4 h-4 text-[#CEB88E]" />
            </a>
            <a
              href="#lien-he"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#4C637C]/10 pb-3 flex justify-between items-center"
            >
              <span>Đăng Ký Tư Vấn &amp; Đặt Chế Tác</span>
              <ArrowUpRight className="w-4 h-4 text-[#CEB88E]" />
            </a>
          </nav>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsult();
              }}
              className="w-full py-3.5 rounded-full bg-[#4C637C] text-[#F8F2EF] font-medium text-sm tracking-[0.1em] uppercase hover:bg-[#3A4E63] transition-colors"
            >
              Đặt Lịch Tư Vấn Salon VIP
            </button>
            <a
              href="tel:0908888999"
              className="w-full py-3 rounded-full border border-[#4C637C]/20 text-[#1E252D] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#E1D7D2]/40"
            >
              <Phone className="w-4 h-4 text-[#CEB88E]" />
              Hotline: 0908.888.999
            </a>
          </div>
        </div>
      )}
    </>
  );
}
