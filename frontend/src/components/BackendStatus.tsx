"use client";

import React, { useState } from "react";
import { Server, ExternalLink, CheckCircle2, ChevronUp, ChevronDown, Copy, Check } from "lucide-react";

interface BackendStatusProps {
  isLive: boolean;
  endpoint: string;
  productsCount: number;
}

export default function BackendStatus({
  isLive,
  endpoint,
  productsCount,
}: BackendStatusProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm">
      {/* Collapsed Pill Badge */}
      <div className="bg-[#1c1c1e]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl rounded-2xl p-2.5 flex items-center justify-between text-xs text-[#f5f5f7]">
        <div className="flex items-center space-x-2.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isLive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            }`}
          />
          <div className="flex flex-col">
            <span className="font-semibold text-[11px] flex items-center space-x-1">
              <span>WordPress GraphQL</span>
              <span className="text-neutral-400">• {isLive ? "Kết nối trực tiếp" : "Offline / Cache"}</span>
            </span>
            <span className="text-[10px] text-neutral-400 truncate max-w-[190px]">
              {productsCount} sản phẩm iPhone 18
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1 pl-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 hover:bg-white/[0.1] rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Chi tiết thông số"
          >
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Details Card */}
      {expanded && (
        <div className="mt-2 bg-[#1c1c1e]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl rounded-2xl p-4 text-xs text-[#f5f5f7] space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <span className="font-bold flex items-center space-x-1.5 text-white">
              <Server className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>WordPress Headless Backend</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Port 8080 Active
            </span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div>
              <span className="text-neutral-400 block mb-0.5">GraphQL Endpoint:</span>
              <div className="flex items-center justify-between bg-black/40 px-2 py-1 rounded-lg border border-white/[0.06]">
                <code className="text-[#0071e3] truncate">{endpoint}</code>
                <button
                  onClick={() => handleCopy(endpoint, "gql")}
                  className="text-neutral-400 hover:text-white ml-1.5 shrink-0"
                >
                  {copied === "gql" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div>
              <span className="text-neutral-400 block mb-0.5">WordPress Admin URL:</span>
              <a
                href="http://localhost:8080/wp-admin"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-black/40 px-2 py-1 rounded-lg border border-white/[0.06] text-white hover:text-[#0071e3] group transition-colors"
              >
                <code className="truncate">http://localhost:8080/wp-admin</code>
                <ExternalLink className="w-3 h-3 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/[0.06]">
              <div>
                <span className="text-neutral-500 block text-[10px]">Admin Username:</span>
                <span className="font-mono text-white text-[11px]">admin_iphone18</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">Plugins Kích Hoạt:</span>
                <span className="text-emerald-400 text-[11px] font-medium">WooCommerce & WooGraphQL</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
