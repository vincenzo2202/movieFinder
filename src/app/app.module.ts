import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routes';
import { AuthService } from './auth.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        ToastrModule.forRoot(), // Importa ToastrModule
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule, // Importa BrowserAnimationsModule
        RegisterComponent,
        LoginComponent,
        DashboardComponent
    ],
    providers: [AuthService],
    bootstrap: [] // No necesitas bootstrap aquí
})
export class AppModule { }