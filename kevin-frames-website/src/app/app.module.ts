import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { AccessoriesComponent } from './views/accessories/accessories.component';
import { ResourcesComponent } from './views/resources/resources.component';
import { SurveyComponent } from './views/survey/survey.component';
import { WoodFramesComponent } from './views/wood-frames/wood-frames.component';
import { MetalFramesComponent } from './views/metal-frames/metal-frames.component';
import { NavigationComponent } from './views/navigation/navigation.component';
import { AdminSignupComponent } from './authentication/admin-signup/admin-signup.component';
import { AdminLoginComponent } from './authentication/admin-login/admin-login.component';
import { FooterComponent } from './views/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    AccessoriesComponent,
    ResourcesComponent,
    SurveyComponent,
    WoodFramesComponent,
    MetalFramesComponent,
    NavigationComponent,
    AdminSignupComponent,
    AdminLoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
