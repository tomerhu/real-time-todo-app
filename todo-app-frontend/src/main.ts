import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { RegistrationComponent } from './app/components/registration/registration.component';
import { TaskListComponent } from './app/components/task-list/task-list.component';
import { authGuard } from './app/guards/auth.guard';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),       // Replaces importing HttpClientModule in app.module.ts
    provideAnimations(),        // Provides Angular animations (if needed)
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
      { path: '', component: TaskListComponent, canActivate: [authGuard] }
    ])
  ]
});
