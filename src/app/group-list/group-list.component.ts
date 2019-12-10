import { URL } from './../API_service/models/URL.model';
import { InfoScreenPC } from './../API_service/models/InfoScreen.model';
import { Collections } from './../API_service/models/Collection.model';
import { GroupListModel } from './../API_service/models/group-list.model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../API_service/api.collection.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  Collections: Collections[];
  groupListModel: GroupListModel;
  groupListModelList: GroupListModel[] = [];
  presentationList: GroupListModel[];
  infoSceen: InfoScreenPC = new InfoScreenPC();
  url: URL = new URL();
  numberList: number[] = [0];
  GroupNO = 0;
  counter = 0;
  constructor(private apiService: ApiService) { }

  // 1. Get the biggest group number
  // 2. make loop with as many iterations as the groupnumber
  // 3. inside this loop iterate through the database values and sort them into the groupListModels.
  // Present the list

  getBiggestGroupNumber(collection: Collections[]) {
    collection.forEach(value => {
      if (this.numberList !== []) {
        if (!this.numberList.includes(value.GroupID)) {
          this.GroupNO = value.GroupID;
        }
      }
    });
  }

  sortGroups(data: Collections[], groupNO: number, counter: number) {
    while (true) {
      if (counter === groupNO + 1) {
        break;
      }
      this.groupListModel = new GroupListModel();
      data.forEach(value => {
        if (value.GroupID === counter) {
          this.groupListModel.GroupName = value.GroupName;
          this.infoSceen.ID = value.InfoScreenID;
          this.infoSceen.Name = value.InfoScreenName;
          this.infoSceen.Power_State = value.InfoScreenPower_State;
          this.groupListModel.InfoScreens.push(this.infoSceen);
          this.url.URL_ID = value.Url_ID;
          this.url.Url_Name = value.Url_Name;
          this.url.URL = value.URL;
          this.url.MagicID = value.MagicID;
          this.url.PresentationID = value.PresentationID;
          this.groupListModel.URL.push(this.url);
          this.infoSceen = new InfoScreenPC();
          this.url = new URL();
        }
      });

      if (this.groupListModel.GroupName) {
        this.groupListModelList.push(this.groupListModel);
      }
      counter++;
    }
    return this.groupListModelList;
  }

  ngOnInit() {
    this.apiService.getCollections().subscribe(data => {
      this.Collections = data.response;
      this.getBiggestGroupNumber(this.Collections);
      this.presentationList = this.sortGroups(
        data.response,
        this.GroupNO,
        this.counter
      );
    });
  }
}
