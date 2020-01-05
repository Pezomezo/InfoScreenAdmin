import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PresentationSettings } from '../API_service/models/PresentationSettings.model';
import { DropdownService } from '../API_service/services/drobdown.service';
import { RepetitionModel } from '../API_service/models/Repetition.model';
import { PresentationService } from '../API_service/services/presentation.service';
import { NgForm } from '@angular/forms';
import { URLService } from '../API_service/services/api.url.service';
import { URL } from 'url';

@Component({
  selector: 'app-presentation-settings',
  templateUrl: './presentation-settings.component.html',
  styleUrls: ['./presentation-settings.component.css']
})
export class PresentationSettingsComponent implements OnInit {
  repetitions: RepetitionModel[] = [];
  constructor(
    private dialogRef: MatDialogRef<PresentationSettingsComponent>,
    private urlService: URLService,
    private dropdownService: DropdownService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.urlService.formData = data;
  }

  ngOnInit() {
    this.dropdownService.getRepetitions().subscribe(data => {
      this.repetitions = data.response;
    });
    console.log(this.urlService.formData.UrlID);
  }

  close() {
    this.dialogRef.close();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.urlService.formData = {
      UrlID: 0,
      UrlName: '',
      URL: '',
      PresentationID: 0,
      Repetition: '',
      RepetitionName: '',
      TimeFrame: '',
      StartDate: '',
      MagicID: 0,
      MagicWidht: 0,
      MagicHeight: 0
    };
  }

  onSubmit(form: NgForm) {
    if (form != null) {
      form.value.MagicHeight = 250;
      form.value.MagicWidht = 250;
      console.log(form.value.PresentationID + ' - ' + form.value.MagicID);
      this.urlService.patchURL(this.urlService.formData.UrlID, form.value).subscribe(data => {
        this.resetForm(form);
        this.dialogRef.close();
        alert('Success');
      });
    }
  }
}
