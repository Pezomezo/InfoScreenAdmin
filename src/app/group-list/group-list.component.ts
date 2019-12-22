import { IndividualScreenModel } from './../API_service/models/IndividualInfoScreen.model';
import { URL } from './../API_service/models/URL.model';
import { InfoScreenPC } from './../API_service/models/InfoScreen.model';
import { Collections } from './../API_service/models/Collection.model';
import { GroupListModel } from './../API_service/models/group-list.model';
import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../API_service/services/api.collection.service';
import { PowerStateModel } from '../API_service/models/PowerState.model';
import { DropdownService } from '../API_service/services/drobdown.service';

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

  individualModel: IndividualScreenModel;
  individualModelList: IndividualScreenModel[] = [];
  IndividualList: Collections[];
  presentationListIndividuals: IndividualScreenModel[];
  infoSceen: InfoScreenPC = new InfoScreenPC();
  url: URL = new URL();
  numberList: number[] = [0];
  powerStates: PowerStateModel[] = [];
  GroupNO = 0;
  InfoScreenNO = 0;
  counter = 0;
  constructor(private apiService: CollectionsService,
              private dropdownService: DropdownService) { }

  // 1. Get the biggest group number
  // 2. make loop with as many iterations as the groupnumber
  // 3. inside this loop iterate through the database values and sort them into the groupListModels.
  // Present the list

  getPowerStates() {
    this.dropdownService.getPowerStates().subscribe(data => {
      this.powerStates = data.response;
    });
  }

  getBiggestGroupNumber(collection: Collections[]) {
    collection.forEach(value => {
      if (this.numberList !== []) {
        if (!this.numberList.includes(value.GroupID)) {
          this.GroupNO = value.GroupID;
        }
      }
    });
  }

  getBiggestInfoScreenNumber(collection: Collections[]) {
    collection.forEach(value => {
      if (this.numberList !== []) {
        if (!this.numberList.includes(value.InfoScreenPCID)) {
          this.InfoScreenNO = value.InfoScreenPCID;
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
          this.infoSceen.ID = value.InfoScreenPCID;
          this.infoSceen.Name = value.InfoScreenPCName;
          this.infoSceen.PowerState = value.PowerState;
          this.groupListModel.InfoScreens.push(this.infoSceen);
          this.url.UrlID = value.UrlID;
          this.url.UrlName = value.UrlName;
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

  sortScreenURLS(data: Collections[], screenID: number, counter: number) {
    while (true) {
      console.log(counter);
      if (counter === screenID + 1) {
        console.log('Exiting loop counter: ' + counter + ' - screenID: ' + screenID);
        break;
      }
      this.individualModel = new IndividualScreenModel();
      data.forEach(value => {
        if (value.InfoScreenPCID === counter) {
          console.log('counter: ' + counter + ' - InfoScreenPCID: ' +  value.InfoScreenPCID)
          this.individualModel.InfoScreenPCID = value.InfoScreenPCID;
          this.individualModel.InfoScreenName = value.InfoScreenPCName;
          this.individualModel.PowerState = value.PowerState;
          console.log('ID: ' + this.individualModel.InfoScreenPCID + ' - Name: ' + this.individualModel.InfoScreenName)
          this.url.UrlID = value.UrlID;
          this.url.URL = value.URL;
          this.url.UrlName = value.UrlName;
          this.url.PresentationID = value.PresentationID;
          this.individualModel.urls.push(this.url);
          this.url = new URL();
        }
      });

      if (this.individualModel.InfoScreenPCID) {
        console.log(this.individualModel.InfoScreenName);
        this.individualModelList.push(this.individualModel);
      }

      counter ++;
    }
    return this.individualModelList;
  }

  ngOnInit() {
    this.apiService.getCollections('all').subscribe(data => {
      console.log(data);
      this.Collections = data.response;
      this.getBiggestGroupNumber(this.Collections);
      this.presentationList = this.sortGroups(
        data.response,
        this.GroupNO,
        this.counter
      );
      this.getPowerStates();
    });

    this.apiService.getCollections('individual').subscribe(result => {
      this.counter = 0;
      this.IndividualList = result.response;
      this.getBiggestInfoScreenNumber(this.IndividualList);
      this.presentationListIndividuals = this.sortScreenURLS(this.IndividualList, this.InfoScreenNO, this.counter );
      console.log('data: ' + result.response);
      console.log(this.IndividualList);
      console.log('after sorting: ' + this.presentationListIndividuals);
    });
  }
}
