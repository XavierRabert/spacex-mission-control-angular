import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LaunchesService } from '../services/launches.service';
import { LaunchCard } from '../components/launch-card';

@Component({
  selector: 'spx-launches-page',
  imports: [LaunchCard],
  templateUrl: './launches-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesPage {
  private _launchesService = inject(LaunchesService);

  public launches = this._launchesService.launches;
}
