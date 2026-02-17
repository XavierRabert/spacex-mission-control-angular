import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LaunchesService } from '@features/launches/services/launches.service';
import { LaunchCard } from './components/launch-card/launch-card';
import { Router } from '@angular/router';
import { Title } from 'src/app/shared/components/title/title';

@Component({
  selector: 'spx-launches-list',
  imports: [LaunchCard, Title],
  templateUrl: './launches-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesList {
  private _launchesService = inject(LaunchesService);
  private _router = inject(Router);

  public launches = this._launchesService.launches;

  public onClickDetail(id: string) {
    this._router.navigate(['/launches', id]);
  }
}
