import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule],
})
export class HeaderComponent {

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
