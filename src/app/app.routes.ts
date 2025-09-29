import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { routes as userRoutes } from "./users/users.routes"; 
import { NotFoundComponent } from "./header/not-found/not-found.component";


export const routes : Routes = [
  {
    path: '',
    component: NoTaskComponent
  },
  {
    path: 'users/:userId', // <your-domain>/tasks
    component: UserTasksComponent,
    children : userRoutes,
    data: {
      message: 'Hello!'
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]  