import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { IProductDetails } from '../interfaces/IProductDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private baseUrl: string = "./assets/api/"

  constructor(
    private http: HttpClient
  ) { }

  getProductByProvinceUrlAndEan(provinceUrl: string, ean: number): Observable<IProduct | undefined> {
    return this.http.get<IProduct[]>(this.baseUrl + provinceUrl)
      .pipe(
        map((res: any) => {
          res.values.splice(0, 2);
          let products: IProduct[] = res.values.map((value: any) => {
            let aux: IProduct = {
              ean: parseInt(value[0]),
              description: value[1],
              price: parseFloat(value[2].replace(".", "").replace(/[,](?=.*[,])/g, "").replace(",", ".")),
            }
            return aux;
          });
          return products.find(p => p.ean == ean);
        })
      );
  }

  getProductsByProvinceUrl(provinceUrl: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl + provinceUrl)
      .pipe(
        map((res: any) => {
          res.values.splice(0, 2);
          let products: IProduct[] = res.values.map((value: any) => {
            let aux: IProduct = {
              ean: parseInt(value[0]),
              description: value[1],
              price: +parseFloat(value[2].replace(".", "").replace(/[,](?=.*[,])/g, "").replace(",", ".")).toFixed(2),
            }
            return aux;
          });
          return products;
        })
      );
  }

  getProductDetailsByEan(ean: number): Observable<IProductDetails | undefined> {
    return this.http.get("https://world.openfoodfacts.org/api/v0/product/" + ean + ".json")
      .pipe(
        map((productDetails: any) => {
          if (productDetails.status == 0) return undefined;
          let details: IProductDetails = {
            status: Boolean(productDetails.status),
            brands: productDetails.product && productDetails.product.brands ? productDetails.product.brands : "",
            ingredients: productDetails.product && productDetails.product.ingredients ? productDetails.product.ingredients
              .filter((ingredients: any) => { return ingredients.id.includes("es:"); })
              .map((ingredients: any) => { return ingredients.text; }) : [],
            nutriscore: productDetails.product && productDetails.product.nutriscore_grade ? productDetails.product.nutriscore_grade.toUpperCase() : "",
            quantity: productDetails.product && productDetails.product.quantity ? productDetails.product.quantity : "",
            images: {
              imgFrontUrl:
                productDetails.product &&
                  productDetails.product.selected_images &&
                  productDetails.product.selected_images.front &&
                  productDetails.product.selected_images.front.display &&
                  productDetails.product.selected_images.front.display.es ?
                  productDetails.product.selected_images.front.display.es : "",
              imgIngredientsUrl:
                productDetails.product &&
                  productDetails.product.selected_images &&
                  productDetails.product.selected_images.ingredients &&
                  productDetails.product.selected_images.ingredients.display &&
                  productDetails.product.selected_images.ingredients.display.es ?
                  productDetails.product.selected_images.ingredients.display.es : "",
              imgNutritionUrl:
                productDetails.product &&
                  productDetails.product.selected_images &&
                  productDetails.product.selected_images.nutrition &&
                  productDetails.product.selected_images.nutrition.display &&
                  productDetails.product.selected_images.nutrition.display.es ?
                  productDetails.product.selected_images.nutrition.display.es : "",
            }
          }
          return details;
        })
      );
  }
}
