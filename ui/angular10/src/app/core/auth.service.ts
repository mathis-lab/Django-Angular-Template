import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from './models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  httpOptions:any = {};
  error:string = "";

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
      })
    };
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string) {
    console.log("Login 2: ");
    console.log(environment.apiUrl + '/api-token-auth/');
    return this.http.post<any>(environment.apiUrl + '/api-token-auth/', {username, password }).pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      user.username = username;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  /*public refreshToken() {
    this.http.post('/api-token-refresh/', JSON.stringify({token: this.currentUserSubject.getValue().token})).subscribe(
      user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
    );
  }*/

  public logout() {
    // remove user from local storage to log user out
    if (this.currentUserSubject.getValue()) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null!);
    }
  }

}
