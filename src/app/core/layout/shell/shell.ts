import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'spx-shell',
  imports: [RouterOutlet, Navbar],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {}
