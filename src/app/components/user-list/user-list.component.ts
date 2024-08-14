import {Component} from '@angular/core';
import {UserService} from 'src/app/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  constructor(protected userService: UserService) {
  }


}
