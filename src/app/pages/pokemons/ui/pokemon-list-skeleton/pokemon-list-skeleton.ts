import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonCard } from '../../../../pokemons/components/pokemon-card/pokemon-card';

@Component({
  selector: 'pokemon-list-skeleton',
  imports: [],
  templateUrl: './pokemon-list-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeleton { }
