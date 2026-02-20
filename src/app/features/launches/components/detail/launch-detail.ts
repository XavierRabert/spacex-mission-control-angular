import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { CornerStyle } from '@directives/models/types';
import { LaunchStat } from 'src/app/shared/components/launch-stat/launch-stat';
import { getLaunchResources, getMissionStats } from './models/launch-detail';
import { Image } from 'src/app/shared/components/image/image';
import { ImageVariant } from 'src/app/shared/components/image/models/variants';
import { Title } from 'src/app/shared/components/title/title';
import { LaunchDetailService } from './services/LaunchDetail';
import { getRandomImage } from 'src/app/core/utils/image';

@Component({
  selector: 'spx-launch-detail',
  standalone: true,
  imports: [CommonModule, TechBorderDirective, LaunchStat, Image, Title],
  templateUrl: './launch-detail.html',
})
export class LaunchDetail {
  private _launchDetailService = inject(LaunchDetailService);
  private _router = inject(Router);

  public id = input.required<string>();

  public launch = this._launchDetailService.launch;
  public launchpadName = this._launchDetailService.launchpadName;
  public rocketName = this._launchDetailService.rocketName;
  public rocket = this._launchDetailService.rocket;
  public getRandomImage = getRandomImage;

  public missionStats = computed(() => {
    const launchData = this.launch()?.value;
    const launchpadName = this.launchpadName();
    const rocketName = this.rocketName();
    return getMissionStats(launchData, launchpadName, rocketName);
  });

  public resources = computed(() => {
    const launchData = this.launch()?.value;
    return getLaunchResources(launchData);
  });

  public CornerStyle = CornerStyle;
  public ImageVariant = ImageVariant;

  constructor() {
    effect(() => {
      this._launchDetailService.setLaunchId(this.id());
    });
  }

  public goBack() {
    this._router.navigate(['/launches']);
  }
}
