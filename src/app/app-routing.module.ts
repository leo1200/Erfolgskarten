import { AppRoutingPreloaderService } from './app-routing-preloader-service.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'}



];
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: AppRoutingPreloaderService})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
