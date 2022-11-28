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

  constructor(
    private productsDataservice: ProductDataService,
    private provinceDataService: ProvincesDataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    try {
      let id = this.route.snapshot.paramMap.get("id");
      if (id) {
        this.provinceId = Number.parseInt(id);
        this.loadSelectedProvince();
      }
    } catch {
      console.log(this.route.snapshot.paramMap.get("id"));
    }
  }

  loadSelectedProvince() {
    this.provinceDataService.getProvinceById(this.provinceId).subscribe(
      (res: IProvince) => {
        if (!res) return;
        this.province = res;
        this.loadAllPrices();
      }
    )
  }

  loadAllPrices() {
    this.productsDataservice.getPricesByProvinceUrl(this.province.url)
      .subscribe((res: IProduct[]) => {
        this.products = res;
        this.productsFiltered = res;
      })
  }

  onSearchInput() {
    if (this.wordFilter.length == 0) {
      this.productsFiltered = this.products;
      return;
    }
    if (this.wordFilter.length < 3) return;
    this.productsFiltered = this.products.filter(product => product.description.toLowerCase().includes(this.wordFilter.toLowerCase()));
  }

  sortByPrice() {
    this.orderDesc = !this.orderDesc;
    if (this.orderDesc) {
      this.productsFiltered = this.productsFiltered.sort((a, b) => {
        return Number.parseFloat(a.price) > Number.parseFloat(b.price) ? 1 : -1;
      })
      return;
    }
    this.productsFiltered = this.productsFiltered.sort((a, b) => {
      return Number.parseFloat(a.price) > Number.parseFloat(b.price) ? -1 : 1;
    })
  }

}
