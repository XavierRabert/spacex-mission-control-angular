import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { Title } from '@shared/components/title/title';
import { Image } from 'src/app/shared/components/image/image';
import { RocketDetailService } from './services/RocketDetail';
import { CornerStyle } from '@directives/models/types';
import { ImageVariant } from '@shared/components/image/models/variants';
import { getRocketSpecs } from './models/rockets-detail';

@Component({
  selector: 'spx-rocket-detail',
  standalone: true,
  imports: [TechBorderDirective, Image, Title, DatePipe],
  templateUrl: './rocket-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RocketDetail {
  private _rocketDetailService = inject(RocketDetailService);
  private _router = inject(Router);
  public id = input.required<string>();
  public rocket = this._rocketDetailService.rocket;
  public rocketSpecs = computed(() => getRocketSpecs(this.rocket()?.value!));
  public CornerStyle = CornerStyle;
  public ImageVariant = ImageVariant;

  constructor() {
    effect(() => this._rocketDetailService.setRocketId(this.id()));
  }

  public goBack() {
    this._router.navigate(['/rockets']);
  }
}
