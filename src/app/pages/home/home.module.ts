import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendreqComponent } from './friendreq/friendreq.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ChatMainComponent } from './chat-main/chat-main.component';


@NgModule({
  declarations: [
    HomeComponent,
    FriendListComponent,
    FriendreqComponent,
    SearchComponent,
    ChatMainComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
