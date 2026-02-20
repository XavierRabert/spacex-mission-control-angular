import { DatePipe } from '@angular/common';
import { Component, ElementRef, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { CornerStyle } from '@directives/models/types';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { Launch } from '@models/launches/launch';
import { Image } from 'src/app/shared/components/image/image';

@Component({
  selector: 'spx-launch-card',
  standalone: true,
  templateUrl: './launch-card.html',
  imports: [DatePipe, TechBorderDirective, Image],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchCard {
  public el = inject(ElementRef);
  public launch = input.required<Launch>();

  public CornerStyle = CornerStyle;
}
