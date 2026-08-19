import gsap from 'gsap';

export interface YourBridge {
  element: HTMLElement;
  measure(): void;
  buildTimeline(): gsap.core.Timeline;
  dispose(): void;
}

/**
 * Persistent bridge clone: safer for scrub/reverse than creating/removing a clone
 * whenever a threshold is crossed.
 *
 * The caller should append `bridgeHost` above Act1 and Act2 typography layers.
 */
export function createYourContinuityBridge(
  source: HTMLElement,
  target: HTMLElement,
  bridgeHost: HTMLElement
): YourBridge {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.className = 'act2-your-continuity-clone';
  Object.assign(clone.style, {
    position: 'fixed',
    margin: '0',
    pointerEvents: 'none',
    transformOrigin: '0 0',
    willChange: 'transform, opacity',
    zIndex: '9999',
  });
  bridgeHost.appendChild(clone);

  let sourceRect = source.getBoundingClientRect();
  let targetRect = target.getBoundingClientRect();

  function measure() {
    sourceRect = source.getBoundingClientRect();
    targetRect = target.getBoundingClientRect();

    gsap.set(clone, {
      left: sourceRect.left,
      top: sourceRect.top,
      width: sourceRect.width,
      height: sourceRect.height,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      autoAlpha: 0,
    });
  }

  function buildTimeline() {
    const sx = targetRect.width / Math.max(1, sourceRect.width);
    const sy = targetRect.height / Math.max(1, sourceRect.height);
    const dx = targetRect.left - sourceRect.left;
    const dy = targetRect.top - sourceRect.top;

    const tl = gsap.timeline();
    tl.set(clone, { autoAlpha: 1 })
      .set(target, { autoAlpha: 0 })
      .to(source, { autoAlpha: 0, duration: 0.08 }, 0)
      .to(
        clone,
        {
          x: dx,
          y: dy,
          scaleX: sx,
          scaleY: sy,
          duration: 0.28,
          ease: 'power2.inOut',
        },
        0
      )
      .to(target, { autoAlpha: 1, duration: 0.08 }, 0.22)
      .to(clone, { autoAlpha: 0, duration: 0.08 }, 0.22);

    return tl;
  }

  function dispose() {
    clone.remove();
  }

  measure();
  return { element: clone, measure, buildTimeline, dispose };
}
