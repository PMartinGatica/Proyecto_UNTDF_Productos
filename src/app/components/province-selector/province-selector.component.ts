import { Component, OnInit } from '@angular/core';
import { IProvince } from 'src/app/interfaces/IProvince';
import { ProvincesDataService } from 'src/app/services/provinces-data.service';

@Component({
  selector: 'app-province-selector',
  templateUrl: './province-selector.component.html',
  styleUrls: ['./province-selector.component.css']
})
export class ProvinceSelectorComponent implements OnInit {

  selectedProvinceId: number = 0;

  provinces: IProvince[] = [];

  constructor(
    private provinceDataService: ProvincesDataService,
  ) { }

  ngOnInit(): void {
    this.loadProvinces();
  }

  loadProvinces() {
    this.provinceDataService.getProvinces().subscribe(
      (res: IProvince[]) => {
        this.provinces = res;
      }
    )
  }

  onProvinceSelect(target: any) {
    if (!target) return;
    if (!target.id) return;

    this.selectedProvinceId = target.id;
  }
}
