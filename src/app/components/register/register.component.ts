import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: User = this.registerForm.value;

      this.apiService.addUser(newUser).subscribe({
        next: (user) => {
          console.log('Kullanıcı başarıyla eklendi:', user);
          this.router.navigate(['/user-list']);
        },
        error: (err) => {
          console.error('Kullanıcı eklenirken bir hata oluştu:', err);
        }
      });
    }
  }
}
