"use client";

import React, { useState } from "react";
import { ShoppingBag, Search, Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Cửa hàng", href: "#" },
    { name: "Mac", href: "#" },
    { name: "iPad", href: "#" },
    { name: "iPhone", href: "#", active: true },
    { name: "Watch", href: "#" },
    { name: "AirPods", href: "#" },
    { name: "TV & Nhà", href: "#" },
    { name: "Giải trí", href: "#" },
    { name: "Phụ kiện", href: "#" },
    { name: "Hỗ trợ", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#151516]/85 border-b border-white/[0.08] transition-all">
      <div className="max-w-[1024px] mx-auto px-4 h-11 flex items-center justify-between text-xs tracking-tight">
        {/* Apple Logo */}
        <a
          href="#"
          className="text-[#f5f5f7] hover:opacity-70 transition-opacity flex items-center"
          aria-label="Apple Home"
        >
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 170 170"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.86-12-14.46-6.19-9.46-11.1-20.2-14.73-32.21-3.63-12.02-5.45-23.47-5.45-34.34 0-14.74 3.69-26.69 11.07-35.85 7.38-9.16 16.5-13.84 27.36-14.04 4.8 0 10.18 1.25 16.14 3.75 5.96 2.5 9.74 3.78 11.35 3.84 1.4.07 5.37-1.25 11.91-3.96 6.54-2.71 12.09-3.98 16.65-3.81 12.63.63 22.7 5.09 30.22 13.37-10.86 6.54-16.18 15.65-15.96 27.33.22 9.14 3.75 16.78 10.6 22.92 6.85 6.14 14.88 9.61 24.08 10.42-2.18 6.74-4.8 13.3-7.86 19.68zM119.22 31.84c0-7.39 2.67-14.38 8.01-20.97 5.34-6.59 12-10.68 19.98-12.27.11 1.09.16 2.06.16 2.93 0 7.39-2.77 14.48-8.31 21.28-5.54 6.8-12.24 10.87-20.1 12.21-.11-.76-.17-1.82-.17-3.18z" />
          </svg>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-7 text-neutral-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors hover:text-[#f5f5f7] ${
                link.active ? "text-[#f5f5f7] font-medium" : ""
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-5 text-neutral-300">
          <button
            aria-label="Tìm kiếm"
            className="hover:text-[#f5f5f7] transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Giỏ hàng"
            className="relative hover:text-[#f5f5f7] transition-colors cursor-pointer flex items-center"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#0071e3] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-300 hover:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#151516] border-b border-white/[0.1] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-sm text-neutral-300 hover:text-white py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
