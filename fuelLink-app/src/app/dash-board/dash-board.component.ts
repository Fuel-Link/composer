import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule],
  template: `
 <div class="dashboard">
  
      <div class="chart-container right-chart">
      <br>
      <h1> Fuel Consumption Dashboard </h1>
      <br>
        <canvas id="lineChart"></canvas>
        <br>
 
        <div class="fuel-table">
        <h3>Last Fuel Consumptions</h3>
        <br>

        <table>
          <thead>
            <tr>
              <th>Fuel</th>
              <th>Employee Name</th>
              <th>Total Value</th>
              <th>Plate Car</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Diesel</td>
              <td>John Doe</td>
              <td>$100</td>
              <td>AB-C1-23</td>
            </tr>
            <tr>
              <td>Gasoline</td>
              <td>Jane Smith</td>
              <td>$80</td>
              <td>XY-Z4-56</td>
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
  constructor() { }

  ngOnInit(): void {
    this.createLineChart();
    this.createDonutChart();
    this.createPointChart();
    this.createBarChart();
  }

  createLineChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Fuel Consumption',
          data: [65, 59, 80, 81, 56, 55, 40],
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
