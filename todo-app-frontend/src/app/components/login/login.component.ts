import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private http: HttpClient, private router: Router) {}
  login(): void {
    this.http.post<{ token: string }>('http://localhost:3000/auth/login', { username: this.username, password: this.password })
  .subscribe({
    next: (response) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    },
    error: (error) => {
      console.error('Login error', error);
      alert('Login failed: ' + (error.error.message || 'Please check your credentials.'));
    }
  });
  }
}
