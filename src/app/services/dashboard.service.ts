import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private themoviedb = 'https://api.themoviedb.org/3/'
  private image = 'https://image.tmdb.org/t/p/w500'

  constructor(private http: HttpClient) { }

  // IMDb
  private getHeaders(): HttpHeaders {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzQzNjQ4OWRlYzkzM2JjMTYwMjFkYmY2NDE4ZDY0YyIsIm5iZiI6MTczMzc0MjE2OS40MTI5OTk5LCJzdWIiOiI2NzU2Y2U1OTliYzIwZWFhNDk2ODAwZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.W-k8o-PUVSDSkfN1iPc6D112FIZPowvq97WJ6b84_Zc'
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json'
    });
  }

  searchMovie(title: string, page: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.themoviedb}search/multi?query=${title}&include_adult=false&language=en-US&page=${page}' `;


    return this.http.get(url, { headers });
  }

  defaultMovies(): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.themoviedb}movie/popular?language=en-US&page=1`;
    return this.http.get(url, { headers });
  }

  // buscar la imagen 
  getImage(poster: string): string {
    return `${this.image}${poster}`;
  }



}
