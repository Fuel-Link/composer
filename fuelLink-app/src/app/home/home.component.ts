import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatesListComponent } from '../plates-list/plates-list.component';
import { VehicleInfo } from '../vehicle-info';
import { PlatesService } from '../plates.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PlatesListComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by Plate">
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      <app-plates-list *ngFor="let vehicleInfo of vehicleList" [vehicleInfo]="vehicleInfo"></app-plates-list>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  protected vehicleList: VehicleInfo[] = [
    {
      "plate": "90-ON-89",
      "owner": "João Diogo",
      "fuel": "Diesel",
      "photo": "/assets/van2.png",
      "fuelMovements": [
        {
          "timestamp": "2024-03-17 09:00:00",
          "liters": 50,
          "totalPrice": 100
        },
        {
          "timestamp": "2024-03-16 10:30:00",
          "liters": 40,
          "totalPrice": 80
        }
      ]
    },
    {
      "plate": "90-10-JK",
      "owner": "Pedro Diogo",
      "fuel": "Gasoline",
      "photo": "/assets/van2.png",
      "fuelMovements": [
        {
          "timestamp": "2024-03-16 15:45:00",
          "liters": 30,
          "totalPrice": 60
        },
        {
          "timestamp": "2024-03-15 12:20:00",
          "liters": 35,
          "totalPrice": 70
        }
      ]
    },
    {
      "plate": "90-AB-12",
      "owner": "Maria Silva",
      "fuel": "Diesel",
      "photo": "/assets/van2.png",
      "fuelMovements": [
        {
          "timestamp": "2024-03-17 08:00:00",
          "liters": 45,
          "totalPrice": 90
        },
        {
          "timestamp": "2024-03-16 09:30:00",
          "liters": 38,
          "totalPrice": 76
        }
      ]
    },
    {
      "plate": "90-CD-34",
      "owner": "Ana Costa",
      "fuel": "Diesel",
      "photo": "/assets/van2.png",
      "fuelMovements": [
        {
          "timestamp": "2024-03-17 10:15:00",
          "liters": 55,
          "totalPrice": 110
        },
        {
          "timestamp": "2024-03-16 11:45:00",
          "liters": 42,
          "totalPrice": 84
        }
      ]
    },
    {
      "plate": "90-EF-56",
      "owner": "José Santos",
      "fuel": "Gasoline",
      "photo": "/assets/van2.png",
      "fuelMovements": [
        {
          "timestamp": "2024-03-17 09:30:00",
          "liters": 25,
          "totalPrice": 50
        },
        {
          "timestamp": "2024-03-16 12:00:00",
          "liters": 30,
          "totalPrice": 60
        }
      ]
    },
    {
      "plate": "90-GH-78",
      "owner": "Marta Oliveira",
      "fuel": "Diesel",
      "photo": "/assets/van2.png",
      "fuelMovements": [
        {
          "timestamp": "2024-03-17 11:00:00",
          "liters": 60,
          "totalPrice": 120
        },
        {
          "timestamp": "2024-03-16 13:20:00",
          "liters": 50,
          "totalPrice": 100
        }
      ]
    },
    {
      "plate": "90-IJ-90",
      "owner": "Ricardo Almeida",
      "fuel": "Diesel",
      "photo": "/assets/van2.png",
      "fuelMovements": [
        {
          "timestamp": "2024-03-17 10:45:00",
          "liters": 55,
          "totalPrice": 110
        },
        {
          "timestamp": "2024-03-16 14:15:00",
          "liters": 48,
          "totalPrice": 96
        }
      ]
    },
    {
      "plate": "90-KL-12",
      "owner": "Sofia Rodrigues",
      "fuel": "Gasoline",
      "photo": "/assets/van2.png",
      "fuelMovements": [
        {
          "timestamp": "2024-03-17 09:15:00",
          "liters": 35,
          "totalPrice": 70
        },
        {
          "timestamp": "2024-03-16 15:30:00",
          "liters": 40,
          "totalPrice": 80
        }
      ]
    }
  ];
  
  platesService : PlatesService = inject (PlatesService);

  constructor(){
    this.vehicleList = this.platesService.getAllplates();
  }
}
 