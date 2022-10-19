import { ColorConstants } from './color.constants';
import { ShapeCommand } from '../interfaces/shape-command';
import { Shape } from '../enums/shape';

export class ShapeDefaultsConstants {
  static readonly RECTANGLE: ShapeCommand = {
    shape: Shape.Rectangle,
    fill: ColorConstants.DEFAULT_COLOR.hexValue,
    width: 100,
    height: 100,
    opacity: 1,
    left: 10,
    top: 35,
  };

  static readonly CIRCLE: ShapeCommand = {
    shape: Shape.Circle,
    fill: ColorConstants.DEFAULT_COLOR.hexValue,
    opacity: 1,
    left: 50,
    top: 75,
    radius: 30,
  };

  static readonly LINE: ShapeCommand = {
    shape: Shape.Line,
    stroke: ColorConstants.DEFAULT_COLOR.hexValue,
    points: [0, 0, 100, 100],
    strokeWidth: 2,
  };
}
