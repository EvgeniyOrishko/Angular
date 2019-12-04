import {Component, OnInit, ViewChild} from '@angular/core';
import { Member, PeopleRequest} from '../interfaces';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  constructor( private apiService: ApiService ) {}

  members: Member[] = [];

  displayedColumns: string[] = ['url', 'name', 'gender', 'birth_year'];
  dataSource = new MatTableDataSource(this.members);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {

    this.dataSource.sort = this.sort;

    this.apiService.fetchByUrl( 'https://swapi.co/api/people' )
      .subscribe((data: PeopleRequest) => {

        this.dataSource.data = data.results;

        console.error( 'data', data.results );

      }).add(  );

    console.error( 'aaa', this.members );

  }





}
