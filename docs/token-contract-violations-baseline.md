# Token Contract Violations — Baseline

Generated: 2026-05-16 (post Bug A/B fixes + comment-stripping + FooterSplitCta migration)

**Total violations: 61**

## By rule

| Rule | Count |
|---|---:|
| `no-neutral-as-color` | 34 |
| `no-primary-as-bg` | 25 |
| `no-secondary-as-bg` | 2 |

## Full list

| File | Line | Rule |
|---|---:|---|
| `src/components/ecommerce/AddToCartButton.tsx` | 48 | `no-primary-as-bg` |
| `src/components/ecommerce/AddToCartButton.tsx` | 38 | `no-neutral-as-color` |
| `src/components/ecommerce/CartIcon.tsx` | 18 | `no-primary-as-bg` |
| `src/components/ecommerce/PriceDisplay.tsx` | 15 | `no-neutral-as-color` |
| `src/components/ecommerce/ProductCard.tsx` | 51 | `no-primary-as-bg` |
| `src/components/ecommerce/ProductCard.tsx` | 64 | `no-neutral-as-color` |
| `src/components/ecommerce/ProductCard.tsx` | 69 | `no-neutral-as-color` |
| `src/components/ecommerce/ProductCardPortrait.tsx` | 51 | `no-primary-as-bg` |
| `src/components/ecommerce/ProductCardPortrait.tsx` | 66 | `no-neutral-as-color` |
| `src/components/ecommerce/ProductCardPortrait.tsx` | 77 | `no-neutral-as-color` |
| `src/components/ecommerce/VariantSelector.tsx` | 28 | `no-primary-as-bg` |
| `src/components/ecommerce/WhatsAppCheckout.tsx` | 58 | `no-neutral-as-color` |
| `src/components/layout/PageHeader.tsx` | 56 | `no-primary-as-bg` |
| `src/components/sections/About/AboutEditorialSplit.tsx` | 66 | `no-secondary-as-bg` |
| `src/components/sections/Admissions/AdmissionsInfoCard.tsx` | 96 | `no-primary-as-bg` |
| `src/components/sections/Admissions/AdmissionsTimeline.tsx` | 90 | `no-primary-as-bg` |
| `src/components/sections/Announcement/AnnouncementTopBar.tsx` | 24 | `no-primary-as-bg` |
| `src/components/sections/Collections/CollectionsBannerGrid.tsx` | 92 | `no-primary-as-bg` |
| `src/components/sections/Collections/CollectionsLookbook.tsx` | 81 | `no-primary-as-bg` |
| `src/components/sections/DoctorDirectory/DoctorDirectoryEditorial.tsx` | 113 | `no-primary-as-bg` |
| `src/components/sections/DoctorDirectory/DoctorDirectoryEditorial.tsx` | 285 | `no-primary-as-bg` |
| `src/components/sections/DoctorDirectory/DoctorDirectoryEditorial.tsx` | 75 | `no-neutral-as-color` |
| `src/components/sections/DoctorDirectory/DoctorDirectoryEditorial.tsx` | 233 | `no-neutral-as-color` |
| `src/components/sections/Gallery/GalleryLocationGrid.tsx` | 66 | `no-neutral-as-color` |
| `src/components/sections/Gallery/GalleryLocationGrid.tsx` | 219 | `no-neutral-as-color` |
| `src/components/sections/Packages/PackagesDetailedAccordion.tsx` | 99 | `no-primary-as-bg` |
| `src/components/sections/Portfolio/PortfolioCategorized.tsx` | 54 | `no-primary-as-bg` |
| `src/components/sections/Portfolio/PortfolioCategorized.tsx` | 80 | `no-primary-as-bg` |
| `src/components/sections/PracticeAreas/PracticeAreasDetailedCards.tsx` | 70 | `no-primary-as-bg` |
| `src/components/sections/Process/ProcessIconFlow.tsx` | 54 | `no-primary-as-bg` |
| `src/components/sections/Process/ProcessStepsHorizontal.tsx` | 43 | `no-primary-as-bg` |
| `src/components/sections/ProductCategories/ImageCards.tsx` | 25 | `no-neutral-as-color` |
| `src/components/sections/ProductCategories/ImageCardsEditorial.tsx` | 31 | `no-neutral-as-color` |
| `src/components/sections/ProductCategories/MinimalList.tsx` | 23 | `no-neutral-as-color` |
| `src/components/sections/ProductCategories/MinimalList.tsx` | 36 | `no-neutral-as-color` |
| `src/components/sections/ProductCategories/MinimalList.tsx` | 40 | `no-neutral-as-color` |
| `src/components/sections/ProductCategories/MinimalList.tsx` | 43 | `no-neutral-as-color` |
| `src/components/sections/ProductGrid/Carousel.tsx` | 56 | `no-neutral-as-color` |
| `src/components/sections/ProductGrid/Grid3.tsx` | 36 | `no-neutral-as-color` |
| `src/components/sections/ProductGrid/Grid4.tsx` | 36 | `no-neutral-as-color` |
| `src/components/sections/Services/ServicesFeaturedGrid.tsx` | 44 | `no-primary-as-bg` |
| `src/components/sections/Services/ServicesFeaturedGrid.tsx` | 37 | `no-neutral-as-color` |
| `src/components/sections/Services/ServicesFeaturedGrid.tsx` | 85 | `no-neutral-as-color` |
| `src/components/sections/Services/ServicesFeaturedGrid.tsx` | 87 | `no-neutral-as-color` |
| `src/components/sections/Testimonials/TestimonialsEditorialCarousel.tsx` | 198 | `no-primary-as-bg` |
| `src/components/sections/Testimonials/TestimonialsEditorialCarousel.tsx` | 120 | `no-secondary-as-bg` |
| `src/components/sections/Trust/TrustInlineList.tsx` | 19 | `no-neutral-as-color` |
| `src/components/sections/Trust/TrustInlineList.tsx` | 32 | `no-neutral-as-color` |
| `src/app/cart/page.tsx` | 44 | `no-primary-as-bg` |
| `src/app/cart/page.tsx` | 40 | `no-neutral-as-color` |
| `src/app/cart/page.tsx` | 41 | `no-neutral-as-color` |
| `src/app/cart/page.tsx` | 78 | `no-neutral-as-color` |
| `src/app/cart/page.tsx` | 105 | `no-neutral-as-color` |
| `src/app/cart/page.tsx` | 117 | `no-neutral-as-color` |
| `src/app/category/[slug]/client.tsx` | 70 | `no-neutral-as-color` |
| `src/app/products/[slug]/client.tsx` | 93 | `no-primary-as-bg` |
| `src/app/products/[slug]/client.tsx` | 75 | `no-neutral-as-color` |
| `src/app/products/[slug]/client.tsx` | 87 | `no-neutral-as-color` |
| `src/app/products/page.tsx` | 73 | `no-primary-as-bg` |
| `src/app/products/page.tsx` | 85 | `no-primary-as-bg` |
| `src/app/products/page.tsx` | 109 | `no-neutral-as-color` |
