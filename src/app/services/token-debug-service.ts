import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenDebugService {
  private jwtHelper = new JwtHelperService();

  inspectToken(): void {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
      console.warn('❌ No hay token guardado');
      return;
    }

    try {
      const decoded = this.jwtHelper.decodeToken(token);
      const isExpired = this.jwtHelper.isTokenExpired(token);
      
      console.log('🔍 TOKEN INSPECTION:');
      console.log('📦 Token:', token.substring(0, 50) + '...');
      console.log('📋 Decodificado:', decoded);
      console.log('⏰ ¿Expirado?:', isExpired);
      console.log('🔐 Algoritmo:', decoded?.alg || 'N/A');
      console.log('👤 Usuario (sub):', decoded?.sub || 'N/A');
      console.log('⏱️ Emitido (iat):', new Date((decoded?.iat || 0) * 1000));
      console.log('⏱️ Expira (exp):', new Date((decoded?.exp || 0) * 1000));
      
      // Calcular tiempo restante
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = (decoded?.exp || 0) - now;
      console.log('⏳ Expira en (segundos):', expiresIn);
      
    } catch (error) {
      console.error('❌ Error decodificando token:', error);
    }
  }

  refreshTokenIfNeeded(): void {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.warn('❌ No hay token para refrescar');
      return;
    }

    const isExpired = this.jwtHelper.isTokenExpired(token);
    if (isExpired) {
      console.warn('⚠️ Token expirado. Necesita hacer login nuevamente.');
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    } else {
      const decoded = this.jwtHelper.decodeToken(token);
      const expiresIn = (decoded?.exp || 0) - Math.floor(Date.now() / 1000);
      console.log('✅ Token válido. Expira en', expiresIn, 'segundos');
    }
  }
}
