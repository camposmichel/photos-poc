import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from "rxjs/operators";
import Photo from '../../models/photo';

@Injectable()
export class FeedProvider {

  constructor(public http: HttpClient) {
  }

  list(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://jsonplaceholder.typicode.com/photos')
      .pipe(catchError(this.handleError<Photo[]>('list')))
  }

  private log(msg: string, error: boolean) {
    if (error) console.error('FeedProvider: ' + msg)
    else console.log('FeedProvider: ' + msg)
  }

  private handleError<T>(op = 'op') {
    return (err: any): Observable<T> => {
      this.log(`${op} failed: ${err.message}`, true)
      throw err
    }
  }
}
