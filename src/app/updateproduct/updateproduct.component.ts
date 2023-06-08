import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent {
  id: number = 0;
  public add :any = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    img: new FormControl(''),
  });

  constructor(private productService: ProductService,
    private router : Router,
    private myroute: ActivatedRoute){}

  ngOnInit(): void{
    // this.id = +this.myroute.snapshot.paramMap.get('id');
    const idParam = this.myroute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    console.log('id = ', this.id);
    if(this.id>0){
      this.loadData(this.id);
    }
  }

  public onSubmit(){
    var product: Product = {
      cateId: this.add.get('cate_id')?.value,
      name: this.add.get('name')?.value,
      price: this.add.get('price')?.value,
      img: this.add.get('img')?.value,
      id: 0
    };

    if(this.id>0){
      this.productService.updateProduct(this.id,product as Product).subscribe( (data) => {
        console.log('Cap nhat product' + data);
        this.router.navigate(['/product-manager']);
      });
    } 
    // else {
    //   this.productService.addProduct(product as Product).subscribe( (data) => {
    //     this.router.navigate(['/product-manager']);
    //   });
    // }
  }

  private loadData(id: number){
    this.productService.getProduct(id).subscribe((data)=> {
      for(const control in this.add.controls){
        if(control){
          this.add.controls[control].setValue(data[control]);
        }
      }
    });
  }
}
