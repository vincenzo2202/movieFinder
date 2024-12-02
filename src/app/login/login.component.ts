import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null; // Declara la propiedad errorMessage

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // Verificar si el token está presente en el localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Redirigir al dashboard si el token está presente
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const hashedPassword = CryptoJS.SHA256(this.loginForm.value.password).toString();
      const loginData = {
        username: this.loginForm.value.email,
        password: hashedPassword
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          if (response && response.token) {
            // Guardar el token en el localStorage
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.error('Error en el login', err);
          if (err.status === 401) {
            this.errorMessage = 'Datos de autenticación inválidos.';
          } else {
            this.errorMessage = 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.';
          }
        }
      });
    }
  }
}