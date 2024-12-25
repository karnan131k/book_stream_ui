import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: false,

  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  errMsg: string[] = [];
  loginForm!: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/^[\w\s]+$/)]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')
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
      console.log(this.loginForm.value);
      this.loginForm.reset();
      alert('Login Successfully');
    }
  }

}
