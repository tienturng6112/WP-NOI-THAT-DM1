"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Phone,
  FileEdit,
  Sparkles,
  ArrowDown,
} from "lucide-react";

export default function FloatingConciergeBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleScrollToForm = () => {
    setIsOpen(false);
    const formEl = document.getElementById("lien-he");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    {
      id: "hotline",
      label: "Hotline VIP: 0909.888.999",
      href: "tel:0909888999",
      isAction: false,
      bgColor: "bg-[#2E4A3E]",
      hoverColor: "hover:bg-[#243a31]",
      textColor: "text-[#FAF7F2]",
      badgeBg: "bg-[#2E4A3E]/90 text-[#FAF7F2] border border-emerald-500/30",
      icon: (
        <Phone className="w-5 h-5 text-[#CEB88E]" />
      ),
    },
    {
      id: "facebook",
      label: "Facebook Atelier",
      href: "https://facebook.com",
      isAction: false,
      bgColor: "bg-[#1877F2]",
      hoverColor: "hover:bg-[#1464cc]",
      textColor: "text-white",
      badgeBg: "bg-[#1C1917]/90 text-[#FAF7F2] border border-white/10",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: "tiktok",
      label: "TikTok Showroom",
      href: "https://tiktok.com",
      isAction: false,
      bgColor: "bg-[#000000]",
      hoverColor: "hover:bg-[#1a1a1a]",
      textColor: "text-white",
      badgeBg: "bg-[#1C1917]/90 text-[#FAF7F2] border border-white/10",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
      ),
    },
    {
      id: "youtube",
      label: "YouTube Tuyệt Tác",
      href: "https://youtube.com",
      isAction: false,
      bgColor: "bg-[#FF0000]",
      hoverColor: "hover:bg-[#cc0000]",
      textColor: "text-white",
      badgeBg: "bg-[#1C1917]/90 text-[#FAF7F2] border border-white/10",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      id: "form-scroll",
      label: "Cuộn xuống Form Đặt Hàng",
      href: "#lien-he",
      isAction: true,
      onClick: handleScrollToForm,
      bgColor: "bg-[#9A5B42]",
      hoverColor: "hover:bg-[#834b35]",
      textColor: "text-[#FAF7F2]",
      badgeBg: "bg-[#1C1917]/95 text-[#CEB88E] border border-[#CEB88E]/40",
      icon: (
        <FileEdit className="w-4 h-4 text-[#FAF7F2]" />
      ),
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Pop-up Speed-Dial Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end gap-2.5 sm:gap-3.5 mb-3 sm:mb-4"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                  delay: (menuItems.length - 1 - index) * 0.04,
                }}
                className="flex items-center gap-2 sm:gap-3 group"
              >
                {/* Floating Text Label Tooltip on the Left */}
                <span
                  className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-medium tracking-wide shadow-lg backdrop-blur-md whitespace-nowrap pointer-events-none transition-transform group-hover:-translate-x-1 ${item.badgeBg}`}
                >
                  {item.label}
                </span>

                {/* Round Button */}
                {item.isAction ? (
                  <button
                    type="button"
                    onClick={item.onClick}
                    title={item.label}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${item.bgColor} ${item.hoverColor} ${item.textColor} flex items-center justify-center shadow-lg border border-white/20 transition-transform hover:scale-110 cursor-pointer`}
                  >
                    {item.icon}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.label}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${item.bgColor} ${item.hoverColor} ${item.textColor} flex items-center justify-center shadow-lg border border-white/20 transition-transform hover:scale-110 cursor-pointer`}
                  >
                    {item.icon}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mini-Bot Trigger Button & Tooltip */}
      <div className="relative flex items-center gap-3">
        {/* Tooltip Label (Visible only on Desktop md: when closed) */}
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1917]/90 text-[#FAF7F2] text-xs font-medium tracking-wide shadow-xl backdrop-blur-md border border-[#CEB88E]/30 pointer-events-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CEB88E]" />
            <span>Hỗ trợ &amp; Kênh kết nối</span>
          </motion.div>
        )}

        {/* Trigger Button - w-11 h-11 on mobile, w-14 h-14 on desktop */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (showTooltip) setShowTooltip(false);
          }}
          aria-label={isOpen ? "Đóng menu hỗ trợ" : "Mở menu hỗ trợ đa kênh"}
          className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg sm:shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? "bg-[#1C1917]/95 text-[#FAF7F2] border-2 border-[#CEB88E] rotate-90"
              : "bg-[#1C1917]/90 backdrop-blur-md hover:bg-[#9A5B42] text-[#FAF7F2] border-2 border-[#CEB88E]/40 hover:scale-105"
          }`}
        >
          {/* Concierge Online Status Dot (Only when closed) */}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-500 border-2 border-[#1C1917]" />
            </span>
          )}

          {/* Icon (Chat or Close) */}
          {isOpen ? (
            <X className="w-4 h-4 sm:w-6 sm:h-6 text-[#CEB88E]" />
          ) : (
            <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 text-[#FAF7F2]" />
          )}
        </button>
      </div>
    </div>
  );
}
