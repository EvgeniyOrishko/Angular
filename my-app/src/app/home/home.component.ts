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
        this.getDataForFirstPage( data.results, this.getAllPlanets );
      });
  }

    getDataForFirstPage(list: Member[]) {
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
            this.getAllPlanets();
          })
        .catch((err) =>  console.log(err.message));
  }


  getAllPlanets() {
    Promise.all(
      [1,2,3,4,5,6,7].map( item => {

        return this.apiService.fetchPr( 'https://swapi.co/api/planets/?page=' + item )
          .then( data => {
            return data.results;})
          .catch( () => item );

      }))
      .then(data => {
        console.error( 'PLANETS', data )

        data.forEach( planets => planets.forEach( (planet : Planet) =>  this.planets[ planet.url ] = planet  ) );

         this.getAllPeoples();

      })
      .catch(function(err) {
        console.log(err.message); // some coding error in handling happened
      });
  }

  getAllPeoples( ) {

    Promise.all(
      [ 2,3,4,5,6,7,8,9].map( item => {

        return this.apiService.fetchPr( 'https://swapi.co/api/people/?page=' + item )
          .then( data => {

            return data.results})
          .catch( () => item.homeworld );

      }))
      .then(data => {
        // console.error( 'Peoples', data );

        const restPeoples = data.reduce( (acc, item) => [...acc, ...item] );
        restPeoples.forEach( (person: Member) => person.homeWorldName = this.planets[ person.homeworld || {} ].name )


        console.warn( 'THIsPLANET', this.members);



        this.dataSource.data = [ ...this.dataSource.data,  ...restPeoples] ;
        this.dataSource.sort = this.sort;




      })

      .catch(function(err) {
        console.log(err.message); // some coding error in handling happened
      });
  }












}
