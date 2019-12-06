import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DataService} from '../data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor( private dataService: DataService,  private router: Router) {}

  searchParam = '';
  filterParam = '';
  displayedColumns: string[] = ['url', 'name', 'gender', 'birth_year', 'homeworld'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit() {
    this.dataService.peopleList.subscribe( data => {
      this.dataSource.data = [...this.dataSource.data, ...data];
      this.dataSource.sort = this.sort;
    });
  }

  searchMember(e: Event) {
    this.filterParam = '';
    this.searchParam = e.target.value;
    this.dataSource.filterPredicate = (data: Element, filter: string) => data.name.toLowerCase().includes( filter );
    this.dataSource.filter = e.target.value.toLowerCase().trim();
  }

  filterTable( param, e: Event ) {
    this.searchParam = '';
    this.dataSource.filterPredicate = (data: Element, filter: string) => {
      return filter === 'other'
        ? !['male', 'female'].includes(data[param])
        : data[param] === e.value
    };
    this.dataSource.filter = e.value;
  }

  showDetailInfo( id: string ) {
    this.router.navigate(['/details']);
    this.dataService.getDetailInfo(id);
  }
}
