"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductSwitcher from "@/components/ProductSwitcher";
import ProductDetail from "@/components/ProductDetail";
import BentoHighlights from "@/components/BentoHighlights";
import CuratedCollectionGrid from "@/components/CuratedCollectionGrid";
import LogisticsMarquee from "@/components/LogisticsMarquee";
import CertificationsAndReviews from "@/components/CertificationsAndReviews";
import DimensionsGuide from "@/components/DimensionsGuide";
import ContactSection from "@/components/ContactSection";
import FloatingConciergeBot from "@/components/FloatingConciergeBot";
import CartModal, { CartItem } from "@/components/CartModal";
import ConsultModal from "@/components/ConsultModal";
import BackendStatus from "@/components/BackendStatus";
import Footer from "@/components/Footer";
import {
  ProductItem,
  FabricOption,
  DimensionOption,
  BentoSectionData,
  GRAPHQL_ENDPOINT,
} from "@/lib/graphql";

interface StoreClientProps {
  initialProducts: ProductItem[];
  initialBentoData: BentoSectionData;
  isLive: boolean;
}

export default function StoreClient({
  initialProducts,
  initialBentoData,
  isLive,
}: StoreClientProps) {
  const [products] = useState<ProductItem[]>(initialProducts);
  const [bentoData] = useState<BentoSectionData>(initialBentoData);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  const currentProduct = products[selectedProductIndex] || products[0];

  // Cart operations
  const handleAddToCart = (data: {
    product: ProductItem;
    selectedFabric: FabricOption;
    selectedDimension: DimensionOption;
  }) => {
    const itemId = `${data.product.slug}-${data.selectedFabric.name}-${data.selectedDimension.size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product: data.product,
          fabric: data.selectedFabric,
          dimension: data.selectedDimension,
          quantity: 1,
        },
      ];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleScrollToCustomizer = () => {
    const el = document.getElementById("customizer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F2EF] text-[#1E252D] flex flex-col font-sans selection:bg-[#4C637C] selection:text-[#F8F2EF]">
      {/* 1. Header Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenConsult={() => setConsultOpen(true)}
      />

      {/* 2. Hero Section with GSAP Parallax & Staggered Reveal */}
      <HeroSection
        onExploreClick={handleScrollToCustomizer}
        onConsultClick={() => setConsultOpen(true)}
      />

      {/* 3. Master Collection Switcher */}
      <ProductSwitcher
        products={products}
        selectedIndex={selectedProductIndex}
        onSelect={(idx) => {
          setSelectedProductIndex(idx);
          handleScrollToCustomizer();
        }}
      />

      {/* 4. Interactive Sofa Customizer (Magnifying Zoom, Fabric Swatches, Configurator) */}
      <ProductDetail
        key={currentProduct.slug}
        product={currentProduct}
        products={products}
        selectedIndex={selectedProductIndex}
        onSelectProduct={(idx) => setSelectedProductIndex(idx)}
        onAddToCart={handleAddToCart}
        onOpenConsult={() => setConsultOpen(true)}
      />

      {/* 5. Bento Craftsmanship Grid (GSAP ScrollTrigger Stagger Lift) */}
      <BentoHighlights bentoData={bentoData} />

      {/* 6. Section 1: Curated Extended Collection Grid (3-Column Luxury Filter Grid) */}
      <CuratedCollectionGrid
        onSelectMasterSofa={(idx) => {
          setSelectedProductIndex(idx);
          handleScrollToCustomizer();
        }}
        onAddToCartDirect={handleAddToCart}
        masterProducts={products}
      />

      {/* 7. Section 2: Full-Width Infinite Logistics Marquee (White-Glove Delivery) */}
      <LogisticsMarquee />

      {/* 8. Section 3: Prestigious Certifications & Verified Client Testimonials */}
      <CertificationsAndReviews />

      {/* 9. Dimensions & Room Fit Guide (Architectural Blueprint) */}
      <DimensionsGuide onOpenConsult={() => setConsultOpen(true)} />

      {/* 10. Contact, Bespoke Concierge & Swatch Request Section */}
      <ContactSection />

      {/* 11. Footer */}
      <Footer />

      {/* Cart Drawer Modal */}
      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      {/* VIP Consultation & Free Swatch Kit Modal */}
      <ConsultModal
        isOpen={consultOpen}
        onClose={() => setConsultOpen(false)}
      />

      {/* Floating Speed-Dial Concierge Bot (Bottom-Right) */}
      <FloatingConciergeBot />

      {/* Floating WordPress Headless Status Badge (Bottom-Left) */}
      <BackendStatus
        isLive={isLive}
        endpoint={GRAPHQL_ENDPOINT}
        productsCount={products.length}
      />
    </div>
  );
}
