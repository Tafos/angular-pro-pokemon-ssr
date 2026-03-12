import { RenderMode, ServerRoute } from '@angular/ssr';
import { PokemonsService } from './pokemons/services/pokemons';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pricing',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return an array of parameter objects for each route instance
      const total_page = 20;
      const arr = Array.from({ length: total_page }, (_, i) => i + 1);

      return arr.map(page => ({ page: page.toString() }));
    },
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return an array of parameter objects for each route instance
      const total_pokemon = 20;
      const pokemonNamelist = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${total_pokemon}`,
      ).then((res) => res.json());
      // console.log(pokemonNamelist);
      return pokemonNamelist.results.map((pokemon: { name: string }) => ({
        id: pokemon.name,
      }));
    },
  },
];
