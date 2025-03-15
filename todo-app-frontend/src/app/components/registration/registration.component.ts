import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  username = '';
  password = '';
  confirmPassword = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    this.http.post<{ message: string }>('http://localhost:3000/auth/register', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error', error);
      }
    });
  }
}
