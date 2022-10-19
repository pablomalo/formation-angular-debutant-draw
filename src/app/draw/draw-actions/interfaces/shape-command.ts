import { Shape } from '../enums/shape';

export interface ShapeCommand {
  shape: Shape;
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
