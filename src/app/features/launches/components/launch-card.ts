import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  input,
  inject,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'spx-launch-card',
  standalone: true,
  templateUrl: './launch-card.html',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchCard implements AfterViewInit {
  private _el = inject(ElementRef);
  public launch = input.required<any>();

  public ngAfterViewInit() {
    gsap.from(this._el.nativeElement, {
      opacity: 0,
      y: 40,
      duration: 3,
      ease: 'power3.out',
    });
  }
}
