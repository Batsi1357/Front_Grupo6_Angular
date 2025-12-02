import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequestModel } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  ruta_servidor: string = environment.apiUrl;

    
constructor(private http: HttpClient) {}
  login(request: JwtRequestModel) {
  const body = { username: request.username, password: request.password };

  return this.http
    .post<{ token: string }>(`${this.ruta_servidor}/auth/Login`, body)
    .pipe(
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
