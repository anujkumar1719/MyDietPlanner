import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = {
    userId: 0,
    username: '',
    email: '',
    password: '',
    mobileNumber:'',
    userRole: ''
  };
  confirmPassword:string='';
  message: string = '';
  showPopup:boolean=false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {

    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log(response);
        this.message = 'Registration Successful';
        this.showPopup=true;
      },

      error: (error) => {
        console.error(error);
        this.message = 'Registration Failed';
      }
    });
  }

  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/login']);
    }
}

