import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Member} from '../interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor( private dataService: DataService ) { }

  detailInfo: Member = {};

  ngOnInit() {
    this.dataService.details.subscribe( data =>     this.detailInfo = data );
  }

  onNeighborClick( id:string ){
    this.dataService.getDetailInfo(id)
  }

}
