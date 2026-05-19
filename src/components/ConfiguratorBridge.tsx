"use client";

import { useEffect } from "react";
import type { SiteConfig } from "@/lib/types";

interface ConfiguratorBridgeProps {
  onConfigChange?: (config: Partial<SiteConfig>) => void;
  initialConfig?: SiteConfig;
}

type InboundMessage =
  | { type: "CONFIGURATOR_CSS_OVERRIDE"; variables: Record<string, string> }
  | { type: "CONFIG_UPDATE"; config: Partial<SiteConfig> };

export default function ConfiguratorBridge({ onConfigChange, initialConfig }: ConfiguratorBridgeProps) {
  useEffect(() => {
    function handler(event: MessageEvent) {
      const data = event.data as InboundMessage;
      if (!data || typeof data.type !== "string") return;

      switch (data.type) {
        case "CONFIGURATOR_CSS_OVERRIDE": {
          for (const [key, value] of Object.entries(data.variables)) {
            document.documentElement.style.setProperty(key, value);
          }
          break;
        }

        case "CONFIG_UPDATE": {
          onConfigChange?.(data.config);
          break;
        }
      }
    }

    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "PREVIEW_READY", config: initialConfig }, "*");

    return () => {
      window.removeEventListener("message", handler);
    };
  }, [onConfigChange]);

  return null;
}
