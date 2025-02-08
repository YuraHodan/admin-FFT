import { Routes } from '@angular/router';
import { TeamsComponent } from './pages/teams/teams.component';
import { PlayersComponent } from './pages/players/players.component';
import { NewsComponent } from './pages/news/news.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardsComponent } from './pages/dashboards/dashboards.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { FormulasComponent } from './pages/formulas/formulas.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { CardsComponent } from './pages/cards/cards.component';
import { MantraComponent } from './pages/formations/mantra/mantra.component';
import { FantasyComponent } from './pages/formations/fantasy/fantasy.component';
import { RealComponent } from './pages/formations/real/real.component';

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
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'formations',
    children: [
      {
        path: '',
        component: FormationsComponent
      },
      {
        path: 'mantra',
        component: MantraComponent
      },
      {
        path: 'fantasy',
        component: FantasyComponent
      },
      {
        path: 'real',
        component: RealComponent
      }
    ]
  },
  {
    path: 'formulas',
    component: FormulasComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
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
    path: 'cards',
    component: CardsComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
