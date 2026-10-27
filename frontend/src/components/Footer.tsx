"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ShieldCheck, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer id="showroom" className="scroll-mt-24 bg-[#1E252D] text-[#F8F2EF] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.08em] font-medium text-[#F8F2EF] block">
                ATELIER SOFA
              </span>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#CEB88E] block mt-1">
                MILANO • SCANDINAVIA • VIETNAM
              </span>
            </div>

            <p className="text-xs text-[#DEE6EC]/80 font-light leading-relaxed max-w-sm">
              Xưởng may đo sofa cao cấp theo phong cách Italian Modern &amp; Nordic Minimalism. Cam kết sử dụng 100% da bò tự nhiên vùng Tuscany và khung gỗ sồi Nga sấy chân không.
            </p>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#C8D7E1]">
                <Award className="w-4 h-4 text-[#CEB88E]" />
                <span>Thành viên Hiệp hội Gỗ Ý (FederlegnoArredo)</span>
              </div>
            </div>
          </div>

          {/* Showroom Addresses Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#CEB88E]">
              Hệ Thống Flagship Salon
            </h4>
            <div className="space-y-4 text-xs font-light text-[#DEE6EC]/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#CEB88E] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-medium text-white block">Salon Hà Nội:</strong>
                  <span>Villa 18, Đường Hoa Phượng, Vinhomes Riverside &amp; 68 Tràng Tiền, Hoàn Kiếm</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#CEB88E] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-medium text-white block">Salon TP. Hồ Chí Minh:</strong>
                  <span>Số 22 Nguyễn Huệ, Phường Bến Nghé, Quận 1 &amp; Khu Villa Thảo Điền, TP. Thủ Đức</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#CEB88E] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-medium text-white block">Milan Design Studio:</strong>
                  <span>Via Montenapoleone 14, 20121 Milano, Italy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Hours Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#CEB88E]">
              Dịch Vụ Tư Vấn Riêng
            </h4>
            <div className="space-y-3 text-xs font-light text-[#DEE6EC]/90">
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#CEB88E]" />
                <a href="tel:0908888999" className="hover:text-[#CEB88E] transition-colors">
                  Hotline VIP: 0908.888.999
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#CEB88E]" />
                <a href="mailto:bespoke@ateliersofa.vn" className="hover:text-[#CEB88E] transition-colors">
                  bespoke@ateliersofa.vn
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#CEB88E]" />
                <span>09:00 – 21:00 (Hàng ngày, kể cả CN)</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#customizer"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#F8F2EF] hover:text-[#CEB88E] transition-colors border-b border-white/20 pb-1"
              >
                <span>Xem lại 3 mẫu sofa chủ đạo</span>
                <ArrowUpRight className="w-3 h-3 text-[#CEB88E]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#C8D7E1]/60 font-light">
          <p>© {new Date().getFullYear()} Atelier Sofa Milano. Bản quyền thuộc về Atelier Furniture Vietnam.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-[#F8F2EF] cursor-pointer">Chính Sách Bảo Hành 10 Năm</span>
            <span className="hover:text-[#F8F2EF] cursor-pointer">Tiêu Chuẩn Da Thuộc Ý</span>
            <span className="hover:text-[#F8F2EF] cursor-pointer">Bảo Mật Thông Tin Khách Hàng VIP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
