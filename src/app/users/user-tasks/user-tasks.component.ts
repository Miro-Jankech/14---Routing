import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit{
  userId = input.required<string>(); 
  userName = input.required<string>();
  message = input.required<string>();

  private activatedRoute = inject(ActivatedRoute);

  //userName = computed(
  //  () => this.usersService.users.find((u) => u.id === this.userId())?.name
  //);

  ngOnInit(): void {
      this.activatedRoute.data.subscribe({
        next : data => {
          console.log(data);
          
        }
      })
  }
}
   
    
    export const resolveUserName: ResolveFn<string> = 
      (activatedRoute: ActivatedRouteSnapshot,
       routerState: RouterStateSnapshot)=>
       {
        const usersService = inject(UsersService);
        const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name ||  '';
        return userName;
    } 

    export const resolveTitle : ResolveFn<string> = 
    (activatedRoute: ActivatedRouteSnapshot,
       routerState: RouterStateSnapshot)=>
       { 
        return resolveUserName(activatedRoute, routerState) + '\'s Tasks'  //Miro`s tasks
       }