"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductItem, FabricOption, DimensionOption } from "@/lib/graphql";
import { X, Trash2, ShieldCheck, Truck, ArrowRight, CheckCircle2 } from "lucide-react";

export interface CartItem {
  id: string;
  product: ProductItem;
  fabric: FabricOption;
  dimension: DimensionOption;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (acc, item) => acc + item.dimension.priceNum * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClearCart();
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-[#F8F2EF] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 border-l border-[#4C637C]/15">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#4C637C]/10 flex items-center justify-between bg-[#DEE6EC]/60">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#4C637C] block">
              ATELIER BESPOKE SALON
            </span>
            <h2 className="font-serif text-2xl text-[#1E252D] font-medium">
              Giỏ Hàng Chế Tác Riêng ({items.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng giỏ hàng"
            className="p-2 rounded-full hover:bg-black/5 text-[#1E252D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#DEE6EC] text-[#4C637C] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#4C637C]" />
              </div>
              <h3 className="font-serif text-2xl text-[#1E252D]">
                Đặt Chế Tác Thành Công!
              </h3>
              <p className="text-xs text-[#5F6872] max-w-sm mx-auto font-light leading-relaxed">
                Chuyên viên tư vấn cấp cao của Atelier Sofa sẽ liên hệ với quý khách trong vòng 15 phút để đối soát bản vẽ mặt bằng và gửi xác nhận đơn hàng.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#DEE6EC] flex items-center justify-center mx-auto text-[#5F6872]">
                <Truck className="w-8 h-8 text-[#4C637C]" />
              </div>
              <h3 className="font-serif text-xl text-[#1E252D]">Giỏ hàng đang trống</h3>
              <p className="text-xs text-[#5F6872] max-w-xs mx-auto">
                Hãy lựa chọn mẫu sofa và chất liệu yêu thích để thêm vào danh sách may đo.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#4C637C] text-[#F8F2EF] text-xs uppercase tracking-wider font-medium hover:bg-[#3A4E63] border border-[#CEB88E]/30 cursor-pointer"
              >
                Khám Phá Bộ Sưu Tập
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#DEE6EC]/50 border border-[#4C637C]/[0.1] flex gap-4"
                  >
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-[#E1D7D2]">
                      <Image
                        src={item.fabric?.image || item.product.featuredImage}
                        alt={`${item.product.name} - ${item.fabric.name}`}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-base font-medium text-[#1E252D] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#5F6872] hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Chosen Fabric */}
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#5F6872]">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20"
                          style={{ backgroundColor: item.fabric.hex }}
                        />
                        <span>{item.fabric.name}</span>
                      </div>

                      {/* Chosen Dimension */}
                      <p className="text-[11px] text-[#5F6872] truncate mt-0.5">
                        {item.dimension.size} ({item.dimension.dimensions})
                      </p>

                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#4C637C]/[0.08]">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#4C637C]/20 rounded-lg overflow-hidden bg-[#F8F2EF]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2.5 py-0.5 text-xs text-[#1E252D] hover:bg-black/5"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-semibold text-[#1E252D]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2.5 py-0.5 text-xs text-[#1E252D] hover:bg-black/5"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-semibold text-sm text-[#1E252D] font-sans">
                          {(item.dimension.priceNum * item.quantity).toLocaleString("vi-VN")} ₫
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Consultation / Checkout Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-[#4C637C]/10">
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#1E252D] block">
                  Thông Tin Liên Hệ Nhận Báo Giá &amp; Khảo Sát Tận Nhà:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên quý khách *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#4C637C]/20 bg-[#F8F2EF] text-xs text-[#1E252D] focus:outline-none focus:border-[#4C637C]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#4C637C]/20 bg-[#F8F2EF] text-xs text-[#1E252D] focus:outline-none focus:border-[#4C637C]"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Địa chỉ giao hàng / Tên dự án (Căn hộ, Biệt thự) *"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#4C637C]/20 bg-[#F8F2EF] text-xs text-[#1E252D] focus:outline-none focus:border-[#4C637C]"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Yêu cầu riêng (ví dụ: đổi hướng góc L, yêu cầu gửi mẫu vải tận nhà...)"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#4C637C]/20 bg-[#F8F2EF] text-xs text-[#1E252D] focus:outline-none focus:border-[#4C637C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#4C637C] hover:bg-[#3A4E63] text-[#F8F2EF] font-medium text-xs tracking-[0.16em] uppercase transition-all shadow-xl shadow-[#4C637C]/20 border border-[#CEB88E]/30 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span>Gửi Yêu Cầu Chế Tác &amp; Giữ Chỗ Sản Xuất</span>
                  <ArrowRight className="w-4 h-4 text-[#CEB88E]" />
                </button>
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer with Subtotal */}
        {items.length > 0 && !submitted && (
          <div className="p-6 border-t border-[#4C637C]/10 bg-[#DEE6EC]/60 space-y-3">
            <div className="flex justify-between items-center text-xs text-[#5F6872]">
              <span>Tạm tính ({items.length} món):</span>
              <span className="font-semibold text-base text-[#1E252D] font-sans">
                {totalAmount.toLocaleString("vi-VN")} ₫
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#4C637C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#CEB88E]" />
              <span>Đã gồm VAT, miễn phí vận chuyển &amp; lắp đặt tận phòng toàn quốc.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
