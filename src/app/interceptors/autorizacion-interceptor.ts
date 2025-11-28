import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario-service';
import { LoginService } from '../services/login-service';

export const autorizacionInterceptor: HttpInterceptorFn = (req, next) => {
  
    // No adjuntar header en peticiones de login
    if (req.url.includes('/login')) {
      return next(req);
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token) {
      const nuevaReq = req.clone({
        headers: req.headers.set('Authorization',"Bearer "+token)
      });
      return next(nuevaReq);
    }

  return next(req);
};
