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
    <article style="padding: 10%;">
      <img class="listing-photo" [src]="vehicle?.photo">
      <section class="listing-description" >
        <h2 class="listing-heading">{{vehicle?.plate}}</h2>
        <p class="listing-location"> {{vehicle?.owner}},  {{vehicle?.fuel}}</p>
      </section>
      <section>
        <h2 class="section-heading">
        Vehicle Specifications:
        </h2>
        <br>
        <ul>
          <li>
            <b> Fuel : </b> {{vehicle?.fuel}}
          </li>
          <li>
           <b> Responsible Employee :  </b> {{vehicle?.owner}}
          </li>
        </ul>
        <br>
        <h2 class="section-heading">
          Last Fuel Movements:
        </h2>
        <table class="table-fuel-movements">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Number of Liters</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let movement of vehicle?.fuelMovements">
              <td>{{ movement.timestamp }}</td>
              <td>{{ movement.liters }}</td>
              <td>{{ movement.totalPrice }}</td>
            </tr>
          </tbody>
        </table>

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
