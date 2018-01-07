import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthorizationService} from './authorization.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {BadInput} from '../../common/bad-input';
import {NotFoundError} from '../../common/not-found-error';
import {AppError} from '../../common/app-error';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private authService: AuthorizationService) { }

  private createQueryString(queryParameters: Object): string {
    let queryString = '';

    if (typeof queryParameters === 'object') {
      for (const key in queryParameters) {
        const value = queryParameters[key];
        const prefix = queryString.length === 0 ? '?' : '&';

        queryString += `${prefix}${key}=${value}`;
      }
    }

    return queryString;
  }

  private createURI(path: string, queryParameters: Object): string {
    const queryString = this.createQueryString(queryParameters);

    return `http://localhost:8080/${path}${queryString}`;
  }

  private createRequestHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    if (this.authService.hasAuthorization()) {
      headers = headers.set('Authorization', this.authService.createAuthorizationString());
    }

    return headers;
  }



  get(path: string, queryParameters?: Object) {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return this.http
      .get(uri, { headers: headers })
      .catch(this.handleError);
  }

  put(path: string, data: Object, queryParameters?: Object) {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return this.http
      .put(uri, data, { headers: headers })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error));
    }

    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }

  public post<T>(path: string, data: Object, queryParameters?: Object): Observable<T> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return this.http.post(uri, data, { headers: headers });
  }
  //
  // public put<T>(path: string, data: Object, queryParameters?: Object): Observable<T> {
  //   const uri = this.createURI(path, queryParameters);
  //   const headers = this.createRequestHeaders();
  //
  //   return this.http.put(uri, data, { headers: headers });
  // }
  //
  // public delete<T>(path: string, queryParameters?: Object): Observable<T> {
  //   const uri = this.createURI(path, queryParameters);
  //   const headers = this.createRequestHeaders();
  //
  //   return this.http.delete(uri, { headers: headers });
  // }
}
