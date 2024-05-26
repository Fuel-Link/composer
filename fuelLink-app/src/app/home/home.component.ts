import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatesListComponent } from '../plates-list/plates-list.component';
import { VehicleInfo } from '../vehicle-info';
import { PlatesService } from '../plates.service';
import { HttpClient } from '@angular/common/http';


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
  
  protected vehicleList: VehicleInfo[] = []

  platesService : PlatesService = inject (PlatesService);

  constructor(private http: HttpClient){
    this.fetchVehicles();
  }

  fetchVehicles() {
    const url = 'http://grupo1-egs-deti.ua.pt/backend/vehicle-info';
    this.http.get<any>(url).subscribe(
      (response) => {
        this.vehicleList = response.data;
        console.log(this.vehicleList);
      },
      (error) => {
        console.error('Error fetching Vehicles:', error);
      }
    );
  }

  getAllByPlates(plate: string): VehicleInfo | undefined {
    return this.vehicleList.find( vehicleList => vehicleList.plate === plate);
  }

}
 