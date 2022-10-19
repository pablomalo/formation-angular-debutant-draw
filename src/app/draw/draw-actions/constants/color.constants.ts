import { Color } from '../interfaces/color';

export class ColorConstants {
  static readonly BLACK: Color = { name: 'noir', hexValue: 'black' };
  static readonly RED: Color = { name: 'rouge', hexValue: 'red' };
  static readonly BLUE: Color = { name: 'bleu', hexValue: 'bleu' };
  static readonly YELLOW: Color = { name: 'jaune', hexValue: 'yellow' };
  static readonly GREEN: Color = { name: 'vert', hexValue: 'green' };
  static readonly PURPLE: Color = { name: 'violet', hexValue: 'purple' };
  static readonly ORANGE: Color = { name: 'orange', hexValue: 'orange' };

  static readonly DEFAULT_COLOR: Color = this.BLACK;

  static readonly COLORS: Color[] = [
    this.BLACK,
    this.RED,
    this.BLUE,
    this.YELLOW,
    this.GREEN,
    this.PURPLE,
    this.ORANGE,
  ];
}
