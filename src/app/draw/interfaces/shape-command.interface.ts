import { ShapeEnum } from '../enums/shape.enum';

export interface IShapeCommand {
  shape: ShapeEnum;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  radius?: number;
  fill?: string;
  points?: number[];
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}
