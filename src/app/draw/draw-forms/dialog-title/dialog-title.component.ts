import { Component, Input, OnInit } from '@angular/core';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';
import { MappingService } from '../../services/mapping/mapping.service';

@Component({
  selector: 'app-dialog-title',
  templateUrl: './dialog-title.component.html',
  styleUrls: ['./dialog-title.component.scss'],
})
export class DialogTitleComponent implements OnInit {
  @Input() shape!: ShapeEnum;
  title: string = '';
  icon: string = '';

  constructor() {}

  ngOnInit(): void {
    this.title = MappingService.mapShapeEnumToDialogTitle(this.shape);
    this.icon = MappingService.mapShapeEnumToIcon(this.shape);
  }
}
