import { Pipe, PipeTransform } from '@angular/core';
import {
  Observable,
  catchError,
  from,
  isObservable,
  map,
  of,
  startWith,
} from 'rxjs';

interface AsyncObsOutput<T> {
  loading?: boolean;
  value?: T;
  error?: {
    error: {
      status: number;
      error: string;
    };
  };
}

@Pipe({
  name: 'exception',
})
export class ExceptionPipe implements PipeTransform {
  transform<T>(
    obj: Observable<T> | Promise<T> | T
  ): Observable<AsyncObsOutput<T | any>>;
  transform<T>(obj: Observable<T> | Promise<T> | T) {
    return attachProgress(obj);
  }
}

function attachProgress<T>(
  obj: Observable<T> | Promise<T> | T,
  value?: T
): Observable<AsyncObsOutput<T>> {
  if (isObservable(obj) || obj instanceof Promise) {
    return (isObservable(obj) ? obj : from(obj)).pipe(
      map((v) => ({ value: v })),
      startWith({ loading: true, value }),
      catchError((error: any) => of({ error, value }))
    );
  }
  return of({ value: obj, loading: false });
}
