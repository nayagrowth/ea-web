import portrait from "./assets/dipak-seated-armchair.png";
import type { HeroContent } from "./hero.types";

export const dipakHeroContent: HeroContent = {
  brandFirstLine: "DIPAK",
  brandSecondLine: "VISHWAKARMA",
  kicker: "Founder. Strategist. Communicator.",
  headline: "Sales Is The Transfer Of Certainty.",
  supportingCopy:
    "Thoughts on sales, communication, trust, and personal branding for people building meaningful authority.",
  quote: "Curiosity Builds Trust.",
  portrait,
  portraitAlt: "Dipak Vishwakarma seated in an armchair",
  ctas: [
    {
      label: "Read My Story",
      event: "public.dipak_hero.primary_cta_clicked",
      kind: "primary",
    },
    {
      label: "Explore Authority Closers",
      event: "public.dipak_hero.secondary_cta_clicked",
      kind: "secondary",
    },
  ],
};
