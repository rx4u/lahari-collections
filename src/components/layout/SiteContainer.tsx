import { cn } from "@/lib/utils";

interface SiteContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function SiteContainer({
  children,
  className,
  as: Tag = "div",
}: SiteContainerProps) {
  return (
    <Tag className={cn("page-container", className)}>
      {children}
    </Tag>
  );
}
