import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';
import { IProvince } from 'src/app/interfaces/IProvince';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProvincesDataService } from 'src/app/services/provinces-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  province: IProvince;

  private provinceId: number;

  products: IProduct[] = [];

  productsFiltered: IProduct[] = [];

  wordFilter: string = "";

  orderDesc: boolean = false;

  itemsPerPage: number = 20;

  currentPage: number = 1;

  minPrice: number = 0;

  maxPrice: number = 0;

  eanRegex: RegExp;

  constructor(
    private productsDataservice: ProductDataService,
    private provinceDataService: ProvincesDataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.eanRegex = new RegExp("^\\d{13}$");
    try {
      let id = this.route.snapshot.paramMap.get("provinceId");
      if (id) {
        this.provinceId = Number.parseInt(id);
        this.loadSelectedProvince();
      }
    } catch {
      console.log(this.route.snapshot.paramMap.get("provinceId"));
    }
  }

  onSearchInput() {
    this.doFiltersAndSorts();
  }

  changeSortOrder() {
    this.orderDesc = !this.orderDesc;
    this.doFiltersAndSorts();
  }

  onMinPriceInput(input: any) {
    if (input.value == "") {
      this.minPrice = 0;
      this.doFiltersAndSorts();
      return;
    }

    this.minPrice = parseInt(input.value);
    this.doFiltersAndSorts();
  }

  onMaxPriceInput(input: any) {
    if (input.value == "") {
      this.maxPrice = 0;
      this.doFiltersAndSorts();
      return;
    }

    this.maxPrice = parseInt(input.value);
    this.doFiltersAndSorts();
  }

  goBack() {
    window.history.back();
  }

  private doFiltersAndSorts() {
    this.filterByTerm();
    this.filterByPrice();
    this.sortByPrice();
  }

  private filterByPrice() {
    if (this.minPrice == 0 && this.maxPrice == 0) return;
    if (this.minPrice > this.maxPrice && this.maxPrice != 0) return;

    if (this.minPrice == 0) {
      this.productsFiltered = this.productsFiltered.filter(product => product.price <= this.maxPrice);
      return;
    }
    if (this.maxPrice == 0) {
      this.productsFiltered = this.productsFiltered.filter(product => product.price >= this.minPrice);
      return;
    }
    this.productsFiltered = this.productsFiltered.filter(product => product.price >= this.minPrice && product.price <= this.maxPrice);
  }

  private sortByPrice() {
    if (!this.orderDesc) {
      this.productsFiltered = this.productsFiltered.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
      return;
    }

    if (this.orderDesc) {
      this.productsFiltered = this.productsFiltered.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    }
  }

  private filterByTerm() {
    if (this.wordFilter == "") {
      this.productsFiltered = this.products;
      return;
    }
    if (this.eanRegex.test(this.wordFilter)) {
      this.productsFiltered = this.products.filter(product => product.ean == parseInt(this.wordFilter));
      return;
    }
    this.productsFiltered = this.products.filter(product => product.description.toLowerCase().includes(this.wordFilter.toLowerCase()));
  }

  private loadSelectedProvince() {
    this.provinceDataService.getProvinceById(this.provinceId).subscribe(
      (res: IProvince) => {
        if (!res) return;
        this.province = res;
        this.loadAllProducts();
      }
    )
  }

  private loadAllProducts() {
    this.productsDataservice.getProductsByProvinceUrl(this.province.url)
      .subscribe((res: IProduct[]) => {
        this.products = res;
        this.productsFiltered = res;
      })
  }
}
