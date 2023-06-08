import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public list: Product[] = [];
  constructor(private productService:ProductService){
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data)=>{
      console.log(this.list);
      this.list = data
    })
  }
  
}