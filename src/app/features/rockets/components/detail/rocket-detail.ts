import { DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { Title } from '@shared/components/title/title';
import { Image } from 'src/app/shared/components/image/image';
import { RocketDetailService } from './services/RocketDetail';
import { getRandomImage } from 'src/app/core/utils/image';
import { CornerStyle } from '@directives/models/types';
import { ImageVariant } from '@shared/components/image/models/variants';
import { getRocketSpecs, getRocketStages } from './models/rockets-detail';

@Component({
  selector: 'spx-rocket-detail',
  standalone: true,
  imports: [TechBorderDirective, Image, Title, DatePipe, DecimalPipe, UpperCasePipe],
  templateUrl: './rocket-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RocketDetail {
  private _rokcketDetailService = inject(RocketDetailService);
  private _router = inject(Router);

  public id = input.required<string>();

  public rocket = this._rokcketDetailService.rocket;
  public getRandomImage = getRandomImage;

  public rocketSpecs = computed(() => {
    const rocket = this.rocket()?.value;
    return getRocketSpecs(rocket!);
  });

  public rocketStages = computed(() => {
    const rocket = this.rocket()?.value;
    return getRocketStages(rocket!);
  });

  public CornerStyle = CornerStyle;
  public ImageVariant = ImageVariant;

  constructor() {
    effect(() => {
      this._rokcketDetailService.setRocketId(this.id());
    });
  }

  public goBack() {
    this._router.navigate(['/rockets']);
  }
}
