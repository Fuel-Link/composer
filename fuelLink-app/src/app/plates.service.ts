import { Injectable } from '@angular/core';
import { VehicleInfo } from './vehicle-info';
@Injectable({
  providedIn: 'root'
})
export class PlatesService {
  protected vehicleList: VehicleInfo[]=[
    {
      "plate": "90-ON-89",
      "owner": "João Diogo",
      "fuel": "Diesel",
      "photo": "/assets/renault.jpg"
    },{
      "plate": "90-10-JK",
      "owner": "Pedro Diogo",
      "fuel": "Gasoline",
      "photo": "/assets/ford.jpg"
    }
  ];
  constructor() { }

  getAllplates(): VehicleInfo[] {
    return this.vehicleList;
  }

  getAllByPlates(plate: string): VehicleInfo | undefined {
    return this.vehicleList.find( vehicleList => vehicleList.plate === plate);
  }

  login(email:string, password:string){
    console.log(email, password);
  }
  signUp(employeeNumber:string,name:string, email:string, password:string){
    console.log(employeeNumber, name,email, password);
  }

}
