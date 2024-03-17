import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlatesService } from '../plates.service';
import { VehicleInfo } from '../vehicle-info';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <img class="listing-photo" [src]="vehicle?.photo">
      <section class="listing-description">
        <h2 class="listing-heading">{{vehicle?.plate}}</h2>
        <p class="listing-location"> {{vehicle?.owner}},  {{vehicle?.fuel}}</p>
      </section>
      <section>
        <h2 class="section-heading">
        Vehicle Specifications:
        </h2>
        <ul>
          <li>
            Fuel : {{vehicle?.fuel}}
          </li>
          <li>
            Responsible Employee :  {{vehicle?.owner}}
          </li>
        </ul>
      </section>
    </article>
      <!-- details works! {{vehicle?.plate}} -->
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  platesService = inject(PlatesService)
  vehicle: VehicleInfo | undefined;
  constructor(){
   const plateNumb = this.route.snapshot.params['plate'];
   this.vehicle = this.platesService.getAllByPlates(plateNumb);
  }
}
