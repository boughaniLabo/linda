import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-96">
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
    <form (ngSubmit)="onLogin()">
      <div class="mb-4">
        <label for="username" class="block text-gray-700">Username</label>
        <input type="text" id="username" [(ngModel)]="username" name="username"
               class="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700">Password</label>
        <input type="password" id="password" [(ngModel)]="password" name="password"
               class="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <button type="submit"
              class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
        Login
      </button>
      <div *ngIf="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</div>
    </form>
  </div>
</div>

  `
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (!success) {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
