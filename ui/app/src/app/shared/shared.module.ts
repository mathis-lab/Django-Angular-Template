import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { NotAuthComponent } from './components/not-auth/not-auth.component';
import { ShellComponent } from './components/shell/shell.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatDialogModule,
  FlexLayoutModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...materialModules
  ],
  declarations: [
    SidenavComponent,
    NotAuthComponent,
    ShellComponent,
    LoginSignupComponent,
    LogoutComponent,
    ConfirmDialogComponent,
    AlertDialogComponent
  ],
  providers: [FormBuilder],
  exports: [SidenavComponent, ...materialModules]
})
export class SharedModule {}
