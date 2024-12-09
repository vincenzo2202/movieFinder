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

    // Add event listener for Enter key
    document.addEventListener('keydown', this.handleEnterKey.bind(this));
    this.defaultMovies(); // Fetch default movies on initialization
  }

  ngOnDestroy(): void {
    // Remove event listener for Enter key
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
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchMovies(this.searchQuery, this.currentPage);
    }
  }

  searchMovies(query: string, page: number): void {
    if (query.trim()) {
      this.dashboardService.searchMovie(query, page).subscribe({
        next: (data) => {
          this.movies = data.Search || [];
          this.totalPages = Math.ceil(data.totalResults / 10);
          console.log('Resultados de la búsqueda:', this.movies);
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

  defaultMovies(): void {
    this.dashboardService.defaultMovies().subscribe({
      next: (data) => {
        this.default = data.results || [];
        console.log('default:', data.results);
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