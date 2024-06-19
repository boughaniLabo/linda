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

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  searchUser(query: string): Observable<any[]> {
    const lowerCaseQuery = query.toLowerCase();
    return this.getUsers().pipe(
      map(users =>
        users.filter(user =>
          user.username.toLowerCase().includes(lowerCaseQuery) 
        )
      )
    );
  }
}
