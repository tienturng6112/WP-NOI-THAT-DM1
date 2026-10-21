"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111112] text-neutral-400 text-xs border-t border-white/[0.08] mt-20 pt-12 pb-16">
      <div className="max-w-[1024px] mx-auto px-4 space-y-6">
        {/* Footnotes */}
        <div className="space-y-2 text-[11px] leading-relaxed text-neutral-500 pb-6 border-b border-white/[0.08]">
          <p>
            * Giá trên đã bao gồm thuế giá trị gia tăng (VAT) và phí giao hàng tiêu chuẩn trên toàn quốc. Mức giá có thể thay đổi tùy thuộc vào chương trình ưu đãi hoặc chính sách của Apple Store Việt Nam.
          </p>
          <p>
            1. Dòng iPhone 18 có khả năng chống tia nước, chống nước và chống bụi trong điều kiện phòng thí nghiệm đạt chuẩn IP68 theo tiêu chuẩn IEC 60529 (độ sâu tối đa 6 mét trong vòng tối đa 30 phút).
          </p>
          <p>
            2. Màn hình có các góc bo tròn theo đường cong tuyệt đẹp và nằm trong một hình chữ nhật chuẩn. Khi đo theo hình chữ nhật chuẩn, kích thước màn hình theo đường chéo lần lượt là 6.1 inch, 6.3 inch và 6.9 inch.
          </p>
        </div>

        {/* Apple Breadcrumb Directory */}
        <div className="flex items-center space-x-2 text-[11px] text-neutral-400">
          <span className="hover:text-white cursor-pointer">Apple</span>
          <span>›</span>
          <span className="hover:text-white cursor-pointer">iPhone</span>
          <span>›</span>
          <span className="text-[#f5f5f7]">iPhone 18 Series</span>
        </div>

        {/* Directory Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4 text-xs text-neutral-400">
          <div className="space-y-2">
            <h4 className="font-semibold text-[#f5f5f7]">Mua sắm & Tìm hiểu</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="hover:text-white cursor-pointer">iPhone 18 Pro Max</li>
              <li className="hover:text-white cursor-pointer">iPhone 18 Pro</li>
              <li className="hover:text-white cursor-pointer">iPhone 18</li>
              <li className="hover:text-white cursor-pointer">Phụ kiện MagSafe</li>
              <li className="hover:text-white cursor-pointer">AppleCare+</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-[#f5f5f7]">Tài khoản</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="hover:text-white cursor-pointer">Quản lý Apple ID</li>
              <li className="hover:text-white cursor-pointer">Tài khoản Apple Store</li>
              <li className="hover:text-white cursor-pointer">iCloud.com</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-[#f5f5f7]">Giải trí</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="hover:text-white cursor-pointer">Apple One</li>
              <li className="hover:text-white cursor-pointer">Apple TV+</li>
              <li className="hover:text-white cursor-pointer">Apple Music</li>
              <li className="hover:text-white cursor-pointer">Apple Arcade</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-[#f5f5f7]">Về Apple</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="hover:text-white cursor-pointer">Newsroom</li>
              <li className="hover:text-white cursor-pointer">Lãnh đạo Apple</li>
              <li className="hover:text-white cursor-pointer">Cơ hội nghề nghiệp</li>
              <li className="hover:text-white cursor-pointer">Đạo đức kinh doanh</li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 space-y-2 sm:space-y-0">
          <div>
            Bản quyền © 2026 Apple Inc. Mọi quyền được bảo lưu.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-neutral-300">Chính sách bảo mật</a>
            <span>|</span>
            <a href="#" className="hover:text-neutral-300">Điều khoản sử dụng</a>
            <span>|</span>
            <a href="#" className="hover:text-neutral-300">Bán hàng và Hoàn tiền</a>
            <span>|</span>
            <a href="#" className="hover:text-neutral-300">Pháp lý</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
