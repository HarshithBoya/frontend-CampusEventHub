import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';

@Component({

  selector: 'app-login',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
  
<div class="min-h-screen relative overflow-hidden bg-neutral-950 flex">

  <!-- Animated Gradient Background -->
  <div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-neutral-950 to-blue-900 opacity-90"></div>

  <!-- Glow Orbs -->
  <div class="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-3xl animate-pulse"></div>
  <div class="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-600/40 rounded-full blur-3xl animate-pulse"></div>

  <!-- LEFT SIDE -->
  <div class="hidden lg:flex flex-1 relative z-10 flex-col justify-center px-24 text-white">
    
    <h1 class="text-6xl font-bold leading-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
      CampusHub
    </h1>

    <p class="mt-6 text-xl text-neutral-300 max-w-lg leading-relaxed">
      Experience campus life like never before.
      Discover events. Connect. Grow.
    </p>

    <div class="mt-12 space-y-5 text-neutral-300 text-lg">
      <div class="flex items-center gap-4">
        <div class="w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"></div>
        <span>Real-time event updates</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"></div>
        <span>Smart community matching</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-500/50"></div>
        <span>Seamless student experience</span>
      </div>
    </div>

  </div>

  <!-- RIGHT SIDE -->
  <div class="flex-1 flex items-center justify-center relative z-10 px-6 py-12">

    <div class="w-full max-w-md">

      <!-- Glass Card -->
      <div class="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-2xl">

        <!-- Header -->
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-bold text-white">
            Welcome back
          </h2>
          <p class="text-sm text-neutral-300 mt-2">
            Sign in to your account
          </p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">

          <!-- Email -->
          <div>
            <label class="text-sm font-medium text-neutral-300">
              Email
            </label>
            <input
              type="email"
              formControlName="email"
              placeholder="you@example.com"
              class="mt-2 w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />

            @if (form.controls.email.touched && form.controls.email.invalid) {
              <p class="text-xs text-red-400 mt-2">
                Valid email is required
              </p>
            }
          </div>

<!-- Password -->
<div>
  <label class="text-sm font-medium text-neutral-300">
    Password
  </label>

  <!-- Input Wrapper -->
  <div class="relative mt-1">

    <input 
      [type]="showPassword() ? 'text' : 'password'"
      formControlName="password"
      placeholder="••••••••"
      class="w-full rounded-full bg-white/10 border border-white/20
             px-6 py-2.5 pr-14 text-sm text-white outline-none
             focus:ring-2 focus:ring-purple-400"
    />

    <button
      type="button"
      (click)="togglePassword()"
      class="absolute right-4 top-1/2 -translate-y-1/2
             text-white/60 hover:text-white transition"
    >
      @if (showPassword()) {
        <!-- Eye Off -->
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 24 24"
             stroke-width="1.8" stroke="currentColor"
             class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-.586
                   M9.878 5.082A9.956 9.956 0 0112 4.5
                   c4.756 0 8.774 3.162 10.066 7.5
                   a9.956 9.956 0 01-1.862 3.042
                   M6.228 6.228A9.956 9.956 0 003.934 12
                   c1.292 4.338 5.31 7.5 10.066 7.5
                   a9.956 9.956 0 004.122-.878" />
        </svg>
      } @else {
        <!-- Eye -->
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 24 24"
             stroke-width="1.8" stroke="currentColor"
             class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 12s3.75-7.5 9.75-7.5
                   S21.75 12 21.75 12
                   18 19.5 12 19.5
                   2.25 12 2.25 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      }
    </button>

  </div>

  @if (form.controls.password.touched && form.controls.password.invalid) {
    <p class="text-xs text-red-400 mt-2">
      Password is required
    </p>
  }
</div>

          <!-- Error -->
          @if (error()) {
            <div class="text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
              {{ error() }}
            </div>
          }

          <!-- Submit -->
          <button
            type="submit"
            [disabled]="form.invalid || loading()"
            class="w-full rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-[length:200%_200%] text-white py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-60"
          >
            @if (loading()) {
              Signing in...
            } @else {
              Sign in
            }
          </button>

        </form>

        <!-- Footer -->
        <p class="text-sm text-neutral-300 text-center mt-8">
          Don’t have an account?
          <a
            routerLink="/register"
            class="text-purple-400 font-semibold hover:text-purple-300 transition"
          >
            Create one
          </a>
        </p>

      </div>

    </div>
  </div>

</div>
`,

})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    this.error.set(null);

    this.authService.login(this.form.getRawValue()).subscribe({
      next: (res: any) => {
        this.loading.set(false);

        // ✅ single source of truth
        this.tokenService.setToken(res.token);

        const payload = JSON.parse(atob(res.token.split('.')[1]));
        this.tokenService.setUser(payload);

        this.router.navigate(['/events']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'Login failed');
      },
    });
  }
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update(v => !v);
  }
}