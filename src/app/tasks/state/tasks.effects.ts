import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../tasks.service';
import * as TasksActions from '../state/tasks.actions';
import {catchError, concatMap, exhaustMap, map, mergeMap, tap} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Task } from '../task.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {update} from '../state/tasks.actions';

@Injectable()
export class TasksEffects {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.load),
    mergeMap(() => this.tasksService.getTasks().pipe(
      map((tasks: Task[]) => (TasksActions.loadSuccess({ tasks }))),
      catchError(err => {
        const error = this.tasksService.errorHandler(err);
        this.snackBar.open(`Oops ${error}`, 'Close', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return of(TasksActions.loadFail({ error }));
      })
    ))
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.deleteTask),
    mergeMap(action => this.tasksService.deleteTask(action.id).pipe(
      map((id) => (TasksActions.deleteTaskSuccess(id)),
      catchError(err => {
        const error = this.tasksService.errorHandler(err);
        this.snackBar.open(`Oops ${error}`, 'Close', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return of(TasksActions.deleteTaskFail(error));
      })
    ))
  )));

  addTask$ = createEffect(() =>  this.actions$.pipe(
    ofType(TasksActions.add),
    mergeMap(action => this.tasksService.addTask(action.body).pipe(
      map((task: Task) => (TasksActions.addSuccess(task))),
      catchError(err => {
        const error = this.tasksService.errorHandler(err);
        this.snackBar.open(`Oops ${error}`, 'Close', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return of(TasksActions.addFail(error));
      })
    ))
  ));

  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.update),
    exhaustMap(action => this.tasksService.updateTask(action).pipe(
      map((task: Task) => (TasksActions.updateSuccess(task)),
      catchError(err => {
        const error = this.tasksService.errorHandler(err);
        this.snackBar.open(`Oops ${error}`, 'Close', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return of(TasksActions.updateFail(error));
      })
    ))
  )));

  constructor(private actions$: Actions,
              private tasksService: TasksService,
              private snackBar: MatSnackBar) {}

}
