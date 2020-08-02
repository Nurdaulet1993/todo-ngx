import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromTasks from '../../state';
import * as TaskActions from '../../state/tasks.actions';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
  taskForm: FormGroup;
  constructor(private store: Store<fromTasks.State>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      body: ['', [Validators.minLength(3)]]
    });
  }

  addTask() {
    this.store.dispatch(TaskActions.add({...this.taskForm.value}));
  }

}
