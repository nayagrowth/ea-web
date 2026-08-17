import Image from "next/image";
import type { HeroContent, HeroCta } from "./hero.types";
import styles from "./dipak-hero.module.css";

const EVENT_SCHEMA_VERSION = "1";

function Cta({ cta }: { cta: HeroCta }) {
  if (!cta.href) return null;

  return (
    <a
      className={cta.kind === "primary" ? styles.primaryCta : styles.secondaryCta}
      href={cta.href}
      data-ac-event={cta.event}
      data-ac-event-schema={EVENT_SCHEMA_VERSION}
      data-ac-surface="dipak-public-hero"
    >
      <span aria-hidden="true" className={styles.ctaIcon}>
        {cta.kind === "primary" ? "→" : "○"}
      </span>
      <span>{cta.label}</span>
    </a>
  );
}

export function DipakHero({ content }: { content: HeroContent }) {
  return (
    <section id="hero" className={styles.surface} aria-labelledby="hero-heading">
      <div className={styles.textureLeft} aria-hidden="true" />
      <div className={styles.textureRight} aria-hidden="true" />

      <header className={styles.header}>
        <a className={styles.wordmark} href="#hero" aria-label="Dipak Vishwakarma home">
          <span>{content.brandFirstLine}</span>
          <span>{content.brandSecondLine}</span>
        </a>

        <div className={styles.headerMeta} aria-label="Personal brand themes">
          Sales&nbsp;&nbsp;·&nbsp;&nbsp;Communication&nbsp;&nbsp;·&nbsp;&nbsp;Trust
        </div>
      </header>

      <div className={styles.heroGrid}>
        <div className={styles.copyColumn}>
          <div className={styles.kickerRow}>
            <span>{content.kicker}</span>
            <span className={styles.kickerRule} aria-hidden="true" />
          </div>

          <h1 id="hero-heading" className={styles.headline}>
            {content.headline}
          </h1>

          <p className={styles.supportingCopy}>{content.supportingCopy}</p>

          {content.ctas.some((cta) => Boolean(cta.href)) ? (
            <div className={styles.ctaRow} aria-label="Hero actions">
              {content.ctas.map((cta) => (
                <Cta cta={cta} key={cta.event} />
              ))}
            </div>
          ) : null}

          {content.quote ? (
            <blockquote className={styles.quote}>
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <span>{content.quote}</span>
            </blockquote>
          ) : null}
        </div>

        <div className={styles.portraitColumn}>
          <div className={styles.portraitHalo} aria-hidden="true" />
          <Image
            className={styles.portrait}
            src={content.portrait}
            alt={content.portraitAlt}
            sizes="(max-width: 767px) 86vw, (max-width: 1199px) 48vw, 42vw"
            quality={85}
            preload
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
}
