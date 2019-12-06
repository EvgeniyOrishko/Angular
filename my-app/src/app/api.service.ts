import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlanetRequest} from './interfaces';

@Injectable()

export class ApiService {

  apiUrl = 'https://swapi.co/api';

  constructor( private http: HttpClient) { }

  fetchByUrl(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}`);
  }

  public fetchPr( path: string ) {
    return this.http
      .get(path)
      .toPromise()
      .then((res: Response) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  fetchAllByParams( list, path ) {
    return Promise.all(
      list.map( page => {
        return this.fetchPr( `${this.apiUrl}/${path}/?page=${page}`)
          .then( (data: PlanetRequest) => data.results)
          .catch( (e) => console.error( 'error', e ));
      }))
      .then(data => data)
      .catch(err => console.log(err.message));
  }
}


