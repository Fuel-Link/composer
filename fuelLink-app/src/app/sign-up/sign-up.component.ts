import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlatesService } from '../plates.service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
  <div class="card-container">
        <section class="listing-apply">
          <h2 class="section-heading">Sign Up</h2>
          <form [formGroup]="signUpForm" (submit)="signUp()">
            <label for="employeeNumber">Employee Number</label>
            <input id="employeeNumber" type="number" formControlName="employeeNumber">

            <label for="name">Name</label>
            <input id="name" type="name" formControlName="name">

            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email">

            <label for="password">Password</label>
            <input id="password" type="password" formControlName="password">
            <button type="submit" class="primary" [routerLink]="['/']">Sign Up</button>

            
          </form>
          <a [routerLink]="['/']">Login</a>
        </section>
      </div>
  `,
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  platesService = inject(PlatesService)


  signUpForm = new FormGroup({
    employeeNumber : new FormControl(''),
    name : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl('')
  });

  signUp(){
    this.platesService.signUp(
      this.signUpForm.value.employeeNumber ?? '',
      this.signUpForm.value.email ?? '',
      this.signUpForm.value.name ?? '',
      this.signUpForm.value.password ?? ''
    );
  }
}
