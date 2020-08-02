import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { select, Store } from '@ngrx/store';
import * as fromTasks from '../../state';
import * as TasksActions from '../../state/tasks.actions';
import { Task } from '../../task.model';
import { Observable } from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit, OnDestroy {
  componentActive = true;
  tasks: Task[];


  constructor(private store: Store<fromTasks.State>) { }

  ngOnInit(): void {
    this.store.dispatch(TasksActions.load());
    this.store.pipe(select(fromTasks.selectTasks)).pipe(
      takeWhile(() => this.componentActive),
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      console.log(this.tasks);
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  drop(event: CdkDragDrop<string[]>, tasks: Task[]) {
    moveItemInArray(tasks, event.previousIndex, event.currentIndex);
    console.log(event.container.data);
    // console.log(event.container.data.slice(0, event.container.data.length));


  }

  deleteTask(id: number) {
    this.store.dispatch(TasksActions.deleteTask({id}));
  }

  updateTask(task: Task) {
    this.store.dispatch(TasksActions.update(task));
  }
}
