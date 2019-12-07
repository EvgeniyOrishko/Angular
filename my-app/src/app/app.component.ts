import {Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import {PeopleRequest} from './interfaces';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
   constructor( private apiService: ApiService,  private dataService: DataService) {}

  peopleListRequest: number[];
  planetListRequest: number[];

  static calculateAmount(count, inResult ) {
    const pages = Math.ceil(count / inResult);
    const arr = [];
    for (let i = 2; i <= pages; i++) {
      arr.push(i);
    }
    return arr;
  }

  ngOnInit() {
     this.apiService.fetchByUrl('people')
      .subscribe((data: PeopleRequest) => {
        this.peopleListRequest = AppComponent.calculateAmount( Number(data.count), data.results.length );
        this.dataService.updatePeopleSource(data.results);
        this.dataService.updatePeople(data.results);
      });

     this.apiService.fetchByUrl('planets/')
      .subscribe((data: PlanetRequest) => {
        this.planetListRequest = AppComponent.calculateAmount( Number(data.count), data.results.length );
        this.dataService.updatePlanets(data.results);
        this.getAllPlanets();
      });
  }

  getAllPlanets() {
    this.apiService.fetchAllByParams( this.planetListRequest, 'planets' ).then( (data) =>  {
      const list = data.reduce( (acc, val) => [ ...acc, ...val ]);
      this.dataService.updatePlanets( list );
      this.dataService.setPlanetNameToPeopleList();
      this.getAllPeople();
    });
  }

  getAllPeople() {
    this.apiService.fetchAllByParams( this.peopleListRequest, 'people' ).then( data =>  {
      const list = data.reduce( (acc, val) => [ ...acc, ...val ]);
      this.dataService.setPlanetNameToPeopleList(list);
      this.dataService.updatePeople( list );
      this.dataService.updatePeopleSource(list);
    });
  }

}
