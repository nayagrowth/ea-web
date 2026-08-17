import type { StaticImageData } from "next/image";

export type HeroCta = {
  label: string;
  href?: string;
  event: HeroEventName;
  kind: "primary" | "secondary";
};

export type HeroContent = {
  brandFirstLine: string;
  brandSecondLine: string;
  kicker: string;
  headline: string;
  supportingCopy: string;
  quote?: string;
  portrait: StaticImageData;
  portraitAlt: string;
  ctas: HeroCta[];
};

export type HeroEventName =
  | "public.dipak_hero.primary_cta_clicked"
  | "public.dipak_hero.secondary_cta_clicked"
  | "public.dipak_hero.menu_open_requested";
