import { PresentationSettingsComponent } from './../presentation-settings/presentation-settings.component';
import { PresentationSettings } from './../API_service/models/PresentationSettings.model';
import { RouterModule, Router } from '@angular/router';
import { URL } from './../API_service/models/URL.model';
import { Component, OnInit } from '@angular/core';
import { URLService } from '../API_service/services/api.url.service';
import { MatDialog } from '@angular/material';
import { CreateUrlComponent } from '../create-url/create-url.component';
import { PresentationService } from '../API_service/services/presentation.service';

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.css']
})
export class UrlListComponent implements OnInit {
  urlPresentation: URL[];
  selectedURL: URL;
  selectedPresentation: URL;
  constructor( private urlService: URLService,
               private presentationService: PresentationService,
               private routrer: Router,
               private matdial: MatDialog) { }

  ngOnInit() {
    this.urlService.getURLs().subscribe(data =>  {
      this.urlPresentation = data.response;
      console.log(this.urlPresentation);
    });
  }

  magiClick(item: URL) {
    console.log(item);
    this.routrer.navigateByUrl('magic/' + item.UrlID);
    this.selectedURL = item;
  }

  changePresentationSettings(item: URL) {
    const returnVal: PresentationSettings = new PresentationSettings();
    const dialogRef = this.matdial.open(PresentationSettingsComponent, {
      data: {Repetition: item.Repetition, StartDate: item.StartDate, TimeFrame: item.TimeFrame}
    });

    dialogRef.afterClosed().subscribe(data => {
      returnVal.Repetition = data.Repetition;
      returnVal.StartDate = data.StartDate;
      returnVal.TimeFrame = data.TimeFrame;
      console.log(data.Repetition + ' - ' + data.StartDate + ' - ' + data.TimeFrame);
      console.log(returnVal.Repetition + ' - ' + returnVal.StartDate + ' - ' + returnVal.TimeFrame);
      if (returnVal) {
        console.log(item.PresentationID );
        this.presentationService.patchPresentation(item.PresentationID , returnVal).subscribe(result => {
          console.log(result);
        });
      }
    });
  }

  createUrl() {
    let returnVal: URL = null;
    const dialogRef = this.matdial.open(CreateUrlComponent, {
      data: new URL()
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('data from the pop-up ' + data.UrlName);
      data.MagicHeight = 209;
      data.MagicWidht = 200;
      returnVal = data;
      if (returnVal) {
        this.urlService.postURL(returnVal).subscribe(
          response => console.log(response)
       );
      }
    });


  }
}
