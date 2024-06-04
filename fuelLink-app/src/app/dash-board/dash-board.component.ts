import { Component, NgModule, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'chartjs-adapter-date-fns';


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

  </div>

 <div class="chart-container left-chart">
  <head>
  <title>Decision</title>

  </head>
 <h1 class="warning-message" >Considering the current fuel prices and future predictions, you should {{this.decision}} your order.</h1>
  </div> 
</div>
`,
  styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit{
  predictions: { ds: string, yhat: number }[] = [];
  fuelHistory:{ liters:string, user_id:string, date:string, plate:string, gaspump_id:string, username:string}[]=[];
  user:{ user_id: string; username: string; role: string; hash: string}[]=[];
  pumpHistory:{ id:string, plate:string, thingId:string}[]=[];
  pastData: any[] = [];
  futureData: any[] = [];
  constructor(private http: HttpClient) { }
  decision:string = '';


  ngOnInit(): void {
    this.fetchPredictions();
    this.fetchMovements();
    this.fetchPump();
    //this.createLineChart();
    this.createDonutChart();
    //this.createPointChart();
    this.createBarChart();
  }

  fetchPredictions() {
    const orgName = 'Fuel-Link';
    const authToken = '8b3913f589e0c1fd1781bee81820f695d54d6bb5';
    const influxDBToken = 'iksE8XCfackxW6MDsxSiOeneEAhrSjvXkFOPpkGpZaTxhE0xhlaC-H1_6ikGJ7hK3kN7OmmdU8JFFNrG2my0Kg==';
    const days = 7;
  
    const params = new HttpParams()
      .set('org', orgName)
      .set('authToken', authToken)
      .set('token', influxDBToken)
      .set('days', days.toString()); // Convert days to string as HttpParams expects strings
  
    const url = 'http://grupo1-egs-deti.ua.pt/market-analysis/predict';
  
    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        this.predictions = response.predictions;
        this.decision = response.decision;
        //console.log(this.predictions);
  
        // Split the data into past and future datasets
        const currentDate = new Date();
        this.pastData = this.predictions.filter((d: any) => new Date(d.ds) < currentDate);
        this.futureData = this.predictions.filter((d: any) => new Date(d.ds) >= currentDate);
  
        this.createLineChart();
      },
      (error) => {
        console.error('Error fetching predictions:', error);
      }
    );
  }
  
      
  fetchPump() {
    const url = 'http://grupo1-egs-deti.ua.pt/backend/kafka-communication';
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
    const url = 'http://grupo1-egs-deti.ua.pt/backend/fuel-movements';
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
    const url = 'http://grupo1-egs-deti.ua.pt/backend/users/id?id=' + id;
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
    const pastLabels = this.pastData.map(data => data.ds);
    const pastData = this.pastData.map(data => data.yhat);
  
    const futureLabels = this.futureData.map(data => data.ds);
    const futureData = this.futureData.map(data => data.yhat);
  
    // Combine past and future data
    const combinedLabels = pastLabels.concat(futureLabels);
    const combinedData = pastData.concat(futureData);
  
    // Check if labels and data lengths match
    if (combinedLabels.length !== combinedData.length) {
      console.error('Labels and data lengths do not match:', combinedLabels.length, combinedData.length);
      return;
    }
  
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: combinedLabels.map(label => new Date(label)),
        datasets: [
          {
            label: 'Past Data',
            data: pastData,
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
            spanGaps: true
          },
          {
            label: 'Future Predictions',
            data: futureData,
            fill: false,
            borderColor: 'red',
            tension: 0.1,
            spanGaps: true
          }
        ]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'll',
              displayFormats: {
                day: 'MMM d'
              }
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    });
  }
  createLineChart1() {
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
