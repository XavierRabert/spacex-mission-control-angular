import {
  Component,
  inject,
  viewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CornerStyle } from '@directives/models/types';
import { SlicePipe } from '@angular/common';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { Image } from '@shared/components/image/image';
import { getRandomImage } from 'src/app/core/utils/image';
import { ImageVariant } from '@shared/components/image/models/variants';
import { HomeService } from '@features/home/services/home';
import { explicitEffect } from 'ngxtension/explicit-effect';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'spx-latest-launch',
  templateUrl: './latest-launch.html',
  standalone: true,
  imports: [SlicePipe, TechBorderDirective, Image],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestLaunch implements OnDestroy {
  private _homeService = inject(HomeService);

  public heroContentRef = viewChild<ElementRef<HTMLElement>>('heroContent');

  public latestLaunch = this._homeService.latestLaunch;
  public rocket = this._homeService.rocket;
  public CornerStyle = CornerStyle;

  private _heroTimeline?: gsap.core.Timeline;

  constructor() {
    explicitEffect([this.heroContentRef], ([heroContent]) => {
      if (!heroContent) return;

      this._heroTimeline?.kill();
      this._animateHero(heroContent.nativeElement);
    });
  }

  public ImageVariant = ImageVariant;
  public getRandomImage = getRandomImage;

  public ngOnDestroy() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  private _animateHero(content: HTMLElement) {
    const elements = content.querySelectorAll('[data-animate]');

    this._heroTimeline = gsap
      .timeline()
      .set(elements, { opacity: 0, y: -25 })

      .to(elements, {
        opacity: 1,
        duration: 0.2,
        stagger: 0.12,
        ease: 'power2.in',
      })

      .to(elements, {
        y: 0,
        duration: 2,
        ease: 'elastic.out',
      });
  }
}
