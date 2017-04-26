import {Component, OnInit} from "@angular/core";
import {Hero} from "../hero";
import {HeroSearchService} from "../services/search.service";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'hero-search',
    templateUrl: 'hero-search.component.html',
    styleUrls: [ 'hero-search.component.sass' ],
    providers: [ HeroSearchService ]
})

export class HeroSearchComponent implements OnInit{
    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroSearchService: HeroSearchService,
                private router: Router
    ){}
    search(term: string): void{
        this.searchTerms.next(term);
    }

    goToDetail(hero: Hero): void{
        this.router.navigate([ '/detail', hero.id ] )
    }
    ngOnInit(): void{
        this.heroes = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap( term => term
                ? this.heroSearchService.search(term)
                : Observable.of<Hero[]>([]))
            .catch( () => {
                return Observable.of<Hero[]>([])
            })
    }
}