import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  public Form = new FormGroup({
    name: new FormControl(''),
  });
  public listCates: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.listCates = data;
      console.log(this.listCates);
      
    });
  }
  
  public onSubmit(value: any) {
    const cate = {};
    this.Form.get('name')?.setValue('');
    this.categoryService.addCategory(value).subscribe((data) => {});
  }
}
