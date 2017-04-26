import {Injectable} from "@angular/core";
import {HEROES} from "../mock-heroes";
import {Hero} from "../hero";
import {Http, Headers} from "@angular/http";

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor( private http: Http){}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
                        .toPromise()
                        .then( response => response.json().data as Hero[] );
    }
    getHero( id:number ): Promise<Hero>{
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
                        .toPromise()
                        .then( response => response.json().data as Hero );
    }
    update( hero: Hero ): Promise<Hero>{
        const url = `${ this.heroesUrl }/${ hero.id }`;
        return this.http
            .put( url, JSON.stringify(hero), { headers: this.headers})
            .toPromise()
            .then( () => hero )
    }
    create(name: string): Promise<Hero>{
        return this.http
            .post( this.heroesUrl, JSON.stringify({name}), { headers: this.headers })
            .toPromise()
            .then( hero => hero.json().data as Hero)
    }
    delete(id: number): Promise<void>{
        const url = `${this.heroesUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(()=> null)
    }
    /*getHerosHttp(): Promise<Hero[]> {
        return this.http.get('./src/data/data.json')
            .toPromise()
            .then( res => res.json());

    }
    getHeroHttp(id: number): Promise<Hero> {
        return this.http.get('./src/data/data.json')
            .toPromise()
            .then( res => {
                return res.json().find( (item: Hero) => item.id == id)
            });

    }*/
}