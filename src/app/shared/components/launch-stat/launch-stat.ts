import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CornerStyle } from '@directives/models/types';
import { TechBorderDirective } from '@directives/tech-border.directive';

@Component({
  selector: 'spx-launch-stat',
  imports: [TechBorderDirective],
  template: `
    <span
      spxTechBorder
      [corners]="CornerStyle.ALL"
      class="px-4 py-1.5 text-xs font-bold tracking-wider"
      [class.bg-emerald-500/50]="launch()"
      [class.border-emerald-400]="launch()"
      [class.text-emerald-400]="launch()"
      [class.bg-red-500/50]="!launch()"
      [class.border-red-400]="!launch()"
      [class.text-red-400]="!launch()"
    >
      {{ launch() ? '✓ SUCCESS' : '❌ FAILURE' }}
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchStat {
  public launch = input<boolean>(true);
  public CornerStyle = CornerStyle;
}
