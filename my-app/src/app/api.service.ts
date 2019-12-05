import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Member, Planet} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchByUrl(path: string): Observable<any> {
    return this.http.get(path);
  }

  fetchPr( path: string ) {
    return this.http
      .get(path)
      .toPromise()
      .then((res: Response) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  fetchAllPlanets(){

      return Promise.all(
        [1,2,3,4,5,6,7].map( item => {
          return this.fetchPr( 'https://swapi.co/api/planets/?page=' + item )
            .then( data => {
              return data.results;})
            .catch( () => item );
        }))
        .then(data => {
          console.error( 'PLANETS', data )

          // data.forEach( planets => planets.forEach( (planet : Planet) =>  this.planets[ planet.url ] = planet  ) );

          return data;
          // this.getAllPeoples();

        })
        .catch(function(err) {
          console.log(err.message); // some coding error in handling happened
        });
  }

  fetchAllPeples(  numberOfPages ){

    return Promise.all(  numberOfPages.map( item =>       this.fetchPr(  'https://swapi.co/api/people/?page=' + item )
      .then( data => {
        return data.results
      })
      .catch( () => '' )))
      .then(data => data  )

      .catch(function(err) {
        console.log(err.message); // some coding error in handling happened
      });

  }


}


