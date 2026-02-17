import { ChangeDetectionStrategy, Component, effect, inject, viewChildren } from '@angular/core';
import { LaunchesService } from '@features/launches/services/launches.service';
import { LaunchCard } from './components/launch-card/launch-card';
import { Router } from '@angular/router';
import { Pagination } from '@shared/components/pagination/pagination';
import { Title } from '@shared/components/title/title';
import gsap from 'gsap';
import { CornerStyle } from '@directives/models/types';
import { TechBorderDirective } from '@directives/tech-border.directive';

@Component({
  selector: 'spx-launches-list',
  imports: [LaunchCard, Title, Pagination, TechBorderDirective],
  templateUrl: './launches-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesList {
  private _launchesService = inject(LaunchesService);
  private _router = inject(Router);

  public launches = this._launchesService.launches;
  public currentPaginationKey = this._launchesService.currentPaginationKey;

  public CornerStyle = CornerStyle;

  public onClickDetail(id: string) {
    this._router.navigate(['/launches', id]);
  }

  public cards = viewChildren(LaunchCard);

  constructor() {
    effect(() => {
      const cardElements = this.cards().map((c) => c.el.nativeElement);
      if (!cardElements.length) return;
      this._animateList(cardElements);
    });
  }

  private _animateList(cardElements: HTMLElement[]) {
    gsap.killTweensOf(cardElements);

    gsap
      .timeline()
      .set(cardElements, {
        opacity: 0,
        scaleX: 0.92,
        scaleY: 0.95,
        filter: 'blur(10px) brightness(3)',
      })

      .to(cardElements, {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        filter: 'blur(0px) brightness(1)',
        duration: 0.2,
        ease: 'power3.out',
        stagger: {
          each: 0.07,
          from: 'start',
        },
      })

      .to(cardElements, {
        filter: 'blur(1px) hue-rotate(90deg)',
        duration: 0.1,
        ease: 'none',
      })
      .to(cardElements, {
        filter: 'blur(0px) hue-rotate(0deg)',
        duration: 0.2,
        ease: 'none',
      })

      .to(cardElements, {
        filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.4))',
        duration: 0.15,
        ease: 'power2.out',
        stagger: {
          each: 0.05,
          from: 'start',
        },
      })
      .to(cardElements, {
        filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.08))',
        duration: 0.5,
        ease: 'sine.inOut',
        stagger: {
          each: 0.05,
          from: 'start',
        },
      });
  }
}
