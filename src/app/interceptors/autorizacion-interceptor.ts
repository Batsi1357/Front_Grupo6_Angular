import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AutorizacionInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip token attachment for login endpoints (case-insensitive)
    try {
      const reqUrl = new URL(req.url);
      const pathname = (reqUrl.pathname || '').toLowerCase();
      if (pathname === '/auth/login' || pathname.endsWith('/login') || pathname === '/usuario/login') {
        console.log('AutorizacionInterceptor: skipping auth for', req.url);
        return next.handle(req);
      }
    } catch (e) {
      // If URL cannot be parsed (e.g., relative urls), fallback to previous contains check
      const urlLower = req.url.toLowerCase();
      if (urlLower.includes('/auth/login') || urlLower.includes('/usuario/login') || urlLower.endsWith('/login')) {
        console.log('AutorizacionInterceptor: skipping auth (fallback) for', req.url);
        return next.handle(req);
      }
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log('Token en interceptor:', token ? 'Existe' : 'NO EXISTE');

    if (token) {
      const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      // Clone the request and add the authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: bearerToken,
        },
      });
      console.log('Request con token:', authReq.headers.get('Authorization'));
      console.log('Request headers keys:', authReq.headers.keys());
      return next.handle(authReq).pipe(
        catchError((err) => {
          if (err.status === 401) {
            // Propagamos el 401 para que el componente decida (evita “bote” inmediato)
            return throwError(() => err);
          }
          return throwError(() => err);
        })
      );
    } else {
      console.warn('No hay token disponible para:', req.url);
      return next.handle(req);
    }
  }
}
