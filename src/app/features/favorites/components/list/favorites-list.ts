import { ChangeDetectionStrategy, Component, effect, inject, viewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@shared/components/title/title';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { FavoritesService } from '@features/favorites/services/favorites';
import { RocketsService } from '@features/rockets/services/rockets.service';
import { LaunchesService } from '@features/launches/services/launches.service';
import { CornerStyle } from '@directives/models/types';
import gsap from 'gsap';
import { computed } from '@angular/core';
import { RocketCard } from '@features/rockets/components/list/components/launch-card/rocket-card';
import { LaunchCard } from '@features/launches/components/list/components/launch-card/launch-card';
import { FavoriteType } from '@models/favorites/favorites';

@Component({
  selector: 'spx-favorites-list',
  imports: [RocketCard, LaunchCard, Title, TechBorderDirective],
  templateUrl: './favorites-list.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesList {
  private _favoritesService = inject(FavoritesService);
  private _rocketsService = inject(RocketsService);
  private _launchesService = inject(LaunchesService);
  private _router = inject(Router);

  public CornerStyle = CornerStyle;

  public favoriteRockets = computed(() => {
    const allRockets = this._rocketsService.rockets().value ?? [];
    return allRockets.filter((r) => this._favoritesService.isFavorite(FavoriteType.ROCKET, r.id));
  });

  public favoriteLaunches = computed(() => {
    const allLaunches = this._launchesService.launches().value ?? [];
    return allLaunches.filter((l) => this._favoritesService.isFavorite(FavoriteType.LAUNCH, l.id));
  });

  public hasNoFavorites = computed(
    () => !this.favoriteRockets().length && !this.favoriteLaunches().length,
  );

  public rocketCards = viewChildren(RocketCard);
  public launchCards = viewChildren(LaunchCard);

  constructor() {
    effect(() => {
      const elements = [
        ...this.rocketCards().map((c) => c.el.nativeElement),
        ...this.launchCards().map((c) => c.el.nativeElement),
      ];
      if (!elements.length) return;
      this._animateList(elements);
    });
  }

  public onClickRocket(id: string) {
    this._router.navigate(['/rockets', id]);
  }

  public onClickLaunch(id: string) {
    this._router.navigate(['/launches', id]);
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
        stagger: { each: 0.07, from: 'start' },
      })
      .to(cardElements, {
        filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.4))',
        duration: 0.15,
        ease: 'power2.out',
        stagger: { each: 0.05, from: 'start' },
      })
      .to(cardElements, {
        filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.08))',
        duration: 0.5,
        ease: 'sine.inOut',
        stagger: { each: 0.05, from: 'start' },
      });
  }
}
