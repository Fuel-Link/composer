import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routeConfig: Routes = [
    {
        path: 'vehicles',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'details/:plate',
        component: DetailsComponent,
        title: 'Details Page'
    }
    ,
    {
        path: '',
        component: LoginComponent,
        title: 'Login Page'
    }
    ,
    {
        path: 'signUp',
        component: SignUpComponent,
        title: 'Sign Up Page'
    }
];

export default routeConfig;