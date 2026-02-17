import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LatestLaunch } from './components/latest-launch/latest-launch';
import { NextLaunch } from './components/next-launch/next-launch';

@Component({
  selector: 'spx-home',
  templateUrl: './home-page.html',
  standalone: true,
  imports: [LatestLaunch, NextLaunch],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
