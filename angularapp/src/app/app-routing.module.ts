import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserviewplanComponent } from './components/userviewplan/userviewplan.component';
import { UserplanformComponent } from './components/userplanform/userplanform.component';
import { UserappliedplanComponent } from './components/userappliedplan/userappliedplan.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdminaddplanComponent } from './components/adminaddplan/adminaddplan.component';
import { AdmineditplanComponent } from './components/admineditplan/admineditplan.component';
import { AdminviewplanComponent } from './components/adminviewplan/adminviewplan.component';
import { RequestedplanComponent } from './components/requestedplan/requestedplan.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { userGuard } from './components/authguard/user.guard';
import { adminGuard } from './components/authguard/admin.guard';
import { UsernavComponent } from './components/usernav/usernav.component';
import { HomepageComponent } from './components/homepage/homepage.component';
const routes: Routes = [

  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path:'homepage', component:HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent},

  { path: 'userviewplan', component: UserviewplanComponent, canActivate: [userGuard] },
  { path: 'userplanform/:id', component: UserplanformComponent, canActivate: [userGuard] },
  { path: 'userappliedplan', component: UserappliedplanComponent, canActivate: [userGuard] },
  { path: 'useraddfeedback', component: UseraddfeedbackComponent, canActivate: [userGuard] },
  { path: 'userviewfeedback', component: UserviewfeedbackComponent, canActivate: [userGuard] },

  { path: 'adminaddplan', component: AdminaddplanComponent, canActivate: [adminGuard] },
  { path: 'adminviewplan', component: AdminviewplanComponent, canActivate: [adminGuard] },
  { path: 'admineditplan/:id', component: AdmineditplanComponent, canActivate: [adminGuard] },
  { path: 'requestedplan', component: RequestedplanComponent, canActivate: [adminGuard] },
  { path: 'adminviewfeedback', component: AdminviewfeedbackComponent, canActivate: [adminGuard] },

  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent },
  { path:'user', component:UsernavComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }