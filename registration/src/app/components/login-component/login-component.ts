import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/userService/user-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {

    console.log('LOGIN CLICKED');

    if (this.loginForm.invalid) {
      console.log('Form invalid');
      return;
    }

    const payload = this.loginForm.value;

    this.user.login(payload).subscribe({
      next: (res: any) => {

        console.log('API RESPONSE:', res); // 🔥 VERY IMPORTANT

        // ✅ Extract token properly (handles different API formats)
        const token =
          res?.token ||
          res?.id ||
          res?.data?.token ||
          res?.data?.id;

        if (token) {
          localStorage.setItem('token', token);

          console.log('Token stored:', token);

          // ✅ Navigate AFTER storing token
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Token not found in response');
        }
      },

      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }

  goToRegistration() {
    this.router.navigate(['/signup']);
  }
}