import { Shape } from '../enums/shape';

export interface ShapeCommand {
  shape: Shape;
  width?: number;
  height?: number;
  radius?: number;
  fill: string;
  opacity: number;
  left: number;
  top: number;
}
