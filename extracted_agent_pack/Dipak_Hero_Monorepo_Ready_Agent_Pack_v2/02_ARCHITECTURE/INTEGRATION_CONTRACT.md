# Hero Integration Contract

## Surface identity
`dipak-public-hero`

## Stable semantic events
Schema version `1`:

- `public.dipak_hero.primary_cta_clicked`
- `public.dipak_hero.secondary_cta_clicked`
- `public.dipak_hero.menu_open_requested` (reserved; not implemented unless menu becomes real)

## Event attributes
Interactive elements may expose:

```html
data-ac-event="public.dipak_hero.primary_cta_clicked"
data-ac-event-schema="1"
data-ac-surface="dipak-public-hero"
```

Do not bind the hero to Google Analytics/Meta Pixel/PostHog/etc. at feature level. Later the app shell may attach whatever governed telemetry adapter Authority Closers selects.

## Content contract
Hero content is passed through the typed `HeroContent` object. The component should not fetch content at runtime for V1.

If a CMS is introduced later, adapt CMS data into `HeroContent` outside the component. Do not teach the component CMS-specific types.

## Asset contract
Portrait is a `StaticImageData` input. This permits:
- local optimized assets now;
- future alternate art direction;
- easy replacement without changing layout logic.
