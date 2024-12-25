import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = next.data['roles'] || [];
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/signin']);
      return false;
    }

    if (expectedRoles.length && !expectedRoles.some((role: string) => this.authService.hasRole(role))) {
      this.router.navigate(['/403']);
      return false;
    }

    return true;
  }
}
