import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProcessHttpMessageService} from './process-http-message.service';
import {Observable} from 'rxjs';
import {Dish} from '../shared/dish';
import {baseURL} from '../shared/baseurl';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
    public  httpClient: HttpClient,
    public processHttpMessageService: ProcessHttpMessageService
  ) {
  }

  getDishes(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(`${baseURL}dishes`)
      .pipe(catchError(this.processHttpMessageService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.httpClient.get<Dish>(`${baseURL}dishes/${id}`)
      .pipe(catchError(this.processHttpMessageService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.httpClient.get<Dish[]>(`${baseURL}dishes?featured=true`)
      .pipe(
        map(dishes => dishes[0]), // Solo retornamos el primer plato
        catchError(this.processHttpMessageService.handleError)
      );
  }

}
