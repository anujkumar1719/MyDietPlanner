import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: Login = {
    Email: '',
    Password: ''
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(form:any): void {

    this.authService.login(this.loginData).subscribe({
      next: (response) => {        
        console.log('Login Success', response);
        console.log('Role:', localStorage.getItem('role'));
        
        this.router.navigate(['/home']);
      },

      error: (error) => {
        console.error(error);
        
        this.errorMessage = 'Invalid Email or Password';
      }
    });
}}
