import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'spx-title',
  imports: [],
  template: `
    <div class="flex items-center gap-6 mb-12">
      <div class="flex-1 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-cyan-400/20"></div>
      <h2 class="text-3xl font-bold text-white tracking-wider">{{ text() }}</h2>
      <div class="flex-1 h-px bg-linear-to-l from-transparent via-cyan-400/50 to-cyan-400/20"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Title {
  public text = input<string>('');
}
