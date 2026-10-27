"use client";

import React, { useState } from "react";
import {
  Package,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

type FormPurpose = "bespoke" | "swatch" | "appointment";

interface FormData {
  purpose: FormPurpose;
  fullName: string;
  phone: string;
  emailOrAddress: string;
  productInterest: string;
  notes: string;
}

export default function ContactSection() {
  const [purpose, setPurpose] = useState<FormPurpose>("bespoke");
  const [formData, setFormData] = useState<FormData>({
    purpose: "bespoke",
    fullName: "",
    phone: "",
    emailOrAddress: "",
    productInterest: "Milano Modular Sofa",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const purposeTabs = [
    { key: "bespoke" as const, label: "Đặt chế tác Sofa nhanh" },
    { key: "swatch" as const, label: "Yêu cầu gửi Mẫu Da/Vải" },
    { key: "appointment" as const, label: "Đặt lịch hẹn Showroom" },
  ];

  const handleTabChange = (selected: FormPurpose) => {
    setPurpose(selected);
    setFormData((prev) => ({ ...prev, purpose: selected }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage("Vui lòng điền đầy đủ Họ tên và Số điện thoại liên hệ.");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);

    // Simulate luxury concierge API submission
    setTimeout(() => {
      const randomSuffix = Math.floor(10 + Math.random() * 90);
      const generatedId = `#ATL-2026-${randomSuffix}`;
      setTicketId(generatedId);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTicketId("");
    setFormData({
      purpose: "bespoke",
      fullName: "",
      phone: "",
      emailOrAddress: "",
      productInterest: "Milano Modular Sofa",
      notes: "",
    });
  };

  return (
    <section
      id="lien-he"
      className="scroll-mt-24 py-14 lg:py-28 bg-[#FAF7F2] border-t border-[#4C637C]/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Luxury Container Frame */}
        <div className="relative rounded-3xl bg-[#1C1917] text-[#FAF7F2] p-5 sm:p-10 lg:p-16 border border-[#CEB88E]/25 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Radial Glows */}
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
            style={{ backgroundColor: "#9A5B42" }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-15 blur-3xl"
            style={{ backgroundColor: "#CEB88E" }}
          />

          {/* 2-Column Split Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* ========================================================================= */}
            {/* CỘT TRÁI (THÔNG ĐIỆP & ĐẶC QUYỀN SHOWROOM)                                */}
            {/* ========================================================================= */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#CEB88E] block mb-2 px-1">
                  DỊCH VỤ CONCIERGE &amp; BESPOKE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-normal leading-[1.2] text-[#FAF7F2] mb-3 sm:mb-5">
                  Khởi Tạo Không Gian Độc Bản Của Riêng Bạn.
                </h2>
                <p className="text-xs sm:text-[15px] text-[#F0EBE1]/80 font-light leading-relaxed">
                  Đăng ký nhận hộp mẫu da bò Ý &amp; vải Bouclé miễn phí tận nhà, đặt lịch hẹn riêng cùng Kiến trúc sư trưởng tại Flagship Showroom hoặc gửi yêu cầu đặt chế tác theo kích thước phòng khách của bạn.
                </p>
              </div>

              {/* 3 Cam Kết Đặc Quyền */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-[#CEB88E]/30 flex items-center justify-center shrink-0 text-[#CEB88E]">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#FAF7F2]">
                      Hộp mẫu vật liệu gửi tận nhà
                    </h4>
                    <p className="text-xs text-stone-400 font-light mt-0.5">
                      Gửi bộ mẫu chất liệu (Material Swatch Box) miễn phí toàn quốc trong 48h.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-[#CEB88E]/30 flex items-center justify-center shrink-0 text-[#CEB88E]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#FAF7F2]">
                      Khảo sát không gian bằng Laser 3D
                    </h4>
                    <p className="text-xs text-stone-400 font-light mt-0.5">
                      Khảo sát &amp; đo đạc mặt bằng thực tế bằng công nghệ Laser 3D chuẩn xác từng milimet.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-[#CEB88E]/30 flex items-center justify-center shrink-0 text-[#CEB88E]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#FAF7F2]">
                      Đặc quyền bảo mật &amp; Phản hồi 30 phút
                    </h4>
                    <p className="text-xs text-stone-400 font-light mt-0.5">
                      Bảo mật thông tin tuyệt đối • Phản hồi trong vòng 30 phút bởi Concierge phụ trách.
                    </p>
                  </div>
                </div>
              </div>

              {/* Flagship Showroom Quick Info */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#9A5B42]" />
                  <span>Flagship: Hà Nội &amp; TP.HCM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#CEB88E]" />
                  <a href="tel:0909888999" className="text-[#FAF7F2] font-semibold hover:text-[#CEB88E] transition-colors">
                    0909.888.999
                  </a>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* CỘT PHẢI (FORM TƯƠNG TÁC ĐA NĂNG & SUCCESS SCREEN)                         */}
            {/* ========================================================================= */}
            <div className="lg:col-span-7">
              <div className="bg-[#262320]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-9 shadow-xl relative">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Mục đích tư vấn (3 Tabs chọn nhanh) */}
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-2.5">
                        Mục đích quý khách quan tâm
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {purposeTabs.map((tab) => {
                          const isActive = purpose === tab.key;
                          return (
                            <button
                              key={tab.key}
                              type="button"
                              onClick={() => handleTabChange(tab.key)}
                              className={`py-2.5 px-3 rounded-xl text-xs font-medium tracking-wide transition-all text-center cursor-pointer border ${
                                isActive
                                  ? "bg-[#FAF7F2] text-[#1C1917] font-semibold border-[#CEB88E] shadow-sm"
                                  : "bg-white/[0.04] text-stone-300 border-white/[0.08] hover:bg-white/[0.08] hover:text-[#FAF7F2]"
                              }`}
                            >
                              {tab.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Họ tên & Số điện thoại */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                          Họ và tên Quý khách <span className="text-[#9A5B42]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          placeholder="Ví dụ: Hoàng Minh Tuấn"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#FAF7F2] text-sm placeholder:text-stone-500 focus:outline-none focus:border-[#CEB88E] focus:ring-1 focus:ring-[#CEB88E] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                          Số điện thoại liên hệ <span className="text-[#9A5B42]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="09xx xxx xxx"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#FAF7F2] text-sm placeholder:text-stone-500 focus:outline-none focus:border-[#CEB88E] focus:ring-1 focus:ring-[#CEB88E] transition-all"
                        />
                      </div>
                    </div>

                    {/* Email / Địa chỉ & Tác phẩm quan tâm */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                          {purpose === "swatch"
                            ? "Địa chỉ nhận hộp mẫu vật liệu"
                            : "Email hoặc Địa chỉ lắp đặt"}
                        </label>
                        <input
                          type="text"
                          value={formData.emailOrAddress}
                          onChange={(e) =>
                            setFormData({ ...formData, emailOrAddress: e.target.value })
                          }
                          placeholder={
                            purpose === "swatch"
                              ? "Số nhà, tên đường, quận/huyện..."
                              : "tuan.arch@example.com hoặc địa chỉ"
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#FAF7F2] text-sm placeholder:text-stone-500 focus:outline-none focus:border-[#CEB88E] focus:ring-1 focus:ring-[#CEB88E] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                          Tác phẩm quan tâm
                        </label>
                        <div className="relative">
                          <select
                            value={formData.productInterest}
                            onChange={(e) =>
                              setFormData({ ...formData, productInterest: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-[#262320] border border-white/10 text-[#FAF7F2] text-sm appearance-none focus:outline-none focus:border-[#CEB88E] focus:ring-1 focus:ring-[#CEB88E] transition-all cursor-pointer"
                          >
                            <option value="Milano Modular Sofa">Milano Modular Sofa (Ý)</option>
                            <option value="Nordic Bouclé Lounge Sofa">Nordic Bouclé Lounge Sofa (Bắc Âu)</option>
                            <option value="Verona Cognac Leather Sofa">Verona Cognac Leather Sofa (Tuscany)</option>
                            <option value="Thiết kế riêng theo bản vẽ KTS">Thiết kế riêng theo bản vẽ KTS</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Ghi chú kích thước hoặc thời gian hẹn */}
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                        {purpose === "appointment"
                          ? "Thời gian hẹn mong muốn (Ngày, Giờ)"
                          : "Ghi chú kích thước phòng khách / yêu cầu đặc biệt"}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder={
                          purpose === "appointment"
                            ? "Ví dụ: 10:00 sáng Thứ Bảy tuần này tại Flagship Hà Nội..."
                            : "Ví dụ: Chiều dài vách tường 3.4m, ưu tiên đệm lông vũ mềm và tông màu Taupe..."
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#FAF7F2] text-sm placeholder:text-stone-500 focus:outline-none focus:border-[#CEB88E] focus:ring-1 focus:ring-[#CEB88E] transition-all resize-none"
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-xs text-rose-400 font-medium">{errorMessage}</p>
                    )}

                    {/* Nút Submit lớn Terracotta */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 px-6 rounded-full bg-[#9A5B42] hover:bg-[#834b35] text-[#FAF7F2] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 shadow-xl border border-[#CEB88E]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#FAF7F2]" />
                          <span>Đang khởi tạo hồ sơ bespoke...</span>
                        </>
                      ) : (
                        <>
                          <span>GỬI YÊU CẦU TƯ VẤN ĐẶC QUYỀN</span>
                          <ArrowRight className="w-4 h-4 text-[#CEB88E]" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Màn hình thông báo xác nhận thành công */
                  <div className="py-8 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 rounded-full bg-[#9A5B42]/20 border-2 border-[#CEB88E] flex items-center justify-center mx-auto shadow-lg text-[#CEB88E]">
                      <CheckCircle2 className="w-8 h-8 text-[#CEB88E]" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#CEB88E]">
                        YÊU CẦU ĐÃ TIẾP NHẬN THÀNH CÔNG
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF7F2]">
                        Cảm Ơn Quý Khách {formData.fullName}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-300 font-light max-w-md mx-auto leading-relaxed">
                        Chuyên viên Concierge của Atelier Sofa sẽ liên hệ lại với Quý khách qua số{" "}
                        <span className="font-semibold text-[#FAF7F2]">{formData.phone}</span> trong vòng 30 phút để xác nhận yêu cầu và gửi tài liệu mẫu vật liệu.
                      </p>
                    </div>

                    {/* Ticket Code Box */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.06] border border-[#CEB88E]/30">
                      <Sparkles className="w-4 h-4 text-[#CEB88E]" />
                      <div className="text-left">
                        <span className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider block">
                          Mã số phiếu tư vấn độc bản
                        </span>
                        <span className="font-mono text-base font-bold text-[#CEB88E] tracking-wider">
                          {ticketId}
                        </span>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Gửi yêu cầu tư vấn mới</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
