import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Leader} from '../shared/leader';
import {baseURL} from '../shared/baseurl';
import {catchError, map} from 'rxjs/operators';
import {ProcessHttpMessageService} from './process-http-message.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpMessageService
  ) {
  }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(`${baseURL}leaders`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(`${baseURL}leaders/${id}`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(`${baseURL}leaders?featured=true`)
      .pipe(
        map(leaders => leaders[0]),
        catchError(this.processHTTPMsgService.handleError)
      );
  }
}
