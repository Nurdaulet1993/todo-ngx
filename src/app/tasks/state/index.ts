import { createSelector } from '@ngrx/store';
import * as fromTasks from './tasks.reducer';
import { Task } from '../task.model';

export interface State {
  tasks: fromTasks.TasksState;
}

export const selectTasksState = (state: State) => state.tasks;

export const selectTasks = createSelector(
  selectTasksState,
  fromTasks.adapter.getSelectors().selectAll
);

export const selectCurrentTaskId = createSelector(
  selectTasksState,
  (state: fromTasks.TasksState) => state.currentTaskId
);

export const selectCurrentTask = createSelector(
  selectTasks,
  selectCurrentTaskId,
  (tasks: Task[], id) => {
    if (id === 0) {
      return {
        id: 0,
        body: '',
        status: 'ACTIVE'
      };
    } else {
      return id ? tasks.find(t => t.id === id) : null;
    }
  }
);
