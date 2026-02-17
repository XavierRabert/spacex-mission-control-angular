import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CornerStyle } from '@directives/models/types';
import { TechBorderDirective } from '@directives/tech-border.directive';

@Component({
  selector: 'spx-navbar',
  imports: [RouterLink, RouterLinkActive, TechBorderDirective],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  public CornerStyle = CornerStyle;
  public menuOpen = signal(false);

  public links = [
    { path: '/launches', label: 'Launches' },
    { path: '/rockets', label: 'Rockets' },
    { path: '/favorites', label: 'Favorites' },
  ];

  public toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  public closeMenu() {
    this.menuOpen.set(false);
  }
}
