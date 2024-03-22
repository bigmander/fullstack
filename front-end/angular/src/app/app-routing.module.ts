import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { LoginGuard } from './login/login.guard';
import { LogoutGuard } from './login/logout.guard';
import { SignupComponent } from './signup/signup/signup.component';


const routes: Routes = [{
  path: 'posts',
  loadChildren: () => import('./posts/posts.module').then(a => a.PostsModule)
}, {
  path: 'login', component: LoginComponent, canActivate: [LoginGuard]

}, {
  path: 'logout', component: LogoutComponent, canActivate: [LogoutGuard]
}, {
  path: 'signup', component: SignupComponent
}, {
  path: '', redirectTo: '/posts', pathMatch: 'full'
}]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
