import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  id: number = 0;
  public add :any = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(private userService: UserService,
    private router : Router,
    private myroute: ActivatedRoute){}

  ngOnInit(): void{
    const idParam = this.myroute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    console.log('id = ', this.id);
    if(this.id>0){
      this.loadData(this.id);
    }
  }

  public onSubmit(){
    var user: User = {
      id: 0,
      name: this.add.get('name')?.value,
      email: this.add.get('email')?.value,
      password: this.add.get('password')?.value,
      phone: this.add.get('phone')?.value,
      address: this.add.get('address')?.value,
    };
    if(this.id>0){
      this.userService.updateUser(this.id,user as User).subscribe( (data) => {
        console.log('Cap nhat product' + data);
        this.router.navigate(['/product-manager']);
      });
    } else {
      this.userService.addPUser(user as User).subscribe( (data) => {
        this.router.navigate(['/product-manager']);
      });
    }
  }

  private loadData(id: number){
    this.userService.getUser(id).subscribe((data)=> {
      for(const control in this.add.controls){
        if(control){
          this.add.controls[control].setValue(data[control]);
        }
      }
    });
  }
}
