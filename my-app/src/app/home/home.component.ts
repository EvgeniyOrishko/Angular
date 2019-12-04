import {Component, OnInit, ViewChild} from '@angular/core';
import { Member } from '../interfaces';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  members: Member[] = [
    {
      birth_year: "19BBY",
      created: '2014-12-09T13:50:51.644000Z',
      edited: "2014-12-20T21:17:56.891000Z",
      eye_color: "blue",
      films: ["https://swapi.co/api/films/2/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/"],
      gender: "male",
      hair_color: "blond",
      height: "172",
      homeworld: "https://swapi.co/api/planets/1/",
      mass: "77",
      name: "Luke Skywalker",
      skin_color: "fair",
      species: ["https://swapi.co/api/species/1/"],
      starships: ["https://swapi.co/api/starships/12/", "https://swapi.co/api/starships/22/"],
      url: "https://swapi.co/api/people/1/",
      vehicles: ["https://swapi.co/api/vehicles/14/", "https://swapi.co/api/vehicles/30/"]
    },
    {
      birth_year: "19BBY",
      created: '2014-12-09T13:50:51.644000Z',
      edited: "2014-12-20T21:17:56.891000Z",
      eye_color: "blue",
      films: ["https://swapi.co/api/films/2/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/"],
      gender: "male",
      hair_color: "blond",
      height: "172",
      homeworld: "https://swapi.co/api/planets/1/",
      mass: "77",
      name: "Luke Skywalker",
      skin_color: "fair",
      species: ["https://swapi.co/api/species/1/"],
      starships: ["https://swapi.co/api/starships/12/", "https://swapi.co/api/starships/22/"],
      url: "https://swapi.co/api/people/1/",
      vehicles: ["https://swapi.co/api/vehicles/14/", "https://swapi.co/api/vehicles/30/"]
    },
    {
      name: "Obi-Wan Kenobi",
      height: "182", mass: "77",
      hair_color: "auburn, white",
      skin_color: "fair",
      birth_year: "57BBY",
      created: "2014-12-10T16:16:29.192000Z",
      edited: "2014-12-20T21:17:50.325000Z",
      eye_color: "blue-gray",
      films: ["https://swapi.co/api/films/2/", "https://swapi.co/api/films/5/", "https://swapi.co/api/films/4/"],
      gender: "male",
      hair_color: "auburn, white",
      height: "182",
      homeworld: "https://swapi.co/api/planets/20/",
      mass: "77",
      name: "Obi-Wan Kenobi",
      skin_color: "fair",
      species: ["https://swapi.co/api/species/1/"],
      starships: ["https://swapi.co/api/starships/48/", "https://swapi.co/api/starships/59/"],
      url: "https://swapi.co/api/people/10/",
      vehicles: ["https://swapi.co/api/vehicles/38/"],
    }
  ];

  displayedColumns: string[] = ['url', 'name', 'gender', 'birth_year'];
  dataSource = new MatTableDataSource(this.members);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }





}
