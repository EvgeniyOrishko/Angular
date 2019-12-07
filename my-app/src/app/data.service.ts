import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Member, Planet} from './interfaces';

@Injectable()
export class DataService {
  people: { [key: string]: Member } = {};
  planets: { [key: string]: Planet } = {};

  private detailInfoSource = new BehaviorSubject({});
  details = this.detailInfoSource.asObservable();

  private peopleSource = new BehaviorSubject([]);
  peopleList = this.peopleSource.asObservable();

  updatePeopleSource(people: Member[]) {
    this.peopleSource.next(people);
  }

  updateDetailInfoSource(details: Member) {
    this.detailInfoSource.next(details);
  }

  updatePlanets(planets: Planet[]): void {
    planets.forEach( (planet: Planet) => this.planets[ planet.url ] = planet );
  }

  setPlanetNameToPeopleList( list = Object.values(this.people) ) {
   return list.forEach( (person: Member) => person.homeWorldName = this.planets[ person.homeworld] && this.planets[ person.homeworld].name );
  }

  updatePeople(peoples: Member[]): void {
    peoples.forEach( (person: Member) => this.people[person.url] = person )
  }

  getDetailInfo( id: string ) {
    const person = this.people[id];
    const planet = this.planets[ person.homeworld ];
    person.neighbors = planet.residents.filter( item => item !== id ).map( (item: string) => this.people[item]);
    this.updateDetailInfoSource( person );
  }
}
