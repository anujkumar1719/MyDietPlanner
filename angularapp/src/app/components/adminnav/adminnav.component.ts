import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent {
  showLogout = false;
 
  constructor(private authservice:AuthService, private router: Router) {}
 
  openLogout() {
    this.showLogout = true;
  }
 
  closeLogout() {
    this.showLogout = false;
  }
 
  logout() {
    this.authservice.logout();
    this.closeLogout();
    this.router.navigate(['/homepage']);
  }
}