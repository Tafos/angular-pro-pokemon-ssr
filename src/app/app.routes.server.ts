import { RenderMode, ServerRoute } from '@angular/ssr';

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
    path: 'pokemons',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return an array of parameter objects for each route instance
      return [{ id: '1' }, { id: '2' }, { id: '3' }];
    },
  },
];
