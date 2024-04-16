import { Component, NgModule, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="dashboard">
  <div class="chart-container right-chart">
    <br>
    <h1>Fuel Consumption Dashboard</h1>
    <br>
    <canvas id="lineChart"></canvas>
    <br>

    <div class="fuel-table">
      <h3>Last Fuel Consumptions</h3>
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
          <tr *ngFor="let elem of fuelHistory;">
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

  <div class="chart-container left-chart">
    <div class="chart-container top-chart">
      <canvas id="barChart"></canvas>
    </div>

    <div class="chart-container bottom-chart">
      <canvas id="donutChart"></canvas>
    </div>
  </div>
</div>
`,
  styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit{
  predictions: { ds: string, yhat: number }[] = [];
  fuelHistory:{ liters:string, user_id:string, date:string, plate:string, gaspump_id:string, username:string}[]=[];
  user:{ user_id: string; username: string; role: string; hash: string}[]=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.fetchPredictions();
    this.fetchMovements();

    //this.createLineChart();
    this.createDonutChart();
    //this.createPointChart();
    this.createBarChart();
  }

  fetchPredictions() {
    const url = 'http://localhost:5000/predict?bucket=bucketName&measurement=measurementName&field=fieldName';
    this.http.get<any>(url).subscribe(
      (response) => {
        this.predictions = response.predictions;
        this.createLineChart();
      },
      (error) => {
        console.error('Error fetching predictions:', error);
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
  
  
  
  
  createLineChart() {
    const labels = this.predictions.map(prediction => prediction.ds);
    const data = this.predictions.map(prediction => prediction.yhat);

    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Fuel Price Prediction',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }

  createDonutChart() {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Gasoline', 'Diesel', 'Electric'],
        datasets: [{
          label: 'Fuel Types',
          data: [30, 20, 50],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ]
        }]
      }
    });
  }

  createPointChart() {
    const ctx = document.getElementById('pointChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Fuel Consumption',
          data: [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 25 },
            { x: 4, y: 30 },
            { x: 5, y: 35 }
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)'
        }]
      }
    });
  }

  createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Fuel Consumption',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }]
      }
    });
  }

}
