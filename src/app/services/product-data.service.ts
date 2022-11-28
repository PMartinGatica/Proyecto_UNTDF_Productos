import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private baseUrl: string = "./assets/api/"

  constructor(
    private http: HttpClient
  ) { }

  getPricesByProvinceUrl(provinceUrl: string) {
    return this.http.get<IProduct[]>(this.baseUrl + provinceUrl)
      .pipe(
        map((res: any) => {
          res.values.splice(0, 2);
          let prices = res.values.map((value: any) => {
            let aux: IProduct = {
              ean: value[0],
              description: value[1],
              price: value[2].replace(".", "").replace(/[,](?=.*[,])/g, ""),
            }
            return aux;
          });
          return prices;
        })
      );
  }
}
