import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { URL } from '../API_service/models/URL.model';
import { NgForm } from '@angular/forms';
import { URLService } from '../API_service/services/api.url.service';
import { DropdownService } from '../API_service/services/drobdown.service';
import { RepetitionModel } from '../API_service/models/Repetition.model';

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['./create-url.component.css']
})
export class CreateUrlComponent implements OnInit {
  repetitions: RepetitionModel[] = [];
  constructor(private dialogRef: MatDialogRef<CreateUrlComponent>,
              private urlService: URLService,
              private dropdownService: DropdownService) { }

  ngOnInit() {
    this.resetForm();
    this.dropdownService.getRepetitions().subscribe(data => {
      this.repetitions = data.response;
    });

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
      MagicHeight: 0,
    };
  }

  onSubmit(form: NgForm) {
    if (form != null) {
      form.value.MagicHeight = 250;
      form.value.MagicWidht = 250;
      console.log(form.value);
      this.urlService.postURL(form.value).subscribe(data => {
        console.log(data);
      })
    }
  }

}
