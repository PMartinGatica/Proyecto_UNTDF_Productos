import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';
import { IProductDetails } from 'src/app/interfaces/IProductDetails';
import { IProvince } from 'src/app/interfaces/IProvince';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProvincesDataService } from 'src/app/services/provinces-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  provinceId: number;

  province: IProvince;

  productEan: number;

  product: IProduct;

  productDetails: IProductDetails;

  constructor(
    private route: ActivatedRoute,
    private productsDataService: ProductDataService,
    private provinceDataService: ProvincesDataService,
  ) { }

  ngOnInit(): void {
    try {
      let provinceId = this.route.snapshot.paramMap.get("provinceId");
      let productEan = this.route.snapshot.paramMap.get("productEan");
      if (provinceId && productEan) {
        this.provinceId = Number.parseInt(provinceId);
        this.productEan = Number.parseInt(productEan);
        this.loadProvince();
      }
    } catch {
      console.log(this.route.snapshot.paramMap.get("provinceId"));
      console.log(this.route.snapshot.paramMap.get("productEan"));
    }
  }

  loadProvince() {
    this.provinceDataService.getProvinceById(this.provinceId)
      .subscribe(
        (res: IProvince) => {
          if (!res) return;
          this.province = res;
          this.loadProduct();
        }
      );
  }

  loadProduct() {
    this.productsDataService.getProductByProvinceUrlAndEan(this.province.url, this.productEan)
      .subscribe(
        (res: IProduct | undefined) => {
          if (!res || res == undefined) return;
          this.product = res;
          this.loadProductDetails();
        }
      );
  }

  loadProductDetails() {
    this.productsDataService.getProductDetailsByEan(this.productEan)
      .subscribe(
        (res: IProductDetails | undefined) => {
          if (!res || res == undefined) return;
          this.productDetails = res;
        }
      );
  }

  goBack() {
    window.history.back();
  }

}
