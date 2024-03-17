import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlatesService } from '../plates.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="card-container">
      <section class="listing-apply">
        <h2 class="section-heading">Login</h2>
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
export class LoginComponent {
  platesService = inject(PlatesService)

  applyForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  });

  login(){
    this.platesService.login(
      this.applyForm.value.email ?? '',
      this.applyForm.value.password ?? ''
    );
  }
}
