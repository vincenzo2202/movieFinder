import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CarouselComponent } from '../carousel/carousel.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, CarouselComponent, HeaderComponent]
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardInfo: any;
  searchQuery: string = '';
  movies: any[] = [];
  private searchSubject = new Subject<string>();
  currentPage: number = 1;
  totalPages: number = 1;
  default: any[] = [];

  constructor(private router: Router, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchMovies(query, this.currentPage);
      this.defaultMovies();
    });

    document.addEventListener('keydown', this.handleEnterKey.bind(this));
    this.defaultMovies();
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleEnterKey.bind(this));
  }

  handleEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchMoviesOnClick();
    }
  }

  onSearchQueryChange(query: string): void {
    this.searchSubject.next(query);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchMovies(this.searchQuery, this.currentPage);
    }
  }
  nextPage(): void {
    if (this.currentPage >= 1) {
      this.currentPage++;
      this.searchMovies(this.searchQuery, this.currentPage);
    }
  }

  searchMovies(query: string, page: number): void {
    if (query.trim()) {
      this.dashboardService.searchMovie(query, page).subscribe({
        next: (data) => {
          this.movies = data.results || [];
          this.totalPages = Math.ceil(data.totalResults / 10);
        },
        error: (err) => {
          console.error('Error al buscar películas', err);
        }
      });
    } else {
      this.movies = [];
    }
  }

  searchMoviesOnClick(): void {
    this.currentPage = 1;
    this.searchMovies(this.searchQuery, this.currentPage);
  }

  truncateTitle(title: string): string {
    return title.length > 30 ? title.slice(0, 30) + '...' : title;
  }

  formatDate(movie: any): string {
    return movie.release_date || movie.first_air_date;
  }

  // https://www.themoviedb.org/movie
  defaultMovies(): void {
    this.dashboardService.defaultMovies().subscribe({
      next: (data) => {
        this.default = data.results || [];
      },
      error: (err) => {
        console.error('Error al buscar películas', err);
      }
    });

  }

  getImage(poster: string): string {
    return this.dashboardService.getImage(poster);
  }


}