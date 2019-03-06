import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpMessageService {

  constructor(private httpClient: HttpClient) {
  }

  public handleError(error: HttpErrorResponse | any) {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // Cualquier otro tipo de error
      errorMessage = error.error.message;
    } else {
      // Error Http
      errorMessage = `${error.status} - ${error.statusText || ''} - ${error.error}`;
    }

    return throwError(errorMessage);
  }

}
