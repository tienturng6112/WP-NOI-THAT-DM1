"use client";

import React from "react";
import { Cpu, Camera, Shield, BatteryCharging, Sparkles, Layers, Zap } from "lucide-react";
import { BentoSectionData, DEFAULT_BENTO_DATA } from "@/lib/graphql";

const ICON_MAP: Record<string, React.ElementType> = {
  cpu: Cpu,
  camera: Camera,
  shield: Shield,
  sparkles: Sparkles,
  "battery-charging": BatteryCharging,
  layers: Layers,
  zap: Zap,
};

const GRADIENT_MAP: Record<string, string> = {
  blue: "from-blue-600/20 via-purple-600/10 to-transparent",
  amber: "from-amber-600/20 via-orange-600/10 to-transparent",
  neutral: "from-neutral-600/20 via-neutral-700/10 to-transparent",
  pink: "from-pink-600/20 via-rose-600/10 to-transparent",
  emerald: "from-emerald-600/20 via-teal-600/10 to-transparent",
  cyan: "from-cyan-600/20 via-blue-600/10 to-transparent",
};

interface BentoHighlightsProps {
  data?: BentoSectionData;
}

export default function BentoHighlights({ data }: BentoHighlightsProps) {
  const section = data || DEFAULT_BENTO_DATA;
  const features = section.features && section.features.length > 0
    ? section.features
    : DEFAULT_BENTO_DATA.features;

  return (
    <section className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.08]">
      {/* Header Info (Managed from WordPress Admin) */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase font-semibold tracking-wider text-[#0071e3]">
          {section.superTitle || "ĐỈNH CAO CÔNG NGHỆ"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f5f7]">
          {section.heading || "Tìm hiểu những điểm chạm vượt bậc."}
        </h2>
        {section.description && (
          <p className="text-sm text-neutral-400">
            {section.description}
          </p>
        )}
      </div>

      {/* Dynamic Grid of Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((item, idx) => {
          const Icon = ICON_MAP[item.icon] || Cpu;
          const gradient = GRADIENT_MAP[item.gradient] || GRADIENT_MAP["blue"];

          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-[#1c1c1e] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 group hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 pointer-events-none group-hover:opacity-70 transition-opacity`}
              />

              <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-[#0071e3]">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-[#f5f5f7]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
