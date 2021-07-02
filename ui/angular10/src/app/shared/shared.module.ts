import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { NotAuthComponent } from './components/not-auth/not-auth.component';
import { ShellComponent } from './components/shell/shell.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

const materialModules = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  FlexLayoutModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...materialModules],
  declarations: [SidenavComponent, NotAuthComponent, ShellComponent, LoginSignupComponent],
  providers: [FormBuilder],
  exports: [SidenavComponent, ...materialModules]
})
export class SharedModule {}
