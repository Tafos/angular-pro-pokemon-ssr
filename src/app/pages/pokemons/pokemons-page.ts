import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonsService } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList,PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute); //me dice en que pagina estoy y los queryparameters
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      //obtengo la page de los params
      map((params) => params.get('page') ?? '1'),
      //tranformo a numero
      map((page) => (isNaN(+page) ? 1 : +page)),

      map((page) => Math.max(1, page)),
    ),
  );
  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // });

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe((params) => {
    //   console.log(params);
    // });

    console.log(this.currentPage());

    this.loadPokemons();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 1500);
  }

  // ngOnDestroy(): void {
  // this.$appState.unsubscribe();
  // }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;
    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], {
            queryParams: { page: pageToLoad },
          }),
        ),
        tap(() => this.title.setTitle(`Pokemon SSR - Page${pageToLoad}`)),
      )
      .subscribe((pokemons) => {
        // console.log('On init');
        this.pokemons.set(pokemons);
      });
  }
}
