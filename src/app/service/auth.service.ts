import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<boolean>(false);
  constructor() {}

  login(data: LoginData): Observable<boolean> {
    this._user.next(true);
    return of(true);
  }

  checkAuthentication(): boolean {
    return this._user.value;
  }
}
