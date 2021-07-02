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
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = "";
  error = '';
  //imageURL_KJ = environment.staticURL + "assets/img/KING_JOUET.png";

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
    this.signupForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        password2: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    console.log(this.route.snapshot.queryParams['returnUrl']);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log("Submit identification form !");
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("Invalide !");
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        console.log("Connecté !");
        console.log([this.returnUrl]);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
        this.error = error;
        this.loading = false;
      });
    console.log(this.loginForm);
  }
}
