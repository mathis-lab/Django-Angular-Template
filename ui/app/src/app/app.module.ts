import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthComponent } from './shared/components/not-auth/not-auth.component';
import { LoginSignupComponent } from './shared/components/login-signup/login-signup.component';
import { ShellComponent } from './shared/components/shell/shell.component';
import { AuthGuard } from './core/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/error.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LogoutComponent } from './shared/components/logout/logout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginSignupComponent
  },
  {
    path: 'home',
    component: ShellComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'notauth',
    component: NotAuthComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

const materialModules = [MatFormFieldModule, MatInputModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FontAwesomeModule,
    ...materialModules
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
