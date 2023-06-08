import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListManagerComponent } from './list-manager/list-manager.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { CategoryComponent } from './category/category.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {path: '', component :ProductComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: ListManagerComponent},
  {path: 'product-manager', component: ProductManagerComponent},
  {path: 'category-manager', component: CategoryComponent},
  {path: 'user-management', component: UserManagerComponent},
  { path: 'editProduct/:id', component: UpdateproductComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: [
    UserManagerComponent,
    // Other declarations
  ],
})
export class AppRoutingModule { }
