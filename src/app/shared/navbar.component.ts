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
<div class="flex items-end gap-1 select-none relative">
  
  <span class="text-3xl font-black tracking-tight 
               bg-gradient-to-r from-purple-400 to-blue-400 
               bg-clip-text text-transparent">
    Campus
  </span>

  <span class="relative text-xl font-bold text-white 
               translate-y-[7px] tracking-wide">
    HUB

    <span class="absolute -bottom-1 left-0 w-full h-[2px] 
                 bg-gradient-to-r from-purple-500 to-pink-500 
                 rounded-full">
    </span>
  </span>

</div>
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