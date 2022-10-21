import { IColor } from '../draw-actions/interfaces/color.interface';

export const AQUA: IColor = { name: 'azur', hexValue: 'aqua' };
export const BLACK: IColor = { name: 'noir', hexValue: 'black' };
export const BLUE: IColor = { name: 'bleu', hexValue: 'blue' };
export const FUCHSIA: IColor = { name: 'fuchsia', hexValue: 'fuchsia' };
export const GRAY: IColor = { name: 'gris', hexValue: 'gray' };
export const GREEN: IColor = { name: 'vert', hexValue: 'green' };
export const LIME: IColor = { name: 'citron vert', hexValue: 'lime' };
export const MAROON: IColor = { name: 'marron', hexValue: 'maroon' };
export const NAVY: IColor = { name: 'marine', hexValue: 'navy' };
export const OLIVE: IColor = { name: 'olive', hexValue: 'olive' };
export const ORANGE: IColor = { name: 'orange', hexValue: 'orange' };
export const PURPLE: IColor = { name: 'violet', hexValue: 'purple' };
export const RED: IColor = { name: 'rouge', hexValue: 'red' };
export const SILVER: IColor = { name: 'argent', hexValue: 'silver' };
export const TEAL: IColor = { name: 'turquoise', hexValue: 'teal' };
export const WHITE: IColor = { name: 'blanc', hexValue: 'white' };
export const YELLOW: IColor = { name: 'jaune', hexValue: 'yellow' };

export const DEFAULT: IColor = BLACK;

export const COLORS: IColor[] = [
  AQUA,
  BLACK,
  BLUE,
  FUCHSIA,
  GRAY,
  GREEN,
  LIME,
  MAROON,
  NAVY,
  OLIVE,
  ORANGE,
  PURPLE,
  RED,
  SILVER,
  TEAL,
  WHITE,
  YELLOW,
].sort((a, b): number => a.name.localeCompare(b.name));

export const findColorByHexValue: Function = (hexValue: string): IColor =>
  COLORS.find((color) => color.hexValue === hexValue) ?? DEFAULT;
