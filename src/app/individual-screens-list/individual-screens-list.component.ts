import { CollectionsService } from '../API_service/services/api.collection.service';
import { Component, OnInit } from '@angular/core';
import { Collections } from '../API_service/models/Collection.model';

@Component({
  selector: 'app-individual-screens-list',
  templateUrl: './individual-screens-list.component.html',
  styleUrls: ['./individual-screens-list.component.css']
})
export class IndividualScreensListComponent implements OnInit {

  Collections: Collections[];
  constructor(private http: CollectionsService) { }

  ngOnInit() {
  }

}
