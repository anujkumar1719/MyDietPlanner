import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminaddplanComponent } from './components/adminaddplan/adminaddplan.component';
import { AdmineditplanComponent } from './components/admineditplan/admineditplan.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewplanComponent } from './components/adminviewplan/adminviewplan.component';

import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { RequestedplanComponent } from './components/requestedplan/requestedplan.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserappliedplanComponent } from './components/userappliedplan/userappliedplan.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserplanformComponent } from './components/userplanform/userplanform.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewplanComponent } from './components/userviewplan/userviewplan.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminaddplanComponent,
    AdmineditplanComponent,
    AdminnavComponent,
    AdminviewfeedbackComponent,
    AdminviewplanComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    RequestedplanComponent,
    UserappliedplanComponent,
    UseraddfeedbackComponent,
    UsernavComponent,
    UserplanformComponent,
    UserviewfeedbackComponent,
    UserviewplanComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
