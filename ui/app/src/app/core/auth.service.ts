import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from './models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  httpOptions: any = {};
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    if (this.currentUserSubject.value) {
      this.currentUserSubject.value.connected = false;
    }
    console.log(this.currentUserSubject.value);
    this.currentUser = this.currentUserSubject.asObservable();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers':
          'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string) {
    console.log('Login...');
    return this.http
      .post<any>(environment.apiUrl + '/api/token/', { username, password })
      .pipe(
        map((user) => {
          user.connected = true;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(user);
          return user;
        })
      );
  }

  public loginToken(token: string) {
    console.log('Login with Token...');
    return this.http
      .post<any>(environment.apiUrl + '/api/token/refresh/', { refresh: token })
      .pipe(
        map((user) => {
          user.connected = true;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(user);
          return user;
        })
      );
  }

  public refreshToken() {
    console.log('Refresh Token...');
    return this.http
      .post<any>(environment.apiUrl + '/api/token/refresh/', {
        refresh: this.currentUserSubject.value.refresh
      })
      .pipe(
        map((user) => {
          user.connected = true;
          user = { ...this.currentUserSubject.value, ...user };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(user);
          return user;
        })
      );
  }

  public getUserInfo() {
    console.log('Get User Info...');
    return this.http
      .get<any>(environment.apiUrl + '/api/core/user/')
      .subscribe((user) => {
        user = { ...this.currentUserSubject.value, ...user };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        console.log(user);
        return user;
      });
  }

  public checkToken() {
    if (this.currentUserValue == null) {
      this.logout();
    } else {
      this.refreshToken().subscribe();
    }
  }

  public verifyToken() {
    console.log('Verify Token...');
    return this.http
      .post<any>(environment.apiUrl + '/api/token/verify/', {
        access: this.currentUserSubject.value.access
      })
      .subscribe((user) => {
        console.log(user);
        return user;
      });
  }

  public getToken(): string | undefined {
    return this.currentUserSubject.value?.access;
  }

  public getRefreshToken() {
    return this.currentUserSubject.value?.refresh;
  }

  public logout() {
    // remove user from local storage to log user out
    if (this.currentUserSubject.getValue()) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null!);
    }
    this.router.navigate(['/login']);
  }
}
