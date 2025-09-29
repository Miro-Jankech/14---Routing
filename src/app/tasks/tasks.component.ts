import { Component, inject, computed, OnInit, DestroyRef, signal } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { input } from '@angular/core';
import { TasksService } from './tasks.service';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  private tasksService = inject(TasksService);
  // order = input<'asc' | 'desc'>();
  order = signal<'asc' | 'desc'>('desc');

  private ActivatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  
  userTasks = computed(() => this.tasksService.allTasks().
  filter(task => task.userId === this.userId()).sort((a,b) => {
    if (this.order() === 'desc') {
      return a.id > b.id ?-1 : 1;
    } else  
      return a.id > b.id ? 1 :-1; 
    }))
  

  ngOnInit(): void {
      const subscription = this.ActivatedRoute.queryParams.subscribe({
        next: (params) => (this.order.set(params['order'])),
      });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

