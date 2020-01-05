import { PresentationSettingsComponent } from './../presentation-settings/presentation-settings.component';
import { PresentationSettings } from './../API_service/models/PresentationSettings.model';
import { RouterModule, Router } from '@angular/router';
import { URL } from './../API_service/models/URL.model';
import { Component, OnInit } from '@angular/core';
import { URLService } from '../API_service/services/api.url.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateUrlComponent } from '../create-url/create-url.component';
import { PresentationService } from '../API_service/services/presentation.service';
import { RepetitionModel } from '../API_service/models/Repetition.model';

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
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    console.log('URL LIST COMP: ' + item.UrlID + ' and presentationID: ' + item.MagicID);
    config.data = {
      UrlID: item.UrlID, UrlName: item.UrlName, URL: item.URL, PresentationID: item.PresentationID, Repetition: item.Repetition,
      MagicID: item.MagicID, RepetitionName: item.RepetitionName, StartDate: item.StartDate,
      TimeFrame: item.TimeFrame
    };
    this.matdial.open(PresentationSettingsComponent, config);
  }

  deleteURL(item: URL) {
    if (confirm('Are you sure you want to delete ' + item.UrlName + '?')) {
      this.urlService.deleteURL(item.UrlID).subscribe(data => {
        console.log(data);
      });
    }
  }

  createUrl() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.matdial.open(CreateUrlComponent, dialogConfig);
  }
}
