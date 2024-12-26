import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: false,

  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  errMsg: string[] = [];
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.errMsg = [];
      if (this.loginForm.get('username')?.invalid) {
        this.errMsg.push('Invalid username pattern.');
      }
      if (this.loginForm.get('password')?.invalid) {
        this.errMsg.push('Invalid password pattern.');
      }
    } else {
      this.errMsg = [];
      const { username, password } = this.loginForm.value;
      this.authService.signIn(username, password).subscribe(
        response => {
          if (response.status === 'SUCCESS') {
            this.authService.storeToken(response.data.token);
            this.router.navigate(['/issued_book']); // Redirect to issued_book after successful login
          }
        },
        error => {
          this.errMsg.push('Invalid credentials or other error.');
        }
      );
    }
  }

}
