import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>(); 
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  userName = '';
  private destroyRef = inject(DestroyRef);

  //userName = computed(
  //  () => this.usersService.users.find((u) => u.id === this.userId())?.name
  //);

  ngOnInit(): void {
      console.log(this.activatedRoute);
      const subscription = this.activatedRoute.paramMap.subscribe({
        next: (paramMap) => {
          this.userName = 
            this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name ||  '';
       },
      });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }};     