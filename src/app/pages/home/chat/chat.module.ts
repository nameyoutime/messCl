import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatMainComponent } from '../chat-main/chat-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinebreakPipe } from 'src/app/pipes/linebreak.pipe';
import { SideChatComponent } from '../side-chat/side-chat.component';
import { NgxImageCompressService } from "ngx-image-compress";
import { SharedModule } from "../../../shared/shared/shared.module";
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

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
    ReactiveFormsModule,
    SharedModule,
    PickerModule,
    EmojiModule
  ],
  providers: [NgxImageCompressService],

})
export class ChatModule { }
