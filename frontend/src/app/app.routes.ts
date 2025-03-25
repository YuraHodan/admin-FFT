import { Routes } from '@angular/router';
import { TeamsComponent } from './pages/teams/teams.component';
import { PlayersComponent } from './pages/players/players.component';
import { NewsComponent } from './pages/news/news.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardsComponent } from './pages/dashboards/dashboards.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { PlayerComponent } from './pages/players/player/player.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardsComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'players',
    component: PlayersComponent
  },
  {
    path: 'player/:id',
    component: PlayerComponent
  },
  {
    path: 'news',
    children: [
      {
        path: '',
        component: NewsComponent
      },
      {
        path: 'templates',
        component: NewsComponent
      }
    ]
  },
  {
    path: 'formations',
    component: FormationsComponent
  },
  {
    path: 'schedule',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/schedule/schedule.component').then((m) => m.ScheduleComponent),
      },
      {
        path: 'tour',
        loadComponent: () =>
          import('./pages/schedule/tour/tour.component').then((m) => m.TourComponent),
      },
      {
        path: 'tour/:id',
        loadComponent: () =>
          import('./pages/schedule/tour/tour.component').then((m) => m.TourComponent),
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'seasons',
    loadComponent: () =>
      import('./pages/seasons/seasons.component').then((m) => m.SeasonsComponent),
  },
  {
    path: 'predicted-lineups',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/predicted-lineups/predicted-lineups.component').then((m) => m.PredictedLineupsComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/predicted-lineups/predicted-lineup/predicted-lineup.component').then((m) => m.PredictedLineupComponent),
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
