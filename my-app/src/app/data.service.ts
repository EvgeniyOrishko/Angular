import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Member, Planet} from './interfaces';

@Injectable()
export class DataService {
  peoples: { [key: string]: Member } = {};
  planets: { [key: string]: Planet } = {};
  detailInfo: Member = {};

  private detailInfoSource = new BehaviorSubject(this.detailInfo);
  details = this.detailInfoSource.asObservable();

  private peopleSource = new BehaviorSubject([]);
  peopleList = this.peopleSource.asObservable();

  updatePeopleSource(peoples: Member[]) {
    this.peopleSource.next(peoples);
  }

  updateDetailInfoSource(details: Member) {
    this.detailInfoSource.next(details);
  }

  updatePlanets(planets: Planet[]): void {
    planets.forEach( (planet: Planet) => this.planets[ planet.url ] = planet );
  }

  setPlanetNameToPeopleList( list = Object.values(this.peoples) ) {
   return list.forEach( (person: Member) => person.homeWorldName = this.planets[person.homeworld || {} ].name );
  }

  updatePeoples(peoples: Member[]): void {
    peoples.forEach( (person: Member) => this.peoples[person.url] = person )
  }

  getDetailInfo( id: string ) {
    const person = this.peoples[id];
    const planet = this.planets[ person.homeworld ];
    person.neighbors = planet.residents.map( (item: string) => this.peoples[item] );
    this.updateDetailInfoSource( person );
  }
}
