import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<main>
  <header class="brand-name">
    <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
    <div class="menu">
      <button class="menu-button" (click)="toggleDropdown()">Menu</button>
      <div class="dropdown-content" [class.show]="dropdownVisible">
        <a *ngFor="let option of menuOptions" [href]="option.path">{{ option.name }}</a>
      </div>
    </div>
  </header>
  <section class="content">
    <router-outlet></router-outlet>
  </section>
</main>

`,
  styleUrls: ['./app.component.css'],
  imports:[HomeComponent, RouterModule, HttpClientModule, CommonModule]
})
export class AppComponent implements OnInit {
  title = 'FuelLink';
  dropdownVisible = false;
  currentRoute: string;
  menuOptions: { name: string, path: string }[];

  constructor(private router: Router) {
    this.currentRoute = '';
    this.menuOptions = [];
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.updateMenuOptions();
      }
    });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  updateMenuOptions() {
    const allOptions = [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Gas Pump Management', path: '/gas-pump-management' },
      { name: 'Fleet Management', path: '/' }
    ];

    this.menuOptions = allOptions.filter(option => option.path !== this.currentRoute);
  }

}
