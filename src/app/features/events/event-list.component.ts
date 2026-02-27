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

<div class="space-y-8 pb-16 lg:pb-6">

  <!-- Page header -->
  <div>
    <h1 class="text-3xl font-bold text-white tracking-tight">
      Events
    </h1>
    <p class="text-sm text-white/60 mt-1">
      Discover and join upcoming events.
    </p>
  </div>

  <!-- Loading state -->
  @if (vm.loading) {
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      @for (i of skeleton; track $index) {
        <div
          class="h-44 rounded-2xl bg-white/10 backdrop-blur-xl 
                 border border-white/10 animate-pulse"
        ></div>
      }
    </div>
  }

  <!-- Empty state -->
  @if (!vm.loading && vm.events.length === 0) {
    <div
      class="rounded-3xl border border-white/20 
             bg-white/5 backdrop-blur-xl
             p-12 text-center text-white"
    >
      <div class="space-y-3">
        <p class="text-lg font-semibold">
          No events yet
        </p>
        <p class="text-sm text-white/60">
          New events will appear here once they are created.
        </p>
      </div>
    </div>
  }

  <!-- Events grid -->
  @if (!vm.loading && vm.events.length > 0) {
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      @for (event of vm.events; track event.id) {
        <div
          class="group rounded-3xl 
                 bg-white/10 backdrop-blur-xl
                 border border-white/15
                 p-6 
                 transition-all duration-300
                 hover:-translate-y-1
                 hover:bg-white/15
                 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
        >

          <!-- scope + category -->
          <div class="mb-4 flex items-center justify-between text-xs">
            <span class="px-3 py-1 rounded-full 
                         bg-purple-500/20 text-purple-300">
              {{ event.scope }}
            </span>

            <span class="text-white/50">
              {{ event.category }}
            </span>
          </div>

          <!-- title -->
          <h3 class="text-white font-semibold text-lg leading-tight">
            {{ event.title }}
          </h3>

          <!-- description -->
          <p class="mt-2 line-clamp-2 text-sm text-white/60">
            {{ event.description }}
          </p>

          <!-- footer -->
          <div
            class="mt-6 flex items-center justify-between text-xs text-white/50"
          >
            <span>{{ event.college?.name }}</span>
            <span>{{ event.startDate | date: 'mediumDate' }}</span>
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