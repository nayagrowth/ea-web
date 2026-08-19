export const ACT2_REF = {
  width: 1672,
  height: 941,
  vpX: 1433.21,
  vpY: 586.43,
} as const;

export type Act2WordKey = 'we' | 'sellOut' | 'your' | 'realEstate' | 'project';

export interface Act2TargetBox {
  key: Act2WordKey;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontPx: number;
  className: string;
}

/**
 * Canonical 1672×941 reference targets.
 * The wrapper geometry remains stable during motion while clip-path reveals the text in-situ.
 */
export const ACT2_TARGETS: Record<Act2WordKey, Act2TargetBox> = {
  we: {
    key: 'we',
    text: 'We',
    x: 239,
    y: 136,
    width: 367,
    height: 213,
    fontPx: 168,
    className: 'act2-word-we',
  },
  sellOut: {
    key: 'sellOut',
    text: 'sell-out',
    x: 746,
    y: 232,
    width: 486,
    height: 177,
    fontPx: 138,
    className: 'act2-word-sellout',
  },
  your: {
    key: 'your',
    text: 'your',
    x: 220,
    y: 394,
    width: 472,
    height: 194,
    fontPx: 160,
    className: 'act2-word-your',
  },
  realEstate: {
    key: 'realEstate',
    text: 'real estate',
    x: 690,
    y: 410,
    width: 760,
    height: 180,
    fontPx: 142,
    className: 'act2-word-realestate',
  },
  project: {
    key: 'project',
    text: 'project',
    x: 703,
    y: 560,
    width: 747,
    height: 227,
    fontPx: 148,
    className: 'act2-word-project',
  },
};
