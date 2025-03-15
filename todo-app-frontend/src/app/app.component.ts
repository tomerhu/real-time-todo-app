// src/app/app.component.ts
import { Component } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component'; // adjust path if necessary
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCardModule, RouterModule],
  template: `<router-outlet></router-outlet>`,
  styles: [`
    .container {
      margin: 20px;
      padding: 20px;
      display: block;
    }
  `]
})
export class AppComponent { }
