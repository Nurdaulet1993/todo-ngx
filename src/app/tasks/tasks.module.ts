import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksMaterialModule } from './tasks.material.module';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/tasks.reducer';
import { FormsModule } from '@angular/forms';

import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskHeaderComponent } from './components/task-header/task-header.component';
import { TasksEffects } from './state/tasks.effects';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskDialogComponent } from './components/task-item/task-item.component';



const routes: Routes = [
  { path: '', component: TasksComponent }
];

@NgModule({
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskHeaderComponent,
    TaskItemComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TasksMaterialModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('tasks', reducer),
    EffectsModule.forFeature([TasksEffects]),
  ]
})
export class TasksModule { }
