import { PlayPageModule } from './../play/play.module';
import { ThemePageModule } from './../theme/theme.module';
import { AddcardPageModule } from './../addcard/addcard.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ContactPageModule } from '../settings/settings.module';
import { CardsPageModule } from '../cards/cards.module';
import { LernPageModule } from '../lern/lern.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    LernPageModule,
    CardsPageModule,
    ContactPageModule,
    AddcardPageModule,
    ThemePageModule,
    PlayPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
