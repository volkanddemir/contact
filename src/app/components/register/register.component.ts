import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';  // ActivatedRoute eklendi
import {UserService} from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {  // OnInit implementasyonu eklendi
  registerForm: FormGroup;
  editMode = false;
  selectedUser: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private readonly cdRef: ChangeDetectorRef,
    private route: ActivatedRoute  // ActivatedRoute eklendi
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // URL'den 'userId' parametresini al ve formu doldur
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId) {
        this.loadUserToForm(userId);  // Kullanıcı bilgilerini formda göster
      }
    });
  }

  // Formdaki inputlara ulaşmak için get fonksiyonları
  get name() {
    return this.registerForm.get('name');
  }

  get surname() {
    return this.registerForm.get('surname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  // Düzenleme modu için kullanıcı seçimi
  loadUserToForm(userId: string) {
    const user = this.userService.getUserById(userId);
    if (user) {
      this.editMode = true;
      this.selectedUser = user;
      this.registerForm.patchValue(user); // Formu mevcut kullanıcı bilgileriyle doldur
    }
  }

  onSubmit() {
    if (!this.registerForm.valid) return;

    if (this.editMode) {
      this.userService.updateUser({ ...this.registerForm.value, id: this.selectedUser.id });
      this.editMode = false;
    } else {
      this.userService.addUser(this.registerForm.value);
    }
    this.router.navigate(['/user-list']);
  }
}