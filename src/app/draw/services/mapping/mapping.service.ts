import { Injectable } from '@angular/core';
import { IColor } from '../../draw-actions/interfaces/color.interface';
import { ColorConstants } from '../../draw-actions/constants/color.constants';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';

@Injectable({
  providedIn: 'root',
})
export class MappingService {
  public static mapShapeEnumToDefaultColor: Function = (
    shape: ShapeEnum
  ): IColor => {
    switch (shape) {
      case ShapeEnum.Rectangle:
        return ColorConstants.BLUE;
      case ShapeEnum.Circle:
        return ColorConstants.RED;
      case ShapeEnum.Line:
        return ColorConstants.GREEN;
      default:
        return ColorConstants.DEFAULT;
    }
  };
}
