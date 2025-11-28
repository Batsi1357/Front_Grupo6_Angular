import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario-service';

export const autorizarConsultaGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsuarioService);
  const authorities = userService.getAuthorities();

  if (!authorities || authorities.length === 0) {
    return false;
  }

  const normalized = authorities.map((role) => role.toUpperCase());
  return normalized.includes('ESTUDIANTE') || normalized.includes('ADMIN');
};
