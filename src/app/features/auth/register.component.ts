import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { CollegeService, College } from '../../core/services/college.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
<div class="min-h-screen relative overflow-hidden bg-neutral-950 flex">

  <!-- MAIN DARK GRADIENT BACKGROUND -->
  <div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-neutral-950 to-blue-900 opacity-90"></div>


  <!-- Soft Light Blends -->
  <div class="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-3xl animate-pulse"></div>
  <div class="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-600/40 rounded-full blur-3xl animate-pulse"></div>

  <!-- LEFT SIDE -->
  <div class="hidden lg:flex flex-1 relative z-10 flex-col justify-center px-24 text-white">

  <h1 class="text-4xl font-bold leading-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
    Start Your Journey with CampusHub
    </h1>

    <p class="mt-8 text-lg text-white/70 max-w-md leading-relaxed">
      Connect with communities, discover meaningful events,
    and shape an experience that defines your college journey.
    </p>

    <div class="mt-12 space-y-5 text-white/70">

      <div class="flex items-center gap-4">
        <div class="w-3 h-3 bg-purple-400 rounded-full"></div>
        <span>Explore Events</span>
      </div>

      <div class="flex items-center gap-4">
        <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
        <span>Connect with Peers</span>
      </div>

      <div class="flex items-center gap-4">
        <div class="w-3 h-3 bg-pink-400 rounded-full"></div>
        <span>Build Your Campus Life</span>
      </div>

    </div>

  </div>

  <!-- RIGHT SIDE (REGISTER CARD) -->
  <!-- RIGHT SIDE (REGISTER CARD - SAME FUNCTIONALITY) -->
<div class="flex-1 flex items-center justify-center relative z-10 px-6 py-10">

  <div class="w-full max-w-md">

    <div class="bg-white/10 backdrop-blur-2xl
                border border-white/20
                rounded-3xl p-8
                shadow-[0_0_60px_rgba(0,0,0,0.5)]
                text-white">

      <!-- Header -->
      <div class="mb-6 text-center">
        <h2 class="text-3xl font-bold text-white">
          Create account
        </h2>
        <p class="text-sm text-white/70 mt-1">
          Join CampusHub to explore events
        </p>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">

        <!-- Name -->
        <div>
          <label class="block text-sm text-white/70 mb-1">Name</label>
          <input
            formControlName="name"
            type="text"
            placeholder="John Doe"
            class="w-full rounded-full bg-white/10 border border-white/20
                   px-6 py-2.5 text-sm text-white outline-none
                   focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm text-white/70 mb-1">Email</label>
          <input
            formControlName="email"
            type="email"
            placeholder="you@example.com"
            class="w-full rounded-full bg-white/10 border border-white/20
                   px-6 py-2.5 text-sm text-white outline-none
                   focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <!-- Password -->
        <div class="relative">
  <label class="block text-sm text-white/70 mb-1">Password</label>

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
  class="absolute right-4 top-[38px] text-white/60 hover:text-white transition"
>
  @if (showPassword()) {
    <!-- Eye Off -->
    <svg xmlns="http://www.w3.org/2000/svg" 
         fill="none" viewBox="0 0 24 24" 
         stroke-width="1.8" stroke="currentColor" 
         class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" 
            d="M3.98 8.223A10.477 10.477 0 001.934 12
               C3.226 16.338 7.244 19.5 12 19.5
               c.993 0 1.953-.138 2.863-.395M6.228 6.228
               A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162
               10.066 7.5a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l11.544 11.544" />
    </svg>
  } @else {
    <!-- Eye -->
    <svg xmlns="http://www.w3.org/2000/svg" 
         fill="none" viewBox="0 0 24 24" 
         stroke-width="1.8" stroke="currentColor" 
         class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" 
            d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12
               18 19.5 12 19.5 2.25 12 2.25 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  }
</button>
</div>

        <!-- College -->
        <div>
          <label class="block text-sm text-white/70 mb-1">College</label>
          <select
            formControlName="collegeId"
            (change)="onCollegeChange()"
            class="w-full rounded-full bg-white/10 border border-white/20
                   px-6 py-2.5 text-sm text-white outline-none
                   focus:ring-2 focus:ring-purple-400"
          >
            <option value="" class="text-black">Select college</option>
            @for (c of colleges; track c.id) {
              <option [value]="c.id" class="text-black">
                {{ c.name }}
              </option>
            }
            <option value="OTHER" class="text-black">Others</option>
          </select>
        </div>

        @if (showOtherCollege()) {
          <div>
            <label class="block text-sm text-white/70 mb-1">
              Enter your college
            </label>
            <input
              formControlName="collegeName"
              type="text"
              placeholder="Your college name"
              class="w-full rounded-full bg-white/10 border border-white/20
                     px-6 py-2.5 text-sm text-white outline-none
                     focus:ring-2 focus:ring-purple-400"
            />
          </div>
        }

        @if (error()) {
          <div class="text-sm text-red-300 bg-red-500/10 
                      border border-red-400/30 rounded-xl px-4 py-2">
            {{ error() }}
          </div>
        }

        <!-- Button -->
        <button
          type="submit"
          [disabled]="form.invalid || loading()"
          class="w-full rounded-full 
                 bg-gradient-to-r from-purple-500 to-blue-500
                 py-2.5 text-sm font-semibold
                 transition-all duration-200
                 hover:scale-[1.02]
                 hover:shadow-lg disabled:opacity-60">
          @if (loading()) {
            Creating account...
          } @else {
            Register
          }
        </button>

      </form>

      <p class="text-sm text-white/70 text-center mt-6">
        Already have an account?
        <a routerLink="/login"
           class="text-purple-400 font-semibold hover:underline">
          Sign in
        </a>
      </p>

    </div>

  </div>

</div>
           

</div>
`,
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private collegeService = inject(CollegeService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);
  showOtherCollege = signal(false);

  colleges: College[] = [];

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    collegeId: [''],
    collegeName: [''],
  });

  ngOnInit() {
    this.collegeService.getColleges().subscribe({
      next: (res) => (this.colleges = res.colleges),
    });
  }

  onCollegeChange() {
    const value = this.form.get('collegeId')?.value;
    this.showOtherCollege.set(value === 'OTHER');

    if (value !== 'OTHER') {
      this.form.patchValue({ collegeName: '' });
    }
  }

  onSubmit() {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    this.error.set(null);

    const raw = this.form.getRawValue();

    const payload: any = {
      name: raw.name,
      email: raw.email,
      password: raw.password,
      role: 'student',
    };

    // conditional payload (IMPORTANT)
    if (raw.collegeId && raw.collegeId !== 'OTHER') {
      payload.collegeId = raw.collegeId;
    } else {
      payload.collegeName = raw.collegeName;
    }

    this.authService.register(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'Registration failed');
      },
    });
  }
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update(v => !v);
  }
}