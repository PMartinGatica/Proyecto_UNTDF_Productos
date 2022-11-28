import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProvinceSelectorComponent } from './components/province-selector/province-selector.component';

const routes: Routes = [
  { path: '', component: ProvinceSelectorComponent },
  { path: 'products/:id', component: ProductListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
