import { createAction, props } from '@ngrx/store';
import { Task } from '../task.model';
import {Observable} from 'rxjs';
import {Update} from '@ngrx/entity';

export enum TasksActionsTypes {
  LOAD = '[TASK] Load',
  LOAD_SUCCESS = '[TASKS] Load success',
  LOAD_FAIL = '[TASKS] Load failed',
  ADD = '[TASKS] Add task',
  ADD_SUCCESS = '[TASKS] Add task success',
  ADD_FAIL = '[TASKS] Add task failed',
  DELETE = '[TASKS] Delete task',
  DELETE_SUCCESS = '[TASKS] Delete task success',
  DELETE_FAIL = '[TASKS] Delete task failed',
  UPDATE = '[TASK] Update task',
  UPDATE_SUCCESS = '[TASK] Update task success',
  UPDATE_FAI = '[TASK] Update task failed',
  UPDATE_POSITION = '[TASK] Update positions'
}


export const load = createAction(TasksActionsTypes.LOAD);
export const loadSuccess = createAction(TasksActionsTypes.LOAD_SUCCESS, props<{ tasks: Task[]}>());
export const loadFail = createAction(TasksActionsTypes.LOAD_FAIL, props<{ error: string }>());

export const deleteTask = createAction(TasksActionsTypes.DELETE, props<{ id: number }>());
export const deleteTaskSuccess = createAction(TasksActionsTypes.DELETE_SUCCESS, props<Observable<number>>());
export const deleteTaskFail = createAction(TasksActionsTypes.DELETE_FAIL, props<{ error: string }>());

export const add = createAction(TasksActionsTypes.ADD, props<{ body: string }>());
export const addSuccess = createAction(TasksActionsTypes.ADD_SUCCESS, props<Task>());
export const addFail = createAction(TasksActionsTypes.ADD_FAIL, props<{ error: string }>());

export const update = createAction(TasksActionsTypes.UPDATE, props<Task>());
export const updateSuccess = createAction(TasksActionsTypes.UPDATE_SUCCESS, props<Task>());
export const updateFail = createAction(TasksActionsTypes.UPDATE_FAI, props<{ error: string }>());

export const updatePositions = createAction(TasksActionsTypes.UPDATE_POSITION, props<{ tasks: Task[]}>());
