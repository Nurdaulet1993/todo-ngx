import {Component, EventEmitter, Input, OnInit, Output, Inject, OnDestroy} from '@angular/core';
import { Task } from '../../task.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  body: string;
}

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() update: EventEmitter<Task> = new EventEmitter<Task>();
  checked: boolean;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.checked = this.task.status === 'DONE';
  }

  deleteTask(id: number) {
    this.delete.emit(id);
  }

  updateStatus() {
    const status = this.checked ? 'ACTIVE' : 'DONE';
    this.update.emit({ ...this.task, status });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {width: '500px',
    data: { body: this.task.body }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('The dialog was closed');
      console.log(result);
      this.update.emit({...this.task, body: result });
    });
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'task-dialog.html',
})
export class TaskDialogComponent implements OnDestroy{

  constructor(public dialogRef: MatDialogRef<TaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnDestroy(): void {
    this.dialogRef.close(this.data.body);
  }

}
