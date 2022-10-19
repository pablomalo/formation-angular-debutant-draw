import { IColor } from '../interfaces/color.interface';

export class ColorConstants {
  static readonly BLACK: IColor = { name: 'noir', hexValue: 'black' };
  static readonly RED: IColor = { name: 'rouge', hexValue: 'red' };
  static readonly BLUE: IColor = { name: 'bleu', hexValue: 'blue' };
  static readonly YELLOW: IColor = { name: 'jaune', hexValue: 'yellow' };
  static readonly GREEN: IColor = { name: 'vert', hexValue: 'green' };
  static readonly PURPLE: IColor = { name: 'violet', hexValue: 'purple' };
  static readonly ORANGE: IColor = { name: 'orange', hexValue: 'orange' };

  static readonly DEFAULT_COLOR: IColor = this.BLACK;

  static readonly COLORS: IColor[] = [
    this.BLACK,
    this.RED,
    this.BLUE,
    this.YELLOW,
    this.GREEN,
    this.PURPLE,
    this.ORANGE,
  ];

  static findColorByHexValue: Function = (hexValue: string): IColor =>
    this.COLORS.find((color: IColor) => color.hexValue === hexValue) ??
    ColorConstants.DEFAULT_COLOR;
}
