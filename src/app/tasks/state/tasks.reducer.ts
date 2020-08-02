import { Action, createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { Task } from '../task.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';


export interface TasksState extends EntityState<Task>{
  currentTaskId: number | null;
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TasksState = adapter.getInitialState({
  currentTaskId: null,
  loading: false,
  error: null
});

const tasksReducer = createReducer(
  initialState,
  on(TasksActions.load, state => ({...state, loading: true})),
  on(TasksActions.loadSuccess, (state, { tasks }) => (adapter.addMany(tasks, {...state, loading: false }))),
  on(TasksActions.loadFail, (state, { error }) => ({...state, loading: false, error })),
  on(TasksActions.deleteTask, (state, {id}) => {
    return adapter.removeOne(id, state);
  }),
  on(TasksActions.deleteTaskFail, (state, { error}) => ({ ...state, error})),
  on(TasksActions.addSuccess, (state, task: Task) => {
    console.log(task);
    return adapter.addOne(task, state);
  }),
  on(TasksActions.addFail, (state, { error}) => ({ ...state, error})),
  on(TasksActions.updateSuccess, (state, task: Task) => {
    return adapter.upsertOne(task, {...state});
  }),
  on(TasksActions.updatePositions, (state, { tasks }) => (adapter.upsertMany(tasks, state)))
);

export function reducer(state: TasksState | undefined, action: Action) {
  return tasksReducer(state, action);
}
