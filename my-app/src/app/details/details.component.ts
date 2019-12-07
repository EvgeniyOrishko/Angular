import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Member} from '../interfaces';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor( private dataService: DataService ) { }

  detailInfo: Member;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.dataService.details.subscribe( (data: Member) =>  this.detailInfo = data );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNeighborClick( id: string ) {
    this.dataService.getDetailInfo(id);
  }

  generateLetters(name: string) {
     return name && name.match(/\b(\w)/g).join('');
  }

}
