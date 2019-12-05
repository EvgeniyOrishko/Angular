import {Component, OnInit, ViewChild} from '@angular/core';
import { Member, PeopleRequest, Planet} from '../interfaces';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../api.service';
import {reject} from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  constructor( private apiService: ApiService) {}

  members: Member[] = [];
  filterParams: {
    sex: '';
  } = {
    sex: ''
  };

  membersCount: number;
  membersInResult: number;
  planets: { [key: string]: Planet | boolean } = {};


  displayedColumns: string[] = ['url', 'name', 'gender', 'birth_year', 'homeworld'];
  dataSource = new MatTableDataSource(this.members);


  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.apiService.fetchByUrl( 'https://swapi.co/api/people')
      .subscribe((data: PeopleRequest) => {
        this.dataSource.data = data.results;
        this.members = data.results;
        this.membersCount = Number(data.count);
        this.membersInResult = data.results.length;
        this.getAllPlanets();
      });
  }




  filterTable( param, e: Event ) {


      const filterSS = ( data ) => {

        return e.value === 'other'
          ? !['male', 'female'].includes(data[param])
          : data.gender === e.value

      }


      console.error( 'e', e );



    this.dataSource.filterPredicate = (data: Element, filter: string) => filterSS( data );
    this.dataSource.filter = e.value;


  }


  calculateAmount( count, inResult ) {
    const pages = Math.ceil(count / inResult);
    const arr = [];
    for (let i = 1; i < pages; i++) {
      arr.push(i);
    }
    return arr;
  }

  getAllPlanets() {
    this.apiService.fetchAllPlanets().then( data =>  {
      data.forEach( planets => planets.forEach( (planet: Planet) =>  this.planets[ planet.url ] = planet  ) );
      this.getAllPeoples();
    });
  }

  getAllPeoples() {
    const numberOfPages = this.calculateAmount( this.membersCount, this.membersInResult );
    this.apiService.fetchAllPeples(numberOfPages).then( data => {
    const restPeoples = data.reduce( (acc, item) => [...acc, ...item] );
    restPeoples.forEach( (person: Member) => person.homeWorldName = this.planets[ person.homeworld || {} ].name);
    this.dataSource.data.forEach( item => item.homeWorldName = this.planets[ item.homeworld || {} ].name );
    this.dataSource.data = [ ...this.dataSource.data,  ...restPeoples] ;
    this.dataSource.sort = this.sort;
      }
    );
  }












}
