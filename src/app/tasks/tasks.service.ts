import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from './task.model';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class TasksService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  tasks$ = this.http.get(`${this.apiUrl}/tasks`);

  getTasks() {
    return this.http.get(`${this.apiUrl}/tasks`);
  }

  addTask(body: string) {
    return this.http.post(`${this.apiUrl}/tasks`, { body });
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`).pipe(
      map(() => of(id))
    );
  }

  updateTask(task: Task) {
    const { id, body, status } = task;
    return this.http.patch(`${this.apiUrl}/tasks/${id}/update`, { body, status });
  }

  errorHandler(errorRes: HttpErrorResponse) {
    if (!errorRes.error || !errorRes.error.error) {
      return 'Unknown error';
    }
    return errorRes.error.message;
  }
}
