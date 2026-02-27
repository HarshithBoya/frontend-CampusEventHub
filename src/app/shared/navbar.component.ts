import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TokenService } from '../core/services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<header class="h-16 flex items-center justify-between px-6 lg:px-10 text-white">

  <!-- Brand -->
  <h1 class="text-2xl font-extrabold tracking-tight 
           bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
           bg-clip-text text-transparent 
           drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
  CampusHub
</h1>

  <!-- Right Side -->
  <div class="flex items-center gap-4">

    @if (!isLoggedIn()) {
  <a
  routerLink="/login"
  class="px-5 py-2 rounded-full 
         text-sm font-semibold text-white
         bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500
         transition-all duration-300
         hover:scale-[1.05]
         hover:shadow-lg hover:shadow-pink-400/40
         active:scale-[0.97]"
>
  Login
</a>
    } @else {
      <button
        (click)="logout()"
        class="px-4 py-2 rounded-xl 
               text-sm font-medium 
               bg-gradient-to-r from-pink-500 to-purple-500 
               text-white 
               transition-all duration-300 
               hover:scale-[1.05] 
               hover:shadow-lg hover:shadow-pink-500/40"
      >
        Logout
      </button>
    }

  </div>
</header>
`,
})
export class NavbarComponent {
  private tokenService = inject(TokenService);
  private router = inject(Router);

  //  reactive auth state
  isLoggedIn = this.tokenService.isLoggedIn;


  logout() {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }

}