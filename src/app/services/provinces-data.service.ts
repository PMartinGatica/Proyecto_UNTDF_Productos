import { provideCloudflareLoader } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvincesDataService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = "./assets/api/"

  getProvinces() {
    return this.http.get(this.baseUrl + 'provincias.json').pipe(
      map((res: any) => {
        let provinces = res.map((prov: any) => {
          let aux = this.provinceTransform(prov);
          return aux;
        })
        return provinces;
      })
    );
  }

  getProvinceById(id: number) {
    return this.http.get(this.baseUrl + 'provincias.json')
      .pipe(
        map((provinces: any) => {
          let provinceResult = null;
          for (let province of provinces) {
            if (province.id == id) {
              provinceResult = this.provinceTransform(province);
              break;
            }
          }
          return provinceResult;
        })
      );
  }

  private provinceTransform(province: any) {
    let provinceResult = province;
    provinceResult.url = province.api;
    provinceResult.name = province.nombre;
    delete provinceResult.api;
    delete provinceResult.nombre;
    return provinceResult;
  }

}
