import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PresentationSettings } from '../API_service/models/PresentationSettings.model';
import { DropdownService } from '../API_service/services/drobdown.service';
import { RepetitionModel } from '../API_service/models/Repetition.model';

@Component({
  selector: 'app-presentation-settings',
  templateUrl: './presentation-settings.component.html',
  styleUrls: ['./presentation-settings.component.css']
})
export class PresentationSettingsComponent implements OnInit {
  repetitionList: RepetitionModel[] = [];
  repetionBind: string;
  constructor(private dialogRef: MatDialogRef<PresentationSettings>,
              @Inject(MAT_DIALOG_DATA) public data: PresentationSettings,
              private dropdownService: DropdownService) { }

  ngOnInit() {
    this.dropdownService.getRepetitions().subscribe(data => {
      this.repetitionList = data.response;
      console.log(data.response);
    });
    this.repetionBind = this.data.RepetitionName;
  }
  close() {
    this.dialogRef.close();
  }
}
