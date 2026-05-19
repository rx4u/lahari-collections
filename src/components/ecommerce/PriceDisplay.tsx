interface PriceDisplayProps {
  price: number;
  comparePrice?: number;
  currencySymbol: string;
  showCompare?: boolean;
}

export default function PriceDisplay({ price, comparePrice, currencySymbol, showCompare = true }: PriceDisplayProps) {
  const formatted = `${currencySymbol} ${price.toLocaleString("en-IN")}`;

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-semibold text-[var(--color-primary)]">{formatted}</span>
      {showCompare && comparePrice && comparePrice > price && (
        <span className="text-sm text-[var(--color-neutral)]/60 line-through">
          {currencySymbol} {comparePrice.toLocaleString("en-IN")}
        </span>
      )}
    </div>
  );
}
