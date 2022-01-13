import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NoneComponent } from './none/none.component';

const routes: Routes = [{
  path: '', component: HomeComponent, children: [
    { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
    { path: '**', component:NoneComponent },

  ],
}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
