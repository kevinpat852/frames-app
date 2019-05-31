import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { WoodFramesComponent } from './views/wood-frames/wood-frames.component';
import { MetalFramesComponent } from './views/metal-frames/metal-frames.component';
import { AccessoriesComponent } from './views/accessories/accessories.component';
import { ResourcesComponent } from './views/resources/resources.component';
import { SurveyComponent } from './views/survey/survey.component';
import { AdminLoginComponent } from './authentication/admin-login/admin-login.component';
import { AdminSignupComponent } from './authentication/admin-signup/admin-signup.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'adminLogin', component: AdminLoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'adminSignup', component: AdminSignupComponent},
  {path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'woodFrames', component: WoodFramesComponent, canActivate: [AuthGuard]},
  {path: 'metalFrames', component: MetalFramesComponent, canActivate: [AuthGuard]},
  {path: 'accessories', component: AccessoriesComponent, canActivate: [AuthGuard]},
  {path: 'resources', component: ResourcesComponent, canActivate: [AuthGuard]},
  {path: 'survey', component: SurveyComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
