import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  }


}


