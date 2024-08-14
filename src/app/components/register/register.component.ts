import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from 'src/app/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private readonly cdRef: ChangeDetectorRef) { // Servisi enjekte edin
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
  }

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

  onSubmit() {
    console.log(this.registerForm.valid);
    if (!this.registerForm.valid) return;

    this.userService.addUser(this.registerForm.value);
    this.cdRef.detectChanges();
    this.router.navigate(['/user-list']);

  }
}
