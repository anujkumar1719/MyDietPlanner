import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Login } from '../models/login.model';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) {}
  private roleSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('role')
  );
  
  private userIdSubject = new BehaviorSubject<number | null>(
    Number(localStorage.getItem('userId'))
  );

  public userRole$ = this.roleSubject.asObservable();
  
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, user);
  }
  
  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/login`, login).pipe(
      tap(response => {
  
        localStorage.setItem('token', response.token);
  
        const payload = JSON.parse(
          atob(response.token.split('.')[1])
        );
        console.log('JWT Payload:', payload);
        localStorage.setItem('role', payload.Role);
        localStorage.setItem('userId', payload.UserId);
        this.roleSubject.next(payload.Role);
        this.userIdSubject.next(Number(payload.UserId));

      })
    );
  }
  
getRole(): string | null {
  return localStorage.getItem('role');
}

isLoggedIn(): boolean {
  return localStorage.getItem('token') !== null;
}

logout(): void {
  localStorage.clear();
  this.roleSubject.next(null);
  this.userIdSubject.next(null);
}

}
