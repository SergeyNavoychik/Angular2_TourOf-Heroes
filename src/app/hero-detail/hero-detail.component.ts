import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {ActivatedRoute, Params} from "@angular/router";
import {HeroService} from "../services/hero.service";
import 'rxjs/add/operator/switchMap';
import {Location} from "@angular/common";

@Component({
    selector: 'hero-detail',
    templateUrl: 'hero-detail.component.html'
})

export class HeroDetail implements OnInit{
    hero: Hero;

    constructor(
        private activatedRoute: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ){

    }
    ngOnInit(){
        this.activatedRoute.params
            .switchMap(( params: Params ) => this.heroService.getHero(+params['id']))
            .subscribe( hero => this.hero = hero)
    }
    goBack(): void{
        this.location.back();
    }
    save(): void{
        this.heroService.update(this.hero)
            .then( () => this.goBack() )
    }
}