import type { Product, Category, ProductData } from "./types";
import productDataJson from "../../data/products.json";

const productData: ProductData = productDataJson as ProductData;

export function getProductData(): ProductData {
  return productData;
}

export function getProductBySlug(slug: string): Product | null {
  return productData.products.find((p) => p.slug === slug) ?? null;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return productData.products.filter((p) => p.category === categorySlug);
}

export function getProductsByTag(tag: string): Product[] {
  return productData.products.filter((p) => p.tags?.includes(tag));
}

export function getCategoryBySlug(slug: string): Category | null {
  return productData.categories.find((c) => c.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return productData.products.map((p) => p.slug);
}

export function getAllCategorySlugs(): string[] {
  return productData.categories.map((c) => c.slug);
}

export function getProductCount(categorySlug: string): number {
  return productData.products.filter((p) => p.category === categorySlug).length;
}

export function formatPrice(price: number, currencySymbol: string): string {
  return `${currencySymbol} ${price.toLocaleString("en-IN")}`;
}
