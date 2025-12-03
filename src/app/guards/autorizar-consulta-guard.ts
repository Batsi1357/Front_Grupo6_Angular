import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario-service';

export const autorizarConsultaGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsuarioService);
  const router = inject(Router);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  const authorities = userService.getAuthorities();
  // Si el token no trae roles, dejamos pasar y dejamos al backend decidir.
  if (!authorities || authorities.length === 0) {
    return true;
  }

  const normalized = authorities.map((role) => role.toUpperCase());
  const hasAccess = normalized.some((role) => role.includes('ESTUDIANTE') || role.includes('ADMIN'));
  if (!hasAccess) {
    router.navigate(['/login']);
  }
  return hasAccess;
};
