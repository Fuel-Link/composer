import { Injectable } from '@angular/core';
import { VehicleInfo } from './vehicle-info';

@Injectable({
  providedIn: 'root'
})
export class PlatesService {
  
//   protected vehicleList: VehicleInfo[] = 
// [
//   {
//     "plate": "90-KL-12",
//     "owner": "Sofia Rodrigues",
//     "fuel": "Gasoline",
//     "photo": "/assets/van2.png",
//     "fuelMovements": [
//       {
//         "timestamp": "2024-03-17 09:15:00",
//         "liters": 35,
//         "totalPrice": 70
//       },
//       {
//         "timestamp": "2024-03-16 15:30:00",
//         "liters": 40,
//         "totalPrice": 80
//       }
//     ]
//   }
// ];

protected vehicleList: VehicleInfo[] = []


  constructor() { 
  }



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
