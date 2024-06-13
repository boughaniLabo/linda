import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService, User } from '../search.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6 text-center">Search</h2>
        <div class="mb-4">
          <input type="text" [(ngModel)]="searchQuery" placeholder="Enter search term"
                 class="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button (click)="onSearch()"
                class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Search
        </button>
        <div *ngIf="searchResults.length > 0" class="mt-4 text-gray-700">
          <div *ngFor="let user of searchResults" class="mb-4 p-4 border rounded-md">
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>PC:</strong> {{ user.pc }}</p>
            <p><strong>RAM:</strong> {{ user.ram }}</p>
            <p><strong>Printer:</strong> {{ user.printer }}</p>
            <p><strong>Info:</strong> {{ user.info }}</p>
          </div>
        </div>
        <div *ngIf="noResults" class="mt-4 text-red-500 text-center">No information found</div>
      </div>
    </div>
  `
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: User[] = [];
  noResults: boolean = false;

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    this.searchService.searchUser(this.searchQuery).subscribe(users => {
      this.searchResults = users;
      this.noResults = users.length === 0;
    });
  }
}
