import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  username: string;
  password: string;
  info: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userInfo: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>('/assets/users/users.json').pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.isAuthenticated = true;
          this.userInfo = user;
          this.router.navigate(['/search']);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userInfo = null;
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  get userInformation(): User | null {
    return this.userInfo;
  }
}
