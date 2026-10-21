"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { ProductItem } from "@/lib/graphql";

export interface CartItem {
  id: string;
  product: ProductItem;
  color: string;
  storage: string;
  priceFormatted: string;
  priceNum: number;
  image: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQty,
  onCheckout,
}: CartModalProps) {
  const subtotal = items.reduce((acc, item) => acc + item.priceNum * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-[#151516] border-l border-white/[0.1] shadow-2xl flex flex-col justify-between text-[#f5f5f7]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-[#0071e3]" />
                <h2 className="text-lg font-bold">Túi hàng của bạn ({items.length})</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                  <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center text-neutral-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-base font-semibold text-neutral-300">
                    Túi hàng của bạn đang trống
                  </p>
                  <p className="text-xs text-neutral-500 max-w-xs">
                    Hãy lựa chọn chiếc iPhone 18 hoàn hảo và trải nghiệm sự đột phá hôm nay.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#1c1c1e] border border-white/[0.08] flex items-center space-x-4"
                  >
                    <div className="w-16 h-16 rounded-xl bg-white/[0.04] p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={item.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate text-[#f5f5f7]">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {item.storage} • {item.color}
                      </p>
                      <p className="text-xs font-bold text-[#0071e3] mt-1">
                        {(item.priceNum * item.quantity).toLocaleString("vi-VN")}₫
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                        aria-label="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center space-x-2 bg-white/[0.06] rounded-full px-2 py-0.5 text-xs">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="hover:text-white px-1 font-bold text-neutral-400"
                        >
                          -
                        </button>
                        <span className="font-medium text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="hover:text-white px-1 font-bold text-neutral-400"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/[0.08] space-y-4 bg-[#18181a]">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Tạm tính</span>
                    <span>{subtotal.toLocaleString("vi-VN")}₫</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Vận chuyển tiêu chuẩn</span>
                    <span className="text-emerald-400 font-medium">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/[0.08]">
                    <span>Tổng thanh toán</span>
                    <span className="text-[#0071e3]">{subtotal.toLocaleString("vi-VN")}₫</span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 px-6 font-semibold text-sm text-white bg-[#0071e3] hover:bg-[#0077ed] transition-all duration-200 active:scale-98 flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 cursor-pointer"
                  style={{ borderRadius: "98px" }}
                >
                  <span>Thanh toán với Apple Pay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-neutral-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Giao dịch an toàn & mã hóa bảo mật 256-bit</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
