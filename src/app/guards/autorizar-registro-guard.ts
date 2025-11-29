import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario-service';

export const autorizarRegistroGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsuarioService);
  const router = inject(Router);

  const authorities = userService.getAuthorities();
  if (!authorities || authorities.length === 0) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  const normalized = authorities.map((role) => role.toUpperCase());
  const isAdmin = normalized.some((role) => role.includes('ADMIN'));
  if (isAdmin) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
