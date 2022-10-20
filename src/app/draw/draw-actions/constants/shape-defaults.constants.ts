import { ColorConstants } from './color.constants';
import { IShapeCommand } from '../interfaces/shape-command.interface';
import { ShapeEnum } from '../enums/shape.enum';

export class ShapeDefaultsConstants {
  static readonly RECTANGLE: IShapeCommand = {
    shape: ShapeEnum.Rectangle,
    fill: ColorConstants.BLUE.hexValue,
    width: 200,
    height: 100,
    opacity: 1,
    left: 50,
    top: 35,
  };

  static readonly CIRCLE: IShapeCommand = {
    shape: ShapeEnum.Circle,
    fill: ColorConstants.RED.hexValue,
    opacity: 1,
    left: 175,
    top: 150,
    radius: 30,
  };

  static readonly LINE: IShapeCommand = {
    shape: ShapeEnum.Line,
    stroke: ColorConstants.GREEN.hexValue,
    points: [275, 100, 400, 150],
    strokeWidth: 3,
  };
}
