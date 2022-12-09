import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProvinceSelectorComponent } from './components/province-selector/province-selector.component';
import { ProductDataService } from './services/product-data.service';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ProvinceSelectorComponent,
    ProductListComponent,
    FooterComponent,
    ProductDetailComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxBarcode6Module,
    FormsModule,
  ],
  providers: [ProductDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
