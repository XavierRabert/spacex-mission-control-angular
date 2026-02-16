import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'spx-shell',
  imports: [RouterOutlet, Navbar],
  templateUrl: './shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell implements AfterViewInit {
  public ngAfterViewInit() {
    this._createStars();
  }

  public stars: HTMLElement[] = [];
  public starsContainer = viewChild.required<ElementRef<HTMLElement>>('stars');

  private _createStars() {
    if (!this.starsContainer()) return;
    const totalStars = 500;

    for (let i = 0; i < totalStars; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 3 + 1;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      star.style.position = 'absolute';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.opacity = `${Math.random() * 0.6 + 0.4}`;
      star.style.boxShadow = `
    0 0 ${size * 2}px rgba(255, 255, 255, 0.8),
    0 0 ${size * 4}px rgba(255, 255, 255, 0.6),
    0 0 ${size * 6}px rgba(255, 255, 255, 0.4)
  `;

      this.stars.push(star);
      this.starsContainer().nativeElement.appendChild(star);
    }

    this.stars.forEach((star) => {
      const minOpacity = Math.random() * 0.3 + 0.2;
      const maxOpacity = 1;
      const duration = Math.random() * 1.5 + 0.5;

      gsap.fromTo(
        star,
        { opacity: minOpacity },
        {
          opacity: maxOpacity,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );
    });
  }
}
