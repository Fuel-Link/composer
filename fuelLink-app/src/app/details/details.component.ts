import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlatesService } from '../plates.service';
import { FuelMovement, VehicleInfo } from '../vehicle-info';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article style="padding: 10%;">
      <img class="listing-photo" src='/assets/van2.png'>
      <section class="listing-description" >
        <h2 class="listing-heading">{{vehicle[0]?.plate}}</h2>
        <p class="listing-location"> {{vehicle[0]?.fuel}}</p>
      </section>
      <section>
        <h2 class="section-heading">
        Vehicle Specifications:
        </h2>
        <br>
        <ul>
          <li>
            <b> Fuel : </b> {{vehicle[0]?.fuel}}
          </li>
          <br>
          <li>
            <b> Brand : </b> {{vehicle[0]?.brand}}
          </li>
          <br>
          <li>
            <b> Model : </b> {{vehicle[0]?.model}}
          </li>
          <br>
          <li>
            <b> Color : </b> {{vehicle[0]?.color}}
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
              <th>Gas Pump</th>
              <th>Employee</th>
            </tr>
            <tr *ngFor="let item of movements">
              <td>{{item?.date}}</td>
              <td>{{item?.liters}}</td>
              <td>{{item?.gaspump_id}}</td>
              <td>{{item?.username}}</td>
            </tr> 
          </thead>
          <tbody>
          </tbody>
        </table>

      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  platesService = inject(PlatesService)
  vehicle: any;
  movements:any[]=[];

  constructor(private http: HttpClient){
   const plateNumb = this.route.snapshot.params['plate'];
   this.loadInfo(plateNumb);
   this.loadMovements(plateNumb);
  }

  loadInfo(plate: string){
    
    this.http.get<any>('http://localhost:4200/vehicle-info/plate?plate='+ plate).subscribe((response) => {
      console.log("Response from server:", response); 
      if (Array.isArray(response) && response.length > 0) {
        this.vehicle = response.map((item: any) => ({
          id: item.id,
          plate: item.plate,
          fuel: item.fuel,
          type: item.type,
          model: item.model,
          brand: item.brand,
          color: item.color
        }));

        console.log(this.vehicle);
      } else {
        console.error("Unexpected response structure:", response);
      }
    }, (error) => {
      console.error("Error from server:", error);
    });
    
    
  }

  loadMovements(plate: string){
    this.http.get<any>('http://localhost:4200/fuel-movements/plate?plate='+ plate)
      .subscribe(
        (response) => {
          console.log("DATA", response);   
          // Assuming response is an array of objects
          for (const item of response) {
            this.movements.push(item);
          }
          for(let elem of this.movements){
            this.fetchUserName(elem.user_id).then((username: string) => {
              elem.username = username; 
            });
          }
          console.log("MOVEMENTS", this.movements);   
        },
        (error) => {
          console.error('Error fetching movements:', error);
        }
      );    
  }
  
  
  fetchUserName(id: string): Promise<string> {
    const url = 'http://localhost:4200/users/id?id=' + id;
    return new Promise((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
          console.log('Response data:', response); // Print response.data
          if (response && Array.isArray(response) && response.length > 0) {
            const username = response[0].username;
            resolve(username);
          } else {
            console.error('No data found or data is not an array or empty.');
            reject('No data found or data is not an array or empty.');
          }
        },
        (error) => {
          console.error('Error fetching Username:', error);
          reject(error);
        }
      );
    });
  }
  
  

}
