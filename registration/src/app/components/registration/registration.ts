import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../service/userService/user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class RegistrationComponent {

  registerForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      service: ['advance']
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // 🔥 Show error while user interacts
  showFieldError(field: string) {
    const control = this.registerForm.get(field);

    if (control && control.touched && control.invalid) {

      if (control.errors?.['required']) {
        this.snackBar.open(`${field} is required`, 'Close', { duration: 2000 });
      }

      if (control.errors?.['email']) {
        this.snackBar.open('Invalid email format', 'Close', { duration: 2000 });
      }

      if (control.errors?.['pattern']) {
        this.snackBar.open(
          'Password must contain uppercase, lowercase, number (min 8 chars)',
          'Close',
          { duration: 3000 }
        );
      }
    }
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.snackBar.open('Please fill all fields correctly', 'Close', {
        duration: 3000
      });
      return;
    }

    const data = this.registerForm.value;

    if (data.password !== data.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', {
        duration: 3000
      });
      return;
    }

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      service: "advance"
    };

    this.user.register(payload).subscribe({
      next: (res: any) => {
        console.log('Success:', res);

        this.snackBar.open('Registration Successful', 'Close', {
          duration: 3000
        });

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);

        this.snackBar.open('Registration Failed', 'Close', {
          duration: 3000
        });
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}

