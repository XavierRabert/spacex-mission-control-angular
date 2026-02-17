import {
  Component,
  inject,
  viewChild,
  ElementRef,
  AfterViewInit,
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

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'spx-latest-launch',
  templateUrl: './latest-launch.html',
  standalone: true,
  imports: [SlicePipe, TechBorderDirective, Image],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestLaunch implements AfterViewInit, OnDestroy {
  private _homeService = inject(HomeService);

  public heroRef = viewChild<ElementRef>('hero');
  public heroImageRef = viewChild<ElementRef>('heroImage');
  public heroContentRef = viewChild<ElementRef>('heroContent');

  public latestLaunch = this._homeService.latestLaunch;
  public rocket = this._homeService.rocket;
  public CornerStyle = CornerStyle;

  public ngAfterViewInit() {
    this._animateHero();
    this._setupParallax();
  }

  public ImageVariant = ImageVariant;
  public getRandomImage = getRandomImage;

  public ngOnDestroy() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  private _animateHero() {
    const content = this.heroContentRef()?.nativeElement;
    if (!content) return;

    const elements = content.querySelectorAll('[data-animate]');
    console.log('ELEMENTS: ', elements);
    gsap
      .timeline()
      // 1. Glitch inicial - tot apareix amb interferència
      .set(elements, { opacity: 0, y: 0 })

      // 2. Flash blanc
      .to(content, {
        filter: 'brightness(3) blur(4px)',
        duration: 0.08,
        ease: 'none',
      })

      // 3. Glitch horitzontal
      .to(content, {
        x: -10,
        filter: 'brightness(2) blur(2px) hue-rotate(90deg)',
        duration: 0.05,
        ease: 'none',
      })
      .to(content, {
        x: 8,
        filter: 'brightness(2) blur(1px)',
        duration: 0.05,
        ease: 'none',
      })
      .to(content, {
        x: 0,
        filter: 'brightness(1) blur(0px)',
        duration: 0.08,
        ease: 'none',
      })

      // 4. Apareixen els elements un a un
      .to(elements, {
        opacity: 1,
        duration: 0.01,
        stagger: 0.1,
        ease: 'none',
      })

      // 5. Segon glitch més subtil
      .to(
        content,
        {
          x: -4,
          filter: 'blur(1px) hue-rotate(45deg)',
          duration: 0.04,
          ease: 'none',
        },
        '-=0.2',
      )
      .to(content, {
        x: 0,
        filter: 'blur(0px)',
        duration: 0.05,
        ease: 'none',
      });
  }

  private _setupParallax() {
    const heroImage = this.heroImageRef()?.nativeElement;
    const hero = this.heroRef()?.nativeElement;
    if (!heroImage || !hero) return;

    gsap.to(heroImage, {
      yPercent: 30, // Mou la imatge 30% cap avall mentre scrolls
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true, // Sincronitzat amb el scroll
      },
    });
  }
}
