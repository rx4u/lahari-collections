import type { HeroConfig } from "@/lib/types";

interface Props {
  config: HeroConfig;
}

// Replace this file with your custom hero component.
// It receives the full HeroConfig and renders whatever you need.
export default function HeroExternal({ config }: Props) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-muted">
      <p className="text-sm text-muted-foreground">
        Replace <code>src/hero-external.tsx</code> with your custom hero.
      </p>
    </section>
  );
}
