import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LaunchesList } from './components/list/launches-list';

@Component({
  selector: 'spx-launches-page',
  imports: [LaunchesList],
  templateUrl: './launches-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesPage {}
