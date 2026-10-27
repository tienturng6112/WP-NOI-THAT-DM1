"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ShoppingBag, Eye, ArrowUpRight, Check, Box } from "lucide-react";
import { ProductItem, FabricOption, DimensionOption } from "@/lib/graphql";

export interface CuratedItem {
  id: string;
  name: string;
  tagline: string;
  category: "linear" | "modular" | "armchair";
  categoryLabel: string;
  material: string;
  price: string;
  priceNum: number;
  badge: "Sẵn sàng giao" | "Chế tác 14 ngày";
  image: string;
  colors: { name: string; hex: string }[];
  masterProductIndex?: number; // 0: Milano, 1: Nordic, 2: Verona
  slug: string;
}

export const CURATED_COLLECTION: CuratedItem[] = [
  {
    id: "curated-1",
    name: "Milano Modular Sofa",
    tagline: "Kiến trúc mô-đun tối giản Bắc Ý",
    category: "modular",
    categoryLabel: "Sofa Góc",
    material: "Vải dệt Bouclé len cừu Ý & Khung sồi Mỹ",
    price: "89.000.000 ₫",
    priceNum: 89000000,
    badge: "Sẵn sàng giao",
    image: "/images/sofas/milano_birch.jpg",
    colors: [
      { name: "Bouclé Kem Tuyết", hex: "#F8F2EF" },
      { name: "Nhung Rêu Emerald", hex: "#2E4A3E" },
      { name: "Da Bò Cognac", hex: "#9A5B42" },
      { name: "Nappa Đen Than", hex: "#1F1F21" },
    ],
    masterProductIndex: 0,
    slug: "milano-modular-sofa",
  },
  {
    id: "curated-2",
    name: "Nordic Bouclé Lounge Sofa",
    tagline: "Đường cong hữu cơ Scandinavian mềm mại",
    category: "linear",
    categoryLabel: "Sofa Băng",
    material: "Bouclé tuyết Bắc Âu & Khung dẻ gai uốn nhiệt",
    price: "64.500.000 ₫",
    priceNum: 64500000,
    badge: "Chế tác 14 ngày",
    image: "/images/sofas/nordic_birch.jpg",
    colors: [
      { name: "Trắng Kem Tuyết", hex: "#F8F2EF" },
      { name: "Taupe Yến Mạch", hex: "#E1D7D2" },
      { name: "Bouclé Sky", hex: "#C8D7E1" },
      { name: "Gold Champagne", hex: "#CEB88E" },
    ],
    masterProductIndex: 1,
    slug: "nordic-boucle-lounge-sofa",
  },
  {
    id: "curated-3",
    name: "Verona Cognac Leather Sofa",
    tagline: "Di sản da thuộc Tuscany nguyên bản",
    category: "linear",
    categoryLabel: "Sofa Băng",
    material: "Da bò Full-Grain Tuscany & Chân đồng thau",
    price: "115.000.000 ₫",
    priceNum: 115000000,
    badge: "Sẵn sàng giao",
    image: "/images/sofas/verona_cognac.jpg",
    colors: [
      { name: "Cognac Tuscany", hex: "#8A4726" },
      { name: "Gold Camel", hex: "#CEB88E" },
      { name: "Nappa Đen Than", hex: "#1E1F22" },
      { name: "Azure Slate", hex: "#4C637C" },
    ],
    masterProductIndex: 2,
    slug: "verona-cognac-leather-sofa",
  },
  {
    id: "curated-4",
    name: "Como Velvet Daybed",
    tagline: "Băng ghế nghỉ ngơi xa xỉ phong cách hồ Como",
    category: "linear",
    categoryLabel: "Sofa Băng",
    material: "Nhung dệt xa xỉ Florence & Đệm lông vũ 70%",
    price: "52.000.000 ₫",
    priceNum: 52000000,
    badge: "Chế tác 14 ngày",
    image: "/images/sofas/milano_emerald.jpg",
    colors: [
      { name: "Nhung Rêu Emerald", hex: "#2E4A3E" },
      { name: "Azure Slate Blue", hex: "#4C637C" },
      { name: "Nappa Đen Than", hex: "#1F1F21" },
    ],
    masterProductIndex: 0,
    slug: "como-velvet-daybed",
  },
  {
    id: "curated-5",
    name: "Siena Travertine Lounge",
    tagline: "Mô-đun phòng khách kết hợp bàn đá Ý tự nhiên",
    category: "modular",
    categoryLabel: "Sofa Góc",
    material: "Linen Taupe Ý kết hợp bàn đá Travertine tự nhiên",
    price: "98.000.000 ₫",
    priceNum: 98000000,
    badge: "Chế tác 14 ngày",
    image: "/images/sofas/milano_taupe.jpg",
    colors: [
      { name: "Linen Taupe", hex: "#E1D7D2" },
      { name: "Birch Trắng Sữa", hex: "#F8F2EF" },
      { name: "Cognac Tuscany", hex: "#9A5B42" },
    ],
    masterProductIndex: 0,
    slug: "siena-travertine-lounge",
  },
  {
    id: "curated-6",
    name: "Bergamo Cloud Armchair",
    tagline: "Ghế đơn điêu khắc êm ái như mây bồng bềnh",
    category: "armchair",
    categoryLabel: "Armchair Điêu Khắc",
    material: "Sợi Bouclé len cừu tự nhiên & Lõi Memory Foam",
    price: "28.500.000 ₫",
    priceNum: 28500000,
    badge: "Sẵn sàng giao",
    image: "/images/sofas/nordic_duckegg.jpg",
    colors: [
      { name: "Duck Egg Xanh Băng", hex: "#DEE6EC" },
      { name: "Bouclé Kem Tuyết", hex: "#F8F2EF" },
      { name: "Gold Champagne", hex: "#CEB88E" },
    ],
    masterProductIndex: 1,
    slug: "bergamo-cloud-armchair",
  },
];

