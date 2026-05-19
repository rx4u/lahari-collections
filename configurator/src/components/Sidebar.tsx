"use client";

import React from "react";
import {
  Building2,
  Palette,
  LayoutTemplate,
  LayoutGrid,
  Rocket,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export type TabId = "business" | "theme" | "hero" | "sections" | "export";

interface Tab {
  id: TabId;
  icon: React.ElementType;
  label: string;
}

const TABS: Tab[] = [
  { id: "business", icon: Building2, label: "Business" },
  { id: "theme", icon: Palette, label: "Theme" },
  { id: "hero", icon: LayoutTemplate, label: "Hero" },
  { id: "sections", icon: LayoutGrid, label: "Sections" },
  { id: "export", icon: Rocket, label: "Export" },
];

interface SidebarProps {
  activeTab: string | null;
  onTabChange: (tab: string | null) => void;
  children: React.ReactNode;
  topActions?: React.ReactNode;
}

function Sidebar({ activeTab, onTabChange, children, topActions }: SidebarProps) {
  const activeTabDef = TABS.find((t) => t.id === activeTab);

  function handleTabClick(id: TabId) {
    onTabChange(activeTab === id ? null : id);
  }

  return (
    <div className="flex flex-row h-full">
      {/* Icon strip */}
      <TooltipProvider>
        <div className="flex flex-col w-12 bg-zinc-900 shrink-0">
          {/* Top actions */}
          {topActions && (
            <>
              <div className="flex flex-col items-center py-1">
                {topActions}
              </div>
              <div className="border-t border-zinc-700 mx-2" />
            </>
          )}

          {/* Tab buttons */}
          <div className="flex flex-col flex-1 items-center py-1 gap-0.5">
            {TABS.map(({ id, icon: Icon, label }) => (
              <Tooltip key={id}>
                <TooltipTrigger
                  type="button"
                  onClick={() => handleTabClick(id)}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center transition-colors",
                    activeTab === id
                      ? "bg-zinc-700 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  )}
                  aria-label={label}
                >
                  <Icon size={18} className="size-[18px]" />
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Bottom settings icon */}
          <div className="flex flex-col items-center pb-2">
            <button
              type="button"
              disabled
              className="w-12 h-12 flex items-center justify-center text-zinc-600 cursor-default"
              aria-label="Settings"
            >
              <Settings size={18} className="size-[18px]" />
            </button>
          </div>
        </div>
      </TooltipProvider>

      {/* Contextual panel */}
      <div
        className={cn(
          "flex flex-col bg-white border-r border-zinc-200 overflow-hidden transition-[width] duration-200",
          activeTab ? "w-[280px]" : "w-0"
        )}
      >
        {activeTab && (
          <>
            {/* Panel header */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-zinc-100 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                {activeTabDef?.label ?? activeTab}
              </span>
              <button
                type="button"
                onClick={() => onTabChange(null)}
                className="text-zinc-400 hover:text-zinc-700 transition-colors"
                aria-label="Close panel"
              >
                <X size={14} />
              </button>
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </>
        )}
      </div>
    </div>
  );
}

export { Sidebar };
