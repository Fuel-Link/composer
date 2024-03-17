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
      <app-plates-list *ngFor="let vehicleInfo of vehiclesInfoList" [vehicleInfo]="vehicleInfo"></app-plates-list>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  vehiclesInfoList : VehicleInfo[] = [{
    "plate": "90-ON-89",
    "owner": "João Diogo",
    "fuel": "Diesel",
    "photo": "/assets/renault.jpg"
  },{
    "plate": "90-10-JK",
    "owner": "Pedro Diogo",
    "fuel": "Gasoline",
    "photo": "/assets/ford.jpg"
  }];

  platesService : PlatesService = inject (PlatesService);

  constructor(){
    this.vehiclesInfoList = this.platesService.getAllplates();
  }
}
 