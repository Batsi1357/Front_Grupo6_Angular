import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuario } from '../models/usuario-model';
import { JwtResponseModel } from '../models/jwtResponse';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  ruta_servidor: string = 'http://localhost:8080';
  recurso: string = 'Usuario';

  constructor(private http: HttpClient) {}

  listAll() {
    return this.http.get<usuario[]>(this.ruta_servidor + '/' + this.recurso);
  }

  new(usuario: usuario) {
    return this.http.post<usuario>(
      this.ruta_servidor + '/' + this.recurso + '/insert',
      usuario
    );
  }

  register(usuario: usuario) {
    // Endpoint para registro público de nuevos usuarios (usa /insert del backend)
    return this.http.post<usuario>(
      this.ruta_servidor + '/' + this.recurso + '/insert',
      usuario
    );
  }

  delete(idUsuario: number) {
    return this.http.delete<usuario[]>(
      this.ruta_servidor +
        '/' +
        this.recurso +
        '/eliminar/' +
        idUsuario.toString()
    );
  }

  listAll_ID(idUsuario: number) {
    return this.http.get<usuario[]>(
      this.ruta_servidor + '/' + this.recurso + '/' + idUsuario.toString()
    );
  }

  update(usuario: usuario) {
    return this.http.put<usuario>(
      this.ruta_servidor + '/' + this.recurso + '/update',
      usuario
    );
  }

  isLogged() {
    return this.getUserId() != 0;
  }

  getUserId() {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('usuario_id') !== null) {
        return parseInt(localStorage.getItem('usuario_id')!.toString());
      }
    }
    return 0;
  }

  login(username: string, password: string) {
    const body = { username, password };
    return this.http
      .post<JwtResponseModel>(
        `${this.ruta_servidor}/${this.recurso}/login`,
        body
      )
      .pipe(
        tap((response) => {
          // Guarda el token para interceptor/guards
          localStorage.setItem('token', response.token);
        })
      );
  }

  getAuthorities(): string[] {
    const rawToken =
      (typeof localStorage !== 'undefined' && localStorage.getItem('token')) ||
      (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token'));
    if (!rawToken) {
      return [];
    }

    try {
      const payloadPart = rawToken.split('.')[1];
      if (!payloadPart) {
        return [];
      }

      // Manejo de base64 url safe y padding
      const normalized = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
      const payload = JSON.parse(atob(padded));

      const rawRoles =
        payload.authorities || payload.roles || payload.role || payload.rol;
      if (Array.isArray(rawRoles)) {
        return rawRoles
          .map((r) => {
            // Soportar estructuras como [{authority:'ROLE_ADMIN'}]
            if (r && typeof r === 'object' && 'authority' in r) {
              return `${(r as any).authority}`;
            }
            return `${r}`;
          })
          .filter(Boolean);
      }

      if (typeof rawRoles === 'string') {
        return rawRoles
          .split(',')
          .map((r) => r.trim())
          .filter(Boolean);
      }

      return [];
    } catch (e) {
      console.error('No se pudieron obtener authorities del token', e);
      return [];
    }
  }
}
