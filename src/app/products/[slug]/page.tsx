import { getAllSlugs, getProductBySlug, getProductsByCategory } from "@/lib/products";
import { getConfig } from "@/lib/config";
import { notFound } from "next/navigation";
import ProductDetailClient from "./client";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const config = getConfig();
  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      related={related}
      config={config}
    />
  );
}
