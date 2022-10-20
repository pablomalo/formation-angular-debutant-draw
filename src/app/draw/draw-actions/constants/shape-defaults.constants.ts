import { ColorConstants } from './color.constants';
import { IShapeCommand } from '../interfaces/shape-command.interface';
import { ShapeEnum } from '../enums/shape.enum';

export class ShapeDefaultsConstants {
  static readonly RECTANGLE: IShapeCommand = {
    shape: ShapeEnum.Rectangle,
    fill: ColorConstants.DEFAULT_COLOR.hexValue,
    width: 200,
    height: 100,
    opacity: 1,
    left: 10,
    top: 35,
  };

  static readonly CIRCLE: IShapeCommand = {
    shape: ShapeEnum.Circle,
    fill: ColorConstants.DEFAULT_COLOR.hexValue,
    opacity: 1,
    left: 50,
    top: 75,
    radius: 30,
  };

  static readonly LINE: IShapeCommand = {
    shape: ShapeEnum.Line,
    stroke: ColorConstants.DEFAULT_COLOR.hexValue,
    points: [0, 0, 300, 100],
    strokeWidth: 3,
  };
}
