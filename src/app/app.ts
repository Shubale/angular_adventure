import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './hero/hero';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Hero],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('jest_test');
}
