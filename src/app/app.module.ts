import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {Routes, RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";

import {InMemoryWebApiModule} from "angular-in-memory-web-api";

import {HeroService} from "./services/hero.service";
import {InMemoryDataService} from "./services/in-memory-data.service";

import { HeroesComponent}   from './heroesList/heroes.component';
import {HeroDetail} from "./hero-detail/hero-detail.component";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroSearchComponent} from "./hero-search/hero-search.component";


const appRoutes: Routes = [
    { path: 'heroes', component: HeroesComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetail },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]

@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes),
                    HttpModule, InMemoryWebApiModule.forRoot(InMemoryDataService)],
    declarations: [ AppComponent, HeroesComponent, HeroDetail, DashboardComponent, HeroSearchComponent ],
    providers: [ HeroService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }