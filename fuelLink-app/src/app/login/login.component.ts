import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PlatesService } from '../plates.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KeycloakOperationService } from '../services/keycloak.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  template: `
    <div class="card-container">
      <section class="listing-apply">
        <h2 class="section-heading">Login</h2>
        <div *ngIf="content">
          <!-- Display the content here -->
          <p>{{ content }}</p>
        </div>
        <form [formGroup]="applyForm">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">

          <label for="password">Password</label>
          <input id="password" type="password" formControlName="password">
          <button type="submit" class="primary" [routerLink]="['/vehicles']">Login</button>
        </form>
        <a [routerLink]="['/signUp']">Sign Up</a>
      </section>
    </div>


  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userProfile: any | null = null;
  content: any;

  constructor(
    private keyCloakService: KeycloakOperationService,
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }
  

  ngOnInit() {
    this.fetchContent();
    this.keyCloakService.getUserProfile().then((data: any) => {
      this.userProfile = data;
      console.table(this.userProfile);
    });
  }

 

  logout() {
    this.keyCloakService.logout();
  }

  fetchContent() {
    this.http.get('http://localhost:8080/').subscribe(
      (data: any) => {
        this.content = data;
      },
      (error: any) => {
        console.error('Error fetching content:', error);
      }
    );
  }

  platesService = inject(PlatesService)

  applyForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

}
