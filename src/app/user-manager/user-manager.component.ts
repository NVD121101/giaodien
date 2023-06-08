import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../models/User';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent {
  public list: User[] = [];
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getProducts().subscribe((data) => {
      console.log(data);
      this.list = data;
    });
  }
}
