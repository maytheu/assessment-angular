import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Flight } from '../widgets/flight.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  loadflight(): Observable<Flight[]> {
    const end = Math.floor(Date.now() / 1000);
    const begin = end - 7200; //start from the last two hours

    return this.http
      .get<Flight[]>(
        `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`
      )
      .pipe(
        catchError((e) => of(e)),
        map((data) => data)
      );
  }
}
