import { DatePipe } from '@angular/common';
import { Component, ElementRef, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { CornerStyle } from '@directives/models/types';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { Rocket } from '@models/rocket/rocket';
import { Favorite } from '@shared/components/favorite/favorite';
import { Image } from 'src/app/shared/components/image/image';
import { FavoriteType } from '@models/favorites/favorites';
import { ImageVariant } from '@shared/components/image/models/variants';

@Component({
  selector: 'spx-rocket-card',
  standalone: true,
  templateUrl: './rocket-card.html',
  imports: [DatePipe, TechBorderDirective, Image, Favorite],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RocketCard {
  public el = inject(ElementRef);

  public rocket = input.required<Rocket>();

  public CornerStyle = CornerStyle;
  public FavoriteType = FavoriteType;
  public ImageVariant = ImageVariant;
}
