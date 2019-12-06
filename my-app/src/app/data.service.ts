import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Member, Planet} from './interfaces';

@Injectable()
export class DataService {
  peoples: Member[] = [];
  planets: { [key: string]: Planet | boolean } = {};

  private peopleSource = new BehaviorSubject(this.peoples);
  peopleList = this.peopleSource.asObservable();

  updatePeopleSource(peoples: Member[]) {
    this.peopleSource.next(peoples);
  }

  updatePlanets(planets: Planet[]): void {
    planets.forEach( (planet: Planet) => this.planets[ planet.url ] = planet );
  }

  setPlanetNameToPeopleList( list = this.peoples ) {
   return list.forEach( (person: Member) => person.homeWorldName = this.planets[person.homeworld || {} ].name );
  }

  updatePeoples(peoples: Member[]): void {
    this.peoples = [...this.peoples, ...peoples];
  }
}
