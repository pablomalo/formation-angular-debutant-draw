import { IShapeCommand } from '../draw-actions/interfaces/shape-command.interface';
import { ShapeEnum } from '../draw-actions/enums/shape.enum';
import { BLUE, GREEN, RED } from './color.constants';

export const RECTANGLE: IShapeCommand = {
  shape: ShapeEnum.Rectangle,
  fill: BLUE.hexValue,
  width: 200,
  height: 100,
  opacity: 1,
  left: 50,
  top: 35,
};

export const CIRCLE: IShapeCommand = {
  shape: ShapeEnum.Circle,
  fill: RED.hexValue,
  opacity: 1,
  left: 175,
  top: 150,
  radius: 30,
};

export const LINE: IShapeCommand = {
  shape: ShapeEnum.Line,
  stroke: GREEN.hexValue,
  points: [275, 100, 400, 150],
  strokeWidth: 3,
};
