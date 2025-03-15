// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject  } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks'; 
  private socket: Socket;

  // A BehaviorSubject to hold our tasks for real-time updates
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  // Expose tasks$ as an Observable that components can subscribe to
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) { 
    // Connect to the backend Socket.IO server
    this.socket = io('http://localhost:3000', { transports: ['websocket'] });

    // Listen for socket events
    this.listenToSocketEvents();

    // Optionally, load the initial tasks from the API
    this.loadInitialTasks();
  }

  // Load tasks initially from the backend API
  private loadInitialTasks(): void {
    this.http.get<Task[]>(this.baseUrl).subscribe((tasks) => {
      this.tasksSubject.next(tasks);
    });
  }

  // Listen to Socket.IO events and update the tasks BehaviorSubject
  private listenToSocketEvents(): void {
    this.socket.on('taskCreated', (newTask: Task) => {
      const tasks = this.tasksSubject.value;
      this.tasksSubject.next([...tasks, newTask]);
    });

    this.socket.on('taskUpdated', (updatedTask: Task) => {
      const tasks = this.tasksSubject.value;
      const index = tasks.findIndex(task => task._id === updatedTask._id);
      if (index !== -1) {
        tasks[index] = updatedTask;
        this.tasksSubject.next([...tasks]);
      }
    });

    this.socket.on('taskDeleted', (deletedTaskId: string) => {
      const tasks = this.tasksSubject.value.filter(task => task._id !== deletedTaskId);
      this.tasksSubject.next(tasks);
    });
  }

  // Retrieve all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  // Retrieve a specific task
  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  // Create a new task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  // Update an existing task
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${task._id}`, task);
  }

  // Delete a task
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
