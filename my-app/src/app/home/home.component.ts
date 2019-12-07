import {AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import { Subscription} from 'rxjs';
import {Member} from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor( private dataService: DataService,  private router: Router) {}

  searchParam = '';
  filterParam = '';
  displayedColumns: string[] = ['url', 'name', 'gender', 'birth_year', 'homeworld'];
  dataSource = new MatTableDataSource([]);
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.subscription = this.dataService.peopleList.subscribe( (data: Member[]) => {
      this.dataSource.data = [...this.dataSource.data, ...data];
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchMember(e: Event) {
    const target = e.target as HTMLInputElement;
    this.filterParam = '';
    this.searchParam = target.value;
    this.dataSource.filterPredicate = (data: Member, filter: string) => data.name.toLowerCase().includes( filter );
    this.dataSource.filter = target.value.toLowerCase().trim();
  }

  filterTable( param, e: HTMLSelectElement ) {
    this.searchParam = '';
    this.dataSource.filterPredicate = (data: Member, filter: string) => {
      return filter === 'other'
        ? !['male', 'female'].includes(data[param])
        : data[param] === e.value;
    };
    this.dataSource.filter = e.value;
  }

  showDetailInfo( id: string ) {
    this.router.navigate(['/details']);
    this.dataService.getDetailInfo(id);
  }
}
