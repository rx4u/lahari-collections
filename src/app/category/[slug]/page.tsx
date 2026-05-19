import { getAllCategorySlugs, getCategoryBySlug, getProductsByCategory } from "@/lib/products";
import { getConfig } from "@/lib/config";
import { notFound } from "next/navigation";
import CategoryClient from "./client";

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const products = getProductsByCategory(slug);
  const config = getConfig();

  return <CategoryClient category={category} products={products} config={config} />;
}
