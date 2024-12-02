import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { first } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const hashedPassword = CryptoJS.SHA256(this.registerForm.value.password).toString();
      const registerData = {
        name: this.registerForm.value.name,
        surname: this.registerForm.value.surname,
        username: this.registerForm.value.email,
        password: hashedPassword,
      };

      this.authService.register(registerData).pipe(first()).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          // Mostrar un mensaje de alert
          alert('Registro exitoso');
          // Redirigir al login después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error en el registro', err);
        }
      });
    }
  }
}