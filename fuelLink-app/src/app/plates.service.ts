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
        "photo": "/assets/van2.png"
      },
      {
        "plate": "90-10-JK",
        "owner": "Pedro Diogo",
        "fuel": "Gasoline",
        "photo": "/assets/van2.png"
      },
      {
        "plate": "90-AB-12",
        "owner": "Maria Silva",
        "fuel": "Diesel",
        "photo": "/assets/van2.png"
      },
      {
        "plate": "90-CD-34",
        "owner": "Ana Costa",
        "fuel": "Diesel",
        "photo": "/assets/van2.png"
      },
      {
        "plate": "90-EF-56",
        "owner": "José Santos",
        "fuel": "Gasoline",
        "photo": "/assets/van2.png"
      },
      {
        "plate": "90-GH-78",
        "owner": "Marta Oliveira",
        "fuel": "Diesel",
        "photo": "/assets/van2.png"
      },
      {
        "plate": "90-IJ-90",
        "owner": "Ricardo Almeida",
        "fuel": "Diesel",
        "photo": "/assets/van2.png"
      },
      {
        "plate": "90-KL-12",
        "owner": "Sofia Rodrigues",
        "fuel": "Gasoline",
        "photo": "/assets/van2.png"
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
