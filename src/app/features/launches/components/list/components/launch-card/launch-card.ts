import { DatePipe } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  input,
  inject,
} from '@angular/core';
import { CornerStyle } from '@directives/models/tech.border';
import { TechBorderDirective } from '@directives/tech-border.directive';
import gsap from 'gsap';
import { Image } from 'src/app/shared/components/image/image';

@Component({
  selector: 'spx-launch-card',
  standalone: true,
  templateUrl: './launch-card.html',
  imports: [DatePipe, TechBorderDirective, Image],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchCard implements AfterViewInit {
  private _el = inject(ElementRef);
  public launch = input.required<any>();

  public CornerStyle = CornerStyle;

  public ngAfterViewInit() {
    gsap.from(this._el.nativeElement, {
      opacity: 0,
      y: 40,
      duration: 3,
      ease: 'power3.out',
    });
  }
}
