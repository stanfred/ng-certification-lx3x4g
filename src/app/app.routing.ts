import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FutureComponent } from './future/future.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'forecast/:id',
    component: FutureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
