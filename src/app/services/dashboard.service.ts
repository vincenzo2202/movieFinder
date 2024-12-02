import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https://www.omdbapi.com/?apikey=bfd30579&'

  constructor(private http: HttpClient) { }

  searchMovie(title: string, page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}s=${title}&page=${page}`);
  }
}
