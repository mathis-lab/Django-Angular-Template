import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
      // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    console.log(this.route.snapshot.queryParams);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home/simulation';
    if ('username' in this.route.snapshot.queryParams && 'password' in this.route.snapshot.queryParams) {
      console.log("Auto connect : " + this.route.snapshot.queryParams);
      this.loading = true;
      this.authService.login(this.route.snapshot.queryParams['username'], this.route.snapshot.queryParams['password']).subscribe({
        next: data => {
          console.log("Connecté !");
          console.log([this.returnUrl]);
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          console.log(error);
          this.error = error;
          this.loading = false;
        }
      });
    }

    if ('token' in this.route.snapshot.queryParams) {
      console.log("Auto connect Token : " + this.route.snapshot.queryParams);
      this.loading = true;
      this.authService.loginToken(this.route.snapshot.queryParams['token']).subscribe({
        next: data => {
          console.log("Connecté !");
          console.log([this.returnUrl]);
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          console.log(error);
          this.error = error;
          this.loading = false;
      }});
    }

    if (this.authService.currentUserValue) {
      console.log("Already connected : " + this.route.snapshot.queryParams);
      this.loading = true;
      this.authService.refreshToken().subscribe({
        next: data => {
          console.log("Connecté !");
          console.log([this.returnUrl]);
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          console.log(error);
          this.error = error;
          this.loading = false;
      }});
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("Formulaire invalide !");
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value).subscribe({next: data => {
        console.log("Connecté !");
        console.log([this.returnUrl]);
        this.router.navigate([this.returnUrl]);
      }, error: err => {
        console.log(err);
        alert("Identifiants invalides : " + err?.statusText);
        this.error = err;
        this.loading = false;
      }});
  }
}
