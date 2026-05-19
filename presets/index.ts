import type { SiteConfig, RemixMeta } from "../src/lib/types";
import { doctorPreset, doctorRemixMeta } from "./doctor";
import { restaurantPreset, restaurantRemixMeta } from "./restaurant";
import { salonPreset, salonRemixMeta } from "./salon";
import { localPreset, localRemixMeta } from "./local";
import { dentistPreset, dentistRemixMeta } from "./dentist";
import { gymPreset, gymRemixMeta } from "./gym";
import { realestatePreset, realestateRemixMeta } from "./realestate";
import { lawyerPreset, lawyerRemixMeta } from "./lawyer";
import { retailPreset, retailRemixMeta } from "./retail";
import { hospitalPreset, hospitalRemixMeta } from "./hospital";
import { vetPreset, vetRemixMeta } from "./vet";
import { bakeryPreset, bakeryRemixMeta } from "./bakery";
import { schoolPreset, schoolRemixMeta } from "./school";
import { hotelPreset, hotelRemixMeta } from "./hotel";
import { eventsPreset, eventsRemixMeta } from "./events";
import { photographerPreset, photographerRemixMeta } from "./photographer";
import { pharmacyPreset, pharmacyRemixMeta } from "./pharmacy";
import { homeservicePreset, homeserviceRemixMeta } from "./homeservice";
import { autoPreset, autoRemixMeta } from "./auto";
import { interiorsPreset, interiorsRemixMeta } from "./interiors";
import { individualPreset, individualRemixMeta } from "./individual";
import { nonprofitPreset, nonprofitRemixMeta } from "./nonprofit";
import { worshipPreset, worshipRemixMeta } from "./worship";
import { petshopPreset, petshopRemixMeta } from "./petshop";
import { jewelleryPreset, jewelleryRemixMeta } from "./jewellery";
import { printingPreset, printingRemixMeta } from "./printing";
import { cateringPreset, cateringRemixMeta } from "./catering";
import { wellnessPreset, wellnessRemixMeta } from "./wellness";
import { diagnosticsPreset, diagnosticsRemixMeta } from "./diagnostics";
import { constructionPreset, constructionRemixMeta } from "./construction";
import { weddingPreset, weddingRemixMeta } from "./wedding";
import { ecommercePreset, ecommerceRemixMeta } from "./ecommerce";
import { publicationPreset, publicationRemixMeta } from "./publication";

export type { RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

const PRESETS: Record<string, () => DeepPartial<SiteConfig>> = {
  doctor: doctorPreset,
  restaurant: restaurantPreset,
  salon: salonPreset,
  local: localPreset,
  dentist: dentistPreset,
  gym: gymPreset,
  realestate: realestatePreset,
  lawyer: lawyerPreset,
  retail: retailPreset,
  hospital: hospitalPreset,
  vet: vetPreset,
  bakery: bakeryPreset,
  school: schoolPreset,
  hotel: hotelPreset,
  events: eventsPreset,
  photographer: photographerPreset,
  pharmacy: pharmacyPreset,
  homeservice: homeservicePreset,
  auto: autoPreset,
  interiors: interiorsPreset,
  individual: individualPreset,
  nonprofit: nonprofitPreset,
  worship: worshipPreset,
  petshop: petshopPreset,
  jewellery: jewelleryPreset,
  printing: printingPreset,
  catering: cateringPreset,
  wellness: wellnessPreset,
  diagnostics: diagnosticsPreset,
  construction: constructionPreset,
  wedding: weddingPreset,
  ecommerce: ecommercePreset,
  publication: publicationPreset,
};

export function getPreset(type: string): DeepPartial<SiteConfig> | null {
  const factory = PRESETS[type];
  return factory ? factory() : null;
}

export const AVAILABLE_PRESETS = Object.keys(PRESETS);

const REMIX_META: Record<string, RemixMeta> = {
  doctor: doctorRemixMeta,
  restaurant: restaurantRemixMeta,
  salon: salonRemixMeta,
  local: localRemixMeta,
  dentist: dentistRemixMeta,
  gym: gymRemixMeta,
  realestate: realestateRemixMeta,
  lawyer: lawyerRemixMeta,
  retail: retailRemixMeta,
  hospital: hospitalRemixMeta,
  vet: vetRemixMeta,
  bakery: bakeryRemixMeta,
  school: schoolRemixMeta,
  hotel: hotelRemixMeta,
  events: eventsRemixMeta,
  photographer: photographerRemixMeta,
  pharmacy: pharmacyRemixMeta,
  homeservice: homeserviceRemixMeta,
  auto: autoRemixMeta,
  interiors: interiorsRemixMeta,
  individual: individualRemixMeta,
  nonprofit: nonprofitRemixMeta,
  worship: worshipRemixMeta,
  petshop: petshopRemixMeta,
  jewellery: jewelleryRemixMeta,
  printing: printingRemixMeta,
  catering: cateringRemixMeta,
  wellness: wellnessRemixMeta,
  diagnostics: diagnosticsRemixMeta,
  construction: constructionRemixMeta,
  wedding: weddingRemixMeta,
  ecommerce: ecommerceRemixMeta,
  publication: publicationRemixMeta,
};

export function getRemixMeta(type: string): RemixMeta | null {
  return REMIX_META[type] ?? null;
}
