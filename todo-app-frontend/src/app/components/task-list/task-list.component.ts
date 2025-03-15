// src/app/components/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor and *ngIf
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ClientService } from '../../services/client.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,       
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';
  newTaskPriority: 'High' | 'Medium' | 'Low' = 'Medium';
  newTaskDueDate = null;
  currentClientId = '';

  constructor(
    private taskService: TaskService,
    private clientService: ClientService,
    private router: Router) {
      this.currentClientId = this.clientService.clientId;
     }

  ngOnInit(): void {
    // Subscribe to the tasks observable from TaskService for real-time updates
    this.taskService.tasks$.subscribe((data) => {
      this.tasks = data;
    });
  }

  //Before Socket

  // loadTasks(): void {
  //   this.taskService.getTasks().subscribe((data) => {
  //     this.tasks = data;
  //   });
  // }

  addTask(): void {
    if (!this.newTaskTitle.trim()) {
      return;
    }
    const newTask: Task = {
      title: this.newTaskTitle,
      completed: false,
      isEditing: false,
      priority: this.newTaskPriority || 'Medium',
      dueDate: this.newTaskDueDate ? new Date(this.newTaskDueDate).toISOString() : null
    };
    this.taskService.addTask(newTask).subscribe((task) => {
      // Before Socket - No need to manually push the task as Socket.IO will update tasks$
      //this.tasks.push(task);
      this.newTaskTitle = '';
      this.newTaskPriority = 'Medium';
      this.newTaskDueDate = null;

    });
  }

  toggleCompleted(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      // Before Socket - Real-time update will be handled by Socket.IO event
      //task.completed = !task.completed;
    });
  }

  deleteTask(task: Task): void {
    if (!task._id) return;
    this.taskService.deleteTask(task._id).subscribe(() => {
      // Before Socket -Real-time update will be handled by Socket.IO event
      //this.tasks = this.tasks.filter(t => t._id !== task._id);
    });
  }

  startEdit(task: Task): void {
    task.isEditing = true;
    // Assign a unique client identifier – this could come from an authentication service.
    task.clientId = this.currentClientId;
    // Update the backend immediately to lock the task.
    this.taskService.updateTask(task).subscribe((updatedTask) => {
      Object.assign(task, updatedTask);
      // store the original title for cancellation.
      (task as any).originalTitle = task.title;
    });
  }

  saveEdit(task: Task): void {
    // Set lock to false and clear clientId before sending update
    task.isEditing = false;
    task.clientId = null;
    this.taskService.updateTask(task).subscribe((updatedTask) => {
      // Update local task data (if needed)
      Object.assign(task, updatedTask);
      // Remove the temporary original title property
      delete (task as any).originalTitle;
    });
  }

  cancelEdit(task: Task): void {
    // Revert the task title and unlock it
    if ((task as any).originalTitle !== undefined) {
      task.title = (task as any).originalTitle;
      delete (task as any).originalTitle;
    }
    task.isEditing = false;
    task.clientId = null;
    this.taskService.updateTask(task).subscribe((updatedTask) => {
      Object.assign(task, updatedTask);
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    // Optionally clear other related data here.
    this.router.navigate(['/login']);
  }
}
