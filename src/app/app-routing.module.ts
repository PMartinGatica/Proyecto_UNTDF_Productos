import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProvinceSelectorComponent } from './components/province-selector/province-selector.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'province', component: ProvinceSelectorComponent },
  { path: 'products/:provinceId', component: ProductListComponent },
  { path: 'products/:provinceId/:productEan', component: ProductDetailComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
