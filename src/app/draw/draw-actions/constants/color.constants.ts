import { IColor } from '../interfaces/color.interface';

export class ColorConstants {
  static readonly AQUA: IColor = { name: 'azur', hexValue: 'aqua' };
  static readonly BLACK: IColor = { name: 'noir', hexValue: 'black' };
  static readonly BLUE: IColor = { name: 'bleu', hexValue: 'blue' };
  static readonly FUCHSIA: IColor = { name: 'fuchsia', hexValue: 'fuchsia' };
  static readonly GRAY: IColor = { name: 'gris', hexValue: 'gray' };
  static readonly GREEN: IColor = { name: 'vert', hexValue: 'green' };
  static readonly LIME: IColor = { name: 'citron vert', hexValue: 'lime' };
  static readonly MAROON: IColor = { name: 'marron', hexValue: 'maroon' };
  static readonly NAVY: IColor = { name: 'marine', hexValue: 'navy' };
  static readonly OLIVE: IColor = { name: 'olive', hexValue: 'olive' };
  static readonly ORANGE: IColor = { name: 'orange', hexValue: 'orange' };
  static readonly PURPLE: IColor = { name: 'violet', hexValue: 'purple' };
  static readonly RED: IColor = { name: 'rouge', hexValue: 'red' };
  static readonly SILVER: IColor = { name: 'argent', hexValue: 'silver' };
  static readonly TEAL: IColor = { name: 'turquoise', hexValue: 'teal' };
  static readonly WHITE: IColor = { name: 'blanc', hexValue: 'white' };
  static readonly YELLOW: IColor = { name: 'jaune', hexValue: 'yellow' };

  static readonly DEFAULT: IColor = this.BLACK;

  static readonly COLORS: IColor[] = [
    this.AQUA,
    this.BLACK,
    this.BLUE,
    this.FUCHSIA,
    this.GRAY,
    this.GREEN,
    this.LIME,
    this.MAROON,
    this.NAVY,
    this.OLIVE,
    this.ORANGE,
    this.PURPLE,
    this.RED,
    this.SILVER,
    this.TEAL,
    this.WHITE,
    this.YELLOW,
  ].sort((a, b): number => a.name.localeCompare(b.name));

  static findByHexValue: Function = (hexValue: string): IColor =>
    this.COLORS.find((color) => color.hexValue === hexValue) ??
    ColorConstants.DEFAULT;
}
