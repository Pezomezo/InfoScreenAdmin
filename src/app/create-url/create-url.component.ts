import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { URL } from '../API_service/models/URL.model';

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['./create-url.component.css']
})
export class CreateUrlComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<URL>,
              @Inject(MAT_DIALOG_DATA) public data: URL) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
