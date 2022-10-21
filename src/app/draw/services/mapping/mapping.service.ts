import { Injectable } from '@angular/core';
import { IColor } from '../../interfaces/color.interface';
import { ShapeEnum } from '../../enums/shape.enum';
import {
  BLUE,
  DEFAULT,
  GREEN,
  RED,
} from '../../helpers/constants/color.constants';

@Injectable({
  providedIn: 'root',
})
export class MappingService {
  public static mapShapeEnumToDefaultColor = (shape: ShapeEnum): IColor => {
    switch (shape) {
      case ShapeEnum.Rectangle:
        return BLUE;
      case ShapeEnum.Circle:
        return RED;
      case ShapeEnum.Line:
        return GREEN;
      default:
        return DEFAULT;
    }
  };

  public static mapShapeEnumToDialogTitle = (shape: ShapeEnum): string => {
    switch (shape) {
      case ShapeEnum.Rectangle:
        return 'Nouveau rectangle';
      case ShapeEnum.Circle:
        return 'Nouveau cercle';
      case ShapeEnum.Line:
        return 'Nouvelle ligne';
      default:
        return '';
    }
  };

  public static mapShapeEnumToIcon = (shape: ShapeEnum): string => {
    switch (shape) {
      case ShapeEnum.Rectangle:
        return 'crop_3_2';
      case ShapeEnum.Circle:
        return 'radio_button_unchecked';
      case ShapeEnum.Line:
        return 'show_chart';
      default:
        return '';
    }
  };
}
