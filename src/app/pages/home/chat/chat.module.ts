import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatMainComponent } from '../chat-main/chat-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinebreakPipe } from 'src/app/pipes/linebreak.pipe';
import { SideChatComponent } from '../side-chat/side-chat.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChatMainComponent,
    LinebreakPipe,
    SideChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }
