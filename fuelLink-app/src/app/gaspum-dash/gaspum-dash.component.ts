import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-gaspum-dash',
  template: `
    <div class="dashboard">
      <div class="dashboard-content">
        <div class="chart-container">
          <h2 class="heading1" >Gas Pump Diesel Stock</h2>
          <br>
          <canvas id="donutChart"></canvas>
        </div>
        <div class="alerts">
          <h3>Gas Pump Alerts</h3>
          <br>
          <div *ngFor="let alert of alerts2" class="alert" [ngStyle]="{'background-color': alert.color}">
            {{ alert.message }}
          </div>
          <br>
          <div class="pump-table">
          <h3 class="heading" >Pump Movements History
            <button class="download-button" (click)="exportToExcel('pumpHistory')">Download Fuel History</button>
          </h3>
          <br>
          <table>
            <thead>
              <tr>
                <th>Plate</th>
                <th>Gas Pump</th>
                <th>User</th>
                <th>Authorization</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let elem of pumpHistory;">
                <td>{{ elem.plate }}</td>
                <td>{{ elem.thingId}}</td>
                <td> Alice </td>
                <td> Authorized </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        <div class="alerts">
          <h3 class="heading"  >Fuel Movements Alerts</h3>
          <br>
          <div *ngFor="let alert of alerts" class="alert" [ngStyle]="{'background-color': alert.color}">
            {{ alert.message }}
          </div>
          <br>

          <div class="fuel-table">
            <h3>Fuel Movements History              
              <button class="download-button" (click)="exportToExcel('fuelHistory')">Download Fuel History</button>
            </h3>

            <br>

            <table>
              <thead>
                <tr>
                  <th>Liters</th>
                  <th>User</th>
                  <th>Plate</th>
                  <th>Gas Pump</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr #fuelHistoryRow *ngFor="let elem of fuelHistory;let i = index">
                  <td>{{ elem.liters }}</td>
                  <td>{{ elem.username}}</td>
                  <td>{{ elem.plate }}</td>
                  <td>{{ elem.gaspump_id }}</td>
                  <td>{{ elem.date }}</td>
                </tr>
              </tbody>
            </table>
        </div>
        </div>
      </div>
      </div>   

  `,
  imports: [
    CommonModule 
  ],
  standalone: true,
  styleUrls: ['./gaspum-dash.component.css']
})
export class GaspumDashComponent implements OnInit {
  pumpHistory:{ id:string, plate:string, thingId:string}[]=[];
  fuelHistory:{
    isExcessive: boolean; liters:string, user_id:string, date:string, plate:string, gaspump_id:string, username:string
}[]=[];
  excessiveIndices: number[] = [];
  fuelHistoryTable: any;

  // Alerts
  public alerts: any[] = [

  ];
  public alerts2: any[] = [
    { message: 'User John requested to unlock gas pump 1 at the date 2024-05-21', color: '#ffcc00' },
    { message: 'Plate ABC123 arrived to the gas pump', color: '#ff5733' },
    { message: 'User Alice requested to unlock gas pump 2 at the date 2024-05-22', color: '#33cc33' },
    { message: 'Plate XYZ789 arrived to the gas pump', color: '#3399ff' }
  ];

  ngOnInit(): void {
    this.createDonutChart();
    this.fetchMovements();
    this.fetchPump();
  }

  constructor(private http: HttpClient) { }


  createDonutChart() {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Stock', 'Gap'],
        datasets: [{
          label: 'Gas Pump Capacity',
          data: [70, 30],
          backgroundColor: [
            'rgba(255, 140, 0, 0.85)', 
            'rgba(0, 0, 0, 1)' 
          ]
        }]
      }
    });
  }

  

    calculateAverageLiters(): number {
      console.log('All fuel History:', this.fuelHistory);

      // Extracting all liters from fuelHistory
      const allLiters = this.fuelHistory.map(elem => parseFloat(elem.liters));
      console.log('All Liters:', allLiters);
    
      // Calculating total liters
      const totalLiters = allLiters.reduce((acc, curr) => acc + curr, 0);
      console.log('Total Liters:', totalLiters);
    
      // Calculating average
      const average = totalLiters / this.fuelHistory.length;
      console.log('Average:', average);
    
      return average;
    }
  

    async highlightExcessiveConsumption() {
      const average = this.calculateAverageLiters();
      const excessiveIndices: number[] = [];
      for (const [index, elem] of this.fuelHistory.entries()) {
        if (parseFloat(elem.liters) > average + 5) {
          // Ensure we have the correct value of user_id
          const userId = elem.user_id;
          const username = await this.fetchUserName(userId);
          console.log('USER: ' + username);    
          
          // Create a new object to log, including the username
          const elemWithUsername = { ...elem, username };
          
          // Log the element with username
          console.log("elem " + JSON.stringify(elemWithUsername, null, 2));
    
          excessiveIndices.push(index);
          this.alerts.push({
            message: `Excessive fuel consumption detected: ${elem.liters} liters by ${username}`,
            color: '#ff0000'
          });
        }
      }
      this.excessiveIndices = excessiveIndices;

      this.fuelHistory.forEach((elem, index) => {
        elem.isExcessive = excessiveIndices.includes(index);
        console.log('Excessive Indices:', excessiveIndices.includes(index));
      });
    

     
    }
    
      
  fetchPump() {
    const url = 'http://localhost:4200/kafka-communication';
    this.http.get<any>(url).subscribe(
      (response) => {
        console.log("HEYY " + JSON.stringify(response));

        this.pumpHistory = response;
      },
      (error) => {
        console.error('Error fetching Pump Movements:', error);
      }
    );
  }

  fetchMovements() {
    const url = 'http://localhost:4200/fuel-movements';
    this.http.get<any>(url).subscribe(
      (response) => {
        this.fuelHistory = response.data;
        for(let elem of this.fuelHistory){
          this.fetchUserName(elem.user_id).then((username: string) => {
            elem.username = username; 
          });
        }
        this.highlightExcessiveConsumption();

      },
      (error) => {
        console.error('Error fetching Fuel Movements:', error);
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

  exportToExcel(historyType: string) {
    let data: any[] = [];
    let fileName: string = '';
    
    if (historyType === 'pumpHistory') {
      data = this.pumpHistory.map((item) => ({
        Plate: item.plate,
        'Gas Pump': item.thingId,
      }));
      fileName = 'Pump_History.xlsx';
    } else if (historyType === 'fuelHistory') {
      data = this.fuelHistory.map((item) => ({
        Liters: item.liters,
        User: item.username,
        Plate: item.plate,
        'Gas Pump': item.gaspump_id,
        Date: item.date,
      }));
      fileName = 'Fuel_History.xlsx';
    }
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName);
  }
  
  
  
}
