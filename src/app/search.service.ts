import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  username: string;
  pc: string;
  ram: string;
  printer: string;
  info: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private dataUrl = '/assets/data.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.dataUrl);
  }

  searchUser(query: string): Observable<User[]> {
    const lowerCaseQuery = query.toLowerCase();
    return this.getUsers().pipe(
      map(users =>
        users.filter(user =>
          user.username.toLowerCase().includes(lowerCaseQuery) ||
          user.pc.toLowerCase().includes(lowerCaseQuery) ||
          user.ram.toLowerCase().includes(lowerCaseQuery) ||
          user.printer.toLowerCase().includes(lowerCaseQuery) ||
          user.info.toLowerCase().includes(lowerCaseQuery)
        )
      )
    );
  }
}
