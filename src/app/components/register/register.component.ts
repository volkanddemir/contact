import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  selectedUser: any;
  editMode: boolean;
  user: User;
  userId?: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(result => {
      this.userId = result['userId'];
      console.log(result);
      if(this.userId) {
        this.apiService.getUserById(this.userId).subscribe((user: User) => {
          console.log(user)
          this.registerForm.patchValue({

            name: user.name,
            surname: user.surname,
            email: user.email,
            phoneNumber: user.phoneNumber
        })}
      
          )
      }
    })

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    });
  }
                
    // Düzenleme modu için kullanıcı seçimi
  loadUserToForm(userId: string) {
    this.apiService.getUserById(userId).subscribe((result: User) => this.user = result);
    if (this.user) {
      this.editMode = true;
      this.selectedUser = this.user;
      this.registerForm.patchValue(this.user); // Formu mevcut kullanıcı bilgileriyle doldur
    }
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