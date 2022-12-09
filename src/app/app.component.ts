import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Precios Justos';

  provincesAndCodes: { id: string, provinceCode: string }[] =
    [
      { id: "Catamarca", provinceCode: '4%20Catamarca' },
      {
        id: "Chaco", provinceCode: "5%20Chaco"
      },
      {
        id: "Chubut", provinceCode: "6%20Chubut"
      },
      {
        id: "Corrientes", provinceCode: "8%20Corrientes"
      },
      {
        id: "Córdoba", provinceCode: "7%20C%C3%B3rdoba"
      },
      {
        id: "Entre Ríos", provinceCode: ""
      },
      {
        id: "Formosa", provinceCode: ""
      },
      {
        id: "Jujuy", provinceCode: ""
      },
      {
        id: "La Pampa", provinceCode: ""
      },
      {
        id: "La Rioja", provinceCode: ""
      },
      {
        id: "Mendoza", provinceCode: ""
      },
      {
        id: "Misiones", provinceCode: ""
      },
      {
        id: "Neuquén", provinceCode: ""
      },
      {
        id: "Provincia de Buenos Aires (excepto AMBA)", provinceCode: ""
      },
      {
        id: "Río Negro", provinceCode: ""
      },
      {
        id: "Salta", provinceCode: ""
      },
      {
        id: "San Juan", provinceCode: ""
      },
      {
        id: "San Luis", provinceCode: ""
      },
      {
        id: "Santa Cruz", provinceCode: ""
      },
      {
        id: "Santa Fe", provinceCode: ""
      },
      {
        id: "Santiago del Estero", provinceCode: ""
      },
      {
        id: "Tierra del Fuego, Antártida e Islas del Atlántico Sur", provinceCode: ""
      },
      {
        id: "Tucumán", provinceCode: ""
      },
      {
        id: "Área Metropolitana de Buenos Aires (AMBA)", provinceCode: ""
      },
    ]
}