interface CuratedCollectionGridProps {
  onSelectMasterSofa: (index: number) => void;
  onAddToCartDirect: (item: {
    product: ProductItem;
    selectedFabric: FabricOption;
    selectedDimension: DimensionOption;
  }) => void;
  masterProducts: ProductItem[];
}

export default function CuratedCollectionGrid({
  onSelectMasterSofa,
  onAddToCartDirect,
  masterProducts,
}: CuratedCollectionGridProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "linear" | "modular" | "armchair">("all");
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const filterTabs = [
    { key: "all", label: "Tất cả (6)" },
    { key: "linear", label: "Sofa Băng (Linear)" },
    { key: "modular", label: "Sofa Góc (Modular)" },
    { key: "armchair", label: "Armchair Điêu Khắc" },
  ] as const;

  const filteredItems = CURATED_COLLECTION.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  const handleCustomizeClick = (item: CuratedItem) => {
    const targetIdx = item.masterProductIndex ?? 0;
    onSelectMasterSofa(targetIdx);

    // Smooth scroll up to Customizer
    const customizerEl = document.getElementById("customizer");
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuickAdd = (item: CuratedItem) => {
    const matchedMaster = masterProducts[item.masterProductIndex ?? 0] || masterProducts[0];
    const fabric: FabricOption = matchedMaster?.fabrics[0] || {
      name: item.colors[0].name,
      type: item.material,
      hex: item.colors[0].hex,
      desc: item.material,
      image: item.image,
    };
    const dimension: DimensionOption = matchedMaster?.dimensions[0] || {
      size: "Tiêu chuẩn Atelier",
      dimensions: "Theo thiết kế catalogue",
      priceNum: item.priceNum,
      priceFormatted: item.price,
    };

    onAddToCartDirect({
      product: {
        ...matchedMaster,
        id: item.id,
        name: item.name,
        price: item.price,
        basePriceNum: item.priceNum,
        featuredImage: item.image,
      },
      selectedFabric: fabric,
      selectedDimension: dimension,
    });

    setAddedItemName(item.name);
    setTimeout(() => setAddedItemName(null), 2000);
  };

  return (
    <section id="collection-archive" className="scroll-mt-24 py-14 lg:py-28 bg-[#FAF7F2] border-t border-[#4C637C]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#9A5B42] block mb-2 px-2">
            DANH MỤC ĐỘC BẢN • ARCHIVE 2026
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#1C1917] font-normal leading-[1.2] mb-3 sm:mb-4">
            Tuyển Tập Tác Phẩm Đương Đại
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] font-light leading-relaxed max-w-2xl mx-auto px-2">
            Khám phá trọn bộ các tác phẩm sofa và ghế bành chế tác thủ công theo đơn đặt hàng, gìn giữ tinh thần kiến trúc Ý vượt thời gian và sự an yên Bắc Âu.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-10 sm:mb-14">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-medium tracking-[0.06em] sm:tracking-[0.08em] uppercase transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1C1917] text-[#FAF7F2] shadow-md ring-2 ring-[#1C1917]/20"
                    : "bg-[#F0EBE1] text-[#57534E] hover:bg-[#E5DFD5] hover:text-[#1C1917]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3-Column Luxury Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-9">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#F0EBE1]/60 rounded-3xl p-5 border border-[#4C637C]/10 hover:border-[#9A5B42]/40 transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/5 flex flex-col justify-between"
            >
              <div>
                {/* 4:3 Image Container with Smooth Zoom */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200/50 mb-5 shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                        item.badge === "Sẵn sàng giao"
                          ? "bg-[#1C1917]/85 text-[#CEB88E] border border-[#CEB88E]/30"
                          : "bg-[#FAF7F2]/90 text-[#57534E] border border-stone-300/50"
                      }`}
                    >
                      {item.badge}
                    </span>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-black/40 backdrop-blur-md text-[#FAF7F2]">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Information Header */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917] font-medium group-hover:text-[#9A5B42] transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#57534E] font-light leading-relaxed line-clamp-1">
                    {item.material}
                  </p>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center gap-2 py-2 mb-3">
                  <span className="text-[10px] uppercase font-semibold text-[#57534E]/70 tracking-wider">
                    Chất liệu:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.colors.map((color, cIdx) => (
                      <span
                        key={cIdx}
                        title={color.name}
                        className="w-4 h-4 rounded-full border border-black/15 shadow-inner transition-transform hover:scale-125"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions & Price */}
              <div className="pt-4 border-t border-[#4C637C]/10 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase text-[#57534E]/70 font-semibold tracking-wider block">
                    Giá niêm yết
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-semibold text-[#1C1917]">
                    {item.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Add To Cart Button */}
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    title="Thêm nhanh vào giỏ"
                    className="p-3 rounded-full bg-[#FAF7F2] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF7F2] border border-[#4C637C]/20 transition-all cursor-pointer shadow-sm relative group/btn"
                    aria-label={`Thêm ${item.name} vào giỏ`}
                  >
                    {addedItemName === item.name ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ShoppingBag className="w-4 h-4" />
                    )}
                  </button>

                  {/* 3D Configurator & Order CTA */}
                  <button
                    type="button"
                    onClick={() => handleCustomizeClick(item)}
                    className="px-4 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#9A5B42] text-[#FAF7F2] text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm border border-[#CEB88E]/30"
                  >
                    <Box className="w-3.5 h-3.5 text-[#CEB88E]" />
                    <span>Tùy chỉnh 3D &amp; Đặt hàng</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
