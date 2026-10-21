"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import ProductSwitcher from "@/components/ProductSwitcher";
import ProductDetail from "@/components/ProductDetail";
import BentoHighlights from "@/components/BentoHighlights";
import CartModal, { CartItem } from "@/components/CartModal";
import BackendStatus from "@/components/BackendStatus";
import Footer from "@/components/Footer";
import {
  ProductItem,
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

  const currentProduct = products[selectedProductIndex] || products[0];

  // Cart operations
  const handleAddToCart = (data: {
    product: ProductItem;
    color: string;
    storage: string;
    priceFormatted: string;
    priceNum: number;
    image: string;
  }) => {
    const itemId = `${data.product.slug}-${data.color}-${data.storage}`;
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
          color: data.color,
          storage: data.storage,
          priceFormatted: data.priceFormatted,
          priceNum: data.priceNum,
          image: data.image,
          quantity: 1,
        },
      ];
    });
  };

  const handleBuyNow = (data: {
    product: ProductItem;
    color: string;
    storage: string;
    priceFormatted: string;
    priceNum: number;
    image: string;
  }) => {
    handleAddToCart(data);
    setCartOpen(true);
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

  const handleCheckout = () => {
    alert(
      `Cảm ơn bạn! Đơn hàng iPhone 18 của bạn với tổng số tiền ${cartItems
        .reduce((acc, i) => acc + i.priceNum * i.quantity, 0)
        .toLocaleString("vi-VN")}₫ đang được kết nối thanh toán an toàn qua cổng Apple Pay.`
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#151516] text-[#f5f5f7] flex flex-col justify-between selection:bg-[#0071e3] selection:text-white">
      {/* 1. Global Navigation Bar */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 2. Model Switcher Subnav */}
      <ProductSwitcher
        products={products}
        selectedIndex={selectedProductIndex}
        onSelect={(idx) => setSelectedProductIndex(idx)}
        onBuyNowClick={() => {
          const defaultStorage = currentProduct.storages[0];
          const defaultColor = currentProduct.colors[0];
          handleBuyNow({
            product: currentProduct,
            color: defaultColor.name,
            storage: defaultStorage.size,
            priceFormatted: defaultStorage.priceFormatted,
            priceNum: defaultStorage.priceNum,
            image: currentProduct.featuredImage,
          });
        }}
      />

      {/* 3. Hero Product Detail Section (2 Columns with Framer Motion) */}
      <div className="flex-1">
        <ProductDetail
          product={currentProduct}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        {/* 4. Apple Bento Highlights (Connected to WordPress Admin) */}
        <BentoHighlights data={bentoData} />
      </div>

      {/* 5. Cart Drawer Modal */}
      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQty={handleUpdateQty}
        onCheckout={handleCheckout}
      />

      {/* 6. Live Backend Telemetry Badge */}
      <BackendStatus
        isLive={isLive}
        endpoint={GRAPHQL_ENDPOINT}
        productsCount={products.length}
      />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
