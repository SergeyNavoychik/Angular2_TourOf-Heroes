import {Component, OnInit} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../services/hero.service";
import {Router} from "@angular/router";
import {Response} from "@angular/http";

@Component({
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    /*encapsulation: ViewEncapsulation.None, css styles not only for component*/
    styleUrls: ['heroes.sass']
})
export class HeroesComponent implements OnInit{
    heroes: Hero[];
    title: string = 'Tour Of Heroes';
    selectedHero: Hero;
    newHero: string = '';
    constructor( private heroService: HeroService,
                 private router: Router){

    }
    addHero(heroName: string): void{
        if(!heroName.trim()) { return; }
        this.heroService.create(heroName)
            .then( hero => {
                this.heroes.push(hero);
            });
    }
    deleteHero( hero: Hero ): void{
        this.heroService
            .delete(hero.id)
            .then( () => {
                this.heroes = this.heroes.filter( item => item != hero);
                if(this.selectedHero === hero){
                    this.selectedHero = null;
                }
            })
    }
    getHeroes(): void{
        this.heroService.getHeroes().then( heroes => this.heroes = heroes)
    }

    onSelect( hero: Hero ): void {
        this.selectedHero = hero;
    }
    goToDetails(){
        this.router.navigate(['/detail', this.selectedHero.id])
    }
    ngOnInit(){
        this.getHeroes();
    }
}