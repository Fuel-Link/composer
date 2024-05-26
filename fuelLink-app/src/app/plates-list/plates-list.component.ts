import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleInfo } from '../vehicle-info';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-plates-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img class="listing-photo" src="/assets/{{vehicleInfo.image}}" alt="Fuel is {{vehicleInfo.fuel}}">
      <h2 class="listing-heading">{{vehicleInfo.plate}}</h2>
      <p class="listing-location">{{vehicleInfo.fuel}}</p>
      <a [routerLink]="['/details', vehicleInfo.plate]">Learn More</a>
    </section>
  `,
  styleUrls: ['./plates-list.component.css']
})
export class PlatesListComponent implements OnInit {
  @Input() vehicleInfo!: VehicleInfo;

  randomImageSrc!: string;

  private imagePaths: string[] = [
    '/assets/van1.png',
    '/assets/van2.png',
    '/assets/van3.png',
    '/assets/van4.png'
  ];

  ngOnInit() {
    this.randomImageSrc = this.getRandomImage();
  }

  private getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
    return this.imagePaths[randomIndex];
  }
}
