import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { DashBoardComponent } from "./dash-board/dash-board.component";
import { AuthGuard } from "./guard/auth.guard";
import { GaspumDashComponent } from "./gaspum-dash/gaspum-dash.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page',
        canActivate:[AuthGuard]
    },
    {
        path: 'details/:plate',
        component: DetailsComponent,
        title: 'Details Page'
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
    ,
    {
        path: 'gaspumpDash',
        component: GaspumDashComponent,
        title: 'Gas Pump Dashboard Page'
    }
];

export default routeConfig;