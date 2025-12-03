import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequestModel } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  ruta_servidor: string = 'http://localhost:8080';

    
constructor(private http: HttpClient) {}
  login(request: JwtRequestModel) {
  const body = { username: request.username, password: request.password };
  // Log the request payload and URL for debugging authentication issues
  const url = `${this.ruta_servidor}/auth/Login`;
  console.log('LoginService: POST', url, 'body:', body);

  // Observe full response so we can log headers/status for debugging 401s
  // NOTA: Backend espera /auth/login (minúscula), no /auth/Login
  const correctedUrl = url.replace('/auth/Login', '/auth/login');
  console.log('LoginService: corrected URL to', correctedUrl);
  return this.http
    .post<{ token: string }>(correctedUrl, body, { observe: 'response' as 'response' })
    .pipe(
      tap((resp) => console.log('LoginService: full response', resp)),
      tap((resp) => {
        if (resp?.body?.token) {
          localStorage.setItem('token', resp.body.token);
          sessionStorage.setItem('token', resp.body.token);
        }
      }),
      map((resp) => resp.body)
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
