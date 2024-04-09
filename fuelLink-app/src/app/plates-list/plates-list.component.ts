import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleInfo } from '../vehicle-info';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-plates-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img class="listing-photo" src='/assets/van2.png' alt="Fuel is {{vehicleInfo.fuel}}">
      <h2 class="listing-heading">{{vehicleInfo.plate}}</h2>
      <p class="listing-location"> {{vehicleInfo.fuel}} </p>
      <a [routerLink]="['/details', vehicleInfo.plate]">Learn More</a>
    </section>
  `,
  styleUrls: ['./plates-list.component.css']
})
export class PlatesListComponent {
  @Input() vehicleInfo!: VehicleInfo;
}
