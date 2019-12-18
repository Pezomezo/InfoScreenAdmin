import { URL } from './../API_service/models/URL.model';
import { Component, OnInit } from '@angular/core';
import { URLService } from '../API_service/services/api.url.service';

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.css']
})
export class UrlListComponent implements OnInit {
  urlPresentation: URL[];
  selectedURL: URL;
  constructor( private urlService: URLService) { }

  ngOnInit() {
    this.urlService.getURLs().subscribe(data =>  {
      this.urlPresentation = data.response;
      console.log(this.urlPresentation);
    });
  }

  magiClick(item: URL) {
    this.selectedURL = item;
  }

}
