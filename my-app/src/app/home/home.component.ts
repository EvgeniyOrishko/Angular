import {Component, OnInit, ViewChild} from '@angular/core';
import { Member, PeopleRequest, Planet} from '../interfaces';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  constructor( private apiService: ApiService) {}

  members: Member[] = [];
  planets: { [key: string]: Planet | boolean } = {};

  displayedColumns: string[] = ['url', 'name', 'gender', 'birth_year', 'homeworld'];
  dataSource = new MatTableDataSource(this.members);

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.apiService.fetchByUrl( 'https://swapi.co/api/people' )
      .subscribe((data: PeopleRequest) => {
        this.dataSource.data = data.results;
        this.members = data.results;
        this.getDataForFirstPage( data.results );
      });
  }

    getDataForFirstPage(list: Member[] ) {
      Promise.all(
        list.map( item => {
            if( !this.planets[item.homeworld] ) {
              this.planets[item.homeworld] = true;
              return this.apiService.fetchPr( item.homeworld )
                      .then( (data: Planet) => {
                        this.planets[data.url] = data;
                        return true;
                      })
                      .catch( () => item.homeworld );
            }
            return null;

        }))
          .then(data => {
            this.dataSource.data.forEach( item =>  item.homeWorldName = this.planets[item.homeworld].name )
            this.dataSource.sort = this.sort;
          })
        .catch((err) =>  console.log(err.message));
  }






}
