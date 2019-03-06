import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from '../shared/promotion';
import {baseURL} from '../shared/baseurl';
import {catchError, map} from 'rxjs/operators';
import {ProcessHttpMessageService} from './process-http-message.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpMessageService
  ) {
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${baseURL}promotions`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(`${baseURL}promotions/${id}`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(`${baseURL}promotions?featured=true`)
      .pipe(
        map(promotions => promotions[0]),
        catchError(this.processHTTPMsgService.handleError)
      );
  }
}
