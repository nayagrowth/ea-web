export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const local01 = (p: number, start: number, end: number) =>
  clamp01((p - start) / Math.max(1e-6, end - start));

export const smootherstep = (tRaw: number) => {
  const t = clamp01(tRaw);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

export const lerp = (a: number, b: number, t: number) =>
  a + (b - a) * t;

export const lerp2 = (
  a: readonly [number, number],
  b: readonly [number, number],
  t: number
): [number, number] => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
];

export const normalizePointer = (
  clientX: number,
  clientY: number,
  rect: DOMRect
): [number, number] => {
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = ((clientY - rect.top) / rect.height) * 2 - 1;
  return [Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y))];
};

export const velocityEnergy = (pxPerSecond: number, reference = 2400) =>
  clamp01(Math.abs(pxPerSecond) / reference);
