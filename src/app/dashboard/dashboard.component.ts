import {Component, OnInit} from "@angular/core";
import { HeroService } from '../services/hero.service';
import {Hero} from "../hero";

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.sass' ]
})

export class DashboardComponent implements OnInit{
    heroes: Hero[] = [];
    constructor( private heroService: HeroService){}

    ngOnInit(){
        this.heroService.getHeroes()
            .then( heroes => this.heroes = heroes.slice(1,5))
    }
}