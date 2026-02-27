import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterLink],
  templateUrl: './app-shell.component.html',
})
export class AppShellComponent {}