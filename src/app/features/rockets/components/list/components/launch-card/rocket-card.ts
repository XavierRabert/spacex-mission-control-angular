import { DatePipe } from '@angular/common';
import { Component, ElementRef, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { CornerStyle } from '@directives/models/types';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { Rocket } from '@models/rocket/rocket';
import { Image } from 'src/app/shared/components/image/image';

@Component({
  selector: 'spx-rocket-card',
  standalone: true,
  templateUrl: './rocket-card.html',
  imports: [DatePipe, TechBorderDirective, Image],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RocketCard {
  public el = inject(ElementRef);
  public rocket = input.required<Rocket>();

  public CornerStyle = CornerStyle;
}
