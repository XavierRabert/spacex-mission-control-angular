import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'spx-skeleton',
  imports: [],
  template: ` @for (line of this.totalLines(); track line) {
    <div
      class="skeleton-card rounded-2xl bg-zinc-900/70 border border-cyan-500/20 p-6 shadow-xl animate-pulse"
    ></div>
  }`,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skeleton {
  public lines = input<number>(1);

  public totalLines = computed(() => Array(this.lines()).fill(''));
}
