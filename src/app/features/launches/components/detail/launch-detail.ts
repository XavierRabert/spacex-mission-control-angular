import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { LaunchesService } from '../../services/launches.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { CornerStyle } from '@directives/models/tech.border';
import { LaunchStat } from 'src/app/shared/components/launch-stat/launch-stat';
import { getLaunchResources, getMissionStats } from './models/launch-detail';
import { Image } from 'src/app/shared/components/image/image';
import { ImageVariant } from 'src/app/shared/components/image/models/variants';
import { Title } from 'src/app/shared/components/title/title';

@Component({
  selector: 'spx-launch-detail',
  standalone: true,
  imports: [CommonModule, TechBorderDirective, LaunchStat, Image, Title],
  templateUrl: './launch-detail.html',
})
export class LaunchDetail {
  private _launchesSercive = inject(LaunchesService);
  private _router = inject(Router);

  public id = input.required<string>();

  public launch = this._launchesSercive.launchDetail;

  public missionStats = computed(() => {
    const launchData = this.launch()?.value;
    return getMissionStats(launchData);
  });

  public resources = computed(() => {
    const launchData = this.launch()?.value;
    return getLaunchResources(launchData);
  });

  public CornerStyle = CornerStyle;
  public ImageVariant = ImageVariant;

  constructor() {
    effect(() => {
      this._launchesSercive.setLaunchId(this.id());
    });
  }

  public goBack() {
    this._router.navigate(['/']);
  }

  public getRandomImage(images: string[]): string {
    if (!images || images.length === 0) return '';
    return images[Math.floor(Math.random() * images.length)];
  }
}
