import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../models/Product';
import { Router } from '@angular/router';
import { Category } from '../models/Category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent {
  public Form = new FormGroup({
    cate_id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    img: new FormControl(null),
  });
  
  public list: Product[] = [];
  public listCates: Category[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      this.list = data;
    });

    this.categoryService.getCategories().subscribe((data) => {
      console.log(data);
      this.listCates = data;
    });
  }

  public onSubmit(categoryId: number, value: any) {
    const product = {
      cate_id: categoryId,
      name: value.name,
      price: value.price,
      img: value.img
    };
  
    this.productService.addProductByCategory(categoryId, product).subscribe(
      (response) => {
        console.log('Product added successfully', response);
      },
      (error) => {
        console.error('Error adding product', error);
      }
    );
  }
  deleteProduct(id: number) {
    let result = confirm('Bạn có muốn xoá product có id ' + id);
    if (result) {
      this.productService.deleteProduct(id).subscribe((data) => {
        this.productService.getProducts().subscribe((product) => (this.list = product));
        console.log('Employees');
      });
    }
  }

  editProduct(id: any) {
    this.router.navigateByUrl(`editProduct/${id}`);
  }
}






