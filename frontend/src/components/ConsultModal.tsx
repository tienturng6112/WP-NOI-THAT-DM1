"use client";

import React, { useState } from "react";
import { X, Package, CheckCircle2, Phone, Calendar, ArrowRight } from "lucide-react";

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultModal({ isOpen, onClose }: ConsultModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    preference: "fabric-kit", // 'fabric-kit' or 'salon-visit'
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#F8F2EF] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#4C637C]/15 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#1E252D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#DEE6EC] text-[#4C637C] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#4C637C]" />
            </div>
            <h3 className="font-serif text-2xl text-[#1E252D]">
              Yêu Cầu Đã Được Tiếp Nhận!
            </h3>
            <p className="text-xs text-[#5F6872] max-w-sm mx-auto font-light leading-relaxed">
              Atelier Sofa sẽ liên hệ với quý khách để gửi bộ mẫu vải tận nơi hoặc chuẩn bị đón tiếp quý khách tại không gian Salon riêng tư.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#4C637C] block mb-1">
                DỊCH VỤ ĐẶC QUYỀN
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1E252D] font-medium">
                Đăng Ký Nhận Mẫu Vải &amp; Tư Vấn Salon
              </h3>
              <p className="text-xs text-[#5F6872] font-light mt-1">
                Cảm nhận trực tiếp độ mềm xốp của Bouclé len cừu và mùi thơm da bò Tuscany tự nhiên ngay tại nhà.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Option Selector */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#DEE6EC] rounded-xl border border-[#4C637C]/[0.08]">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, preference: "fabric-kit" })}
                  className={`py-2 px-3 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    formData.preference === "fabric-kit"
                      ? "bg-[#F8F2EF] text-[#1E252D] shadow-sm font-semibold"
                      : "text-[#5F6872] hover:text-[#1E252D]"
                  }`}
                >
                  <Package className="w-3.5 h-3.5 text-[#4C637C]" />
                  <span>Gửi Mẫu Vải Tận Nhà</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, preference: "salon-visit" })}
                  className={`py-2 px-3 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    formData.preference === "salon-visit"
                      ? "bg-[#F8F2EF] text-[#1E252D] shadow-sm font-semibold"
                      : "text-[#5F6872] hover:text-[#1E252D]"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-[#4C637C]" />
                  <span>Thăm Salon Trưng Bày</span>
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1E252D] mb-1">
                  Họ và tên quý khách *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Minh Anh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#4C637C]/20 bg-[#F8F2EF] text-xs text-[#1E252D] focus:outline-none focus:border-[#4C637C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1E252D] mb-1">
                  Số điện thoại liên hệ *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="09xx xxx xxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#4C637C]/20 bg-[#F8F2EF] text-xs text-[#1E252D] focus:outline-none focus:border-[#4C637C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1E252D] mb-1">
                  Địa chỉ nhận hộp mẫu hoặc khu đô thị đang ở
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Căn Penthouse R2, Vinhomes Riverside, Long Biên, Hà Nội"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#4C637C]/20 bg-[#F8F2EF] text-xs text-[#1E252D] focus:outline-none focus:border-[#4C637C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1E252D] mb-1">
                  Ghi chú hoặc dòng Sofa quý khách quan tâm
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Tôi quan tâm dòng Milano Modular bọc da Cognac..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#4C637C]/20 bg-[#F8F2EF] text-xs text-[#1E252D] focus:outline-none focus:border-[#4C637C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#4C637C] hover:bg-[#3A4E63] text-[#F8F2EF] font-medium text-xs tracking-[0.16em] uppercase transition-all shadow-xl shadow-[#4C637C]/20 border border-[#CEB88E]/30 flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Xác Nhận Đăng Ký Miễn Phí</span>
                <ArrowRight className="w-4 h-4 text-[#CEB88E]" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
