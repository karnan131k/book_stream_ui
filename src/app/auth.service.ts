import { Injectable } from '@angular/core';
import { apiUrl } from './menu.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = apiUrl + '/api/auth/signIn'; // replace with your API endpoint
  private tokenKey = 'auth_token';
  private rolesKey = 'user_roles';

  constructor(private http: HttpClient, private router: Router) {}

  // Method to sign in the user with username and password
  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  // Store the token and decoded roles in localStorage
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);

    try {
      const decodedToken: any = jwtDecode(token);
      localStorage.setItem(this.rolesKey, JSON.stringify(decodedToken.roles || []));
    } catch (error) {
      console.error('Error decoding the token', error);
    }
  }

  // Get the stored JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Get the roles from the stored decoded token in localStorage
  getRoles(): string[] {
    const roles = localStorage.getItem(this.rolesKey);
    return roles ? JSON.parse(roles) : [];
  }

  // Decode the stored JWT token
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token); // Decode the token
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }

  // Check if the user is authenticated (i.e., has a token)
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Check if the user has a specific role
  hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }

  // Logout the user by removing the token and roles from localStorage
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
    this.router.navigate(['/signin']);
  }
}

