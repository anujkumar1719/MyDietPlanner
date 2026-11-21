import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent {
  showLogout = false;
 
  constructor(private authService:AuthService, private router: Router) {}
 
  openLogout() {
    this.showLogout = true;
  }
 
  closeLogout() {
    this.showLogout = false;
  }
 
  logout() {
    this.authService.logout();
    this.closeLogout();
    this.router.navigate(['/homepage']);
  }
}