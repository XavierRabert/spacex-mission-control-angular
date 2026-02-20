import { DatePipe, DecimalPipe } from '@angular/common';
import {
  Component,
  OnDestroy,
  signal,
  computed,
  ChangeDetectionStrategy,
  inject,
  effect,
} from '@angular/core';
import { CornerStyle } from '@directives/models/types';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { HomeService } from '@features/home/services/home';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'spx-next-launch',
  standalone: true,
  imports: [TechBorderDirective, DecimalPipe, DatePipe],
  templateUrl: './next-launch.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextLaunch implements OnDestroy {
  private _homeService = inject(HomeService);

  public CornerStyle = CornerStyle;

  private _interval?: ReturnType<typeof setInterval>;
  public timeLeft = signal<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  public isLaunched = signal(false);
  public launch = this._homeService.nextLaunch;

  public units = computed(() => [
    { label: 'DAYS', value: this.timeLeft().days },
    { label: 'HOURS', value: this.timeLeft().hours },
    { label: 'MINUTES', value: this.timeLeft().minutes },
    { label: 'SECONDS', value: this.timeLeft().seconds },
  ]);

  constructor() {
    effect(() => {
      if (this.launch().value) {
        this._tick();
        this._interval = setInterval(() => this._tick(), 1000);
      }
    });
  }

  public ngOnDestroy() {
    if (this._interval) clearInterval(this._interval);
  }

  private _tick() {
    const now = new Date().getTime();
    const target = new Date(this.launch().value!.date_utc).getTime();
    const diff = target - now;

    if (diff <= 0) {
      this.isLaunched.set(true);
      this.timeLeft.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      if (this._interval) clearInterval(this._interval);
      return;
    }

    this.timeLeft.set({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    });
  }
}
