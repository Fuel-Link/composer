import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { DashBoardComponent } from "./dash-board/dash-board.component";
import { AuthGuard } from "./guard/auth.guard";

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
        title: 'Login Page',
        canActivate:[AuthGuard]
    }
    ,
    {
        path: 'signUp',
        component: SignUpComponent,
        title: 'Sign Up Page'
    }
    ,
    {
        path: 'dashboard',
        component: DashBoardComponent,
        title: 'Dashboard Page'
    }
];

export default routeConfig;