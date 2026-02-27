import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, startWith, catchError, of } from 'rxjs';

import { EventService } from '../../core/services/event.service';
import { EventItem } from '../../models/event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  template: `
@let vm = (vm$ | async) ?? { loading: true, events: [] };

<div class="space-y-10 pb-20 lg:pb-8">

  <!-- Header -->
  <div class="space-y-2">
    <h1 class="text-3xl font-semibold text-white tracking-tight">
      Events
    </h1>
    <p class="text-sm text-white/50">
      Discover and join upcoming events.
    </p>
  </div>

  <!-- Loading -->
  @if (vm.loading) {
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      @for (i of skeleton; track $index) {
        <div class="h-44 rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse"></div>
      }
    </div>
  }

  <!-- Empty -->
  @if (!vm.loading && vm.events.length === 0) {
    <div class="rounded-2xl bg-white/[0.04] border border-white/10 p-12 text-center">
      <p class="text-lg font-medium text-white">No events yet</p>
      <p class="text-sm text-white/50 mt-2">
        New events will appear here once they are created.
      </p>
    </div>
  }

  <!-- Grid -->
  @if (!vm.loading && vm.events.length > 0) {
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      @for (event of vm.events; track event.id) {

        <div
          class="group rounded-2xl
                 bg-white/[0.05]
                 border border-white/10
                 p-6
                 transition-all duration-300
                 hover:border-white/20
                 hover:bg-white/[0.07]"
        >

          <!-- Top Row -->
          <div class="flex items-center justify-between text-xs mb-4">

            <span class="px-2.5 py-1 rounded-md 
                         bg-purple-500/15 
                         text-purple-300 
                         font-medium">
              {{ event.scope }}
            </span>

            <span class="text-white/40 uppercase tracking-wide">
              {{ event.category }}
            </span>

          </div>

          <!-- Title -->
          <h3 class="text-white font-medium text-lg leading-snug">
            {{ event.title }}
          </h3>

          <!-- Description -->
          <p class="mt-2 text-sm text-white/50 line-clamp-2">
            {{ event.description }}
          </p>

          <!-- Footer -->
          <div class="mt-6 pt-4 border-t border-white/10
                      flex items-center justify-between text-xs text-white/40">

            <span class="truncate max-w-[60%]">
              {{ event.college?.name }}
            </span>

            <span>
              {{ event.startDate | date: 'mediumDate' }}
            </span>

          </div>

        </div>

      }
    </div>
  }

</div>
`,
})
export class EventListComponent {
  private eventService = inject(EventService);

  skeleton = Array(6);

  vm$ = this.eventService.getEvents().pipe(
    map((res) => ({
      loading: false,
      events: res.events as EventItem[],
    })),
    startWith({
      loading: true,
      events: [] as EventItem[],
    }),
    catchError(() =>
      of({
        loading: false,
        events: [] as EventItem[],
      })
    )
  );
}