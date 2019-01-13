import { AppRoutingPreloaderService } from './../app-routing-preloader-service.service';
import { PlayPage } from './../play/play.page';
import { ThemePage } from './../theme/theme.page';
import { AddcardPage } from './../addcard/addcard.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadingStrategy, PreloadAllModules } from '@angular/router';

import { TabsPage } from './tabs.page';
import { LernPage } from '../lern/lern.page';
import { CardsPage } from '../cards/cards.page';
import { ContactPage } from '../settings/settings.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(lern:lern)',
        pathMatch: 'full',
      },
      {
        path: 'lern',
        outlet: 'lern',
        component: LernPage
      },
      {
        path: 'cards/:id',
        outlet: 'cards',
        component: CardsPage
      },
      {
        path: 'settings',
        outlet: 'settings',
        component: ContactPage
      },
      {
        path: 'addcard/:id',
        outlet: 'cards',
        component: AddcardPage
      },
      {
        path: 'theme',
        outlet: 'cards',
        component: ThemePage,
        data: {preload: true}
      },
      {
        path: 'play',
        outlet: 'lern',
        component: PlayPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(lern:lern)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
