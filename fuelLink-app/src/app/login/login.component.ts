import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PlatesService } from '../plates.service';
import { AuthService } from '../auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
        <form [formGroup]="applyForm" (submit)="login()">
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
  content: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }
  

  ngOnInit() {
    this.fetchContent();
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

  login() {
    if (this.applyForm.invalid) {
      return;
    }

    this.authService.login(this.applyForm.value.email, this.applyForm.value.password)
      .subscribe(
        (data) => {
          // Handle successful login response here
          console.log(data);
          // Redirect to another page upon successful login
          this.router.navigate(['/vehicles']);
        },
        (error) => {
          // Handle login error here
          console.error('Login error:', error);
          // You can display an error message to the user here
        }
      );
  }
}
