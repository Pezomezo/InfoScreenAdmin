import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PresentationSettings } from '../API_service/models/PresentationSettings.model';

@Component({
  selector: 'app-presentation-settings',
  templateUrl: './presentation-settings.component.html',
  styleUrls: ['./presentation-settings.component.css']
})
export class PresentationSettingsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PresentationSettings>,
              @Inject(MAT_DIALOG_DATA) public data: PresentationSettings) { }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }
}
