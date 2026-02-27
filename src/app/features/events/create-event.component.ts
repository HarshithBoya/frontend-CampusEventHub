import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  template: `
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>Create Event</h1>
        <p class="subtitle">Fill in the details to publish a new event.</p>
      </div>

      <!-- Form Card -->
      <mat-card class="event-card">
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="event-form">
            <!-- Title -->
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Title</mat-label>
              <input matInput formControlName="title" placeholder="e.g., Tech Fest 2025" />
              <mat-icon matPrefix>event</mat-icon>
            </mat-form-field>

            <!-- Description -->
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Description</mat-label>
              <textarea
                matInput
                formControlName="description"
                rows="4"
                placeholder="Describe your event..."
              ></textarea>
              <mat-icon matPrefix>description</mat-icon>
            </mat-form-field>

            <!-- Category & Location (two columns) -->
            <div class="row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Category</mat-label>
                <input matInput formControlName="category" placeholder="e.g., Conference" />
                <mat-icon matPrefix>category</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Location</mat-label>
                <input matInput formControlName="location" placeholder="e.g., Main Auditorium" />
                <mat-icon matPrefix>location_on</mat-icon>
              </mat-form-field>
            </div>

            <!-- Visibility -->
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Visibility</mat-label>
              <mat-select formControlName="scope">
                <mat-option value="COLLEGE">College Only</mat-option>
                <mat-option value="GLOBAL">Global</mat-option>
              </mat-select>
              <mat-icon matPrefix>visibility</mat-icon>
            </mat-form-field>

            <!-- College (super admin only) -->
            @if (isSuperAdmin()) {
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>College</mat-label>
                <mat-select formControlName="collegeId">
                  <mat-option value="">Select college</mat-option>
                  @for (c of colleges; track c.id) {
                    <mat-option [value]="c.id">{{ c.name }}</mat-option>
                  }
                </mat-select>
                <mat-icon matPrefix>school</mat-icon>
              </mat-form-field>
            }

            <!-- Start Date & Time -->
            <div class="row">
              <div class="half-width">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Start Date</mat-label>
                  <input
                    matInput
                    [matDatepicker]="startPicker"
                    formControlName="startDate"
                  />
                  <mat-datepicker-toggle matIconSuffix [for]="startPicker"></mat-datepicker-toggle>
                  <mat-datepicker #startPicker></mat-datepicker>
                  <mat-icon matPrefix>calendar_today</mat-icon>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Start Time</mat-label>
                  <input matInput type="time" formControlName="startTime" />
                  <mat-icon matPrefix>schedule</mat-icon>
                </mat-form-field>
              </div>

              <!-- End Date & Time -->
              <div class="half-width">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>End Date</mat-label>
                  <input
                    matInput
                    [matDatepicker]="endPicker"
                    formControlName="endDate"
                    [min]="form.get('startDate')?.value"
                  />
                  <mat-datepicker-toggle matIconSuffix [for]="endPicker"></mat-datepicker-toggle>
                  <mat-datepicker #endPicker></mat-datepicker>
                  <mat-icon matPrefix>calendar_today</mat-icon>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>End Time</mat-label>
                  <input matInput type="time" formControlName="endTime" />
                  <mat-icon matPrefix>schedule</mat-icon>
                </mat-form-field>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              mat-raised-button
              type="submit"
              class="submit-btn"
              [disabled]="form.invalid || loading()"
            >
              @if (loading()) {
                <span class="spinner">
                  <mat-spinner diameter="20"></mat-spinner>
                  Creating...
                </span>
              } @else {
                Create Event
              }
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
      }

      .header {
        margin-bottom: 2rem;
        text-align: center;
      }

      .header h1 {
        font-size: 2.5rem;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0 0 0.5rem;
        letter-spacing: -0.02em;
      }

      .subtitle {
        font-size: 1rem;
        color: #666;
        margin: 0;
      }

      .event-card {
        border-radius: 24px;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1),
          0 0 0 1px rgba(0, 0, 0, 0.05);
        background: white;
        transition: box-shadow 0.2s;
      }

      .event-card:hover {
        box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15),
          0 0 0 1px rgba(0, 0, 0, 0.05);
      }

      .event-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        padding: 0.5rem 0;
      }

      .full-width {
        width: 100%;
      }

      .row {
        display: flex;
        gap: 1.25rem;
        flex-wrap: wrap;
      }

      .half-width {
        flex: 1 1 calc(50% - 0.625rem);
        min-width: 250px;
      }

      /* Material overrides for neutral theme */
      ::ng-deep .mat-form-field-outline {
        color: #e0e0e0 !important;
      }

      ::ng-deep .mat-form-field.mat-focused .mat-form-field-outline-thick {
        color: #333 !important;
      }

      ::ng-deep .mat-primary .mat-pseudo-checkbox-checked,
      ::ng-deep .mat-primary .mat-pseudo-checkbox-indeterminate {
        background: #333 !important;
      }

      .submit-btn {
        width: 100%;
        padding: 1.5rem !important;
        font-size: 1.1rem;
        font-weight: 500;
        border-radius: 40px !important;
        background: #1a1a1a !important;
        color: white !important;
        transition: background 0.2s, transform 0.1s !important;
      }

      .submit-btn:hover:not(:disabled) {
        background: #333 !important;
      }

      .submit-btn:active:not(:disabled) {
        transform: scale(0.98);
      }

      .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
      }

      /* Mobile adjustments */
      @media (max-width: 600px) {
        .row {
          flex-direction: column;
          gap: 1rem;
        }

        .half-width {
          min-width: 100%;
        }

        .header h1 {
          font-size: 2rem;
        }
      }
    `,
  ],
})
export class CreateEventComponent {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private router = inject(Router);

  loading = signal(false);
  colleges: { id: string; name: string }[] = []; // populate from your service if needed

  // Define form with separate date and time controls
  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    location: ['', Validators.required],
    scope: ['COLLEGE' as 'GLOBAL' | 'COLLEGE', Validators.required],
    collegeId: [''], // optional, for super admin
    startDate: ['', Validators.required],
    startTime: ['', Validators.required],
    endDate: ['', Validators.required],
    endTime: ['', Validators.required],
  });

  isSuperAdmin(): boolean {
    // Replace with your actual super admin check
    return false;
  }

  onSubmit() {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    const raw = this.form.getRawValue();

    // Combine date and time into ISO strings
    const start = new Date(`${raw.startDate}T${raw.startTime}`);
    const end = new Date(`${raw.endDate}T${raw.endTime}`);

    const payload = {
      title: raw.title,
      description: raw.description,
      category: raw.category,
      location: raw.location,
      scope: raw.scope,
      collegeId: raw.collegeId || undefined,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };

    this.eventService.createEvent(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/events']);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}