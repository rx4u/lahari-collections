import { cn } from "@/lib/utils";
import SiteContainer from "@/components/layout/SiteContainer";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface PageHeaderProps {
  breadcrumbs?: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
  bannerImage?: string;
  className?: string;
}

export default function PageHeader({
  breadcrumbs,
  title,
  subtitle,
  bannerImage,
  className,
}: PageHeaderProps) {
  if (bannerImage) {
    return (
      <div className={cn("relative w-full overflow-hidden", className)} style={{ minHeight: 280 }}>
        <img
          src={bannerImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
        />
        {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: gradient scrim on banner image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 flex items-end h-full pb-10 pt-24">
          <SiteContainer>
            {breadcrumbs && breadcrumbs.length > 0 && (
              // eslint-disable-next-line no-restricted-syntax -- photo overlay: breadcrumbs on darkened banner image
              <div className="mb-3 [&_a]:text-white/70 [&_span]:text-white/90 [&_svg]:text-white/50">
                <Breadcrumb items={breadcrumbs} />
              </div>
            )}
            {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: title on darkened banner image */}
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {title}
            </h1>
            {subtitle && (
              // eslint-disable-next-line no-restricted-syntax -- photo overlay: subtitle on darkened banner image
              <p className="mt-3 text-white/75 text-base sm:text-lg max-w-2xl">{subtitle}</p>
            )}
          </SiteContainer>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("w-full py-16 md:py-20", className)}
      style={{ background: "var(--color-primary)" }}
    >
      <SiteContainer>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4 [&_a]:text-[var(--color-on-primary)]/70 [&_span]:text-[var(--color-on-primary)]/90 [&_svg]:text-[var(--color-on-primary)]/50">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-on-primary)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-[var(--color-on-primary)]/75 text-base sm:text-lg max-w-2xl">{subtitle}</p>
        )}
      </SiteContainer>
    </div>
  );
}
