import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequestModel } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
    
constructor(private http: HttpClient) {}
  login(request: JwtRequestModel) {
    const body = { username: request.username, password: request.password };
    return this.http.post<{ token: string }>('http://localhost:8080/auth/login', body).pipe(
      tap((resp) => {
        if (resp?.token) {
          localStorage.setItem('token', resp.token);
          sessionStorage.setItem('token', resp.token);
        }
      })
    );
  }
  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }
  showRole() {
    let token = this.getToken();
    if (!token) {
    
      return null; 
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
  
}
